# 💰 DOCUMENTAÇÃO - REEMBOLSOS MERCADO PAGO

## 📋 O QUE É UM REEMBOLSO?

Um reembolso (refund) é quando você devolve o dinheiro de um pagamento já aprovado para o cliente. No Mercado Pago, você pode fazer reembolsos totais ou parciais.

---

## 🎯 TIPOS DE REEMBOLSO

### **1. Reembolso Total**
- Devolver 100% do valor do pagamento
- Usado quando: cancelamento de pedido, evento cancelado, etc

### **2. Reembolso Parcial**
- Devolver apenas parte do valor
- Usado quando: ajuste de preço, desconto retroativo, etc

---

## 🔄 FLUXO DE REEMBOLSO

```
1. Cliente solicita reembolso
   ↓
2. Sistema valida se pagamento está aprovado
   ↓
3. Sistema valida se usuário tem permissão
   ↓
4. Sistema chama API do Mercado Pago
   ↓
5. Mercado Pago processa o reembolso
   ↓
6. Sistema registra reembolso no banco
   ↓
7. Webhook notifica sobre o reembolso
   ↓
8. Sistema envia email ao cliente
   ↓
9. Reembolso aparece na conta do cliente
```

---

## 📊 ENDPOINTS DE REEMBOLSO

### **Solicitar Reembolso:**
```
POST /api/mercadopago/refund
Content-Type: application/json
Authorization: Bearer {token}

{
  "transaction_id": 123,
  "amount": 150.00,
  "reason": "Cancelamento de pedido"
}
```

**Resposta (Sucesso):**
```json
{
  "status": true,
  "message": "Refund processed successfully",
  "refund_id": 456,
  "amount": 150.00
}
```

**Resposta (Erro):**
```json
{
  "status": false,
  "message": "Only approved payments can be refunded"
}
```

---

## ✅ VALIDAÇÕES

### **Validações Implementadas:**

1. **Transação Existe?**
   - ✅ Verificar se transaction_id existe
   - ❌ Retornar erro 404 se não existir

2. **Pagamento Aprovado?**
   - ✅ Verificar se status é 'approved'
   - ❌ Retornar erro se não estiver aprovado

3. **Usuário Autorizado?**
   - ✅ Verificar se é dono da reserva ou admin
   - ❌ Retornar erro 403 se não autorizado

4. **Valor Válido?**
   - ✅ Verificar se amount <= transaction.amount
   - ✅ Verificar se amount > 0
   - ❌ Retornar erro se inválido

5. **Motivo Fornecido?**
   - ✅ Verificar se reason não está vazio
   - ❌ Retornar erro se vazio

---

## 💾 ARMAZENAMENTO

### **Tabela: mercadopago_refunds**

```sql
- id (PK)
- transaction_id (FK → mercadopago_transactions)
- booking_id (FK → bookings)
- amount (decimal)
- reason (user_request, payment_error, duplicate, fraud, cancelled_event, other)
- status (pending, approved, rejected, cancelled)
- refund_id (ID do reembolso no Mercado Pago)
- notes (observações adicionais)
- requested_by (FK → users)
- processed_by (FK → users)
- requested_at (timestamp)
- processed_at (timestamp)
- created_at, updated_at
```

### **Motivos de Reembolso:**

- `user_request` - Solicitação do usuário
- `payment_error` - Erro no pagamento
- `duplicate` - Pagamento duplicado
- `fraud` - Fraude detectada
- `cancelled_event` - Evento cancelado
- `other` - Outro motivo

---

## 🔐 SEGURANÇA

### **Permissões:**

1. **Cliente pode solicitar reembolso:**
   - ✅ De seus próprios pagamentos
   - ❌ De pagamentos de outros

2. **Admin pode solicitar reembolso:**
   - ✅ De qualquer pagamento
   - ✅ Por qualquer motivo

3. **Dados Sensíveis:**
   - ✅ Não retornar dados de cartão
   - ✅ Não retornar tokens
   - ✅ Registrar tudo nos logs

---

## 📝 EXEMPLO DE USO

### **Usando cURL:**

```bash
curl -X POST https://eventos.inovmi.com.br/api/mercadopago/refund \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "transaction_id": 123,
    "amount": 150.00,
    "reason": "Cancelamento de pedido"
  }'
```

