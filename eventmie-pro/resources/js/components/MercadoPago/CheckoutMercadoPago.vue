<template>
  <div class="mercadopago-checkout">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Processando...</span>
      </div>
      <p class="mt-3">{{ loadingMessage }}</p>
    </div>

    <!-- Checkout Form -->
    <div v-else class="checkout-container">
      <!-- Order Summary -->
      <div class="card mb-4 bg-light">
        <div class="card-body">
          <h6 class="card-title mb-3">
            <i class="fas fa-receipt"></i> Resumo do Pedido
          </h6>
          <div class="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>R$ {{ formatCurrency(orderData.subtotal) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Taxas:</span>
            <span>R$ {{ formatCurrency(orderData.taxes) }}</span>
          </div>
          <hr>
          <div class="d-flex justify-content-between">
            <strong>Total:</strong>
            <strong class="text-primary">R$ {{ formatCurrency(orderData.total) }}</strong>
          </div>
        </div>
      </div>

      <!-- Payment Method Selection -->
      <div class="mb-4">
        <label class="form-label"><strong>Método de Pagamento</strong></label>
        <div class="payment-methods">
          <div 
            v-for="method in availableMethods" 
            :key="method.id"
            class="form-check mb-3 p-3 border rounded"
            :class="{ 'border-primary bg-light': selectedMethod === method.id }"
          >
            <input 
              type="radio" 
              class="form-check-input" 
              :id="`method_${method.id}`"
              v-model="selectedMethod"
              :value="method.id"
              @change="onMethodChange"
            >
            <label class="form-check-label" :for="`method_${method.id}`">
              <i :class="getMethodIcon(method.type)" class="me-2"></i>
              <strong>{{ method.name }}</strong>
              <small class="text-muted d-block">{{ method.description }}</small>
            </label>
          </div>
        </div>
      </div>

      <!-- Cardholder Information -->
      <div class="mb-4" v-if="showCardholderInfo">
        <h6 class="mb-3">
          <i class="fas fa-user"></i> Dados do Titular
        </h6>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cardholderName" class="form-label">Nome Completo</label>
            <input 
              type="text" 
              class="form-control" 
              id="cardholderName"
              v-model="formData.cardholderName"
              placeholder="Nome do titular"
              required
            >
            <small class="text-danger" v-if="errors.cardholderName">{{ errors.cardholderName }}</small>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cardholderEmail" class="form-label">Email</label>
            <input 
              type="email" 
              class="form-control" 
              id="cardholderEmail"
              v-model="formData.cardholderEmail"
              placeholder="seu@email.com"
              required
            >
            <small class="text-danger" v-if="errors.cardholderEmail">{{ errors.cardholderEmail }}</small>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cardholderDocument" class="form-label">CPF/CNPJ</label>
            <input 
              type="text" 
              class="form-control" 
              id="cardholderDocument"
              v-model="formData.cardholderDocument"
              placeholder="000.000.000-00"
              @input="maskDocument"
              required
            >
            <small class="text-danger" v-if="errors.cardholderDocument">{{ errors.cardholderDocument }}</small>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cardholderPhone" class="form-label">Telefone</label>
            <input 
              type="tel" 
              class="form-control" 
              id="cardholderPhone"
              v-model="formData.cardholderPhone"
              placeholder="(11) 99999-9999"
              @input="maskPhone"
              required
            >
            <small class="text-danger" v-if="errors.cardholderPhone">{{ errors.cardholderPhone }}</small>
          </div>
        </div>
      </div>

      <!-- Card Form (for credit/debit card) -->
      <div class="mb-4" v-if="showCardForm">
        <h6 class="mb-3">
          <i class="fas fa-credit-card"></i> Dados do Cartão
        </h6>
        <div id="form-checkout" class="mb-3"></div>
        <small class="text-muted">
          <i class="fas fa-lock"></i> Seus dados estão seguros. Utilizamos criptografia SSL.
        </small>
      </div>

      <!-- Installments (for credit card) -->
      <div class="mb-4" v-if="showInstallments && selectedMethod === 'credit_card'">
        <label for="installments" class="form-label"><strong>Parcelamento</strong></label>
        <select class="form-select" id="installments" v-model="formData.installments">
          <option value="1">À vista - R$ {{ formatCurrency(orderData.total) }}</option>
          <option 
            v-for="i in maxInstallments" 
            :key="i"
            :value="i"
            v-if="i > 1"
          >
            {{ i }}x de R$ {{ formatCurrency(orderData.total / i) }}
          </option>
        </select>
      </div>

      <!-- Save Card Checkbox -->
      <div class="mb-4" v-if="showCardForm">
        <div class="form-check">
          <input 
            type="checkbox" 
            class="form-check-input" 
            id="saveCard"
            v-model="formData.saveCard"
          >
          <label class="form-check-label" for="saveCard">
            Salvar este cartão para próximas compras
          </label>
        </div>
      </div>

      <!-- Terms and Conditions -->
      <div class="mb-4">
        <div class="form-check">
          <input 
            type="checkbox" 
            class="form-check-input" 
            id="terms"
            v-model="formData.acceptTerms"
            required
          >
          <label class="form-check-label" for="terms">
            Aceito os <a href="#" target="_blank">termos e condições</a>
          </label>
        </div>
        <small class="text-danger" v-if="errors.acceptTerms">{{ errors.acceptTerms }}</small>
      </div>

      <!-- Action Buttons -->
      <div class="d-grid gap-2">
        <button 
          type="button" 
          class="btn btn-primary btn-lg"
          @click="processPayment"
          :disabled="loading || !formData.acceptTerms"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          <i class="fas fa-lock"></i> Pagar Agora
        </button>
        <button 
          type="button" 
          class="btn btn-outline-secondary"
          @click="cancel"
          :disabled="loading"
        >
          Cancelar
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
        <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
        <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="alert alert-success alert-dismissible fade show mt-4" role="alert">
        <i class="fas fa-check-circle"></i> {{ successMessage }}
        <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutMercadoPago',
  props: {
    bookingData: {
      type: Object,
      required: true
    },
    eventId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: false,
      loadingMessage: 'Carregando...',
      selectedMethod: 'credit_card',
      showCardForm: false,
      showCardholderInfo: false,
      showInstallments: false,
      maxInstallments: 12,
      availableMethods: [],
      formData: {
        cardholderName: '',
        cardholderEmail: '',
        cardholderDocument: '',
        cardholderPhone: '',
        installments: 1,
        saveCard: false,
        acceptTerms: false
      },
      orderData: {
        subtotal: 0,
        taxes: 0,
        total: 0
      },
      errors: {},
      errorMessage: '',
      successMessage: '',
      mp: null,
      cardform: null
    }
  },
  mounted() {
    this.initializeCheckout()
  },
  methods: {
    initializeCheckout() {
      console.log('=== INICIANDO CHECKOUT ===')
      console.log('Event ID:', this.eventId)
      console.log('Booking Data:', this.bookingData)
      
      this.loading = true
      this.loadingMessage = 'Carregando métodos de pagamento...'
      
      // Load payment methods for this event with cache busting
      const timestamp = new Date().getTime()
      const url = `/api/mercadopago/payment-methods/event/${this.eventId}?t=${timestamp}`
      console.log('Chamando API:', url)
      
      axios.get(url, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
        .then(response => {
          console.log('Resposta da API:', response.data)
          if (response.data.status) {
            this.availableMethods = response.data.data
            console.log('Métodos carregados:', this.availableMethods.length)
            console.log('Métodos:', this.availableMethods)
            
            // Set order data from booking
            this.orderData = {
              subtotal: this.bookingData.subtotal || 0,
              taxes: this.bookingData.taxes || 0,
              total: this.bookingData.total || 0
            }
            
            // Initialize Mercado Pago SDK
            this.initializeMercadoPago()
          } else {
            console.error('Erro na resposta:', response.data.message)
            this.errorMessage = response.data.message || 'Erro ao carregar métodos'
          }
        })
        .catch(error => {
          console.error('Erro na requisição:', error)
          this.errorMessage = 'Erro ao carregar métodos de pagamento: ' + error.message
        })
        .finally(() => {
          this.loading = false
        })
    },
    initializeMercadoPago() {
      // Get public key from settings
      axios.get('/admin/settings')
        .then(response => {
          const publicKey = response.data.public_key || window.MERCADOPAGO_PUBLIC_KEY
          
          if (publicKey) {
            this.mp = new MercadoPago(publicKey, {
              locale: 'pt-BR'
            })
            
            // Initialize card form if needed
            if (this.selectedMethod === 'credit_card' || this.selectedMethod === 'debit_card') {
              this.initializeCardForm()
            }
          }
        })
        .catch(error => {
          console.error('Error loading settings:', error)
        })
    },
    initializeCardForm() {
      if (!this.mp) return
      
      this.cardform = this.mp.cardform({
        amount: this.orderData.total.toString(),
        iframe: true,
        form: {
          id: 'form-checkout',
          cardNumber: {
            id: 'cardNumber',
            placeholder: 'Número do cartão'
          },
          expirationDate: {
            id: 'expirationDate',
            placeholder: 'MM/YY'
          },
          securityCode: {
            id: 'securityCode',
            placeholder: 'CVV'
          },
          cardholderName: {
            id: 'cardholderName',
            placeholder: 'Nome do titular'
          }
        },
        callbacks: {
          onFormMounted: error => {
            if (error) console.warn('Form Mounted error:', error)
          },
          onSubmit: event => {
            event.preventDefault()
            this.processPayment()
          },
          onFetching: resource => {
            return { headers: {} }
          }
        }
      })
    },
    onMethodChange() {
      this.showCardholderInfo = true
      this.showCardForm = this.selectedMethod === 'credit_card' || this.selectedMethod === 'debit_card'
      this.showInstallments = this.selectedMethod === 'credit_card'
      
      if (this.showCardForm && this.mp) {
        this.$nextTick(() => {
          this.initializeCardForm()
        })
      }
    },
    processPayment() {
      // Validate form
      if (!this.validateForm()) {
        return
      }
      
      this.loading = true
      this.loadingMessage = 'Processando pagamento...'
      
      // Create payment token
      if (this.selectedMethod === 'credit_card' || this.selectedMethod === 'debit_card') {
        this.cardform.createCardToken().then(token => {
          this.submitPayment(token)
        }).catch(error => {
          this.errorMessage = 'Erro ao processar cartão: ' + error.message
          this.loading = false
        })
      } else {
        this.submitPayment(null)
      }
    },
    submitPayment(token) {
      const paymentData = {
        booking_id: this.bookingData.id,
        payment_method_id: this.selectedMethod,
        installments: parseInt(this.formData.installments),
        payer_email: this.formData.cardholderEmail,
        payer_document: this.formData.cardholderDocument,
        payer_name: this.formData.cardholderName,
        payer_phone: this.formData.cardholderPhone,
        token: token
      }
      
      axios.post('/api/mercadopago/checkout', paymentData)
        .then(response => {
          if (response.data.status) {
            this.successMessage = 'Pagamento processado com sucesso!'
            this.$emit('payment-success', response.data)
            
            // Redirect after 2 seconds
            setTimeout(() => {
              window.location.href = '/mercadopago/transactions'
            }, 2000)
          } else {
            this.errorMessage = response.data.message || 'Erro ao processar pagamento'
          }
        })
        .catch(error => {
          this.errorMessage = error.response?.data?.message || 'Erro ao processar pagamento'
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    validateForm() {
      this.errors = {}
      
      if (!this.formData.cardholderName) {
        this.errors.cardholderName = 'Nome é obrigatório'
      }
      
      if (!this.formData.cardholderEmail) {
        this.errors.cardholderEmail = 'Email é obrigatório'
      } else if (!this.isValidEmail(this.formData.cardholderEmail)) {
        this.errors.cardholderEmail = 'Email inválido'
      }
      
      if (!this.formData.cardholderDocument) {
        this.errors.cardholderDocument = 'CPF/CNPJ é obrigatório'
      }
      
      if (!this.formData.cardholderPhone) {
        this.errors.cardholderPhone = 'Telefone é obrigatório'
      }
      
      if (!this.formData.acceptTerms) {
        this.errors.acceptTerms = 'Você deve aceitar os termos'
      }
      
      return Object.keys(this.errors).length === 0
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    },
    maskDocument(event) {
      let value = event.target.value.replace(/\D/g, '')
      
      if (value.length <= 11) {
        // CPF: 000.000.000-00
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      } else {
        // CNPJ: 00.000.000/0000-00
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
      }
      
      this.formData.cardholderDocument = value
    },
    maskPhone(event) {
      let value = event.target.value.replace(/\D/g, '')
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      this.formData.cardholderPhone = value
    },
    formatCurrency(value) {
      return parseFloat(value || 0).toFixed(2).replace('.', ',')
    },
    getMethodIcon(type) {
      const icons = {
        'credit_card': 'fas fa-credit-card',
        'debit_card': 'fas fa-credit-card',
        'boleto': 'fas fa-barcode',
        'pix': 'fas fa-qrcode',
        'wallet': 'fas fa-wallet'
      }
      return icons[type] || 'fas fa-credit-card'
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.mercadopago-checkout {
  padding: 20px 0;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-check {
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-check:hover {
  background-color: #f8f9fa;
}

.form-check.border-primary {
  border-color: #0d6efd !important;
  background-color: #f0f7ff;
}

.form-check-input {
  cursor: pointer;
}

.form-check-label {
  cursor: pointer;
  margin-bottom: 0;
}

#form-checkout {
  min-height: 200px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 10px;
}

.btn-lg {
  padding: 12px 24px;
  font-weight: 500;
}

.alert {
  border-radius: 8px;
}

.alert i {
  margin-right: 8px;
}

.card {
  border-radius: 8px;
}

.card-body {
  padding: 20px;
}

small.text-muted {
  display: block;
  margin-top: 5px;
}
</style>
