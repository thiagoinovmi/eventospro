<?php

namespace Classiebit\Eventmie\Http\Controllers;

use App\Models\MercadoPagoTransaction;
use App\Models\MercadoPagoRefund;
use App\Models\MercadoPagoWebhook;
use Classiebit\Eventmie\Models\Booking;
use Classiebit\Eventmie\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Classiebit\Eventmie\Services\MercadoPagoService;

class MercadoPagoController extends \App\Http\Controllers\Controller
{
    protected $mercadoPagoService;

    public function __construct(MercadoPagoService $mercadoPagoService)
    {
        $this->mercadoPagoService = $mercadoPagoService;
    }

    /**
     * Criar pagamento e redirecionar para checkout
     */
    public function checkout(Request $request)
    {
        try {
            $request->validate([
                'booking_id' => 'required|numeric|min:1',
                'payment_method_id' => 'required|string',
                'installments' => 'nullable|numeric|min:1|max:12',
            ]);

            $booking = Booking::with(['event', 'user'])->find($request->booking_id);

            if (!$booking) {
                return error('Booking not found', Response::HTTP_NOT_FOUND);
            }

            // Verificar se o usuário é o dono da reserva
            if ($booking->user_id != Auth::id() && !Auth::user()->hasRole('admin')) {
                return error('Unauthorized', Response::HTTP_FORBIDDEN);
            }

            // Verificar se já existe uma transação ativa
            $existingTransaction = MercadoPagoTransaction::where('booking_id', $booking->id)
                ->whereIn('status', ['pending', 'authorized'])
                ->first();

            if ($existingTransaction) {
                return error('There is already an active transaction for this booking', Response::HTTP_BAD_REQUEST);
            }

            // Criar token de pagamento
            $tokenData = $this->mercadoPagoService->createPaymentToken(
                $booking->user->email,
                $booking->user->name,
                $booking->event->title,
                $booking->total_amount,
                $request->payment_method_id,
                $request->installments ?? 1
            );

            if (!$tokenData || !isset($tokenData['id'])) {
                Log::error('Failed to create payment token', ['booking_id' => $booking->id]);
                return error('Failed to create payment token', Response::HTTP_BAD_REQUEST);
            }

            // Criar transação no banco de dados
            $transaction = MercadoPagoTransaction::create([
                'booking_id' => $booking->id,
                'user_id' => $booking->user_id,
                'event_id' => $booking->event_id,
                'amount' => $booking->total_amount,
                'currency' => 'BRL',
                'payment_method_type' => $request->payment_method_id,
                'installments' => $request->installments ?? 1,
                'payer_email' => $booking->user->email,
                'payer_name' => $booking->user->name,
                'status' => 'pending',
            ]);

            return response()->json([
                'status' => true,
                'transaction_id' => $transaction->id,
                'token' => $tokenData['id'],
                'public_key' => $this->mercadoPagoService->getPublicKey(),
            ]);

        } catch (\Exception $e) {
            Log::error('Mercado Pago checkout error', [
                'error' => $e->getMessage(),
                'booking_id' => $request->booking_id ?? null,
            ]);
            return error($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Processar pagamento após confirmação do cliente
     */
    public function processPayment(Request $request)
    {
        try {
            $request->validate([
                'transaction_id' => 'required|numeric|min:1',
                'payment_id' => 'required|string',
                'payer_email' => 'required|email',
                'payer_document' => 'nullable|string',
            ]);

            $transaction = MercadoPagoTransaction::find($request->transaction_id);

            if (!$transaction) {
                return error('Transaction not found', Response::HTTP_NOT_FOUND);
            }

            // Verificar status do pagamento no Mercado Pago
            $paymentDetails = $this->mercadoPagoService->getPaymentDetails($request->payment_id);

            if (!$paymentDetails) {
                Log::error('Failed to get payment details', ['payment_id' => $request->payment_id]);
                return error('Failed to verify payment', Response::HTTP_BAD_REQUEST);
            }

            // Atualizar transação com dados do pagamento
            $transaction->update([
                'payment_id' => $request->payment_id,
                'status' => $paymentDetails['status'],
                'status_detail' => $paymentDetails['status_detail'] ?? null,
                'payer_document' => $request->payer_document,
                'merchant_order_id' => $paymentDetails['merchant_order_id'] ?? null,
            ]);

            // Se o pagamento foi aprovado, finalizar a reserva
            if ($paymentDetails['status'] === 'approved') {
                return $this->finishCheckout($transaction);
            }

            // Se o pagamento foi autorizado, aguardar captura
            if ($paymentDetails['status'] === 'authorized') {
                return response()->json([
                    'status' => true,
                    'message' => 'Payment authorized. Awaiting capture.',
                    'transaction_id' => $transaction->id,
                ]);
            }

            // Outros status
            return response()->json([
                'status' => false,
                'message' => 'Payment ' . $paymentDetails['status'],
                'transaction_id' => $transaction->id,
            ]);

        } catch (\Exception $e) {
            Log::error('Mercado Pago process payment error', [
                'error' => $e->getMessage(),
                'transaction_id' => $request->transaction_id ?? null,
            ]);
            return error($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Finalizar checkout e confirmar reserva
     */
    private function finishCheckout(MercadoPagoTransaction $transaction)
    {
        try {
            $booking = Booking::find($transaction->booking_id);

            if (!$booking) {
                return error('Booking not found', Response::HTTP_NOT_FOUND);
            }

            // Atualizar status da reserva
            $booking->update([
                'payment_status' => 'paid',
                'payment_method' => 'mercadopago',
                'is_paid' => 1,
            ]);

            // Registrar transação como concluída
            $transaction->update([
                'status' => 'approved',
            ]);

            Log::info('Booking completed via Mercado Pago', [
                'booking_id' => $booking->id,
                'transaction_id' => $transaction->id,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Payment completed successfully',
                'booking_id' => $booking->id,
                'transaction_id' => $transaction->id,
            ]);

        } catch (\Exception $e) {
            Log::error('Finish checkout error', [
                'error' => $e->getMessage(),
                'transaction_id' => $transaction->id,
            ]);
            return error($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Capturar pagamento autorizado
     */
    public function capturePayment(Request $request)
    {
        try {
            $request->validate([
                'transaction_id' => 'required|numeric|min:1',
            ]);

            $transaction = MercadoPagoTransaction::find($request->transaction_id);

            if (!$transaction) {
                return error('Transaction not found', Response::HTTP_NOT_FOUND);
            }

            if ($transaction->status !== 'authorized') {
                return error('Payment is not authorized', Response::HTTP_BAD_REQUEST);
            }

            // Capturar pagamento
            $result = $this->mercadoPagoService->capturePayment($transaction->payment_id);

            if ($result) {
                return $this->finishCheckout($transaction);
            }

            return error('Failed to capture payment', Response::HTTP_BAD_REQUEST);

        } catch (\Exception $e) {
            Log::error('Capture payment error', [
                'error' => $e->getMessage(),
                'transaction_id' => $request->transaction_id ?? null,
            ]);
            return error($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Reembolsar pagamento
     */
    public function refund(Request $request)
    {
        try {
            $request->validate([
                'transaction_id' => 'required|numeric|min:1',
                'amount' => 'nullable|numeric|min:0.01',
                'reason' => 'required|string|max:255',
            ]);

            $transaction = MercadoPagoTransaction::find($request->transaction_id);

            if (!$transaction) {
                return error('Transaction not found', Response::HTTP_NOT_FOUND);
            }

            if ($transaction->status !== 'approved') {
                return error('Only approved payments can be refunded', Response::HTTP_BAD_REQUEST);
            }

            // Verificar se o usuário é admin ou dono da reserva
            $booking = Booking::find($transaction->booking_id);
            if ($booking->user_id != Auth::id() && !Auth::user()->hasRole('admin')) {
                return error('Unauthorized', Response::HTTP_FORBIDDEN);
            }

            $refundAmount = $request->amount ?? $transaction->amount;

            // Reembolsar no Mercado Pago
            $refundResult = $this->mercadoPagoService->refundPayment(
                $transaction->payment_id,
                $refundAmount
            );

            if (!$refundResult || !isset($refundResult['id'])) {
                Log::error('Failed to refund payment', ['transaction_id' => $transaction->id]);
                return error('Failed to process refund', Response::HTTP_BAD_REQUEST);
            }

            // Registrar reembolso no banco de dados
            $refund = MercadoPagoRefund::create([
                'transaction_id' => $transaction->id,
                'booking_id' => $transaction->booking_id,
                'amount' => $refundAmount,
                'reason' => $request->reason,
                'status' => 'pending',
                'refund_id' => $refundResult['id'],
                'requested_by' => Auth::id(),
                'requested_at' => now(),
            ]);

            // Atualizar transação
            $transaction->update([
                'refund_id' => $refundResult['id'],
                'refund_amount' => $refundAmount,
                'refund_status' => 'pending',
            ]);

            Log::info('Refund requested', [
                'transaction_id' => $transaction->id,
                'refund_id' => $refund->id,
                'amount' => $refundAmount,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Refund processed successfully',
                'refund_id' => $refund->id,
                'amount' => $refundAmount,
            ]);

        } catch (\Exception $e) {
            Log::error('Refund error', [
                'error' => $e->getMessage(),
                'transaction_id' => $request->transaction_id ?? null,
            ]);
            return error($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Obter detalhes da transação
     */
    public function getTransaction(Request $request)
    {
        try {
            $request->validate([
                'transaction_id' => 'required|numeric|min:1',
            ]);

            $transaction = MercadoPagoTransaction::with(['booking', 'refunds'])
                ->find($request->transaction_id);

            if (!$transaction) {
                return error('Transaction not found', Response::HTTP_NOT_FOUND);
            }

            // Verificar acesso
            if ($transaction->user_id != Auth::id() && !Auth::user()->hasRole('admin')) {
                return error('Unauthorized', Response::HTTP_FORBIDDEN);
            }

            return response()->json([
                'status' => true,
                'data' => $transaction,
            ]);

        } catch (\Exception $e) {
            Log::error('Get transaction error', [
                'error' => $e->getMessage(),
            ]);
            return error($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Listar transações do usuário
     */
    public function listTransactions(Request $request)
    {
        try {
            $userId = Auth::id();
            $isAdmin = Auth::user()->hasRole('admin');

            $query = MercadoPagoTransaction::query();

            if (!$isAdmin) {
                $query->where('user_id', $userId);
            }

            $transactions = $query->with(['booking', 'refunds'])
                ->orderBy('created_at', 'desc')
                ->paginate(15);

            return response()->json([
                'status' => true,
                'data' => $transactions,
            ]);

        } catch (\Exception $e) {
            Log::error('List transactions error', [
                'error' => $e->getMessage(),
            ]);
            return error($e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Webhook para receber notificações do Mercado Pago
     */
    public function webhook(Request $request)
    {
        try {
            // Validar assinatura do webhook
            $isValid = $this->mercadoPagoService->validateWebhookSignature(
                $request->getContent(),
                $request->header('x-signature'),
                $request->header('x-request-id')
            );

            if (!$isValid) {
                Log::warning('Invalid webhook signature', [
                    'request_id' => $request->header('x-request-id'),
                ]);
                return response()->json(['status' => false], Response::HTTP_UNAUTHORIZED);
            }

            $payload = $request->all();

            // Registrar webhook
            MercadoPagoWebhook::create([
                'event_type' => $payload['type'] ?? null,
                'resource_id' => $payload['data']['id'] ?? null,
                'payload' => $payload,
                'processed' => false,
            ]);

            // Processar notificação
            if ($payload['type'] === 'payment') {
                $this->processPaymentNotification($payload);
            }

            return response()->json(['status' => true]);

        } catch (\Exception $e) {
            Log::error('Webhook error', [
                'error' => $e->getMessage(),
            ]);
            return response()->json(['status' => false], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Processar notificação de pagamento
     */
    private function processPaymentNotification($payload)
    {
        try {
            $paymentId = $payload['data']['id'] ?? null;

            if (!$paymentId) {
                return;
            }

            $transaction = MercadoPagoTransaction::where('payment_id', $paymentId)->first();

            if (!$transaction) {
                Log::warning('Transaction not found for payment', ['payment_id' => $paymentId]);
                return;
            }

            // Obter detalhes do pagamento
            $paymentDetails = $this->mercadoPagoService->getPaymentDetails($paymentId);

            if ($paymentDetails) {
                $transaction->update([
                    'status' => $paymentDetails['status'],
                    'status_detail' => $paymentDetails['status_detail'] ?? null,
                    'webhook_received' => true,
                    'webhook_data' => $paymentDetails,
                ]);

                // Se aprovado, finalizar checkout
                if ($paymentDetails['status'] === 'approved') {
                    $this->finishCheckout($transaction);
                }
            }

            // Marcar webhook como processado
            MercadoPagoWebhook::where('resource_id', $paymentId)->update(['processed' => true]);

        } catch (\Exception $e) {
            Log::error('Process payment notification error', [
                'error' => $e->getMessage(),
            ]);
        }
    }
}
