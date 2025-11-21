import { createApp } from 'vue';
import TermsModal from './components/TermsModal.vue';

// Inicializar o app Vue para o modal de termos
const registerApp = createApp({
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
      this.privacyAccepted = data.privacy_policy_accepted;
      this.termsAccepted = data.terms_conditions_accepted;
      this.privacyAcceptedAt = data.privacy_policy_accepted_at;
      this.termsAcceptedAt = data.terms_conditions_accepted_at;
      
      // Habilitar o botão de submit
      const submitButton = document.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = false;
      }
    },
    showTermsModal() {
      this.$refs.termsModal.show();
    }
  },
  mounted() {
    // Desabilitar o botão de submit inicialmente
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }
    
    // Adicionar listener ao link de termos
    const termsLink = document.querySelector('[data-terms-link]');
    if (termsLink) {
      termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showTermsModal();
      });
    }
  }
});

// Montar o app se o elemento existir
const registerElement = document.getElementById('register-app');
if (registerElement) {
  registerApp.mount(registerElement);
}
