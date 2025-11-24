@extends('eventmie::layouts.app')

@section('content')
<?php
// Get event ID from session booking data
$eventId = null;
$booking = session('mercadopago_booking');
if ($booking) {
    $eventId = $booking->event_id ?? null;
}
?>
<div class="container mt-5 mb-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow-lg" data-event-id="{{ $eventId }}">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0">
                        <i class="fas fa-credit-card"></i> {{ trans('em.mercadopago_checkout') }}
                    </h4>
                </div>
                <div class="card-body">
                    <!-- Loading State -->
                    <div id="loading" class="text-center" style="display: none;">
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">{{ trans('em.processing') }}...</span>
                        </div>
                        <p class="mt-3">{{ trans('em.processing_payment') }}...</p>
                    </div>

                    <!-- Checkout Form -->
                    <div id="checkout-form">
                        <div class="alert alert-info" role="alert">
                            <i class="fas fa-info-circle"></i> 
                            {{ trans('em.mercadopago_checkout_info') }}
                        </div>

                        <!-- Payment Method Selection -->
                        <div class="mb-4">
                            <label class="form-label"><strong>{{ trans('em.payment_method') }}</strong></label>
                            <div id="payment-methods">
                                <!-- Payment methods will be loaded here -->
                            </div>
                        </div>

                        <!-- Installments -->
                        <div class="mb-4" id="installments-section" style="display: none;">
                            <label class="form-label" for="installments">
                                <strong>{{ trans('em.installments') }}</strong>
                            </label>
                            <select class="form-select" id="installments" name="installments">
                                <option value="1">{{ trans('em.no_installments') }}</option>
                            </select>
                        </div>

                        <!-- Cardholder Info -->
                        <div class="mb-4" id="cardholder-section" style="display: none;">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label" for="cardholderName">
                                        <strong>{{ trans('em.cardholder_name') }}</strong>
                                    </label>
                                    <input type="text" class="form-control" id="cardholderName" placeholder="Full Name">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label" for="cardholderEmail">
                                        <strong>{{ trans('em.email') }}</strong>
                                    </label>
                                    <input type="email" class="form-control" id="cardholderEmail" placeholder="Email" value="{{ Auth::user()->email }}">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label" for="cardholderDocument">
                                        <strong>{{ trans('em.document') }}</strong>
                                    </label>
                                    <input type="text" class="form-control" id="cardholderDocument" placeholder="CPF/CNPJ">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label" for="cardholderPhone">
                                        <strong>{{ trans('em.phone') }}</strong>
                                    </label>
                                    <input type="tel" class="form-control" id="cardholderPhone" placeholder="Phone">
                                </div>
                            </div>
                        </div>

                        <!-- Card Form (for credit/debit card) -->
                        <div id="card-form" style="display: none;">
                            <div id="form-checkout" class="mb-4"></div>
                        </div>

                        <!-- Order Summary -->
                        <div class="card mb-4 bg-light">
                            <div class="card-body">
                                <h6 class="card-title">{{ trans('em.order_summary') }}</h6>
                                <div class="d-flex justify-content-between mb-2">
                                    <span>{{ trans('em.subtotal') }}:</span>
                                    <span id="subtotal">R$ 0.00</span>
                                </div>
                                <div class="d-flex justify-content-between mb-2">
                                    <span>{{ trans('em.tax') }}:</span>
                                    <span id="tax">R$ 0.00</span>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-between">
                                    <strong>{{ trans('em.total') }}:</strong>
                                    <strong id="total">R$ 0.00</strong>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="d-grid gap-2">
                            <button type="button" class="btn btn-primary btn-lg" id="pay-button" onclick="processPayment()">
                                <i class="fas fa-lock"></i> {{ trans('em.pay_now') }}
                            </button>
                            <a href="{{ route('eventmie.events_index') }}" class="btn btn-secondary btn-lg">
                                {{ trans('em.cancel') }}
                            </a>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div id="error-message" class="alert alert-danger mt-3" style="display: none;" role="alert">
                        <i class="fas fa-exclamation-circle"></i>
                        <span id="error-text"></span>
                    </div>

                    <!-- Success Message -->
                    <div id="success-message" class="alert alert-success mt-3" style="display: none;" role="alert">
                        <i class="fas fa-check-circle"></i>
                        <span id="success-text"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script src="https://sdk.mercadopago.com/js/v2"></script>
