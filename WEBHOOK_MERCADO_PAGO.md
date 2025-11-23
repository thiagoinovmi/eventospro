# 🔔 DOCUMENTAÇÃO - WEBHOOKS MERCADO PAGO

## 📋 O QUE É UM WEBHOOK?

Um webhook é uma notificação automática que o Mercado Pago envia para seu servidor quando um evento ocorre (ex: pagamento aprovado, reembolso processado, etc).

---

## 🎯 WEBHOOK DO MERCADO PAGO

### **URL do Webhook:**
```
POST https://eventos.inovmi.com.br/webhooks/mercadopago
```

### **Configuração no Mercado Pago:**
1. Acesse sua conta do Mercado Pago
2. Vá para Configurações → Webhooks
3. Adicione a URL: `https://eventos.inovmi.com.br/webhooks/mercadopago`
4. Selecione os eventos que deseja receber

---

## 📨 EVENTOS SUPORTADOS

### **Eventos de Pagamento:**
- `payment.created` - Pagamento criado
- `payment.updated` - Pagamento atualizado
- `payment.approved` - Pagamento aprovado
- `payment.rejected` - Pagamento rejeitado
- `payment.cancelled` - Pagamento cancelado

### **Eventos de Reembolso:**
- `refund.created` - Reembolso criado
- `refund.updated` - Reembolso atualizado
- `refund.completed` - Reembolso concluído

---

## 🔐 SEGURANÇA

### **Validação de Assinatura:**

O Mercado Pago envia dois headers para validar a autenticidade do webhook:

1. **X-Signature**: Assinatura HMAC-SHA256
2. **X-Request-ID**: ID único da requisição

### **Processo de Validação:**

```
1. Receber X-Signature e X-Request-ID
2. Calcular HMAC-SHA256 com: X-Request-ID.payload + webhook_token
3. Comparar com a assinatura recebida
4. Se válida, processar o webhook
5. Se inválida, rejeitar (HTTP 401)
```

### **Implementação:**

O método `validateWebhookSignature()` no `MercadoPagoService` faz essa validação:

```php
public function validateWebhookSignature($body, $signature, $requestId)
{
    // Validar assinatura HMAC-SHA256
    $expectedHash = hash_hmac('sha256', $requestId . '.' . $body, $webhookToken);
    return hash_equals($hash, $expectedHash);
}
```

---

## 📊 FLUXO DE PROCESSAMENTO

```
1. Mercado Pago envia POST para /webhooks/mercadopago
   ↓
2. MercadoPagoController@webhook() recebe a requisição
   ↓
3. Validar assinatura do webhook
   ↓
4. Se inválida → Retornar HTTP 401
   ↓
5. Se válida → Registrar webhook no banco
   ↓
6. Processar notificação (processPaymentNotification)
   ↓
7. Atualizar status da transação
   ↓
8. Se aprovado → Finalizar checkout
   ↓
9. Marcar webhook como processado
   ↓
10. Retornar HTTP 200 (sucesso)
```

---

## 💾 ARMAZENAMENTO

### **Tabela: mercadopago_webhooks**

Todos os webhooks são registrados para auditoria:

```sql
- id (PK)
- event_type (payment, refund, etc)
- resource_id (ID do pagamento/reembolso)
- payload (JSON com dados completos)
- processed (boolean - foi processado?)
- error_message (se houver erro)
- created_at, updated_at
```

---

## 🧪 TESTE DE WEBHOOK

### **Usando cURL:**

```bash
curl -X POST https://eventos.inovmi.com.br/webhooks/mercadopago \
  -H "Content-Type: application/json" \
  -H "X-Signature: sha256=abc123..." \
  -H "X-Request-ID: req-123" \
  -d '{
    "type": "payment",
    "data": {
      "id": "12345678"
    }
  }'
```

### **Usando Postman:**

1. Criar nova requisição POST
2. URL: `https://eventos.inovmi.com.br/webhooks/mercadopago`
3. Headers:
   - `X-Signature: sha256=...`
   - `X-Request-ID: req-123`
4. Body (JSON):
   ```json
   {
     "type": "payment",
     "data": {
       "id": "12345678"
     }
   }
   ```

---

## 📝 LOGS

### **Localização:**
`storage/logs/laravel.log`

### **O que é registrado:**
- Webhooks recebidos
- Validações de assinatura
- Processamento de notificações
- Erros e exceções

### **Exemplo de log:**
```
[2025-11-23 16:35:00] local.INFO: Webhook received
[2025-11-23 16:35:00] local.INFO: Payment notification processed
[2025-11-23 16:35:00] local.INFO: Booking completed via Mercado Pago
```

---

## ⚠️ TROUBLESHOOTING

### **Problema: Webhook não está sendo recebido**

**Solução:**
1. Verificar se a URL está correta no Mercado Pago
2. Verificar se o servidor está acessível (não está atrás de firewall)
3. Verificar logs em `storage/logs/laravel.log`
4. Testar com cURL

### **Problema: Erro 401 (Assinatura inválida)**

**Solução:**
1. Verificar se o webhook_token está correto
2. Verificar se os headers X-Signature e X-Request-ID estão presentes
3. Verificar se o payload não foi modificado

### **Problema: Transação não está sendo atualizada**

**Solução:**
1. Verificar se o webhook foi registrado no banco
2. Verificar se o payment_id está correto
3. Verificar logs de erro

---

## 📞 SUPORTE

Para problemas com webhooks:
1. Verifique os logs: `storage/logs/laravel.log`
2. Teste a URL do webhook
3. Verifique as configurações no Mercado Pago
4. Contate o suporte do Mercado Pago

---

**Última atualização:** 23 de Novembro de 2025
**Versão:** 1.0
**Status:** ✅ Implementado
