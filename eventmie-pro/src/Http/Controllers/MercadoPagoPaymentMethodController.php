<?php

namespace Classiebit\Eventmie\Http\Controllers;

use App\Models\MercadoPagoPaymentMethod;
use App\Models\EventPaymentMethod;
use Classiebit\Eventmie\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class MercadoPagoPaymentMethodController extends \App\Http\Controllers\Controller
{
    /**
     * Get all payment methods (global)
     */
    public function index()
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
     * Get a specific payment method
     */
    public function show($id)
    {
        try {
            $method = MercadoPagoPaymentMethod::findOrFail($id);

            return response()->json([
                'status' => true,
                'data' => $method
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Método de pagamento não encontrado'
            ], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error('Error getting payment method: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao buscar método de pagamento'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update a payment method (global)
     */
    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'enabled' => 'boolean',
                'installments_enabled' => 'boolean',
                'max_installments' => 'integer|min:1|max:12',
                'min_amount' => 'numeric|min:0',
                'max_amount' => 'numeric|nullable|min:0'
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
     * Get payment methods for a specific event
     * Only returns methods that are enabled globally AND enabled for the event
     */
    public function getEventMethods($eventId)
    {
        try {
            $event = Event::findOrFail($eventId);
            
            // Get event payment methods with global payment method data
            $methods = EventPaymentMethod::where('event_id', $eventId)
                ->with('paymentMethod')
                ->get()
                ->filter(function ($method) {
                    // Only return if both global AND event method are enabled
                    return $method->paymentMethod && 
                           $method->paymentMethod->enabled && 
                           $method->enabled;
                })
                ->values(); // Reset array keys

            // Transform to include all necessary data
            $formattedMethods = $methods->map(function ($method) {
                return [
                    'id' => $method->id,
                    'payment_method_id' => $method->payment_method_id,
                    'event_id' => $method->event_id,
                    'name' => $method->paymentMethod->display_name,
                    'type' => $method->paymentMethod->method_type,
                    'description' => $method->paymentMethod->description,
                    'enabled' => $method->enabled,
                    'installments_enabled' => $method->installments_enabled && $method->paymentMethod->installments_enabled,
                    'max_installments' => $method->max_installments,
                    'global_enabled' => $method->paymentMethod->enabled
                ];
            });

            return response()->json([
                'status' => true,
                'data' => $formattedMethods
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Evento não encontrado'
            ], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error('Error getting event payment methods: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao buscar métodos de pagamento do evento'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Add payment method to event
     */
    public function addEventMethod(Request $request, $eventId)
    {
        try {
            $event = Event::findOrFail($eventId);

            $validated = $request->validate([
                'payment_method_id' => 'required|exists:mercadopago_payment_methods,id',
                'enabled' => 'boolean',
                'installments_enabled' => 'boolean',
                'max_installments' => 'integer|min:1|max:12'
            ]);

            // Verificar se já existe
            $existing = EventPaymentMethod::where([
                'event_id' => $eventId,
                'payment_method_id' => $validated['payment_method_id']
            ])->first();

            if ($existing) {
                return response()->json([
                    'status' => false,
                    'message' => 'Este método de pagamento já está configurado para este evento'
                ], Response::HTTP_CONFLICT);
            }

            $eventMethod = EventPaymentMethod::create([
                'event_id' => $eventId,
                'payment_method_id' => $validated['payment_method_id'],
                'enabled' => $validated['enabled'] ?? true,
                'installments_enabled' => $validated['installments_enabled'] ?? false,
                'max_installments' => $validated['max_installments'] ?? 1
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Método de pagamento adicionado ao evento com sucesso',
                'data' => $eventMethod
            ], Response::HTTP_CREATED);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Evento não encontrado'
            ], Response::HTTP_NOT_FOUND);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            Log::error('Error adding event payment method: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao adicionar método de pagamento ao evento'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update payment method for event
     */
    public function updateEventMethod(Request $request, $eventId, $methodId)
    {
        try {
            $event = Event::findOrFail($eventId);

            $validated = $request->validate([
                'enabled' => 'boolean',
                'installments_enabled' => 'boolean',
                'max_installments' => 'integer|min:1|max:12'
            ]);

            $eventMethod = EventPaymentMethod::where([
                'event_id' => $eventId,
                'payment_method_id' => $methodId
            ])->firstOrFail();

            $eventMethod->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'Método de pagamento do evento atualizado com sucesso',
                'data' => $eventMethod
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Método de pagamento não encontrado para este evento'
            ], Response::HTTP_NOT_FOUND);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            Log::error('Error updating event payment method: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao atualizar método de pagamento do evento'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove payment method from event
     */
    public function removeEventMethod($eventId, $methodId)
    {
        try {
            $event = Event::findOrFail($eventId);

            $eventMethod = EventPaymentMethod::where([
                'event_id' => $eventId,
                'payment_method_id' => $methodId
            ])->firstOrFail();

            $eventMethod->delete();

            return response()->json([
                'status' => true,
                'message' => 'Método de pagamento removido do evento com sucesso'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Método de pagamento não encontrado para este evento'
            ], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error('Error removing event payment method: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao remover método de pagamento do evento'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Initialize event payment methods (copy from global)
     */
    public function initializeEventMethods($eventId)
    {
        try {
            $event = Event::findOrFail($eventId);

            $globalMethods = MercadoPagoPaymentMethod::where('enabled', true)->get();
            $created = 0;

            foreach ($globalMethods as $method) {
                $existing = EventPaymentMethod::where([
                    'event_id' => $eventId,
                    'payment_method_id' => $method->id
                ])->first();

                if (!$existing) {
                    EventPaymentMethod::create([
                        'event_id' => $eventId,
                        'payment_method_id' => $method->id,
                        'enabled' => $method->enabled,
                        'installments_enabled' => $method->installments_enabled,
                        'max_installments' => $method->max_installments
                    ]);
                    $created++;
                }
            }

            return response()->json([
                'status' => true,
                'message' => "Métodos de pagamento inicializados ($created novos métodos criados)",
                'created' => $created
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Evento não encontrado'
            ], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error('Error initializing event payment methods: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Erro ao inicializar métodos de pagamento do evento'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
