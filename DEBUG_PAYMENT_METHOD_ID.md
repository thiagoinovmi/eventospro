# 🔍 DEBUG: payment_method_id não está sendo detectado corretamente

## ❌ Problema Atual

Frontend está enviando `"payment_method_id": "visa"` mesmo quando o cartão é Mastercard (`5031...`).

## 🎯 Análise

### Cartão Preenchido:
- Número: `5031 4332 1540 6351`
- BIN: `503143` (começa com 5, segundo dígito 0-5)
- Esperado: `mastercard`
- Recebido: `visa` ❌

### Lógica de Detecção (MercadoPagoCheckout.vue):

```javascript
// Visa: starts with 4
if (/^4/.test(cleanNumber)) {
    this.cardData.paymentMethodId = 'visa';
}
// Mastercard: starts with 51-55
else if (/^5[1-5]/.test(cleanNumber)) {
    this.cardData.paymentMethodId = 'mastercard';
}
```

Regex `/^5[1-5]/` deveria detectar `5031...` como Mastercard.

## 🔧 Possíveis Causas

1. **Watch não está sendo acionado**
   - Número do cartão pode estar sendo preenchido de forma que o watch não detecta
   - Pode estar usando `v-model` mas o watch não está sendo disparado

2. **Ordem de execução**
   - `formatCardNumber()` é chamado antes do watch
   - `detectCardBrand()` pode estar sendo chamado mas o valor não está sendo salvo

3. **Cache do navegador**
   - Código antigo ainda está sendo servido
   - Hard refresh não foi feito

4. **Inicialização**
   - `paymentMethodId` é inicializado como `'credit_card'`
   - Pode estar sendo enviado antes de ser atualizado

## ✅ Solução Proposta

Vou adicionar logs MUITO específicos no frontend para rastrear exatamente o que está acontecendo:

1. Log quando o número muda
2. Log quando `detectCardBrand()` é chamado
3. Log do valor do `paymentMethodId` ANTES de enviar
4. Log do payload COMPLETO sendo enviado

## 🚀 Próximas Ações

1. Adicionar logs detalhados no frontend
2. Fazer hard refresh
3. Abrir DevTools e verificar cada log
4. Confirmar que `payment_method_id` está sendo atualizado para `'mastercard'`
5. Testar novamente

