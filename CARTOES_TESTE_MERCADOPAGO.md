# 💳 Cartões de Teste - Mercado Pago

## ✅ Cartões Aprovados

### MASTERCARD (Aprovado)
```
Número: 5031 4332 1540 6351
CVV: 123
Expiração: 11/30
Titular: USUARIO SANDBOX
CPF: 12345678909
```

### VISA (Aprovado)
```
Número: 4235 6477 2802 5682
CVV: 123
Expiração: 11/30
Titular: USUARIO SANDBOX
CPF: 12345678909
```

### AMERICAN EXPRESS (Aprovado)
```
Número: 3753 651535 56885
CVV: 1234
Expiração: 11/30
Titular: USUARIO SANDBOX
CPF: 12345678909
```

### ELO DÉBITO (Aprovado)
```
Número: 5067 7667 8388 8311
CVV: 123
Expiração: 11/30
Titular: USUARIO SANDBOX
CPF: 12345678909
```

---

## 📊 Status de Pagamento e Respostas

| Status | Descrição | CPF para Teste | Código |
|--------|-----------|-----------------|--------|
| ✅ APRO | Pagamento aprovado | 12345678909 | APRO |
| ❌ OTHE | Recusado por erro geral | 12345678909 | OTHE |
| ⏳ CONT | Pagamento pendente | - | CONT |
| ⚠️ CALL | Recusado com validação para autorizar | - | CALL |
| 💰 FUND | Recusado por quantia insuficiente | - | FUND |
| 🔒 SECU | Recusado por código de segurança inválido | - | SECU |
| 📅 EXPI | Recusado por problema com a data de vencimento | - | EXPI |
| 📝 FORM | Recusado por erro no formulário | - | FORM |

---

## 🚀 Como Usar

### Para Pagamento Aprovado:
1. Use qualquer um dos cartões acima
2. Preencha com os dados exatos
3. O pagamento será aprovado automaticamente

### Para Testar Rejeições:
1. Use o cartão MASTERCARD: `5031 4332 1540 6351`
2. Preencha com os dados acima
3. O resultado dependerá do CPF usado:
   - **CPF 12345678909**: Pagamento aprovado (APRO)
   - **CPF 12345678910**: Recusado por erro geral (OTHE)
   - **CPF 12345678911**: Pagamento pendente (CONT)

---

## 🧪 Teste Rápido

### Payload de Teste
```json
{
  "event_id": 1,
  "ticket_id": 2,
  "total": 10,
  "payment_method": "mercadopago",
  "selected_method": "credit_card",
  "payment_method_id": "credit_card",
  "installments": 1,
  "card_token": "GERADO_PELO_SDK",
  "booking_date": "Sunday November 29, 2026",
  "booking_end_date": "Sunday November 29, 2026",
  "start_time": "08:00",
  "end_time": "23:30"
}
```

### Fluxo de Teste
1. Acesse: `https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout`
2. Selecione **Mercado Pago → Cartão de Crédito**
3. Preencha com um dos cartões acima
4. Clique em **"Pagar Agora"**
5. O SDK gerará o token automaticamente
6. Verifique o resultado

---

## 📝 Notas Importantes

1. **Tokens são únicos:** Cada preenchimento gera um novo token
2. **Sem cobranças:** Nenhuma cobrança real é feita
3. **Expiração:** Os cartões de teste não expiram
4. **CPF 12345678909:** Use este CPF para testes de aprovação
5. **Reutilização:** Você pode usar os mesmos dados quantas vezes quiser

---

## 🔍 Verificar Logs

Se houver erro, verifique:

```bash
# Ver últimas linhas do log
tail -100 storage/logs/laravel.log

# Filtrar por Mercado Pago
tail -100 storage/logs/laravel.log | grep -i "mercado\|payment"

# Ver erro específico
tail -100 storage/logs/laravel.log | grep "❌"
```

---

## ✅ Checklist de Teste

- [ ] MASTERCARD testado com sucesso
- [ ] VISA testado com sucesso
- [ ] AMERICAN EXPRESS testado com sucesso
- [ ] ELO DÉBITO testado com sucesso
- [ ] Pagamento aprovado cria booking
- [ ] Redirecionamento para /mybookings funciona
- [ ] Dados do booking estão corretos
- [ ] Webhook recebe notificação

---

## 🎯 Próximas Etapas

Após confirmar que os cartões funcionam:
1. ✅ Cartão de Crédito: Testado
2. ⏳ PIX (ETAPA 3)
3. ⏳ Boleto (ETAPA 4)
4. ⏳ Carteira (ETAPA 5)
5. ⏳ Device ID (ETAPA 6)
6. ⏳ Testes completos (ETAPA 7)

