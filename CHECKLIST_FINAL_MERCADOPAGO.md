# ✅ CHECKLIST FINAL - Mercado Pago SDK v2

## 🎯 Objetivo
Validar integração frontend + backend com fluxo real (sem copiar/colar tokens manualmente).

## 📋 PARTE 1: Validar Credenciais

### 1.1 Verificar .env
```bash
# Deve estar assim (TESTE):
MERCADOPAGO_ACCESS_TOKEN=TEST-...
MERCADOPAGO_PUBLIC_KEY=TEST-...
```

**Checklist:**
- [ ] ACCESS_TOKEN começa com `TEST-`
- [ ] PUBLIC_KEY começa com `TEST-`
- [ ] Nenhuma credencial de produção misturada

### 1.2 Verificar Configuração do Backend
```php
// Em MercadoPagoService.php
MercadoPagoConfig::setAccessToken($this->accessToken);
// Deve estar usando token de TESTE
```

**Checklist:**
- [ ] Token sendo lido de `setting('mercadopago.access_token')`
- [ ] Token é de TESTE (começa com TEST-)

---

## 📋 PARTE 2: Validar Frontend

### 2.1 Verificar SDK JS Carregado
No checkout (`MercadoPagoCheckout.vue`):

```javascript
// Deve estar assim:
const mp = new MercadoPago(publicKey, {
  locale: 'pt-BR',
});
```

**Checklist:**
- [ ] PUBLIC_KEY sendo passada corretamente
- [ ] PUBLIC_KEY é de TESTE (começa com TEST-)
- [ ] SDK JS carregado (verificar em DevTools → Network)

### 2.2 Verificar Cartão de Teste
Usar EXATAMENTE este cartão:

```
Número: 5031 4332 1540 6351
Vencimento: 11/30
CVV: 123
Titular: qualquer nome
CPF: 12345678909
```

**Checklist:**
- [ ] Número: 5031 4332 1540 6351 (não outro)
- [ ] Vencimento: 11/30 (futuro)
- [ ] CVV: 123
- [ ] CPF: 12345678909

### 2.3 Verificar Geração de Token
No console do DevTools (F12):

```javascript
// Deve aparecer:
"Token gerado com sucesso: [TOKEN_AQUI]"
```

**Checklist:**
- [ ] Token sendo gerado no frontend
- [ ] Token aparece no console
- [ ] Token é enviado imediatamente para o backend (não copiado manualmente)

---

## 📋 PARTE 3: Validar Backend

### 3.1 Verificar Payload Recebido
No `BookingsController.php` → `processCardPayment()`:

```php
\Log::info('📦 Dados preparados para SDK:', [
    'amount' => $paymentData['amount'],
    'payment_method_id' => $paymentData['payment_method_id'],
    'token_length' => strlen($paymentData['token'] ?? ''),
    'has_payer_identification' => isset($paymentData['payer']['identification']),
]);
```

**Checklist:**
- [ ] `amount` é float
- [ ] `payment_method_id` é 'mastercard' (coerente com BIN 5031)
- [ ] `token` tem comprimento > 0
- [ ] `payer.identification` está presente com CPF

### 3.2 Verificar Chamada ao SDK
```php
$payment = $this->paymentClient->create($payload);
```

**Checklist:**
- [ ] Payload enviado sem `items` e `additional_info` (por enquanto)
- [ ] Apenas campos obrigatórios

### 3.3 Verificar Resposta da API
No log, deve aparecer:

```
✅ Pagamento criado via SDK:
- payment_id: [ID]
- status: approved (ou rejected/pending)
- status_detail: accredited (ou outro)
```

**Checklist:**
- [ ] Resposta com `payment_id`
- [ ] Status é `approved` (para cartão de teste válido)

---

## 🧪 TESTE PRÁTICO (Fluxo Real)

### Passo 1: Abrir Checkout
```
https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout
```

### Passo 2: Selecionar Mercado Pago
- [ ] Clique em "Mercado Pago"
- [ ] Clique em "Confirmar pagamento"

### Passo 3: Selecionar Cartão de Crédito
- [ ] Na modal, selecione "Cartão de Crédito"

### Passo 4: Preencher Dados
- [ ] Número: `5031 4332 1540 6351`
- [ ] Vencimento: `11/30`
- [ ] CVV: `123`
- [ ] Titular: `USUARIO SANDBOX`
- [ ] CPF: `12345678909`
- [ ] Parcelas: `1x`

### Passo 5: Abrir DevTools
- [ ] Pressione F12
- [ ] Vá para Console
- [ ] Procure por: `Token gerado com sucesso:`

### Passo 6: Clicar em "Pagar Agora"
- [ ] Clique no botão
- [ ] **NÃO copie o token manualmente**
- [ ] Deixe o sistema enviar automaticamente

### Passo 7: Verificar Resultado
- [ ] Se sucesso: redirecionado para `/mybookings`
- [ ] Se erro: verificar console (DevTools) e logs (`storage/logs/laravel.log`)

---

## 🔍 Se der erro: bin_not_found

### Checklist de Debug:
1. [ ] Cartão está EXATAMENTE `5031 4332 1540 6351`?
2. [ ] ACCESS_TOKEN começa com `TEST-`?
3. [ ] PUBLIC_KEY começa com `TEST-`?
4. [ ] Token foi gerado no MESMO ambiente (não copiado de outro)?
5. [ ] Vencimento é futuro (11/30)?
6. [ ] CVF é `123`?

### Se ainda der erro:
1. Abra `storage/logs/laravel.log`
2. Procure pela última linha com `Mercado Pago API Error`
3. Copie o payload completo e a resposta
4. Me mande para análise

---

## 🔍 Se der erro: Card Token not found

### Checklist:
1. [ ] Token foi gerado há menos de 5 minutos?
2. [ ] Token não foi reutilizado de outro teste?
3. [ ] Token está sendo enviado no campo `card_token` ou `token`?

### Solução:
- Gere um novo token (F5 na página, preencha novamente)
- Teste imediatamente

---

## ✅ Resultado Esperado (Sucesso)

```json
{
  "status": true,
  "payment_id": 12345678901,
  "status_payment": "approved",
  "status_detail": "accredited",
  "message": "Pagamento aprovado com sucesso"
}
```

Após isso:
- [ ] Redirecionado para `/mybookings`
- [ ] Booking aparece na lista
- [ ] Status é "Pago"

---

## 📝 Resumo

| Item | Status | Ação |
|------|--------|------|
| Credenciais | ✅ | Verificar .env |
| Frontend SDK | ✅ | Verificar PUBLIC_KEY |
| Cartão de Teste | ✅ | Usar 5031 4332 1540 6351 |
| Fluxo Real | ⏳ | Testar pelo checkout |
| Backend SDK | ✅ | Verificar logs |
| Resultado | ⏳ | Aguardando teste |

---

## 🚀 Próximo Passo

1. Siga o **TESTE PRÁTICO** acima
2. Se der sucesso: ✅ Sistema pronto!
3. Se der erro: me mande o log completo para análise

