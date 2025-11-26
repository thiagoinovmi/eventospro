# 🧪 Teste de Pagamento Real com Token Válido

## 📋 Problema Identificado

O teste anterior usava um token placeholder (`INSIRA_TOKEN_GERADO_AQUI`), que não é válido.

Para testar com sucesso, você precisa de um **token real gerado pelo SDK do Mercado Pago**.

## 🚀 Como Gerar um Token Real

### Opção 1: Via Frontend (Recomendado)

1. **Acesse o checkout:**
   ```
   https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout
   ```

2. **Selecione Mercado Pago → Cartão de Crédito**

3. **Preencha com um dos cartões de teste:**
   ```
   MASTERCARD: 5031 4332 1540 6351
   CVV: 123
   Expiração: 11/30
   Titular: USUARIO SANDBOX
   ```

4. **Abra o DevTools (F12) → Console**

5. **Procure pela mensagem:**
   ```
   Token gerado com sucesso: [TOKEN_AQUI]
   ```

6. **Copie o token**

### Opção 2: Via Script PHP

Crie um arquivo `generate_token.php` na raiz do projeto:

```php
<?php
require 'vendor/autoload.php';

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Common\RequestOptions;

// Configurar token
$accessToken = setting('mercadopago.access_token');
MercadoPagoConfig::setAccessToken($accessToken);

// Dados do cartão
$cardData = [
    'cardNumber' => '5031433215406351',
    'cardholderName' => 'USUARIO SANDBOX',
    'cardExpirationMonth' => '11',
    'cardExpirationYear' => '2030',
    'securityCode' => '123'
];

// Gerar token (isso seria feito no frontend normalmente)
// Para teste, você precisa usar o SDK do frontend

echo "Para gerar um token, use o SDK do Mercado Pago no frontend.\n";
echo "Veja as instruções acima.\n";
?>
```

## 🧪 Teste com Token Real

Após obter um token real, você pode testar via curl:

```bash
#!/bin/bash

TOKEN_MERCADOPAGO="TEST-530080609977173-112407-f564129d214fe0aadddb9edc61bd378b-187707685"
CARD_TOKEN="[INSIRA_O_TOKEN_GERADO]"

curl -X POST https://api.mercadopago.com/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN_MERCADOPAGO" \
  -H "X-Idempotency-Key: $(uuidgen)" \
  -d "{
    \"transaction_amount\": 10.00,
    \"description\": \"Teste de pagamento\",
    \"payment_method_id\": \"mastercard\",
    \"payer\": {
      \"email\": \"test@test.com\",
      \"first_name\": \"Test\",
      \"last_name\": \"User\"
    },
    \"token\": \"$CARD_TOKEN\",
    \"installments\": 1,
    \"capture\": true
  }"
```

## 📊 Resposta Esperada (Sucesso)

```json
{
  "id": 135062008420,
  "status": "approved",
  "status_detail": "accredited",
  "transaction_amount": 10.00,
  "payment_method_id": "mastercard",
  "payment_type_id": "credit_card",
  "installments": 1,
  "payer": {
    "email": "test@test.com",
    "first_name": "Test",
    "last_name": "User"
  },
  "date_created": "2025-11-26T14:10:00.000Z"
}
```

## ❌ Erros Comuns

### "Card Token not found"
- **Causa:** Token inválido ou expirado
- **Solução:** Gere um novo token no frontend

### "bin_not_found"
- **Causa:** Cartão inválido ou BIN não reconhecido
- **Solução:** Use um dos cartões de teste oficiais

### "The name of the following parameters is wrong : [items]"
- **Causa:** Parâmetro `items` não é aceito pelo SDK
- **Solução:** Removido temporariamente (será implementado depois)

## ✅ Checklist

- [ ] Token gerado no frontend
- [ ] Token copiado corretamente
- [ ] Cartão de teste válido usado
- [ ] Pagamento processado com sucesso
- [ ] Resposta com status "approved"
- [ ] Booking criado em /mybookings

## 🎯 Próximos Passos

1. Gere um token real seguindo as instruções acima
2. Teste o pagamento via frontend
3. Verifique se aparece em /mybookings
4. Depois continuamos com PIX, Boleto e Carteira

