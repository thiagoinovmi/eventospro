<template>
  <div>
    <!-- Modal de Termos e Política de Privacidade -->
    <div class="modal fade" id="termsModal" tabindex="-1" role="dialog" aria-labelledby="termsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="termsModalLabel">{{ currentTab === 'privacy' ? 'Política de Privacidade' : 'Termos e Condições' }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" ref="modalBody" @scroll="handleScroll">
            <div v-if="currentTab === 'privacy'" v-html="privacyContent"></div>
            <div v-else v-html="termsContent"></div>
          </div>
          <div class="modal-footer">
            <div class="form-check mr-auto">
              <input 
                type="checkbox" 
                class="form-check-input" 
                :id="`accept_${currentTab}`"
                v-model="acceptedTerms[currentTab]"
              >
              <label class="form-check-label" :for="`accept_${currentTab}`">
                {{ currentTab === 'privacy' ? 'Aceito a Política de Privacidade' : 'Aceito os Termos e Condições' }}
              </label>
            </div>
            <button 
              type="button" 
              class="btn btn-secondary" 
              @click="switchTab"
              :disabled="!acceptedTerms[currentTab]"
            >
              {{ currentTab === 'privacy' ? 'Próximo: Termos e Condições' : 'Voltar: Política de Privacidade' }}
            </button>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="confirmTerms"
              :disabled="!acceptedTerms.privacy || !acceptedTerms.terms || !isScrolledToBottom"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsModal',
  props: {
    privacyPageId: {
      type: Number,
      default: 2
    },
    termsPageId: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      currentTab: 'privacy',
      privacyContent: '',
      termsContent: '',
      acceptedTerms: {
        privacy: false,
        terms: false
      },
      isScrolledToBottom: false,
      loading: true
    };
  },
  mounted() {
    this.fetchPages();
  },
  methods: {
    fetchPages() {
      // Buscar Política de Privacidade
      fetch(`/api/pages/${this.privacyPageId}`)
        .then(response => response.json())
        .then(data => {
          this.privacyContent = data.body || 'Conteúdo não disponível';
        })
        .catch(error => console.error('Erro ao buscar Política de Privacidade:', error));

      // Buscar Termos e Condições
      fetch(`/api/pages/${this.termsPageId}`)
        .then(response => response.json())
        .then(data => {
          this.termsContent = data.body || 'Conteúdo não disponível';
          this.loading = false;
        })
        .catch(error => console.error('Erro ao buscar Termos e Condições:', error));
    },
    handleScroll() {
      const element = this.$refs.modalBody;
      if (element) {
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;
        
        // Verifica se scrollou até o final (com margem de 10px)
        this.isScrolledToBottom = scrollHeight - scrollTop - clientHeight <= 10;
      }
    },
    switchTab() {
      this.currentTab = this.currentTab === 'privacy' ? 'terms' : 'privacy';
      this.isScrolledToBottom = false;
      
      // Reset scroll position
      this.$nextTick(() => {
        if (this.$refs.modalBody) {
          this.$refs.modalBody.scrollTop = 0;
        }
      });
    },
    confirmTerms() {
      if (this.acceptedTerms.privacy && this.acceptedTerms.terms) {
        this.$emit('terms-accepted', {
          privacy_policy_accepted: true,
          terms_conditions_accepted: true,
          privacy_policy_accepted_at: new Date().toISOString(),
          terms_conditions_accepted_at: new Date().toISOString()
        });
        this.closeModal();
      }
    },
    closeModal() {
      // Reseta o modal
      this.currentTab = 'privacy';
      this.acceptedTerms = { privacy: false, terms: false };
      this.isScrolledToBottom = false;
      
      // Fecha o modal usando jQuery
      if (window.$ && window.$('#termsModal').length) {
        window.$('#termsModal').modal('hide');
      }
    },
    show() {
      if (window.$ && window.$('#termsModal').length) {
        window.$('#termsModal').modal('show');
      }
    }
  }
};
</script>

<style scoped>
.modal-body {
  max-height: 500px;
  overflow-y: auto;
}

.modal-body >>> h1,
.modal-body >>> h2,
.modal-body >>> h3 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.modal-body >>> p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.form-check-label {
  margin-left: 0.5rem;
  cursor: pointer;
}
</style>
