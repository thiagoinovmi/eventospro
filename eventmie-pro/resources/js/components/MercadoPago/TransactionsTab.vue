<template>
  <div class="transactions-tab">
    <!-- Statistics Cards -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h6 class="card-title text-muted">Total de Transações</h6>
            <h3 class="text-primary">{{ stats.total_transactions }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h6 class="card-title text-muted">Total Aprovado</h6>
            <h3 class="text-success">R$ {{ formatCurrency(stats.total_approved) }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h6 class="card-title text-muted">Total Reembolsado</h6>
            <h3 class="text-warning">R$ {{ formatCurrency(stats.total_refunded) }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h6 class="card-title text-muted">Reembolsos Pendentes</h6>
            <h3 class="text-danger">{{ stats.pending_refunds }}</h3>
          </div>
        </div>
      </div>
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
        <select class="form-select form-select-sm" v-model="filters.payment_method">
          <option value="">Todos os Métodos</option>
          <option value="credit_card">Cartão de Crédito</option>
          <option value="debit_card">Cartão de Débito</option>
          <option value="boleto">Boleto</option>
          <option value="pix">PIX</option>
          <option value="wallet">Carteira</option>
        </select>
      </div>
      <div class="col-md-3">
        <input type="date" class="form-control form-control-sm" v-model="filters.date_from" placeholder="Data Inicial">
      </div>
      <div class="col-md-3">
        <input type="date" class="form-control form-control-sm" v-model="filters.date_to" placeholder="Data Final">
      </div>
    </div>

    <!-- Search -->
    <div class="row mb-4">
      <div class="col-md-12">
        <input 
          type="text" 
          class="form-control" 
          v-model="filters.search"
          placeholder="Buscar por ID, Email ou Nome..."
        >
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Evento</th>
                <th>Valor</th>
                <th>Método</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction.id">
                <td><small>#{{ transaction.id }}</small></td>
                <td>{{ transaction.payer_name }}</td>
                <td>{{ transaction.event?.title || '-' }}</td>
                <td><strong>R$ {{ formatCurrency(transaction.amount) }}</strong></td>
                <td>
                  <span class="badge bg-info">{{ transaction.payment_method_type }}</span>
                </td>
                <td>
                  <span :class="getStatusBadge(transaction.status)">
                    {{ transaction.status }}
                  </span>
                </td>
                <td><small>{{ formatDate(transaction.created_at) }}</small></td>
                <td>
                  <button class="btn btn-sm btn-outline-primary" @click="viewDetails(transaction)">
                    <i class="fas fa-eye"></i>
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
    <div v-if="!loading && transactions.length === 0" class="alert alert-info text-center">
      <i class="fas fa-info-circle"></i> Nenhuma transação encontrada
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionsTab',
  data() {
    return {
      transactions: [],
      stats: {
        total_transactions: 0,
        total_approved: 0,
        total_refunded: 0,
        pending_refunds: 0
      },
      filters: {
        status: '',
        payment_method: '',
        date_from: '',
        date_to: '',
        search: ''
      },
      loading: false
    }
  },
  mounted() {
    this.loadTransactions()
    this.loadStats()
  },
  watch: {
    filters: {
      handler() {
        this.loadTransactions()
      },
      deep: true
    }
  },
  methods: {
    loadTransactions() {
      this.loading = true
      axios.get('/admin/mercadopago/api/transactions', { params: this.filters })
        .then(response => {
          if (response.data.status) {
            this.transactions = response.data.data.data || response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    loadStats() {
      axios.get('/admin/mercadopago/api/stats')
        .then(response => {
          if (response.data.status) {
            this.stats = response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    viewDetails(transaction) {
      console.log('View details:', transaction)
      // Implement modal or detail view
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
.transactions-tab {
  padding: 20px 0;
}

.card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 10px;
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
}
</style>
