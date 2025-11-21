// Script para gerenciar o modal de termos de registro
// Este arquivo é carregado inline e não é processado pelo Vite

(function() {
    'use strict';

    function initTermsModal() {
        // Carregar conteúdo do modal
        fetch('/api/pages/2')
            .then(response => response.json())
            .then(data => {
                const termsContent = document.getElementById('termsContent');
                if (termsContent) {
                    termsContent.innerHTML = data.body || 'Conteúdo não disponível';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar termos:', error);
                const termsContent = document.getElementById('termsContent');
                if (termsContent) {
                    termsContent.innerHTML = 'Erro ao carregar conteúdo';
                }
            });

        // Abrir modal ao clicar no botão
        const termsButton = document.querySelector('[data-terms-button]');
        if (termsButton) {
            termsButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.$ && window.$('#termsModal').length) {
                    window.$('#termsModal').modal('show');
                }
            });
        }

        // Gerenciar checkbox de aceitação
        const acceptCheckbox = document.getElementById('acceptTerms');
        const confirmBtn = document.getElementById('confirmTermsBtn');
        
        if (acceptCheckbox && confirmBtn) {
            acceptCheckbox.addEventListener('change', function() {
                confirmBtn.disabled = !this.checked;
            });

            // Confirmar aceitação
            confirmBtn.addEventListener('click', function() {
                // Atualizar campos hidden
                document.getElementById('privacy_policy_accepted').value = '1';
                document.getElementById('terms_conditions_accepted').value = '1';
                document.getElementById('privacy_policy_accepted_at').value = new Date().toISOString();
                document.getElementById('terms_conditions_accepted_at').value = new Date().toISOString();
                
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
                
                // Fechar modal
                if (window.$ && window.$('#termsModal').length) {
                    window.$('#termsModal').modal('hide');
                }
            });
        }

        // Adicionar listeners para atualizar os campos hidden quando o formulário for submetido
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                const privacyAccepted = document.getElementById('privacy_policy_accepted');
                const termsAccepted = document.getElementById('terms_conditions_accepted');
                
                // Verificar se os termos foram aceitos
                if (privacyAccepted && termsAccepted && (privacyAccepted.value !== '1' || termsAccepted.value !== '1')) {
                    e.preventDefault();
                    alert('Por favor, leia e aceite a Política de Privacidade e Termos e Condições');
                    return false;
                }
            });
        }
    }

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTermsModal);
    } else {
        initTermsModal();
    }
})();
