# 📋 Payload Obrigatório - Mercado Pago SDK

## ✅ Campos Obrigatórios

```json
{
  "transaction_amount": 5.00,
  "description": "Descrição do pagamento",
  "payment_method_id": "mastercard",
  "payer": {
    "email": "usuario@example.com",
    "first_name": "Nome",
    "last_name": "Sobrenome",
    "identification": {
      "type": "CPF",
      "number": "12345678909"
    }
  },
  "token": "TOKEN_GERADO_PELO_SDK",
  "installments": 1,
  "capture": true
}
```

## 📊 Detalhes de Cada Campo

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `transaction_amount` | Float | ✅ SIM | Valor da transação |
| `description` | String | ✅ SIM | Descrição do pagamento |
| `payment_method_id` | String | ✅ SIM | `mastercard`, `visa`, `amex`, etc |
| `payer.email` | String | ✅ SIM | Email do pagador |
| `payer.first_name` | String | ✅ SIM | Primeiro nome |
| `payer.last_name` | String | ✅ SIM | Sobrenome |
| `payer.identification.type` | String | ✅ SIM | `CPF` para Brasil |
| `payer.identification.number` | String | ✅ SIM | CPF (sem formatação) |
| `token` | String | ✅ SIM | Token do cartão (gerado pelo SDK) |
| `installments` | Integer | ✅ SIM | Número de parcelas (1-12) |
| `capture` | Boolean | ✅ SIM | `true` para capturar imediatamente |

## 🎯 Campos Opcionais (Otimizações)

```json
{
  "external_reference": "BOOKING-123",
  "statement_descriptor": "EVENTO",
  "device_id": "DEVICE_ID_DO_USUARIO",
  "notification_url": "https://seu-dominio.com/webhook",
  "items": [...],
  "additional_info": {...}
}
```

## 🧪 Teste Correto

### Passo 1: Gerar Token Real
1. Acesse: `https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout`
2. Selecione: Mercado Pago → Cartão de Crédito
3. Preencha com:
   ```
   Número: 5031 4332 1540 6351
   CVV: 123
   Expiração: 11/30
   Titular: USUARIO SANDBOX
   ```
4. Abra DevTools (F12) → Console
5. Procure por: `Token gerado com sucesso: [TOKEN]`
6. **Copie o token**

### Passo 2: Atualizar Teste
Edite `/app/Console/Commands/TestMercadoPago.php`:
```php
'token' => 'COLE_O_TOKEN_AQUI',
```

### Passo 3: Executar Teste
```bash
php artisan test:mercadopago
```

## ⚠️ Erros Comuns

### "bin_not_found"
- **Causa:** Token expirado ou inválido
- **Solução:** Gere um novo token (tokens expiram em ~1 hora)

### "Card Token not found"
- **Causa:** Token vazio ou não enviado
- **Solução:** Verifique se o token foi copiado corretamente

### "The name of the following parameters is wrong"
- **Causa:** Campo com nome errado no payload
- **Solução:** Verifique a ortografia dos campos

### "invalid_installments"
- **Causa:** Número de parcelas inválido
- **Solução:** Use entre 1 e 12

## 📝 CPF para Teste

Use este CPF para testes:
```
12345678909
```

Este CPF retornará:
- **Status:** APRO (Aprovado)
- **Resultado:** Pagamento aprovado

## 🔄 Fluxo Completo

```
1. Gerar Token (Frontend)
   ↓
2. Enviar Payload com Token (Backend)
   ↓
3. Mercado Pago Processa
   ↓
4. Retorna Resposta (approved/rejected/pending)
   ↓
5. Criar Booking/Transação
```

## ✅ Checklist

- [ ] Token gerado no frontend
- [ ] Token copiado corretamente
- [ ] CPF incluído no payload
- [ ] Todos os campos obrigatórios preenchidos
- [ ] Token testado dentro de 1 hora
- [ ] Pagamento processado com sucesso

