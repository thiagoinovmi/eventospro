<template>
  <div class="settings-tab">
    <div class="row">
      <div class="col-md-8">
        <form @submit.prevent="saveSettings">
          <!-- Access Token -->
          <div class="mb-3">
            <label for="accessToken" class="form-label">
              <strong>Access Token</strong>
              <span class="text-danger">*</span>
            </label>
            <input 
              type="password" 
              class="form-control" 
              id="accessToken" 
              v-model="form.access_token"
              placeholder="Seu Access Token do Mercado Pago"
              required
            >
            <small class="form-text text-muted">
              Encontre em: Configurações → Credenciais → Access Token
            </small>
          </div>

          <!-- Public Key -->
          <div class="mb-3">
            <label for="publicKey" class="form-label">
              <strong>Public Key</strong>
              <span class="text-danger">*</span>
            </label>
            <input 
              type="text" 
              class="form-control" 
              id="publicKey" 
              v-model="form.public_key"
              placeholder="Sua Public Key do Mercado Pago"
              required
            >
            <small class="form-text text-muted">
              Encontre em: Configurações → Credenciais → Public Key
            </small>
          </div>

          <!-- Mode -->
          <div class="mb-3">
            <label for="mode" class="form-label">
              <strong>Modo de Operação</strong>
              <span class="text-danger">*</span>
            </label>
            <select class="form-select" id="mode" v-model="form.mode" required>
              <option value="test">Teste (Sandbox)</option>
              <option value="production">Produção</option>
            </select>
            <small class="form-text text-muted">
              Use "Teste" para desenvolver e testar. Use "Produção" apenas em ambiente de produção.
            </small>
          </div>

          <!-- Webhook URL -->
          <div class="mb-3">
            <label for="webhookUrl" class="form-label">
              <strong>URL do Webhook</strong>
            </label>
            <input 
              type="text" 
              class="form-control" 
              id="webhookUrl" 
              :value="webhookUrl"
              readonly
            >
            <small class="form-text text-muted">
              Configure esta URL no painel do Mercado Pago
            </small>
          </div>

          <!-- Webhook Token -->
          <div class="mb-3">
            <label for="webhookToken" class="form-label">
              <strong>Token do Webhook</strong>
            </label>
            <input 
              type="password" 
              class="form-control" 
              id="webhookToken" 
              v-model="form.webhook_token"
              placeholder="Token para validar webhooks"
            >
            <small class="form-text text-muted">
              Usado para validar a autenticidade dos webhooks
            </small>
          </div>

          <!-- Enabled -->
          <div class="mb-3">
            <div class="form-check">
              <input 
                type="checkbox" 
                class="form-check-input" 
                id="enabled" 
                v-model="form.enabled"
              >
              <label class="form-check-label" for="enabled">
                <strong>Habilitar Mercado Pago</strong>
              </label>
            </div>
            <small class="form-text text-muted">
              Desabilite para desativar temporariamente o Mercado Pago
            </small>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              <i class="fas fa-save"></i> Salvar Configurações
            </button>
            <button type="button" class="btn btn-info" @click="testConnection" :disabled="loading">
              <i class="fas fa-plug"></i> Testar Conexão
            </button>
          </div>
        </form>
      </div>

      <!-- Info Panel -->
      <div class="col-md-4">
        <div class="card bg-light">
          <div class="card-header bg-info text-white">
            <h6 class="mb-0"><i class="fas fa-info-circle"></i> Informações</h6>
          </div>
          <div class="card-body">
            <p><strong>Status:</strong></p>
            <p>
              <span v-if="form.enabled" class="badge bg-success">Habilitado</span>
              <span v-else class="badge bg-danger">Desabilitado</span>
            </p>

            <p class="mt-3"><strong>Modo:</strong></p>
            <p>
              <span v-if="form.mode === 'test'" class="badge bg-warning">Teste (Sandbox)</span>
              <span v-else class="badge bg-danger">Produção</span>
            </p>

            <p class="mt-3"><strong>Última Atualização:</strong></p>
            <p>{{ lastUpdate || 'Nunca' }}</p>

            <hr>

            <p class="small text-muted">
              <i class="fas fa-lightbulb"></i> 
              Dica: Sempre teste suas configurações antes de usar em produção.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsTab',
  data() {
    return {
      form: {
        access_token: '',
        public_key: '',
        mode: 'test',
        webhook_token: '',
        enabled: true
      },
      loading: false,
      lastUpdate: null,
      webhookUrl: window.location.origin + '/webhooks/mercadopago'
    }
  },
  mounted() {
    this.loadSettings()
  },
  methods: {
    loadSettings() {
      this.loading = true
      axios.get('/dashboard/mercadopago/api/settings')
        .then(response => {
          if (response.data.status) {
            this.form = response.data.data
            this.lastUpdate = new Date(response.data.data.updated_at).toLocaleString('pt-BR')
          }
        })
        .catch(error => {
          this.$emit('error', 'Erro ao carregar configurações')
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    saveSettings() {
      this.loading = true
      axios.post('/dashboard/mercadopago/api/settings', this.form)
        .then(response => {
          if (response.data.status) {
            this.$emit('update', response.data.data)
            this.lastUpdate = new Date().toLocaleString('pt-BR')
          }
        })
        .catch(error => {
          this.$emit('error', error.response?.data?.message || 'Erro ao salvar configurações')
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    testConnection() {
      this.loading = true
      axios.post('/dashboard/mercadopago/api/test-connection', this.form)
        .then(response => {
          if (response.data.status) {
            this.$emit('success', 'Conexão com Mercado Pago estabelecida com sucesso!')
          } else {
            this.$emit('error', response.data.message || 'Erro ao testar conexão')
          }
        })
        .catch(error => {
          this.$emit('error', error.response?.data?.message || 'Erro ao testar conexão')
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.settings-tab {
  padding: 20px 0;
}

.form-label {
  margin-bottom: 8px;
  color: #333;
}

.text-danger {
  color: #dc3545;
  margin-left: 4px;
}

.card {
  border: 1px solid #dee2e6;
}

.card-header {
  border-bottom: 1px solid #dee2e6;
}

.badge {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
}

.btn {
  font-weight: 500;
}

.btn i {
  margin-right: 8px;
}
</style>
