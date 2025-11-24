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
                        <div class="alert alert-info" v-if="pixExpiration" :key="timerTrigger">
                            <i class="fas fa-clock me-2"></i>
                            {{ trans('em.pix_expires_in') || 'PIX expira em' }}: 
                            <strong>{{ formatTimeRemaining(pixExpiration) }}</strong>
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
            timerCounter: 0,
            timerInterval: null
        }
    },

    mounted() {
        this.loadPaymentMethods();
        
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
        }
    },

    methods: {
        setSelectedTicket(ticket) {
            console.log('Ticket selecionado no MercadoPagoCheckout:', ticket);
            this.selectedTicket = ticket;
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
            
            // Detect card brand based on first digits
            this.detectCardBrand(value);
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
                    const cardToken = await this.generateCardToken();
                    
                    if (!cardToken) {
                        this.errorMessage = 'Erro ao gerar token do cartão. Verifique os dados e tente novamente.';
                        return;
                    }
                    
                    paymentData.card_token = cardToken;
                    paymentData.installments = this.cardData.installments || 1;
                    paymentData.payment_method_id = this.cardData.paymentMethodId; // Send detected card brand
                    
                    console.log('Card payment data:', {
                        card_token: cardToken,
                        installments: paymentData.installments,
                        payment_method_id: paymentData.payment_method_id
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
                        
                        // Mostrar mensagem de sucesso
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
                    this.errorMessage = response.data.message || 'Erro ao processar pagamento';
                }
            } catch (error) {
                console.error('❌ Payment error:', error);
                console.error('Resposta de erro:', error.response);
                
                const errorMessage = error.response?.data?.message || 'Erro ao processar pagamento. Tente novamente.';
                this.errorMessage = errorMessage;
            }
        },

        waitForWebhookConfirmation(bookingId) {
            console.log('🔄 Aguardando confirmação do webhook para booking:', bookingId);
            
            // Verificar a cada 2 segundos se o booking foi marcado como pago
            let attempts = 0;
            const maxAttempts = 150; // 5 minutos (150 * 2 segundos)
            
            const checkInterval = setInterval(async () => {
                attempts++;
                
                try {
                    // Verificar se o booking foi marcado como pago
                    const response = await axios.get(`/mybookings/api/get_mybookings`);
                    
                    // Procurar pelo booking na lista (response.data pode ser um array ou ter propriedade data)
                    const bookings = Array.isArray(response.data) ? response.data : (response.data.data || []);
                    const booking = bookings.find(b => b.id === bookingId);
                    
                    if (booking && booking.is_paid === 1) {
                        console.log('✅ Pagamento confirmado via webhook!');
                        clearInterval(checkInterval);
                        
                        // Limpar estado
                        this.isWaitingPayment = false;
                        this.pixData = '';
                        this.pixQrCode = '';
                        
                        // Mostrar mensagem de sucesso
                        this.successMessage = 'Pagamento realizado com sucesso!';
                        
                        // Redirecionar após 2 segundos
                        setTimeout(() => {
                            window.location.href = '/mybookings';
                        }, 2000);
                    } else if (attempts >= maxAttempts) {
                        console.warn('⏱️ Timeout aguardando confirmação do webhook');
                        clearInterval(checkInterval);
                        this.errorMessage = 'Timeout aguardando confirmação. Por favor, verifique seu pagamento em Minha Conta.';
                    }
                } catch (error) {
                    console.error('Erro ao verificar confirmação:', error);
                    if (attempts >= maxAttempts) {
                        clearInterval(checkInterval);
                    }
                }
            }, 2000);
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
                    return token.id;
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