### **Usando JavaScript/Axios:**

```javascript
axios.post('/api/mercadopago/refund', {
  transaction_id: 123,
  amount: 150.00,
  reason: 'Cancelamento de pedido'
}, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => {
  console.log('Reembolso processado:', response.data);
})
.catch(error => {
  console.error('Erro:', error.response.data);
});
```

---

## 📊 STATUS DO REEMBOLSO

### **Fluxo de Status:**

```
pending (Solicitado)
   ↓
approved (Aprovado pelo Mercado Pago)
   ↓
(Dinheiro devolvido ao cliente)
```

**OU**

```
pending (Solicitado)
   ↓
rejected (Rejeitado pelo Mercado Pago)
   ↓
(Motivo registrado)
```

**OU**

```
pending (Solicitado)
   ↓
cancelled (Cancelado pelo admin)
   ↓
(Reembolso não foi processado)
```

---

## 📧 NOTIFICAÇÕES

### **Email ao Cliente:**

Quando um reembolso é processado, o cliente recebe um email:

```
Assunto: Reembolso Processado - Evento XYZ

Olá [Nome do Cliente],

Seu reembolso foi processado com sucesso!

Detalhes:
- Valor: R$ 150,00
- Data: 23/11/2025
- Status: Aprovado

O dinheiro será devolvido em sua conta em 1-2 dias úteis.

Obrigado!
```

---

## 🧪 TESTE DE REEMBOLSO

### **Passo 1: Criar Pagamento de Teste**

```bash
# Usar cartão de teste do Mercado Pago
Número: 4111 1111 1111 1111
Vencimento: 11/25
CVV: 123
```

### **Passo 2: Aprovar Pagamento**

```bash
# O pagamento será aprovado automaticamente
# Você verá a transação no painel
```

### **Passo 3: Solicitar Reembolso**

```bash
curl -X POST https://eventos.inovmi.com.br/api/mercadopago/refund \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {seu_token}" \
  -d '{
    "transaction_id": 1,
    "amount": 150.00,
    "reason": "Teste de reembolso"
  }'
```

### **Passo 4: Verificar Status**

```bash
# Verifique no painel do Mercado Pago
# Verifique na tabela mercadopago_refunds
# Verifique nos logs
```

---

## ⚠️ TROUBLESHOOTING

### **Problema: "Only approved payments can be refunded"**

**Causa:** O pagamento não está com status 'approved'

**Solução:**
1. Verifique se o pagamento foi realmente aprovado
2. Aguarde a confirmação do webhook
3. Tente novamente em alguns segundos

### **Problema: "Unauthorized"**

**Causa:** Você não tem permissão para reembolsar este pagamento

**Solução:**
1. Verifique se é seu pagamento (cliente)
2. Verifique se é admin
3. Contacte o suporte

### **Problema: Reembolso não aparece na conta**

**Causa:** Pode levar 1-2 dias úteis

**Solução:**
1. Aguarde 1-2 dias úteis
2. Verifique o status no Mercado Pago
3. Contacte o suporte do Mercado Pago

### **Problema: "Failed to process refund"**

**Causa:** Erro na API do Mercado Pago

**Solução:**
1. Verifique os logs: `storage/logs/laravel.log`
2. Verifique as credenciais do Mercado Pago
3. Tente novamente em alguns minutos
4. Contacte o suporte do Mercado Pago

---

## 📞 SUPORTE

Para problemas com reembolsos:
1. Verifique os logs: `storage/logs/laravel.log`
2. Verifique a tabela `mercadopago_refunds`
3. Verifique o status no Mercado Pago
4. Contacte o suporte do Mercado Pago

---

## 📋 CHECKLIST DE REEMBOLSO

- [ ] Pagamento está aprovado?
- [ ] Você tem permissão?
- [ ] Valor é válido?
- [ ] Motivo foi fornecido?
- [ ] Reembolso foi processado?
- [ ] Email foi enviado?
- [ ] Dinheiro foi devolvido?

---

**Última atualização:** 23 de Novembro de 2025
**Versão:** 1.0
**Status:** ✅ Implementado
