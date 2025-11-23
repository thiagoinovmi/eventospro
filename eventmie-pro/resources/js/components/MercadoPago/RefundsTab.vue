<template>
  <div class="refunds-tab">
    <div class="alert alert-info mb-4">
      <i class="fas fa-info-circle"></i>
      Gerencie todos os reembolsos solicitados pelos clientes.
    </div>

    <!-- Filters -->
    <div class="row mb-4">
      <div class="col-md-3">
        <select class="form-select form-select-sm" v-model="filters.status">
          <option value="">Todos os Status</option>
          <option value="pending">Pendente</option>
          <option value="approved">Aprovado</option>
          <option value="rejected">Rejeitado</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>
      <div class="col-md-3">
        <input type="date" class="form-control form-control-sm" v-model="filters.date_from" placeholder="Data Inicial">
      </div>
      <div class="col-md-3">
        <input type="date" class="form-control form-control-sm" v-model="filters.date_to" placeholder="Data Final">
      </div>
      <div class="col-md-3">
        <input 
          type="text" 
          class="form-control form-control-sm" 
          v-model="filters.search"
          placeholder="Buscar..."
        >
      </div>
    </div>

    <!-- Refunds Table -->
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>ID Reembolso</th>
                <th>Transação</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Motivo</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="refund in refunds" :key="refund.id">
                <td><small>#{{ refund.id }}</small></td>
                <td><small>#{{ refund.transaction_id }}</small></td>
                <td>{{ refund.transaction?.payer_name || '-' }}</td>
                <td><strong>R$ {{ formatCurrency(refund.amount) }}</strong></td>
                <td>
                  <small>{{ refund.reason }}</small>
                </td>
                <td>
                  <span :class="getStatusBadge(refund.status)">
                    {{ refund.status }}
                  </span>
                </td>
                <td><small>{{ formatDate(refund.created_at) }}</small></td>
                <td>
                  <button class="btn btn-sm btn-outline-primary" @click="viewDetails(refund)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button 
                    v-if="refund.status === 'pending'"
                    class="btn btn-sm btn-outline-danger" 
                    @click="cancelRefund(refund)"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && refunds.length === 0" class="alert alert-info text-center">
      <i class="fas fa-info-circle"></i> Nenhum reembolso encontrado
    </div>

    <!-- Details Modal -->
    <div class="modal fade" id="refundModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-undo"></i> Detalhes do Reembolso
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="selectedRefund">
            <div class="mb-3">
              <label class="form-label"><strong>ID do Reembolso</strong></label>
              <p>#{{ selectedRefund.id }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>ID da Transação</strong></label>
              <p>#{{ selectedRefund.transaction_id }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>Cliente</strong></label>
              <p>{{ selectedRefund.transaction?.payer_name || '-' }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>Valor</strong></label>
              <p><strong>R$ {{ formatCurrency(selectedRefund.amount) }}</strong></p>
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>Motivo</strong></label>
              <p>{{ selectedRefund.reason }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>Status</strong></label>
              <p>
                <span :class="getStatusBadge(selectedRefund.status)">
                  {{ selectedRefund.status }}
                </span>
              </p>
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>Data da Solicitação</strong></label>
              <p>{{ formatDate(selectedRefund.created_at) }}</p>
            </div>

            <div v-if="selectedRefund.notes" class="mb-3">
              <label class="form-label"><strong>Observações</strong></label>
              <p>{{ selectedRefund.notes }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RefundsTab',
  data() {
    return {
      refunds: [],
      selectedRefund: null,
      filters: {
        status: '',
        date_from: '',
        date_to: '',
        search: ''
      },
      loading: false,
      modal: null
    }
  },
  mounted() {
    this.loadRefunds()
    const modalElement = document.getElementById('refundModal')
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement)
    }
  },
  watch: {
    filters: {
      handler() {
        this.loadRefunds()
      },
      deep: true
    }
  },
  methods: {
    loadRefunds() {
      this.loading = true
      axios.get('/admin/mercadopago/api/refunds', { params: this.filters })
        .then(response => {
          if (response.data.status) {
            this.refunds = response.data.data.data || response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    viewDetails(refund) {
      this.selectedRefund = refund
      this.modal.show()
    },
    cancelRefund(refund) {
      if (confirm('Tem certeza que deseja cancelar este reembolso?')) {
        axios.post(`/admin/mercadopago/api/refunds/${refund.id}/cancel`)
          .then(response => {
            if (response.data.status) {
              this.loadRefunds()
            }
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    formatCurrency(value) {
      return parseFloat(value || 0).toFixed(2).replace('.', ',')
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('pt-BR')
    },
    getStatusBadge(status) {
      const badges = {
        'pending': 'badge bg-warning',
        'approved': 'badge bg-success',
        'rejected': 'badge bg-danger',
        'cancelled': 'badge bg-secondary'
      }
      return badges[status] || 'badge bg-secondary'
    }
  }
}
</script>

<style scoped>
.refunds-tab {
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

.badge {
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 500;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
  margin-right: 4px;
}

.alert {
  border-radius: 8px;
}

.alert i {
  margin-right: 8px;
}
</style>
