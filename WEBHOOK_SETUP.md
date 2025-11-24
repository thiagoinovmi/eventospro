# Configuração do Webhook Mercado Pago

## 📋 Resumo

O webhook do Mercado Pago está configurado em:
- **URL**: `https://eventos.inovmi.com.br/api/mercadopago/webhook`
- **Método**: POST
- **Rota Laravel**: `/api/mercadopago/webhook` (sem autenticação, sem CSRF)

## 🔧 Configuração no Mercado Pago

### 1. Acessar Configurações de Webhook

1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Faça login com sua conta
3. Vá para **Configurações** → **Webhooks**

### 2. Adicionar URL do Webhook

1. Clique em **Adicionar novo webhook**
2. Preencha com:
   - **URL**: `https://eventos.inovmi.com.br/api/mercadopago/webhook`
   - **Eventos**: Selecione `payment.created` e `payment.updated`

### 3. Testar o Webhook

Você pode testar o webhook de duas formas:

#### Opção A: Usar o script PHP
```bash
php test_webhook.php
```

#### Opção B: Usar cURL
```bash
curl -X POST https://eventos.inovmi.com.br/api/mercadopago/webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"payment","data":{"id":123456789}}'
```

## 📊 Fluxo do Webhook

```
1. Usuário faz pagamento (PIX, Cartão, Boleto)
2. Mercado Pago processa o pagamento
3. Mercado Pago envia POST para /api/mercadopago/webhook
4. Sistema recebe o webhook
5. Sistema busca a transação no banco (payment_id)
6. Sistema atualiza status da transação para 'approved'
7. Sistema atualiza booking para 'is_paid = 1'
8. Sistema retorna 200 OK
```

## 🔍 Verificar Logs

Os logs do webhook estão em:
```
storage/logs/laravel.log
```

Procure por:
```
=== WEBHOOK MERCADO PAGO RECEBIDO ===
```

## ✅ Checklist de Funcionamento

- [ ] URL do webhook está acessível (HTTPS)
- [ ] Webhook está configurado no Mercado Pago
- [ ] Transação é criada com `payment_id` correto
- [ ] Webhook recebe o evento de pagamento
- [ ] Status da transação é atualizado para 'approved'
- [ ] Booking é marcado como 'is_paid = 1'
- [ ] Usuário vê o pagamento confirmado em Minha Conta

## 🐛 Troubleshooting

### Webhook retorna erro 500

1. Verifique os logs: `tail -f storage/logs/laravel.log`
2. Procure por erros de importação ou banco de dados
3. Verifique se a tabela `mercadopago_transactions` existe

### Webhook não é recebido

1. Verifique se a URL está correta (HTTPS)
2. Verifique se o firewall não está bloqueando
3. Teste manualmente com o script `test_webhook.php`

### Transação não é encontrada

1. Verifique se o `payment_id` está sendo salvo corretamente
2. Verifique se o `booking_id` está associado à transação
3. Procure nos logs por "Transação não encontrada"

## 📝 Estrutura da Requisição

O Mercado Pago envia:

```json
{
  "type": "payment",
  "data": {
    "id": 123456789
  }
}
```

O sistema procura por `payment_id = 123456789` na tabela `mercadopago_transactions`.

## 🔐 Segurança

- ✅ Webhook sem autenticação (Mercado Pago envia de seus servidores)
- ✅ CSRF desabilitado para webhook
- ✅ Sistema sempre retorna 200 OK (mesmo em erro) para evitar retry infinito
- ✅ Todos os eventos são logados para auditoria

## 📞 Suporte

Se o webhook não funcionar:

1. Verifique os logs
2. Teste manualmente com `test_webhook.php`
3. Verifique a configuração no Mercado Pago
4. Verifique se o `booking_id` está sendo salvo corretamente
