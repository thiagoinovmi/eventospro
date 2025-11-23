<template>
    <div class="mercadopago-checkout-container mt-4 p-4 border rounded bg-light">
        <!-- Header -->
        <div class="mb-4">
            <h5 class="mb-3">
                <i class="fas fa-credit-card me-2"></i>
                {{ trans('em.payment_details') || 'Detalhes do Pagamento' }}
            </h5>
            <hr>
        </div>

        <!-- Order Summary -->
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title mb-3">{{ trans('em.order_summary') || 'Resumo do Pedido' }}</h6>
                        <div class="d-flex justify-content-between mb-2">
                            <span>{{ trans('em.subtotal') || 'Subtotal' }}:</span>
                            <strong>{{ subtotal }} {{ currency }}</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>{{ trans('em.tax') || 'Taxa' }}:</span>
                            <strong>{{ tax }} {{ currency }}</strong>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between">
                            <span class="h6">{{ trans('em.total') || 'Total' }}:</span>
                            <strong class="h6">{{ total }} {{ currency }}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payment Method Selection -->
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title mb-3">{{ trans('em.payment_method') || 'Método de Pagamento' }}</h6>
                        
                        <!-- Credit Card -->
                        <div class="form-check mb-3" v-if="paymentMethods.credit_card">
                            <input class="form-check-input" type="radio" id="method_credit_card" v-model="selectedMethod" value="credit_card">
                            <label class="form-check-label" for="method_credit_card">
                                <i class="fas fa-credit-card me-2"></i>
                                {{ trans('em.credit_card') || 'Cartão de Crédito' }}
                            </label>
                        </div>

                        <!-- Debit Card -->
                        <div class="form-check mb-3" v-if="paymentMethods.debit_card">
                            <input class="form-check-input" type="radio" id="method_debit_card" v-model="selectedMethod" value="debit_card">
                            <label class="form-check-label" for="method_debit_card">
                                <i class="fas fa-credit-card me-2"></i>
                                {{ trans('em.debit_card') || 'Cartão de Débito' }}
                            </label>
                        </div>

                        <!-- Boleto -->
                        <div class="form-check mb-3" v-if="paymentMethods.boleto">
                            <input class="form-check-input" type="radio" id="method_boleto" v-model="selectedMethod" value="boleto">
                            <label class="form-check-label" for="method_boleto">
                                <i class="fas fa-barcode me-2"></i>
                                {{ trans('em.boleto') || 'Boleto Bancário' }}
                            </label>
                        </div>

                        <!-- PIX -->
                        <div class="form-check mb-3" v-if="paymentMethods.pix">
                            <input class="form-check-input" type="radio" id="method_pix" v-model="selectedMethod" value="pix">
                            <label class="form-check-label" for="method_pix">
                                <i class="fas fa-mobile-alt me-2"></i>
                                {{ trans('em.pix') || 'PIX' }}
                            </label>
                        </div>

                        <!-- Wallet -->
                        <div class="form-check" v-if="paymentMethods.wallet">
                            <input class="form-check-input" type="radio" id="method_wallet" v-model="selectedMethod" value="wallet">
                            <label class="form-check-label" for="method_wallet">
                                <i class="fas fa-wallet me-2"></i>
                                {{ trans('em.wallet') || 'Carteira Mercado Pago' }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card Form (for credit/debit card) -->
        <div v-if="['credit_card', 'debit_card'].includes(selectedMethod)" class="row mb-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title mb-3">{{ trans('em.card_details') || 'Dados do Cartão' }}</h6>
                        
                        <!-- Cardholder Name -->
                        <div class="mb-3">
                            <label for="cardholderName" class="form-label">{{ trans('em.cardholder_name') || 'Nome do Titular' }}</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="cardholderName"
                                v-model="cardData.holderName"
                                placeholder="João Silva"
                                @input="validateCardholderName"
                            >
                            <small class="text-danger" v-if="errors.cardholderName">{{ errors.cardholderName }}</small>
                        </div>

                        <!-- Card Number -->
                        <div class="mb-3">
                            <label for="cardNumber" class="form-label">{{ trans('em.card_number') || 'Número do Cartão' }}</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="cardNumber"
                                v-model="cardData.number"
                                placeholder="1234 5678 9012 3456"
                                maxlength="19"
                                @input="formatCardNumber"
                            >
                            <small class="text-danger" v-if="errors.cardNumber">{{ errors.cardNumber }}</small>
                        </div>

                        <!-- Expiry and CVV -->
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="cardExpiry" class="form-label">{{ trans('em.expiry_date') || 'Validade' }}</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="cardExpiry"
                                    v-model="cardData.expiry"
                                    placeholder="MM/YY"
                                    maxlength="5"
                                    @input="formatCardExpiry"
                                >
                                <small class="text-danger" v-if="errors.cardExpiry">{{ errors.cardExpiry }}</small>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="cardCvv" class="form-label">{{ trans('em.cvv') || 'CVV' }}</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="cardCvv"
                                    v-model="cardData.cvv"
                                    placeholder="123"
                                    maxlength="4"
                                    @input="validateCVV"
                                >
                                <small class="text-danger" v-if="errors.cardCvv">{{ errors.cardCvv }}</small>
                            </div>
                        </div>

                        <!-- Installments - Apenas para cartão de crédito e carteira -->
                        <div class="mb-3" v-if="['credit_card', 'wallet'].includes(selectedMethod) && installmentOptions.length > 0">
                            <label for="installments" class="form-label">{{ trans('em.installments') || 'Parcelamento' }}</label>
                            <select class="form-select" id="installments" v-model="cardData.installments">
                                <option v-for="option in installmentOptions" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>
            {{ errorMessage }}
            <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i>
            {{ successMessage }}
            <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
        </div>

        <!-- Security Info -->
        <div class="mt-4 text-center">
            <small class="text-muted">
                <i class="fas fa-shield-alt me-1"></i>
                {{ trans('em.secure_payment') || 'Pagamento seguro com Mercado Pago' }}
            </small>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        event: Object,
        tickets: Array,
        total: Number,
        currency: String,
        bookingData: Object,
        paymentMethods: {
            type: Object,
            default: () => ({
                credit_card: true,
                debit_card: true,
                boleto: true,
                pix: true,
                wallet: true
            })
        },
        installmentOptions: {
            type: Array,
            default: () => {
                const options = [];
                for (let i = 1; i <= 12; i++) {
                    options.push({
                        value: i,
                        label: i === 1 ? '1x sem juros' : `${i}x ${i <= 6 ? 'sem juros' : 'com juros'}`
                    });
                }
                return options;
            }
        }
    },

    data() {
        return {
            selectedMethod: 'credit_card',
            cardData: {
                holderName: '',
                number: '',
                expiry: '',
                cvv: '',
                installments: 1
            },
            errors: {
                cardholderName: '',
                cardNumber: '',
                cardExpiry: '',
                cardCvv: ''
            },
            errorMessage: ''
        }
    },

    computed: {
        subtotal() {
            const total = parseFloat(this.total) || 0;
            return total.toFixed(2);
        },
        tax() {
            return (0).toFixed(2);
        }
    },

    methods: {
        formatCardNumber() {
            let value = this.cardData.number.replace(/\s/g, '');
            let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
            this.cardData.number = formatted;
        },

        formatCardExpiry() {
            let value = this.cardData.expiry.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            this.cardData.expiry = value;
        },

        validateCardholderName() {
            if (this.cardData.holderName.length < 3) {
                this.errors.cardholderName = 'Nome deve ter pelo menos 3 caracteres';
            } else {
                this.errors.cardholderName = '';
            }
        },

        validateCVV() {
            if (this.cardData.cvv.length < 3 || this.cardData.cvv.length > 4) {
                this.errors.cardCvv = 'CVV deve ter 3 ou 4 dígitos';
            } else {
                this.errors.cardCvv = '';
            }
        },

        validateForm() {
            let isValid = true;

            if (this.selectedMethod === 'credit_card' || this.selectedMethod === 'debit_card') {
                // Validate cardholder name
                if (this.cardData.holderName.length < 3) {
                    this.errors.cardholderName = 'Nome inválido';
                    isValid = false;
                }

                // Validate card number
                if (this.cardData.number.replace(/\s/g, '').length !== 16) {
                    this.errors.cardNumber = 'Número do cartão inválido';
                    isValid = false;
                }

                // Validate expiry
                if (!this.cardData.expiry.match(/^\d{2}\/\d{2}$/)) {
                    this.errors.cardExpiry = 'Validade inválida (MM/YY)';
                    isValid = false;
                }

                // Validate CVV
                if (this.cardData.cvv.length < 3 || this.cardData.cvv.length > 4) {
                    this.errors.cardCvv = 'CVV inválido';
                    isValid = false;
                }
            }

            return isValid;
        },

        async processPayment() {
            console.log('=== PROCESS PAYMENT INICIADO ===');
            console.log('selectedMethod:', this.selectedMethod);
            console.log('cardData:', this.cardData);
            
            if (!this.validateForm()) {
                this.$emit('error', 'Por favor, preencha todos os campos corretamente');
                return;
            }

            this.errorMessage = '';

            try {
                // Prepare payment data
                const paymentData = {
                    event_id: this.event.id,
                    booking_date: this.bookingData.booking_date,
                    booking_end_date: this.bookingData.booking_end_date,
                    start_time: this.bookingData.start_time,
                    end_time: this.bookingData.end_time,
                    payment_method: 'mercadopago',
                    selected_method: this.selectedMethod,
                    card_data: ['credit_card', 'debit_card'].includes(this.selectedMethod) ? this.cardData : null,
                    total: this.total
                };

                console.log('Enviando dados para:', route('eventmie.mercadopago_process'));
                console.log('Dados:', paymentData);

                // Send payment request
                const response = await axios.post(route('eventmie.mercadopago_process'), paymentData);

                console.log('Resposta recebida:', response.data);

                if (response.data.status) {
                    this.$emit('success', response.data.message || 'Pagamento processado com sucesso!');
                    
                    // Redirect after success
                    setTimeout(() => {
                        window.location.href = route('eventmie.booking_confirmation', { id: response.data.booking_id });
                    }, 2000);
                } else {
                    this.$emit('error', response.data.message || 'Erro ao processar pagamento');
                }
            } catch (error) {
                console.error('Payment error:', error);
                console.error('Resposta de erro:', error.response);
                this.$emit('error', error.response?.data?.message || 'Erro ao processar pagamento. Tente novamente.');
            }
        }

    }
}
</script>

<style scoped>
.mercadopago-checkout-container {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border: 2px solid #007bff;
}

.card {
    border: 1px solid #dee2e6;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.form-control:focus,
.form-select:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
    background-color: #0056b3;
    border-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1rem rgba(0, 123, 255, 0.3);
}

.btn-primary:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.alert {
    border-radius: 0.5rem;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.text-danger {
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>
