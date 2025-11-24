<template>
  <div class="payment-methods-tab">
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="alert alert-info">
          <i class="fas fa-info-circle"></i>
          Configure aqui os métodos de pagamento que estarão disponíveis globalmente na plataforma.
          Cada evento pode ter suas próprias configurações.
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>Método de Pagamento</th>
                <th>Habilitado</th>
                <th>Parcelamento</th>
                <th>Máx. Parcelas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="method in methods" :key="method.id">
                <td>
                  <div class="d-flex align-items-center">
                    <i :class="getMethodIcon(method.type)" class="me-2"></i>
                    <strong>{{ method.name }}</strong>
                  </div>
                </td>
                <td>
                  <div class="form-check form-switch">
                    <input 
                      type="checkbox" 
                      class="form-check-input" 
                      :id="`enabled_${method.id}`"
                      v-model="method.enabled"
                      @change="updateMethod(method)"
                    >
                  </div>
                </td>
                <td>
                  <div class="form-check form-switch">
                    <input 
                      type="checkbox" 
                      class="form-check-input" 
                      :id="`installments_${method.id}`"
                      v-model="method.installments_enabled"
                      @change="updateMethod(method)"
                      :disabled="!method.enabled"
                    >
                  </div>
                </td>
                <td>
                  <input 
                    type="number" 
                    class="form-control form-control-sm" 
                    v-model.number="method.max_installments"
                    min="1"
                    max="12"
                    @change="updateMethod(method)"
                    :disabled="!method.installments_enabled || !method.enabled"
                    style="width: 80px;"
                  >
                </td>
                <td>
                  <button 
                    type="button" 
                    class="btn btn-sm btn-outline-primary"
                    @click="editMethod(method)"
                  >
                    <i class="fas fa-edit"></i> Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="row mt-4">
      <div class="col-md-12">
        <button 
          type="button" 
          class="btn btn-primary"
          @click="saveAllMethods"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          <i class="fas fa-save"></i> Salvar Todas as Configurações
        </button>
      </div>
    </div>

    <!-- Method Details Modal -->
    <div class="modal fade" id="methodModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i :class="getMethodIcon(selectedMethod?.type)" class="me-2"></i>
              {{ selectedMethod?.name }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="selectedMethod">
            <div class="mb-3">
              <label class="form-label"><strong>Descrição</strong></label>
              <p>{{ selectedMethod.description }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>Habilitado</strong></label>
              <div class="form-check form-switch">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  v-model="selectedMethod.enabled"
                >
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>Permitir Parcelamento</strong></label>
              <div class="form-check form-switch">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  v-model="selectedMethod.installments_enabled"
                  :disabled="!selectedMethod.enabled"
                >
              </div>
            </div>

            <div class="mb-3" v-if="selectedMethod.installments_enabled">
              <label for="maxInstallments" class="form-label">
                <strong>Máximo de Parcelas</strong>
              </label>
              <input 
                type="number" 
                class="form-control" 
                id="maxInstallments"
                v-model.number="selectedMethod.max_installments"
                min="1"
                max="12"
              >
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>Valor Mínimo</strong></label>
              <p>R$ {{ selectedMethod.min_amount?.toFixed(2) || '0.00' }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>Valor Máximo</strong></label>
              <p>R$ {{ selectedMethod.max_amount?.toFixed(2) || 'Ilimitado' }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button 
              type="button" 
              class="btn btn-primary"
              @click="saveSelectedMethod"
              :disabled="loading"
            >
              <i class="fas fa-save"></i> Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentMethodsTab',
  data() {
    return {
      methods: [],
      selectedMethod: null,
      loading: false,
      modal: null
    }
  },
  mounted() {
    this.loadMethods()
    // Initialize Bootstrap modal
    const modalElement = document.getElementById('methodModal')
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement)
    }
  },
  methods: {
    loadMethods() {
      this.loading = true
      axios.get('/api/mercadopago/payment-methods/')
        .then(response => {
          if (response.data.status) {
            this.methods = response.data.data
          }
        })
        .catch(error => {
          this.$emit('error', 'Erro ao carregar métodos de pagamento')
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateMethod(method) {
      this.loading = true
      // Use the correct route with cache busting
      const timestamp = new Date().getTime()
      axios.put(`/api/mercadopago/payment-methods/${method.id}?t=${timestamp}`, {
        enabled: method.enabled,
        installments_enabled: method.installments_enabled,
        max_installments: method.max_installments
      }, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
        .then(response => {
          if (response.data.status) {
            this.$emit('update', response.data.data)
          }
        })
        .catch(error => {
          this.$emit('error', 'Erro ao atualizar método')
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    editMethod(method) {
      this.selectedMethod = { ...method }
      this.modal.show()
    },
    saveSelectedMethod() {
      this.updateMethod(this.selectedMethod)
      this.modal.hide()
    },
    saveAllMethods() {
      this.loading = true
      const timestamp = new Date().getTime()
      const promises = this.methods.map(method => 
        axios.put(`/api/mercadopago/payment-methods/${method.id}?t=${timestamp}`, {
          enabled: method.enabled,
          installments_enabled: method.installments_enabled,
          max_installments: method.max_installments
        }, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
      )
      
      Promise.all(promises)
        .then(() => {
          this.$emit('update', this.methods)
        })
        .catch(error => {
          this.$emit('error', 'Erro ao salvar métodos')
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
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
    }
  }
}
</script>

<style scoped>
.payment-methods-tab {
  padding: 20px 0;
}

.table {
  margin-bottom: 0;
}

.table thead {
  background-color: #f8f9fa;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

.form-check-input {
  cursor: pointer;
}

.form-control-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.alert {
  border-radius: 8px;
}

.alert i {
  margin-right: 8px;
}
</style>
