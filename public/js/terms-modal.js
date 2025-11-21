// Script para gerenciar o modal de termos de registro
// Este arquivo é carregado inline e não é processado pelo Vite
// Usa CSS puro do Bootstrap (sem JavaScript)

(function() {
    'use strict';

    console.log('[TermsModal] Script carregado');

    function initTermsModal() {
        console.log('[TermsModal] Inicializando...');

        // Carregar conteúdo do modal
        fetch('/api/pages/2')
            .then(response => {
                console.log('[TermsModal] API response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('[TermsModal] Dados recebidos:', data);
                const termsContent = document.getElementById('termsContent');
                if (termsContent) {
                    termsContent.innerHTML = data.body || 'Conteúdo não disponível';
                }
            })
            .catch(error => {
                console.error('[TermsModal] Erro ao carregar termos:', error);
                const termsContent = document.getElementById('termsContent');
                if (termsContent) {
                    termsContent.innerHTML = 'Erro ao carregar conteúdo';
                }
            });

        // Abrir modal ao clicar no botão (usando data-bs-toggle do Bootstrap CSS)
        const termsButton = document.querySelector('[data-terms-button]');
        console.log('[TermsModal] Botão encontrado:', termsButton);
        
        if (termsButton) {
            termsButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('[TermsModal] Botão clicado');
                
                const modalElement = document.getElementById('termsModal');
                if (modalElement) {
                    console.log('[TermsModal] Modal encontrado, abrindo...');
                    // Usar data-bs-toggle ao invés de JavaScript
                    modalElement.classList.add('show');
                    modalElement.style.display = 'block';
                    document.body.classList.add('modal-open');
                    
                    // Criar backdrop
                    let backdrop = document.querySelector('.modal-backdrop');
                    if (!backdrop) {
                        backdrop = document.createElement('div');
                        backdrop.className = 'modal-backdrop fade show';
                        document.body.appendChild(backdrop);
                    }
                } else {
                    console.error('[TermsModal] Modal não encontrado');
                }
            });
        }

        // Fechar modal ao clicar no botão de fechar
        const closeButtons = document.querySelectorAll('[data-dismiss="modal"]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal();
            });
        });

        function closeModal() {
            const modalElement = document.getElementById('termsModal');
            if (modalElement) {
                console.log('[TermsModal] Fechando modal...');
                modalElement.classList.remove('show');
                modalElement.style.display = 'none';
                document.body.classList.remove('modal-open');
                
                // Remover backdrop
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
            }
        }

        // Gerenciar checkbox de aceitação
        const acceptCheckbox = document.getElementById('acceptTerms');
        const confirmBtn = document.getElementById('confirmTermsBtn');
        
        console.log('[TermsModal] Checkbox:', acceptCheckbox, 'Botão confirmar:', confirmBtn);
        
        if (acceptCheckbox && confirmBtn) {
            acceptCheckbox.addEventListener('change', function() {
                console.log('[TermsModal] Checkbox mudou:', this.checked);
                confirmBtn.disabled = !this.checked;
            });

            // Confirmar aceitação
            confirmBtn.addEventListener('click', function() {
                console.log('[TermsModal] Confirmando aceitação...');
                
                // Atualizar campos hidden
                document.getElementById('privacy_policy_accepted').value = '1';
                document.getElementById('terms_conditions_accepted').value = '1';
                document.getElementById('privacy_policy_accepted_at').value = new Date().toISOString();
                document.getElementById('terms_conditions_accepted_at').value = new Date().toISOString();
                
                // Habilitar o botão de submit
                const submitButton = document.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = false;
                    console.log('[TermsModal] Botão de submit habilitado');
                }
                
                // Esconder mensagem de aviso
                const warningMessage = document.getElementById('terms-warning');
                if (warningMessage) {
                    warningMessage.style.display = 'none';
                    console.log('[TermsModal] Mensagem de aviso escondida');
                }
                
                // Fechar modal
                closeModal();
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
                    console.log('[TermsModal] Termos não aceitos');
                    alert('Por favor, leia e aceite a Política de Privacidade e Termos e Condições');
                    return false;
                }
            });
        }
        
        console.log('[TermsModal] Inicialização completa');
    }

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTermsModal);
    } else {
        initTermsModal();
    }
})();