<script>
    // Initialize Mercado Pago
    const mp = new MercadoPago('{{ $publicKey ?? "" }}', {
        locale: '{{ app()->getLocale() }}'
    });

    // Load payment methods and booking data
    document.addEventListener('DOMContentLoaded', function() {
        loadPaymentMethods();
        loadBookingData();
    });

    function loadPaymentMethods() {
        console.log('=== CARREGANDO MÉTODOS DE PAGAMENTO ===');
        
        // Get event ID from data-attribute (set from session in Blade)
        const eventId = document.querySelector('[data-event-id]')?.dataset.eventId ||
                       new URLSearchParams(window.location.search).get('event_id');
        
        console.log('Event ID:', eventId);
        
        if (!eventId) {
            console.error('Event ID não encontrado');
            return;
        }

        // Load from API with cache busting
        const timestamp = new Date().getTime();
        const url = `/api/mercadopago/payment-methods/event/${eventId}?t=${timestamp}`;
        console.log('Chamando API:', url);

        fetch(url, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        })
        .then(response => {
            console.log('Resposta recebida:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Dados da API:', data);
            
            if (!data.status || !data.data) {
                console.error('Erro na resposta da API:', data.message);
                return;
            }

            const paymentMethods = data.data;
            console.log('Métodos carregados:', paymentMethods.length, paymentMethods);

            const container = document.getElementById('payment-methods');
            container.innerHTML = ''; // Limpar métodos anteriores

            const iconMap = {
                'credit_card': 'fas fa-credit-card',
                'debit_card': 'fas fa-credit-card',
                'boleto': 'fas fa-barcode',
                'pix': 'fas fa-qrcode',
                'mercadopago_wallet': 'fas fa-wallet'
            };

            paymentMethods.forEach(method => {
                const div = document.createElement('div');
                div.className = 'form-check mb-2 p-3 border rounded';
                const icon = iconMap[method.type] || 'fas fa-credit-card';
                
                div.innerHTML = `
                    <input class="form-check-input" type="radio" name="payment_method" id="method_${method.id}" value="${method.id}" data-method-type="${method.type}">
                    <label class="form-check-label" for="method_${method.id}">
                        <i class="${icon}"></i> <strong>${method.name}</strong>
                        <small class="text-muted d-block">${method.description || ''}</small>
                    </label>
                `;
                container.appendChild(div);
            });

            // Add change event listener
            document.querySelectorAll('input[name="payment_method"]').forEach(input => {
                input.addEventListener('change', function() {
                    onPaymentMethodChange(this.value, this.dataset.methodType);
                });
            });

            console.log('Métodos renderizados com sucesso');
        })
        .catch(error => {
            console.error('Erro ao carregar métodos:', error);
            document.getElementById('error-text').textContent = 'Erro ao carregar métodos de pagamento: ' + error.message;
            document.getElementById('error-message').style.display = 'block';
        });
    }

    function loadBookingData() {
        // Load booking data from session/backend
        // This will be populated from the backend
        document.getElementById('subtotal').textContent = 'R$ 0.00';
        document.getElementById('tax').textContent = 'R$ 0.00';
        document.getElementById('total').textContent = 'R$ 0.00';
    }

    function onPaymentMethodChange(methodId, methodType) {
        console.log('Método selecionado:', methodId, 'Tipo:', methodType);
        
        const cardForm = document.getElementById('card-form');
        const cardholderSection = document.getElementById('cardholder-section');
        const installmentsSection = document.getElementById('installments-section');

        if (methodType === 'credit_card' || methodType === 'debit_card') {
            cardForm.style.display = 'block';
            cardholderSection.style.display = 'block';
            installmentsSection.style.display = methodType === 'credit_card' ? 'block' : 'none';
            
            // Initialize card form
            initializeCardForm();
        } else {
            cardForm.style.display = 'none';
            cardholderSection.style.display = 'none';
            installmentsSection.style.display = 'none';
        }
    }

    function initializeCardForm() {
        // Initialize Mercado Pago card form
        const cardForm = mp.cardForm({
            amount: '0.00',
            iframe: true,
            form: {
                id: 'form-checkout',
                cardNumber: {
                    id: 'cardNumber',
                    placeholder: 'Card number'
                },
                expirationDate: {
                    id: 'expirationDate',
                    placeholder: 'MM/YY'
                },
                securityCode: {
                    id: 'securityCode',
                    placeholder: 'Security code'
                },
                cardholderName: {
                    id: 'cardholderName',
                    placeholder: 'Cardholder name'
                }
            },
            callbacks: {
                onFormMounted: error => {
                    if (error) console.warn('Form Mounted handling error: ', error)
                    else console.log('Form Mounted')
                },
                onSubmit: event => {
                    event.preventDefault()
                    processPayment()
                },
                onFetching: (resource) => {
                    console.log('Fetching resource: ', resource)
                    return { headers: {} }
                }
            }
        });
    }

    function processPayment() {
        const payButton = document.getElementById('pay-button');
        payButton.disabled = true;
        document.getElementById('loading').style.display = 'block';

        // Get selected payment method
        const paymentMethod = document.querySelector('input[name="payment_method"]:checked');
        if (!paymentMethod) {
            showError('{{ trans("em.select_payment_method") }}');
            payButton.disabled = false;
            document.getElementById('loading').style.display = 'none';
            return;
        }

        // Process payment based on method
        // This will be implemented based on the selected payment method
        console.log('Processing payment with method:', paymentMethod.value);

        // Simulate payment processing
        setTimeout(() => {
            showSuccess('{{ trans("em.payment_processing") }}');
            payButton.disabled = false;
            document.getElementById('loading').style.display = 'none';
        }, 2000);
    }

    function showError(message) {
        document.getElementById('error-text').textContent = message;
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('success-message').style.display = 'none';
    }

    function showSuccess(message) {
        document.getElementById('success-text').textContent = message;
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
    }
</script>
@endsection
