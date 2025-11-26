#!/bin/bash

# Get token from database
TOKEN=$(php artisan tinker --execute="echo setting('mercadopago.access_token');" 2>/dev/null | grep TEST)

echo "=== TESTE COM CURL ==="
echo "Token: $TOKEN"
echo ""

# Test with curl
curl -X POST https://api.mercadopago.com/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "transaction_amount": 5.00,
    "description": "Teste de pagamento",
    "payment_method_id": "visa",
    "payer": {
      "email": "test@test.com"
    },
    "token": "e9761f47e8541504642bae6f69aef646",
    "installments": 1,
    "capture": true
  }' 2>&1 | jq .

echo ""
echo "=== FIM DO TESTE ==="
