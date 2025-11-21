import Vue from 'vue';
import TermsModal from './components/TermsModal.vue';

console.log('Register app loading...');

// Inicializar o app Vue para o modal de termos
const registerApp = new Vue({
  el: '#register-app',
  components: {
    TermsModal
  },
  data() {
    return {
      termsAccepted: false,
      privacyAccepted: false,
      termsAcceptedAt: null,
      privacyAcceptedAt: null
    };
  },
  methods: {
    handleTermsAccepted(data) {
      console.log('Terms accepted:', data);
      this.privacyAccepted = data.privacy_policy_accepted;
      this.termsAccepted = data.terms_conditions_accepted;
      this.privacyAcceptedAt = data.privacy_policy_accepted_at;
      this.termsAcceptedAt = data.terms_conditions_accepted_at;
      
      // Atualizar campos hidden
      document.getElementById('privacy_policy_accepted').value = '1';
      document.getElementById('terms_conditions_accepted').value = '1';
      document.getElementById('privacy_policy_accepted_at').value = data.privacy_policy_accepted_at;
      document.getElementById('terms_conditions_accepted_at').value = data.terms_conditions_accepted_at;
      
      // Habilitar o botão de submit
      const submitButton = document.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = false;
      }
      
      // Esconder mensagem de aviso
      const warningMessage = document.getElementById('terms-warning');
      if (warningMessage) {
        warningMessage.style.display = 'none';
      }
    },
    showTermsModal() {
      console.log('Opening terms modal...');
      if (this.$refs.termsModal) {
        this.$refs.termsModal.show();
      } else {
        console.error('TermsModal ref not found');
      }
    }
  },
  mounted() {
    console.log('Register app mounted');
    
    // Desabilitar o botão de submit inicialmente
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }
    
    // Adicionar listener ao botão de termos
    const termsButton = document.querySelector('[data-terms-button]');
    console.log('Terms button:', termsButton);
    if (termsButton) {
      termsButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.showTermsModal();
      });
    } else {
      console.warn('Terms button not found');
    }
  }
});

console.log('Register app initialized:', registerApp);
