// Script de debug para rastrear o erro "The Components object is deprecated"
// Este script é carregado ANTES de qualquer coisa

(function() {
    'use strict';

    // Interceptar console.warn para capturar o aviso
    const originalWarn = console.warn;
    console.warn = function(...args) {
        const message = args.join(' ');
        if (message.includes('The Components object is deprecated')) {
            console.error('=== ERRO CAPTURADO ===');
            console.error('Mensagem:', message);
            console.error('Stack trace:', new Error().stack);
            console.error('=== FIM DO ERRO ===');
        }
        return originalWarn.apply(console, args);
    };

    // Interceptar console.error também
    const originalError = console.error;
    console.error = function(...args) {
        const message = args.join(' ');
        if (message.includes('Components')) {
            console.log('=== ERRO CAPTURADO (error) ===');
            console.log('Mensagem:', message);
            console.log('Stack:', new Error().stack);
            console.log('=== FIM DO ERRO ===');
        }
        return originalError.apply(console, args);
    };

    // Log quando o script é carregado
    console.log('[DEBUG] Script de debug carregado');
})();
