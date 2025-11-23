<?php

namespace App\Http\Controllers;

use App\Models\MercadoPagoSetting;
use App\Models\MercadoPagoPaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Classiebit\Eventmie\Services\MercadoPagoService;

class MercadoPagoSettingsController extends Controller
{
    /**
     * Get Mercado Pago settings
     */
    public function getSettings()
    {
        try {
            $setting = MercadoPagoSetting::first();
            
            if (!$setting) {
                return response()->json([
                    'status' => false,
                    'message' => 'Configurações não encontradas'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'status' => true,
                'data' => [
                    'id' => $setting->id,
                    'mode' => $setting->mode,
                    'enabled' => $setting->enabled,
                    'webhook_url' => $setting->webhook_url,
                    'webhook_token' => $setting->webhook_token,
                    // Não retornar tokens sensíveis
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error getting Mercado Pago settings: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao buscar configurações'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update Mercado Pago settings
     */
    public function updateSettings(Request $request)
    {
        try {
            // Validar dados
            $validated = $request->validate([
                'access_token' => 'nullable|string|min:10',
                'public_key' => 'nullable|string|min:10',
                'mode' => 'required|in:test,production',
                'webhook_url' => 'nullable|url',
                'webhook_token' => 'nullable|string|min:10',
                'enabled' => 'boolean'
            ]);

            // Buscar ou criar setting
            $setting = MercadoPagoSetting::firstOrCreate([]);

            // Atualizar apenas os campos fornecidos
            if ($request->has('access_token') && !empty($validated['access_token'])) {
                $setting->access_token = $validated['access_token'];
            }

            if ($request->has('public_key') && !empty($validated['public_key'])) {
                $setting->public_key = $validated['public_key'];
            }

            $setting->mode = $validated['mode'];
            $setting->webhook_url = $validated['webhook_url'] ?? $setting->webhook_url;
            $setting->webhook_token = $validated['webhook_token'] ?? $setting->webhook_token;
            $setting->enabled = $validated['enabled'] ?? false;

            $setting->save();

            return response()->json([
                'status' => true,
                'message' => 'Configurações atualizadas com sucesso',
                'data' => [
                    'id' => $setting->id,
                    'mode' => $setting->mode,
                    'enabled' => $setting->enabled
                ]
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            Log::error('Error updating Mercado Pago settings: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao atualizar configurações'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Test Mercado Pago connection
     */
    public function testConnection()
    {
        try {
            $setting = MercadoPagoSetting::first();

            if (!$setting || !$setting->access_token) {
                return response()->json([
                    'status' => false,
                    'message' => 'Credenciais não configuradas'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Tentar inicializar o serviço
            $service = new MercadoPagoService([
                'access_token' => $setting->access_token,
                'public_key' => $setting->public_key,
                'mode' => $setting->mode
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Conexão com Mercado Pago estabelecida com sucesso',
                'mode' => $setting->mode
            ]);
        } catch (\Exception $e) {
            Log::error('Error testing Mercado Pago connection: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao conectar com Mercado Pago: ' . $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Get all payment methods
     */
    public function getPaymentMethods()
    {
        try {
            $methods = MercadoPagoPaymentMethod::all();

            return response()->json([
                'status' => true,
                'data' => $methods
            ]);
        } catch (\Exception $e) {
            Log::error('Error getting payment methods: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao buscar métodos de pagamento'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update payment method
     */
    public function updatePaymentMethod(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'enabled' => 'boolean',
                'installments_enabled' => 'boolean',
                'max_installments' => 'integer|min:1|max:12'
            ]);

            $method = MercadoPagoPaymentMethod::findOrFail($id);
            $method->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'Método de pagamento atualizado com sucesso',
                'data' => $method
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Método de pagamento não encontrado'
            ], Response::HTTP_NOT_FOUND);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            Log::error('Error updating payment method: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao atualizar método de pagamento'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Seed payment methods (initialize default methods)
     */
    public function seedPaymentMethods()
    {
        try {
            $methods = [
                [
                    'method_type' => 'credit_card',
                    'display_name' => 'Cartão de Crédito',
                    'description' => 'Pague com seu cartão de crédito',
                    'installments_enabled' => true,
                    'max_installments' => 12,
                    'enabled' => true
                ],
                [
                    'method_type' => 'debit_card',
                    'display_name' => 'Cartão de Débito',
                    'description' => 'Pague com seu cartão de débito',
                    'installments_enabled' => false,
                    'max_installments' => 1,
                    'enabled' => true
                ],
                [
                    'method_type' => 'boleto',
                    'display_name' => 'Boleto Bancário',
                    'description' => 'Pague via boleto bancário',
                    'installments_enabled' => false,
                    'max_installments' => 1,
                    'enabled' => true
                ],
                [
                    'method_type' => 'pix',
                    'display_name' => 'PIX',
                    'description' => 'Pague instantaneamente via PIX',
                    'installments_enabled' => false,
                    'max_installments' => 1,
                    'enabled' => true
                ],
                [
                    'method_type' => 'mercadopago_wallet',
                    'display_name' => 'Carteira Mercado Pago',
                    'description' => 'Pague com sua carteira Mercado Pago',
                    'installments_enabled' => false,
                    'max_installments' => 1,
                    'enabled' => true
                ]
            ];

            $created = 0;
            foreach ($methods as $methodData) {
                $existing = MercadoPagoPaymentMethod::where('method_type', $methodData['method_type'])->first();
                
                if (!$existing) {
                    MercadoPagoPaymentMethod::create($methodData);
                    $created++;
                }
            }

            return response()->json([
                'status' => true,
                'message' => "Métodos de pagamento inicializados ($created novos métodos criados)",
                'created' => $created
            ]);
        } catch (\Exception $e) {
            Log::error('Error seeding payment methods: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao inicializar métodos de pagamento'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
