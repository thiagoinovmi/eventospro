// Script para gerenciar dois modais separados
// Um para Política de Privacidade, outro para Termos e Condições
// Botão de registro só libera quando ambos forem confirmados

(function() {
    'use strict';

    console.log('[TermsModal] Script carregado');

    const state = {
        privacyRead: false,
        privacyConfirmed: false,
        termsRead: false,
        termsConfirmed: false
    };

    function initTermsModals() {
        console.log('[TermsModal] Inicializando...');

        // Carregar Política de Privacidade
        fetch('/api/pages/2')
            .then(response => response.json())
            .then(data => {
                console.log('[TermsModal] Política carregada');
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

        // Carregar Termos e Condições
        fetch('/api/pages/3')
            .then(response => response.json())
            .then(data => {
                console.log('[TermsModal] Termos carregados');
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

        // Botão Política de Privacidade
        const privacyButton = document.querySelector('[data-privacy-button]');
        if (privacyButton) {
            privacyButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('[TermsModal] Abrindo modal de Política');
                openModal('privacyModal');
            });
        }

        // Botão Termos e Condições
        const termsButton = document.querySelector('[data-terms-button]');
        if (termsButton) {
            termsButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('[TermsModal] Abrindo modal de Termos');
                openModal('termsModal');
            });
        }

        // Monitorar scroll da Política
        const privacyScrollContent = document.getElementById('privacyScrollContent');
        if (privacyScrollContent) {
            privacyScrollContent.addEventListener('scroll', function() {
                checkScroll('privacy', this);
            });
        }

        // Monitorar scroll dos Termos
        const termsScrollContent = document.getElementById('termsScrollContent');
        if (termsScrollContent) {
            termsScrollContent.addEventListener('scroll', function() {
                checkScroll('terms', this);
            });
        }

        // Checkbox e botão de Política
        const privacyCheckbox = document.getElementById('privacyAcceptCheckbox');
        const privacyConfirmBtn = document.getElementById('privacyConfirmBtn');

        if (privacyCheckbox && privacyConfirmBtn) {
            privacyCheckbox.addEventListener('change', function() {
                privacyConfirmBtn.disabled = !this.checked;
            });

            privacyConfirmBtn.addEventListener('click', function() {
                if (!privacyCheckbox.checked) {
                    alert('Por favor, marque o checkbox');
                    return;
                }
                console.log('[TermsModal] Confirmando Política de Privacidade');
                state.privacyConfirmed = true;
                updateButtons();
                closeModal('privacyModal');
            });
        }

        // Checkbox e botão de Termos
        const termsCheckbox = document.getElementById('termsAcceptCheckbox');
        const termsConfirmBtn = document.getElementById('termsConfirmBtn');

        if (termsCheckbox && termsConfirmBtn) {
            termsCheckbox.addEventListener('change', function() {
                termsConfirmBtn.disabled = !this.checked;
            });

            termsConfirmBtn.addEventListener('click', function() {
                if (!termsCheckbox.checked) {
                    alert('Por favor, marque o checkbox');
                    return;
                }
                console.log('[TermsModal] Confirmando Termos e Condições');
                state.termsConfirmed = true;
                updateButtons();
                closeModal('termsModal');
            });
        }

        // Fechar modais ao clicar em Cancelar
        const closeButtons = document.querySelectorAll('[data-dismiss="modal"]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    closeModal(modal.id);
                }
            });
        });

        // Validar formulário ao submeter
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                if (!state.privacyConfirmed || !state.termsConfirmed) {
                    e.preventDefault();
                    alert('Por favor, confirme ambos os documentos');
                    return false;
                }
            });
        }

        console.log('[TermsModal] Inicialização completa');
    }

    function checkScroll(type, element) {
        const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;

        if (isAtBottom) {
            if (type === 'privacy' && !state.privacyRead) {
                console.log('[TermsModal] ✓ Política lida completamente');
                state.privacyRead = true;
                updateButtons();
            } else if (type === 'terms' && !state.termsRead) {
                console.log('[TermsModal] ✓ Termos lidos completamente');
                state.termsRead = true;
                updateButtons();
            }
        }
    }

    function updateButtons() {
        console.log('[TermsModal] Estado:', JSON.stringify(state));

        // Atualizar botão de Política
        const privacyButton = document.getElementById('privacyButton');
        const privacyCheckIcon = document.getElementById('privacyCheckIcon');
        if (privacyButton) {
            if (state.privacyConfirmed) {
                privacyButton.classList.remove('btn-danger');
                privacyButton.classList.add('btn-success');
                if (privacyCheckIcon) privacyCheckIcon.style.display = 'inline';
                console.log('[TermsModal] ✓ Botão Política verde');
            } else {
                privacyButton.classList.add('btn-danger');
                privacyButton.classList.remove('btn-success');
                if (privacyCheckIcon) privacyCheckIcon.style.display = 'none';
            }
        }

        // Atualizar botão de Termos
        const termsButton = document.getElementById('termsButton');
        const termsCheckIcon = document.getElementById('termsCheckIcon');
        if (termsButton) {
            if (state.termsConfirmed) {
                termsButton.classList.remove('btn-danger');
                termsButton.classList.add('btn-success');
                if (termsCheckIcon) termsCheckIcon.style.display = 'inline';
                console.log('[TermsModal] ✓ Botão Termos verde');
            } else {
                termsButton.classList.add('btn-danger');
                termsButton.classList.remove('btn-success');
                if (termsCheckIcon) termsCheckIcon.style.display = 'none';
            }
        }

        // Habilitar botão de registro
        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) {
            if (state.privacyConfirmed && state.termsConfirmed) {
                submitButton.disabled = false;
                console.log('[TermsModal] ✓ Botão de registro habilitado');

                // Atualizar campos hidden
                document.getElementById('privacy_policy_accepted').value = '1';
                document.getElementById('terms_conditions_accepted').value = '1';
                document.getElementById('privacy_policy_accepted_at').value = new Date().toISOString();
                document.getElementById('terms_conditions_accepted_at').value = new Date().toISOString();

                // Esconder mensagem de aviso
                const warningMessage = document.getElementById('terms-warning');
                if (warningMessage) {
                    warningMessage.style.display = 'none';
                }
            } else {
                submitButton.disabled = true;
            }
        }
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
            document.body.classList.add('modal-open');

            let backdrop = document.querySelector('.modal-backdrop');
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.className = 'modal-backdrop fade show';
                document.body.appendChild(backdrop);
            }
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');

            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
        }
    }

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTermsModals);
    } else {
        initTermsModals();
    }
})();
