<template>
  <div class="mercadopago-admin-settings">
    <!-- Tabs Navigation -->
    <ul class="nav nav-tabs mb-4" id="mpSettingsTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link active" 
          id="settings-tab" 
          data-bs-toggle="tab" 
          data-bs-target="#settings-content" 
          type="button" 
          role="tab"
        >
          <i class="fas fa-cog"></i> Configurações
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link" 
          id="methods-tab" 
          data-bs-toggle="tab" 
          data-bs-target="#methods-content" 
          type="button" 
          role="tab"
        >
          <i class="fas fa-credit-card"></i> Métodos de Pagamento
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link" 
          id="transactions-tab" 
          data-bs-toggle="tab" 
          data-bs-target="#transactions-content" 
          type="button" 
          role="tab"
        >
          <i class="fas fa-exchange-alt"></i> Transações
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link" 
          id="refunds-tab" 
          data-bs-toggle="tab" 
          data-bs-target="#refunds-content" 
          type="button" 
          role="tab"
        >
          <i class="fas fa-undo"></i> Reembolsos
        </button>
      </li>
    </ul>

    <!-- Tabs Content -->
    <div class="tab-content" id="mpSettingsContent">
      <!-- Settings Tab -->
      <div class="tab-pane fade show active" id="settings-content" role="tabpanel">
        <settings-tab ref="settingsTab" @update="onSettingsUpdate" />
      </div>

      <!-- Payment Methods Tab -->
      <div class="tab-pane fade" id="methods-content" role="tabpanel">
        <payment-methods-tab ref="methodsTab" @update="onMethodsUpdate" />
      </div>

      <!-- Transactions Tab -->
      <div class="tab-pane fade" id="transactions-content" role="tabpanel">
        <transactions-tab ref="transactionsTab" />
      </div>

      <!-- Refunds Tab -->
      <div class="tab-pane fade" id="refunds-content" role="tabpanel">
        <refunds-tab ref="refundsTab" />
      </div>
    </div>

    <!-- Alert Messages -->
    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show mt-4" role="alert">
      <i class="fas fa-check-circle"></i> {{ successMessage }}
      <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
    </div>

    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
      <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
      <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import SettingsTab from './SettingsTab.vue'
import PaymentMethodsTab from './PaymentMethodsTab.vue'
import TransactionsTab from './TransactionsTab.vue'
import RefundsTab from './RefundsTab.vue'

export default {
  name: 'AdminSettings',
  components: {
    SettingsTab,
    PaymentMethodsTab,
    TransactionsTab,
    RefundsTab
  },
  data() {
    return {
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    onSettingsUpdate(data) {
      this.successMessage = 'Configurações salvas com sucesso!'
      this.errorMessage = ''
      setTimeout(() => {
        this.successMessage = ''
      }, 5000)
    },
    onMethodsUpdate(data) {
      this.successMessage = 'Métodos de pagamento atualizados com sucesso!'
      this.errorMessage = ''
      setTimeout(() => {
        this.successMessage = ''
      }, 5000)
    }
  }
}
</script>

<style scoped>
.mercadopago-admin-settings {
  padding: 20px 0;
}

.nav-tabs .nav-link {
  color: #6c757d;
  border: none;
  border-bottom: 2px solid transparent;
  font-weight: 500;
}

.nav-tabs .nav-link:hover {
  color: #0d6efd;
  border-bottom-color: #0d6efd;
}

.nav-tabs .nav-link.active {
  color: #0d6efd;
  background-color: transparent;
  border-color: transparent;
  border-bottom-color: #0d6efd;
}

.nav-link i {
  margin-right: 8px;
}
</style>
