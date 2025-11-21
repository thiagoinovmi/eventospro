// Simples inicialização sem Vue para evitar deprecation warnings
console.log('Register app loading...');

document.addEventListener('DOMContentLoaded', function() {
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
    termsButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Opening terms modal...');
      
      // Abrir modal usando jQuery (Bootstrap)
      if (window.$ && window.$('#termsModal').length) {
        window.$('#termsModal').modal('show');
      } else {
        console.error('Modal jQuery not found');
      }
    });
  } else {
    console.warn('Terms button not found');
  }
});

// Função global para lidar com aceitação de termos
window.handleTermsAccepted = function(data) {
  console.log('Terms accepted:', data);
  
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
  
  // Fechar modal
  if (window.$ && window.$('#termsModal').length) {
    window.$('#termsModal').modal('hide');
  }
};

console.log('Register app initialized');
