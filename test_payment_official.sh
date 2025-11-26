#!/bin/bash

# Script para testar pagamento com Mercado Pago usando cartões oficiais
# Cartões de teste: https://www.mercadopago.com.br/developers/panel/app/5300806099771734/test-cards

echo "=== TESTE DE PAGAMENTO - MERCADO PAGO ==="
echo ""

# Get token from database
TOKEN=$(php artisan tinker --execute="echo setting('mercadopago.access_token');" 2>/dev/null | grep TEST)

if [ -z "$TOKEN" ]; then
    echo "❌ Erro: Token não configurado"
    exit 1
fi

echo "✅ Token obtido: ${TOKEN:0:20}..."
echo ""

# Cartões de teste oficiais
echo "Cartões de teste disponíveis:"
echo "1. VISA (Aprovado): 4111111111111111"
echo "2. MASTERCARD (Aprovado): 5031433215406351"
echo ""

# Para usar este script, você precisa gerar um token no frontend
# Mas vamos testar com um payload simples primeiro

echo "Testando com payload simples (sem token)..."
echo ""

RESPONSE=$(curl -s -X POST https://api.mercadopago.com/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Idempotency-Key: $(uuidgen)" \
  -d '{
    "transaction_amount": 5.00,
    "description": "Teste de pagamento",
    "payment_method_id": "visa",
    "payer": {
      "email": "test@test.com",
      "first_name": "Test",
      "last_name": "User"
    },
    "token": "PLACEHOLDER_TOKEN",
    "installments": 1,
    "capture": true
  }')

echo "Resposta da API:"
echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"

echo ""
echo "=== PRÓXIMOS PASSOS ==="
echo "1. Acesse: https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout"
echo "2. Selecione Mercado Pago → Cartão de Crédito"
echo "3. Preencha com os dados do cartão VISA:"
echo "   - Número: 4111111111111111"
echo "   - Expiração: 11/30"
echo "   - CVV: 123"
echo "   - Titular: USUARIO SANDBOX"
echo "4. O token será gerado automaticamente"
echo "5. Teste o pagamento"
echo ""
