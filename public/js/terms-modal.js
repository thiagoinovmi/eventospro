// Script para gerenciar o modal de termos com abas independentes
// Cada aba tem seu próprio botão de confirmação
// Botão de registro só libera quando ambas forem confirmadas

(function() {
    'use strict';

    console.log('[TermsModal] Script carregado');

    const state = {
        privacyRead: false,
        termsRead: false,
        privacyConfirmed: false,
        termsConfirmed: false
    };

    function initTermsModal() {
        console.log('[TermsModal] Inicializando...');
        console.log('[TermsModal] document.readyState:', document.readyState);
        console.log('[TermsModal] Procurando elementos...');
        
        // Verificar se os elementos existem
        const termsButton = document.querySelector('[data-terms-button]');
        const termsModal = document.getElementById('termsModal');
        const privacyScroll = document.getElementById('privacyScroll');
        const termsScroll = document.getElementById('termsScroll');
        
        console.log('[TermsModal] Botão encontrado:', !!termsButton);
        console.log('[TermsModal] Modal encontrado:', !!termsModal);
        console.log('[TermsModal] privacyScroll encontrado:', !!privacyScroll);
        console.log('[TermsModal] termsScroll encontrado:', !!termsScroll);

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
        const termsButtonElement = document.querySelector('[data-terms-button]');
        console.log('[TermsModal] Botão clicável encontrado:', !!termsButtonElement);
        
        if (termsButtonElement) {
            termsButtonElement.addEventListener('click', function(e) {
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
                    
                    // Resetar estado de leitura mas manter confirmações
                    console.log('[TermsModal] Modal aberto - Estado atual:', JSON.stringify(state));
                    updateCheckmarks();
                    updateFinalButton();
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
        const privacyScrollElement = document.getElementById('privacyScroll');
        if (privacyScrollElement) {
            console.log('[TermsModal] Adicionando listener de scroll para Política');
            privacyScrollElement.addEventListener('scroll', function() {
                checkIfScrolledToBottom(this, 'privacy');
            });
        } else {
            console.warn('[TermsModal] privacyScroll não encontrado');
        }

        // Monitorar scroll dos Termos e Condições
        const termsScrollElement = document.getElementById('termsScroll');
        if (termsScrollElement) {
            console.log('[TermsModal] Adicionando listener de scroll para Termos');
            termsScrollElement.addEventListener('scroll', function() {
                checkIfScrolledToBottom(this, 'terms');
            });
        } else {
            console.warn('[TermsModal] termsScroll não encontrado');
        }

        function checkIfScrolledToBottom(element, type) {
            const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
            console.log('[TermsModal] Scroll check -', type, '- isAtBottom:', isAtBottom, '- scrollHeight:', element.scrollHeight, '- scrollTop:', element.scrollTop, '- clientHeight:', element.clientHeight);
            
            if (isAtBottom) {
                if (type === 'privacy') {
                    if (!state.privacyRead) {
                        console.log('[TermsModal] ✓ Política de Privacidade lida completamente');
                        state.privacyRead = true;
                        updateCheckmarks();
                        updateConfirmButton();
                        console.log('[TermsModal] Estado após ler política:', JSON.stringify(state));
                    }
                } else if (type === 'terms') {
                    if (!state.termsRead) {
                        console.log('[TermsModal] ✓ Termos e Condições lidos completamente');
                        state.termsRead = true;
                        updateCheckmarks();
                        updateConfirmButton();
                        console.log('[TermsModal] Estado após ler termos:', JSON.stringify(state));
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

        function updateFinalButton() {
            const finalConfirmBtn = document.getElementById('finalConfirmBtn');
            console.log('[TermsModal] updateFinalButton chamado - Estado:', JSON.stringify(state));
            
            if (finalConfirmBtn) {
                // Habilitar apenas quando ambas forem confirmadas
                if (state.privacyConfirmed && state.termsConfirmed) {
                    finalConfirmBtn.disabled = false;
                    console.log('[TermsModal] ✓ Botão final habilitado - Ambas confirmadas');
                } else {
                    finalConfirmBtn.disabled = true;
                    console.log('[TermsModal] ✗ Botão final desabilitado');
                    console.log('[TermsModal] privacyConfirmed:', state.privacyConfirmed, 'termsConfirmed:', state.termsConfirmed);
                }
            } else {
                console.error('[TermsModal] Botão finalConfirmBtn não encontrado!');
            }
        }

        // Botão de confirmação da Política de Privacidade
        const privacyCheckbox = document.getElementById('privacyCheckbox');
        const privacyConfirmBtn = document.getElementById('privacyConfirmBtn');
        
        if (privacyCheckbox && privacyConfirmBtn) {
            privacyCheckbox.addEventListener('change', function() {
                console.log('[TermsModal] Checkbox Política mudou:', this.checked);
                privacyConfirmBtn.disabled = !this.checked;
            });
            
            privacyConfirmBtn.addEventListener('click', function() {
                console.log('[TermsModal] Confirmando Política de Privacidade');
                if (!privacyCheckbox.checked) {
                    alert('Por favor, marque o checkbox');
                    return;
                }
                state.privacyConfirmed = true;
                console.log('[TermsModal] Estado:', JSON.stringify(state));
                updateFinalButton();
            });
        }
        
        // Botão de confirmação dos Termos e Condições
        const termsCheckbox = document.getElementById('termsCheckbox');
        const termsConfirmBtn = document.getElementById('termsConfirmBtn');
        
        if (termsCheckbox && termsConfirmBtn) {
            termsCheckbox.addEventListener('change', function() {
                console.log('[TermsModal] Checkbox Termos mudou:', this.checked);
                termsConfirmBtn.disabled = !this.checked;
            });
            
            termsConfirmBtn.addEventListener('click', function() {
                console.log('[TermsModal] Confirmando Termos e Condições');
                if (!termsCheckbox.checked) {
                    alert('Por favor, marque o checkbox');
                    return;
                }
                state.termsConfirmed = true;
                console.log('[TermsModal] Estado:', JSON.stringify(state));
                updateFinalButton();
            });
        }
        
        // Botão final de confirmação
        const finalConfirmBtn = document.getElementById('finalConfirmBtn');
        if (finalConfirmBtn) {
            finalConfirmBtn.addEventListener('click', function() {
                console.log('[TermsModal] Confirmação final - Estado:', JSON.stringify(state));
                
                if (!state.privacyConfirmed || !state.termsConfirmed) {
                    alert('Por favor, confirme ambos os documentos');
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
                    console.log('[TermsModal] ✓ Botão de submit habilitado');
                }
                
                // Esconder mensagem de aviso
                const warningMessage = document.getElementById('terms-warning');
                if (warningMessage) {
                    warningMessage.style.display = 'none';
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
