<template>
    <div class="mercadopago-checkout-container mt-4 p-4 border rounded bg-light">
        <!-- 🎉 Mensagem de Confirmação de Pagamento -->
        <div v-if="paymentConfirmed" class="text-center py-5">
            <div class="mb-4">
                <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
            </div>
            
            <h3 class="text-success mb-3">
                ✅ Pagamento Recebido e Confirmado!
            </h3>
            
            <p class="text-muted mb-4">
                Seu pagamento foi processado com sucesso. Você será redirecionado para a página de minhas reservas em breve.
            </p>
            
            <div class="alert alert-success" role="alert">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Redirecionando...</strong> Aguarde alguns segundos.
            </div>
            
            <div class="spinner-border text-success mt-3" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
        </div>

        <!-- Formulário Normal (quando não confirmado) -->
        <template v-else>
            <!-- Header -->
            <div class="mb-4">
                <h5 class="mb-3">
                    <i class="fas fa-credit-card me-2"></i>
                    {{ trans('em.payment_details') || 'Detalhes do Pagamento' }}
                </h5>
                <hr>
            </div>

            <!-- ✅ ALERTA - Dados Completos -->
            <div v-if="userDataComplete" class="alert alert-success alert-dismissible fade show mb-4" role="alert">
                <i class="fas fa-check-circle me-2"></i>
                <strong>Perfeito!</strong> Todos os seus dados estão preenchidos corretamente no perfil.
                
                <div class="mt-2 small">
                    <div class="mb-1">
                        <i class="fas fa-check-circle text-success me-1"></i> CPF/CNPJ preenchido
                    </div>
                    <div class="mb-1">
                        <i class="fas fa-check-circle text-success me-1"></i> Telefone preenchido
                    </div>
                    <div class="mb-1">
                        <i class="fas fa-check-circle text-success me-1"></i> Endereço completo
                    </div>
                </div>
                
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <!-- ⚠️ ALERTA - Dados Incompletos -->
            <div v-else-if="window.currentUser" class="alert alert-warning alert-dismissible fade show mb-4" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                <strong>Atenção!</strong> Para garantir a aprovação do seu pagamento, é importante que seus dados estejam completos.
                
                <div class="mt-2 small">
                    <div v-if="!userCPF" class="mb-1">
                        <i class="fas fa-times-circle text-danger me-1"></i> CPF/CNPJ não preenchido
                    </div>
                    <div v-if="!userPhone" class="mb-1">
                        <i class="fas fa-times-circle text-danger me-1"></i> Telefone não preenchido
                    </div>
                    <div v-if="!userAddressComplete" class="mb-1">
                        <i class="fas fa-times-circle text-danger me-1"></i> Endereço incompleto
                    </div>
                </div>
                
                <div class="mt-3">
                    <a href="/profile" target="_blank" class="btn btn-sm btn-warning">
                        <i class="fas fa-edit me-1"></i> Atualizar Perfil
                    </a>
                </div>
                
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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
                            <div class="form-check mb-3" v-if="loadedMethods.credit_card">
                                <input class="form-check-input" type="radio" id="method_credit_card" v-model="selectedMethod" value="credit_card">
                                <label class="form-check-label" for="method_credit_card">
                                    <i class="fas fa-credit-card me-2"></i>
                                    {{ trans('em.credit_card') || 'Cartão de Crédito' }}
                                </label>
                            </div>

                            <!-- Debit Card -->
                            <div class="form-check mb-3" v-if="loadedMethods.debit_card">
                                <input class="form-check-input" type="radio" id="method_debit_card" v-model="selectedMethod" value="debit_card">
                                <label class="form-check-label" for="method_debit_card">
                                    <i class="fas fa-credit-card me-2"></i>
                                    {{ trans('em.debit_card') || 'Cartão de Débito' }}
                                </label>
                            </div>

                            <!-- Boleto -->
                            <div class="form-check mb-3" v-if="loadedMethods.boleto">
                                <input class="form-check-input" type="radio" id="method_boleto" v-model="selectedMethod" value="boleto">
                                <label class="form-check-label" for="method_boleto">
                                    <i class="fas fa-barcode me-2"></i>
                                    {{ trans('em.boleto') || 'Boleto Bancário' }}
                                </label>
                            </div>

                            <!-- PIX -->
                            <div class="form-check mb-3" v-if="loadedMethods.pix">
                                <input class="form-check-input" type="radio" id="method_pix" v-model="selectedMethod" value="pix">
                                <label class="form-check-label" for="method_pix">
                                    <i class="fas fa-mobile-alt me-2"></i>
                                    {{ trans('em.pix') || 'PIX' }}
                                </label>
                            </div>

                            <!-- Wallet -->
                            <div class="form-check" v-if="loadedMethods.mercadopago_wallet">
                                <input class="form-check-input" type="radio" id="method_wallet" v-model="selectedMethod" value="mercadopago_wallet">
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

            <!-- Card Payment Confirmation (waiting for approval) -->
            <div v-if="isWaitingPayment && ['credit_card', 'debit_card'].includes(selectedMethod)" class="row mb-4">
                <div class="col-12">
                    <div class="card border-info">
                        <div class="card-body text-center">
                            <h6 class="card-title mb-4">
                                <i class="fas fa-credit-card me-2 text-info"></i>
                                {{ selectedMethod === 'credit_card' ? (trans('em.credit_card') || 'Cartão de Crédito') : (trans('em.debit_card') || 'Cartão de Débito') }}
                            </h6>
                            
                            <!-- Processing Message -->
                            <div class="mb-4">
                                <div class="spinner-border text-info" role="status">
                                    <span class="visually-hidden">Processando...</span>
                                </div>
                            </div>
                            
                            <!-- Status -->
                            <div class="alert alert-info">
                                <i class="fas fa-hourglass-half me-2"></i>
                                {{ trans('em.processing_payment') || 'Processando seu pagamento...' }}
                            </div>
                            
                            <!-- Info Message -->
                            <p class="text-muted mb-3">
                                {{ trans('em.payment_processing_info') || 'Seu pagamento está sendo processado. Isso pode levar alguns segundos.' }}
                            </p>
                            
                            <!-- Waiting Message -->
                            <div class="alert alert-warning">
                                <i class="fas fa-info-circle me-2"></i>
                                {{ trans('em.waiting_payment_confirmation') || 'Aguardando confirmação do pagamento...' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- PIX QR Code (waiting for payment) -->
            <div v-if="isWaitingPayment && selectedMethod === 'pix'" class="row mb-4">
                <div class="col-12">
                    <div class="card border-success">
                        <div class="card-body text-center">
                            <h6 class="card-title mb-4">
                                <i class="fas fa-mobile-alt me-2 text-success"></i>
                                {{ trans('em.waiting_pix_payment') || 'Aguardando Pagamento PIX' }}
                            </h6>
                            
                            <!-- QR Code -->
                            <div class="mb-4" v-if="pixQrCode">
                                <img :src="pixQrCode" alt="PIX QR Code" class="img-fluid" style="max-width: 300px;">
                            </div>
                            
                            <!-- Copy Code -->
                            <div class="mb-4" v-if="pixData">
                                <p class="text-muted mb-2">{{ trans('em.or_copy_code') || 'Ou copie o código:' }}</p>
                                <div class="input-group">
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        :value="pixData" 
                                        readonly
                                        id="pixCode"
                                    >
                                    <button 
                                        class="btn btn-outline-primary" 
                                        type="button"
                                        @click="copyToClipboard"
                                    >
                                        <i class="fas fa-copy me-2"></i>
                                        {{ trans('em.copy') || 'Copiar' }}
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Expiration Timer -->
                            <div class="alert alert-info" v-if="pixExpiration">
                                <i class="fas fa-clock me-2"></i>
                                {{ trans('em.pix_expires_in') || 'PIX expira em' }}: 
                                <strong :key="timerTrigger">{{ formatTimeRemaining(pixExpiration) }}</strong>
                            </div>
                            
                            <!-- Waiting Message -->
                            <div class="alert alert-warning">
                                <i class="fas fa-hourglass-half me-2"></i>
                                {{ trans('em.waiting_payment_confirmation') || 'Aguardando confirmação do pagamento...' }}
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
        </template>
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
        isRetry: {
            type: Boolean,
            default: false
        },
        paymentMethods: {
            type: Object,
            default: () => ({})
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
            selectedTicket: null,
            cardData: {
                holderName: '',
                number: '',
                expiry: '',
                cvv: '',
                installments: 1,
                paymentMethodId: 'credit_card' // Will be updated based on card brand
            },
            errors: {
                cardholderName: '',
                cardNumber: '',
                cardExpiry: '',
                cardCvv: ''
            },
            errorMessage: '',
            successMessage: '',
            loadedMethods: {},
            pixData: null,
            pixQrCode: null,
            pixExpiration: null,
            isWaitingPayment: false,
            paymentCheckInterval: null,
            paymentConfirmed: false,
            timerCounter: 0,
            timerInterval: null,
            deviceId: null, // 🔐 Device ID para segurança Mercado Pago
            mp: null // 🔐 Instância do SDK Mercado Pago
        }
    },

    mounted() {
        this.loadPaymentMethods();
        
        // 🔐 Inicializar SDK Mercado Pago V2 para Device ID
        this.initializeMercadoPagoSDK();
        
        // 👤 Carregar dados do usuário do localStorage ou API
        this.loadUserData();
        
        // Iniciar timer para atualizar contagem regressiva a cada segundo
        this.timerInterval = setInterval(() => {
            this.timerCounter++;
        }, 1000);
    },

    beforeDestroy() {
        // Limpar interval quando componente é destruído
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        if (this.paymentCheckInterval) {
            clearInterval(this.paymentCheckInterval);
        }
    },

    computed: {
        timerTrigger() {
            // Dummy computed property to trigger re-render
            return this.timerCounter;
        },
        subtotal() {
            const total = parseFloat(this.total) || 0;
            return total.toFixed(2);
        },
        tax() {
            return (0).toFixed(2);
        },
        // 🔍 Verificar se CPF está preenchido
        userCPF() {
            return window.currentUser && window.currentUser.document;
        },
        // 🔍 Verificar se Telefone está preenchido
        userPhone() {
            return window.currentUser && window.currentUser.phone;
        },
        // 🔍 Verificar se Endereço está completo
        userAddressComplete() {
            if (!window.currentUser) return false;
            const user = window.currentUser;
            return user.address_zip_code && 
                   user.address_street && 
                   user.address_number && 
                   user.address_neighborhood && 
                   user.address_city && 
                   user.address_state;
        },
        // 🔍 Verificar se todos os dados estão completos
        userDataComplete() {
            return this.userCPF && this.userPhone && this.userAddressComplete;
        }
    },

    watch: {
        // 🔑 NOVO: Emitir evento quando isWaitingPayment muda
        isWaitingPayment(newValue) {
            this.$emit('waiting-payment-changed', newValue);
        },
        // 🔑 NOVO: Emitir evento quando paymentConfirmed muda
        paymentConfirmed(newValue) {
            this.$emit('payment-confirmed-changed', newValue);
        }
    },

    methods: {
        setSelectedTicket(ticket) {
            console.log('Ticket selecionado no MercadoPagoCheckout:', ticket);
            this.selectedTicket = ticket;
        },

        // 🔐 Inicializar SDK Mercado Pago V2 para obter Device ID
        initializeMercadoPagoSDK() {
            try {
                // Verificar se SDK está disponível
                if (typeof MercadoPago === 'undefined') {
                    console.warn('SDK Mercado Pago não carregado. Carregando via CDN...');
                    this.loadMercadoPagoSDK();
                    return;
                }

                // Inicializar com chave pública
                const publicKey = document.querySelector('meta[name="mercadopago-public-key"]')?.content;
                if (!publicKey) {
                    console.error('Chave pública Mercado Pago não encontrada');
                    return;
                }

                this.mp = new MercadoPago(publicKey);
                
                // Obter Device ID
                this.mp.getIdentifier().then(identifier => {
                    this.deviceId = identifier;
                    console.log('✅ Device ID obtido:', this.deviceId);
                }).catch(error => {
                    console.error('❌ Erro ao obter Device ID:', error);
                });
            } catch (error) {
                console.error('Erro ao inicializar SDK Mercado Pago:', error);
            }
        },

        // 🔐 Carregar SDK Mercado Pago via CDN se não estiver disponível
        loadMercadoPagoSDK() {
            const script = document.createElement('script');
            script.src = 'https://sdk.mercadopago.com/js/v2';
            script.async = true;
            script.onload = () => {
                console.log('✅ SDK Mercado Pago V2 carregado');
                this.initializeMercadoPagoSDK();
            };
            script.onerror = () => {
                console.error('❌ Erro ao carregar SDK Mercado Pago');
            };
            document.head.appendChild(script);
        },

        loadPaymentMethods() {
            console.log('=== CARREGANDO MÉTODOS DE PAGAMENTO ===');
            console.log('Event ID:', this.event?.id);
            
            if (!this.event?.id) {
                console.error('Event ID não encontrado');
                return;
            }

            const timestamp = new Date().getTime();
            const url = `/api/mercadopago/payment-methods/event/${this.event.id}?t=${timestamp}`;
            console.log('Chamando API:', url);

            axios.get(url, {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            })
            .then(response => {
                console.log('Resposta da API:', response.data);
                
                if (response.data.status && response.data.data) {
                    const methods = response.data.data;
                    console.log('Métodos carregados:', methods.length, methods);
                    
                    // Build payment methods object
                    this.loadedMethods = {};
                    methods.forEach(method => {
                        this.loadedMethods[method.type] = true;
                    });
                    
                    console.log('Métodos processados:', this.loadedMethods);
                    
                    // Set first available method as selected
                    const firstMethod = methods[0];
                    if (firstMethod) {
                        this.selectedMethod = firstMethod.type;
                    }
                } else {
                    console.error('Erro na resposta:', response.data.message);
                    this.errorMessage = response.data.message || 'Erro ao carregar métodos de pagamento';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar métodos:', error);
                this.errorMessage = 'Erro ao carregar métodos de pagamento: ' + error.message;
            });
        },

        formatCardNumber() {
            let value = this.cardData.number.replace(/\s/g, '');
            let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
            this.cardData.number = formatted;
            
            // 🔑 IMPORTANTE: Detectar marca APENAS para crédito
            // Para débito, NÃO detectar marca (backend usa debit_card)
            if (this.selectedMethod === 'credit_card') {
                this.detectCardBrand(value);
            } else if (this.selectedMethod === 'debit_card') {
                // Para débito, não detectar marca
                this.cardData.paymentMethodId = undefined;
                console.log('Débito selecionado - payment_method_id não será enviado');
            }
        },
        
        detectCardBrand(cardNumber) {
            // Remove non-digits
            const cleanNumber = cardNumber.replace(/\D/g, '');
            
            if (!cleanNumber) {
                this.cardData.paymentMethodId = 'credit_card';
                return;
            }
            
            // Visa: starts with 4
            if (/^4/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'visa';
            }
            // Mastercard: starts with 51-55
            else if (/^5[1-5]/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'master';
            }
            // American Express: starts with 34 or 37
            else if (/^3[47]/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'amex';
            }
            // Elo: starts with 6363, 6364, 6365, 6366, 6367, 6368, 6369
            else if (/^636[3-9]/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'elo';
            }
            // Diners: starts with 36, 38, 39
            else if (/^3[689]/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'diners';
            }
            // Discover: starts with 6011 or 65
            else if (/^6(?:011|5)/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'discover';
            }
            else {
                this.cardData.paymentMethodId = 'credit_card';
            }
            
            console.log('Card brand detected:', this.cardData.paymentMethodId);
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
            console.log('selectedTicket:', this.selectedTicket);
            
            if (!this.validateForm()) {
                this.$emit('error', 'Por favor, preencha todos os campos corretamente');
                return;
            }

            this.errorMessage = '';

            try {
                // Use the ticket passed from TicketList
                const ticketToUse = this.selectedTicket || (this.tickets && this.tickets.length > 0 ? this.tickets[0] : null);
                
                console.log('Ticket a ser usado:', ticketToUse);

                // Prepare payment data
                const paymentData = {
                    event_id: this.event.id,
                    booking_date: this.bookingData.booking_date,
                    booking_end_date: this.bookingData.booking_end_date,
                    start_time: this.bookingData.start_time,
                    end_time: this.bookingData.end_time,
                    payment_method: 'mercadopago',
                    selected_method: this.selectedMethod,
                    total: this.total,
                    ticket_id: ticketToUse ? ticketToUse.id : null,
                    ticket_title: ticketToUse ? ticketToUse.title : null
                };
                
                // Add card-specific data for credit/debit cards
                if (['credit_card', 'debit_card'].includes(this.selectedMethod)) {
                    // Generate card token using Mercado Pago SDK
                    const tokenData = await this.generateCardToken();
                    
                    if (!tokenData) {
                        this.errorMessage = 'Erro ao gerar token do cartão. Verifique os dados e tente novamente.';
                        return;
                    }
                    
                    paymentData.card_token = tokenData.id;
                    paymentData.installments = this.cardData.installments || 1;
                    
                    // 🏦 Adicionar Issuer ID para evitar erros de processamento
                    if (tokenData.issuer_id) {
                        paymentData.issuer_id = tokenData.issuer_id;
                    }
                    
                    // 🔐 Adicionar Device ID para segurança (SDK Mercado Pago V2)
                    if (this.deviceId) {
                        paymentData.device_id = this.deviceId;
                    }
                    
                    // 🔑 IMPORTANTE: Para crédito, enviar a marca do cartão (visa, master, etc)
                    // Para débito, NÃO enviar payment_method_id (backend usa "debit_card")
                    if (this.selectedMethod === 'credit_card') {
                        paymentData.payment_method_id = this.cardData.paymentMethodId; // Send detected card brand for credit
                    }
                    // Para débito, não enviar payment_method_id - backend usa "debit_card" automaticamente
                    
                    console.log('Card payment data:', {
                        card_token: tokenData.id,
                        issuer_id: tokenData.issuer_id,
                        installments: paymentData.installments,
                        payment_method_id: paymentData.payment_method_id,
                        device_id: paymentData.device_id,
                        selected_method: this.selectedMethod,
                        note: this.selectedMethod === 'debit_card' ? 'Débito - payment_method_id não enviado' : 'Crédito - payment_method_id enviado'
                    });
                }

                const apiUrl = '/bookings/api/mercadopago/process';
                console.log('Enviando dados para:', apiUrl);
                console.log('Dados:', paymentData);

                // Send payment request
                const response = await axios.post(apiUrl, paymentData);

                console.log('Resposta recebida:', response.data);

                console.log('Response data completo:', response.data);
                console.log('selectedMethod:', this.selectedMethod);
                console.log('pix_data presente?', !!response.data.pix_data);
                
                if (response.data.status) {
                    console.log('✅ Pagamento processado com sucesso!');
                    console.log('Método selecionado:', this.selectedMethod);
                    console.log('Método retornado:', response.data.payment_method);
                    console.log('Resposta completa:', JSON.stringify(response.data, null, 2));
                    
                    // PIX
                    if (response.data.payment_method === 'pix' || this.selectedMethod === 'pix') {
                        console.log('🔵 PIX selecionado - processando QR Code');
                        console.log('qr_code presente?', !!response.data.qr_code);
                        console.log('qr_code valor:', response.data.qr_code ? response.data.qr_code.substring(0, 50) + '...' : 'VAZIO');
                        
                        // PIX sempre retorna qr_code, mesmo que qr_code_url seja null
                        if (response.data.qr_code) {
                            console.log('✅ QR Code encontrado!');
                            console.log('QR Code URL:', response.data.qr_code_url || 'null (será gerado dinamicamente)');
                            
                            this.pixData = response.data.qr_code;
                            this.pixQrCode = response.data.qr_code_url; // Já vem como data URL do backend
                            this.pixExpiration = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos
                            this.isWaitingPayment = true;
                            
                            console.log('✅ Estado PIX atualizado:', {
                                pixDataPresente: !!this.pixData,
                                pixQrCodeUrl: this.pixQrCode,
                                isWaitingPayment: this.isWaitingPayment
                            });
                            
                            console.log('⏳ Aguardando webhook do Mercado Pago para confirmação...');
                            
                            // Iniciar verificação de confirmação via webhook
                            this.waitForWebhookConfirmation(response.data.booking_id);
                        } else {
                            console.error('❌ PIX selecionado mas qr_code não retornou!');
                            console.log('Resposta completa:', response.data);
                            this.errorMessage = 'Falha ao gerar QR Code PIX. Tente novamente.';
                        }
                    }
                    // Boleto
                    else if (response.data.payment_method === 'boleto' || this.selectedMethod === 'boleto') {
                        console.log('📋 Boleto selecionado - abrindo URL');
                        
                        if (response.data.barcode_url) {
                            console.log('URL do boleto:', response.data.barcode_url);
                            
                            // Abrir boleto em nova aba
                            window.open(response.data.barcode_url, '_blank');
                            
                            console.log('⏳ Aguardando webhook do Mercado Pago para confirmação...');
                            
                            // Iniciar verificação de confirmação via webhook
                            this.waitForWebhookConfirmation(response.data.booking_id);
                        } else {
                            console.warn('Boleto selecionado mas barcode_url não retornou');
                            this.errorMessage = 'Falha ao gerar Boleto. Tente novamente.';
                        }
                    }
                    // Carteira Mercado Pago
                    else if (response.data.payment_method === 'wallet' || this.selectedMethod === 'mercadopago_wallet') {
                        console.log('💳 Carteira Mercado Pago selecionada');
                        
                        console.log('⏳ Aguardando webhook do Mercado Pago para confirmação...');
                        
                        // Iniciar verificação de confirmação via webhook
                        this.waitForWebhookConfirmation(response.data.booking_id);
                    }
                    // Cartão de Crédito/Débito
                    else if (response.data.payment_method === 'credit_card' || response.data.payment_method === 'debit_card') {
                        console.log('✅ Cartão processado com sucesso');
                        
                        // Se for retry, emitir evento de sucesso
                        if (this.isRetry) {
                            this.$emit('payment-success', {
                                payment_method: response.data.payment_method,
                                booking_id: response.data.booking_id,
                                transaction_id: response.data.transaction_id
                            });
                            return;
                        }
                        
                        // Definir como confirmado (remove o formulário)
                        this.paymentConfirmed = true;
                        this.successMessage = 'Pagamento realizado com sucesso!';
                        
                        // Redirecionar após 2 segundos
                        setTimeout(() => {
                            window.location.href = '/mybookings';
                        }, 2000);
                    }
                    // Fallback para outros casos
                    else {
                        console.log('Método de pagamento:', response.data.payment_method);
                        this.successMessage = response.data.message || 'Pagamento processado com sucesso!';
                        
                        setTimeout(() => {
                            window.location.href = '/mybookings';
                        }, 2000);
                    }
                } else {
                    console.error('❌ Erro na resposta:', response.data);
                    const errorMessage = response.data.message || 'Erro ao processar pagamento';
                    
                    // Se for retry, emitir evento de erro
                    if (this.isRetry) {
                        this.$emit('payment-error', {
                            message: errorMessage,
                            details: response.data
                        });
                        return;
                    }
                    
                    this.errorMessage = errorMessage;
                }
            } catch (error) {
                console.error('❌ Payment error:', error);
                console.error('Resposta de erro:', error.response);
                
                const errorMessage = error.response?.data?.message || 'Erro ao processar pagamento. Tente novamente.';
                
                // Se for retry, emitir evento de erro
                if (this.isRetry) {
                    this.$emit('payment-error', {
                        message: errorMessage,
                        details: error.response?.data
                    });
                    return;
                }
                
                this.errorMessage = errorMessage;
            }
        },

        waitForWebhookConfirmation(bookingId) {
            console.log('🔄 Aguardando confirmação do webhook para booking:', bookingId);
            
            // Verificar a cada 1 segundo se o booking foi marcado como pago (mais rápido)
            let attempts = 0;
            const maxAttempts = 300; // 5 minutos (300 * 1 segundo)
            
            const checkInterval = setInterval(async () => {
                attempts++;
                
                try {
                    // Verificar se o booking foi marcado como pago
                    const response = await axios.get(`/mybookings/api/get_mybookings`);
                    
                    console.log('📊 Resposta da API:', response.data);
                    
                    // Procurar pelo booking na lista
                    // A resposta tem a estrutura: { bookings: { data: [...], ... }, currency: ... }
                    let bookings = [];
                    
                    if (response.data.bookings) {
                        // Se tem propriedade bookings (paginado)
                        bookings = Array.isArray(response.data.bookings.data) ? response.data.bookings.data : [];
                    } else if (Array.isArray(response.data)) {
                        // Se é um array direto
                        bookings = response.data;
                    }
                    
                    console.log('📋 Bookings encontrados:', bookings.length);
                    
                    const booking = bookings.find(b => b.id === bookingId);
                    
                    if (booking) {
                        console.log('🔍 Booking encontrado:', booking);
                        console.log('💰 is_paid:', booking.is_paid, 'Tipo:', typeof booking.is_paid);
                    }
                    
                    // Verificar se o booking foi pago (is_paid pode ser 1, "1", true, etc)
                    if (booking && (booking.is_paid === 1 || booking.is_paid === '1' || booking.is_paid === true)) {
                        console.log('✅ Pagamento confirmado via webhook!');
                        clearInterval(checkInterval);
                        
                        // 🎉 NOVO: Atualizar UI em tempo real
                        this.paymentConfirmed = true;
                        
                        // Limpar estado
                        this.isWaitingPayment = false;
                        this.pixData = '';
                        this.pixQrCode = '';
                        
                        // 🎉 NOVO: Mostrar toast de sucesso
                        this.showSuccessToast('Pagamento recebido e confirmado com sucesso!');
                        
                        // Mostrar mensagem de sucesso
                        this.successMessage = 'Pagamento realizado com sucesso! Redirecionando...';
                        
                        // Redirecionar após 2 segundos
                        setTimeout(() => {
                            window.location.href = '/mybookings';
                        }, 2000);
                    } else if (attempts >= maxAttempts) {
                        console.warn('⏱️ Parando verificação de webhook após 5 minutos');
                        clearInterval(checkInterval);
                        // Não mostrar mensagem de erro - PIX pode ser confirmado a qualquer momento
                        // O usuário pode voltar para Minha Conta para verificar o status
                    }
                } catch (error) {
                    console.error('❌ Erro ao verificar confirmação:', error);
                    console.error('Detalhes do erro:', error.response?.data || error.message);
                    if (attempts >= maxAttempts) {
                        clearInterval(checkInterval);
                    }
                }
            }, 1000); // Verificar a cada 1 segundo (em vez de 2)
        },
        
        // 🎉 NOVO: Mostrar toast de sucesso
        showSuccessToast(message) {
            // Usar Bootstrap Toast se disponível
            if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
                // Criar elemento toast dinamicamente
                const toastHTML = `
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
                        <div class="toast-header bg-success text-white">
                            <i class="fas fa-check-circle me-2"></i>
                            <strong class="me-auto">Sucesso</strong>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body bg-light">
                            ${message}
                        </div>
                    </div>
                `;
                
                const toastContainer = document.createElement('div');
                toastContainer.innerHTML = toastHTML;
                document.body.appendChild(toastContainer);
                
                // Remover após 5 segundos
                setTimeout(() => {
                    toastContainer.remove();
                }, 5000);
            } else {
                // Fallback: usar alert
                console.log('✅ ' + message);
            }
        },

        copyToClipboard() {
            const pixCode = document.getElementById('pixCode');
            if (pixCode) {
                pixCode.select();
                document.execCommand('copy');
                alert('Código PIX copiado para a área de transferência!');
            }
        },

        formatTimeRemaining(expirationTime) {
            const now = new Date();
            const diff = expirationTime - now;
            
            if (diff <= 0) {
                return 'Expirado';
            }
            
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            
            return `${minutes}m ${seconds}s`;
        },

        async generateCardToken() {
            try {
                // Load Mercado Pago SDK if not already loaded
                if (!window.MercadoPago) {
                    console.error('Mercado Pago SDK não carregado');
                    return null;
                }

                // Get public key from settings
                const publicKeyResponse = await axios.get('/api/mercadopago/public-key');
                const publicKey = publicKeyResponse.data.public_key;

                if (!publicKey) {
                    console.error('Public key não configurada');
                    return null;
                }

                // Initialize Mercado Pago
                const mp = new window.MercadoPago(publicKey);

                // Prepare card data - IMPORTANT: cardNumber must be the FULL number without spaces
                // Remove ALL spaces and non-digit characters
                const cardNumber = this.cardData.number.replace(/\D/g, '');
                
                console.log('DEBUG - Card data antes de gerar token:', {
                    cardData_number_raw: this.cardData.number,
                    cardNumber_cleaned: cardNumber,
                    cardNumber_length: cardNumber.length,
                    holderName: this.cardData.holderName,
                    expiry: this.cardData.expiry,
                    cvv: this.cardData.cvv
                });
                
                const cardData = {
                    cardNumber: cardNumber,
                    cardholderName: this.cardData.holderName,
                    cardExpirationMonth: this.cardData.expiry.split('/')[0],
                    cardExpirationYear: '20' + this.cardData.expiry.split('/')[1],
                    securityCode: this.cardData.cvv
                };

                console.log('Gerando token com dados:', {
                    cardNumber: cardNumber,
                    cardNumberLength: cardNumber.length,
                    cardNumberPreview: cardNumber.substring(0, 6) + '****' + cardNumber.slice(-4),
                    cardholderName: cardData.cardholderName,
                    cardExpirationMonth: cardData.cardExpirationMonth,
                    cardExpirationYear: cardData.cardExpirationYear
                });

                // Create token
                const token = await mp.createCardToken(cardData);

                if (token && token.id) {
                    console.log('Token gerado com sucesso:', token.id);
                    console.log('Issuer ID:', token.issuer_id);
                    
                    // Retornar objeto com token e issuer_id
                    return {
                        id: token.id,
                        issuer_id: token.issuer_id
                    };
                } else {
                    console.error('Erro ao gerar token:', token);
                    this.errorMessage = token?.cause?.[0]?.description || 'Erro ao gerar token do cartão';
                    return null;
                }

            } catch (error) {
                console.error('Exceção ao gerar token:', error);
                this.errorMessage = 'Erro ao processar cartão: ' + error.message;
                return null;
            }
        },

        // 👤 Carregar dados do usuário
        loadUserData() {
            try {
                // 1. Verificar se já existe window.currentUser (carregado via Blade)
                if (window.currentUser && typeof window.currentUser === 'object' && window.currentUser.id) {
                    console.log('✅ Dados do usuário já disponíveis via Blade');
                    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
                    return;
                }

                // 2. Tentar obter dados do localStorage
                const storedUser = localStorage.getItem('currentUser');
                if (storedUser) {
                    try {
                        const parsedUser = JSON.parse(storedUser);
                        if (parsedUser && parsedUser.id) {
                            window.currentUser = parsedUser;
                            console.log('✅ Dados do usuário carregados do localStorage');
                            return;
                        }
                    } catch (e) {
                        console.warn('⚠️ Dados corrompidos no localStorage, removendo...');
                        localStorage.removeItem('currentUser');
                    }
                }

                // 3. Se não estiver disponível, tentar da API
                console.log('🔄 Carregando dados do usuário da API...');
                axios.get('/api/user')
                    .then(response => {
                        console.log('📡 Resposta da API /api/user:', response.data);
                        
                        if (response.data && response.data.status && response.data.data) {
                            window.currentUser = response.data.data;
                            localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
                            console.log('✅ Dados do usuário carregados da API');
                            
                            // Forçar re-render dos computed properties
                            this.$forceUpdate();
                        } else {
                            console.warn('⚠️ Resposta da API não contém dados válidos');
                        }
                    })
                    .catch(error => {
                        console.warn('⚠️ Erro ao carregar dados do usuário da API:', error);
                        
                        if (error.response) {
                            console.warn('Status:', error.response.status);
                            console.warn('Data:', error.response.data);
                            
                            if (error.response.status === 401) {
                                console.warn('❌ Usuário não autenticado');
                                window.currentUser = null;
                            }
                        }
                    });
            } catch (error) {
                console.error('❌ Erro ao processar dados do usuário:', error);
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
