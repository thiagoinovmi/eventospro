// Script para gerenciar o modal de termos com abas
// Validação de scroll para cada aba
// Checks verdes quando ler completamente

(function() {
    'use strict';

    console.log('[TermsModal] Script carregado');

    const state = {
        privacyRead: false,
        termsRead: false
    };

    function initTermsModal() {
        console.log('[TermsModal] Inicializando...');

        // Carregar conteúdo do modal (Política de Privacidade - ID 2)
        fetch('/api/pages/2')
            .then(response => {
                console.log('[TermsModal] API response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('[TermsModal] Dados recebidos:', data);
                
                // Política de Privacidade
                const privacyTitle = document.getElementById('privacy-title');
                const privacyContent = document.getElementById('privacyContent');
                if (privacyTitle) privacyTitle.textContent = data.title || 'Política de Privacidade';
                if (privacyContent) privacyContent.innerHTML = data.body || 'Conteúdo não disponível';
            })
            .catch(error => {
                console.error('[TermsModal] Erro ao carregar política:', error);
                const privacyContent = document.getElementById('privacyContent');
                if (privacyContent) privacyContent.innerHTML = 'Erro ao carregar conteúdo';
            });

        // Carregar conteúdo do modal (Termos e Condições - ID 3)
        fetch('/api/pages/3')
            .then(response => {
                console.log('[TermsModal] API response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('[TermsModal] Dados recebidos:', data);
                
                // Termos e Condições
                const termsTitle = document.getElementById('terms-title');
                const termsContent = document.getElementById('termsContent');
                if (termsTitle) termsTitle.textContent = data.title || 'Termos e Condições de Uso';
                if (termsContent) termsContent.innerHTML = data.body || 'Conteúdo não disponível';
            })
            .catch(error => {
                console.error('[TermsModal] Erro ao carregar termos:', error);
                const termsContent = document.getElementById('termsContent');
                if (termsContent) termsContent.innerHTML = 'Erro ao carregar conteúdo';
            });

        // Abrir modal ao clicar no botão
        const termsButton = document.querySelector('[data-terms-button]');
        console.log('[TermsModal] Botão encontrado:', termsButton);
        
        if (termsButton) {
            termsButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('[TermsModal] Botão clicado');
                
                const modalElement = document.getElementById('termsModal');
                if (modalElement) {
                    console.log('[TermsModal] Modal encontrado, abrindo...');
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
                    
                    // Resetar estado
                    state.privacyRead = false;
                    state.termsRead = false;
                    updateCheckmarks();
                    updateConfirmButton();
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

        // Monitorar scroll da Política de Privacidade
        const privacyScroll = document.getElementById('privacyScroll');
        if (privacyScroll) {
            privacyScroll.addEventListener('scroll', function() {
                checkIfScrolledToBottom(this, 'privacy');
            });
        }

        // Monitorar scroll dos Termos e Condições
        const termsScroll = document.getElementById('termsScroll');
        if (termsScroll) {
            termsScroll.addEventListener('scroll', function() {
                checkIfScrolledToBottom(this, 'terms');
            });
        }

        function checkIfScrolledToBottom(element, type) {
            const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
            
            if (isAtBottom) {
                if (type === 'privacy') {
                    if (!state.privacyRead) {
                        console.log('[TermsModal] Política de Privacidade lida completamente');
                        state.privacyRead = true;
                        updateCheckmarks();
                        
                        // Mudar para aba de termos automaticamente
                        setTimeout(() => {
                            const termsTab = document.getElementById('terms-tab');
                            if (termsTab) {
                                termsTab.click();
                                console.log('[TermsModal] Mudando para aba de Termos');
                            }
                        }, 500);
                    }
                } else if (type === 'terms') {
                    if (!state.termsRead) {
                        console.log('[TermsModal] Termos e Condições lidos completamente');
                        state.termsRead = true;
                        updateCheckmarks();
                        updateConfirmButton();
                    }
                }
            }
        }

        function updateCheckmarks() {
            const privacyCheck = document.getElementById('privacy-check');
            const termsCheck = document.getElementById('terms-check');
            
            if (privacyCheck) {
                privacyCheck.style.display = state.privacyRead ? 'inline' : 'none';
            }
            
            if (termsCheck) {
                termsCheck.style.display = state.termsRead ? 'inline' : 'none';
            }
        }

        function updateConfirmButton() {
            const confirmBtn = document.getElementById('confirmTermsBtn');
            if (confirmBtn) {
                confirmBtn.disabled = !state.termsRead;
                console.log('[TermsModal] Botão confirmar:', state.termsRead ? 'habilitado' : 'desabilitado');
            }
        }

        // Confirmar aceitação
        const confirmBtn = document.getElementById('confirmTermsBtn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                console.log('[TermsModal] Confirmando aceitação...');
                
                // Verificar se ambos foram lidos
                if (!state.privacyRead || !state.termsRead) {
                    console.log('[TermsModal] Não leu tudo');
                    alert('Por favor, leia completamente ambos os documentos');
                    return;
                }
                
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

        // Validar formulário ao submeter
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                const privacyAccepted = document.getElementById('privacy_policy_accepted');
                const termsAccepted = document.getElementById('terms_conditions_accepted');
                
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
