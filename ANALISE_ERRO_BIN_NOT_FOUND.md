# 🔍 Análise: Erro "bin_not_found"

## ❌ Erro Identificado

```
Mensagem: bin_not_found
Código: 10105
Descrição: Bin not found
```

## 🎯 Possíveis Causas

1. **Token Expirado**
   - Tokens têm tempo de vida limitado
   - Solução: Gerar um novo token

2. **Cartão Inválido**
   - O cartão usado para gerar o token não é reconhecido
   - Solução: Usar um dos cartões oficiais de teste

3. **Modo de Teste Não Configurado**
   - O token pode ser de produção em vez de teste
   - Solução: Verificar se o token começa com `TEST-`

4. **Problema na Geração do Token**
   - O SDK do frontend pode não estar gerando corretamente
   - Solução: Verificar console do navegador

## ✅ Próximos Passos

### 1. Verificar o Token
```
Token gerado: f140aeff942bef1ff40039516c93ef33
Tipo: Deve ser um token de teste (não APP_USR)
Validade: Geralmente 1 hora
```

### 2. Gerar Novo Token
1. Abra o checkout novamente
2. Selecione Mercado Pago → Cartão de Crédito
3. **Use EXATAMENTE este cartão:**
   ```
   Número: 5031 4332 1540 6351
   CVV: 123
   Expiração: 11/30
   Titular: USUARIO SANDBOX
   ```
4. Copie o novo token
5. Teste novamente

### 3. Verificar Logs do Navegador
1. Abra DevTools (F12)
2. Vá para Console
3. Procure por:
   - `Token gerado com sucesso:`
   - Erros de validação
   - Avisos do SDK

### 4. Verificar Configuração do Mercado Pago
```bash
# Verificar token configurado
php artisan tinker
>>> echo setting('mercadopago.access_token');
# Deve começar com TEST-
```

## 📊 Estrutura do Token

Um token válido do Mercado Pago tem este formato:
```
f140aeff942bef1ff40039516c93ef33
```

Características:
- 32 caracteres hexadecimais
- Gerado pelo SDK do Mercado Pago
- Válido por ~1 hora
- Específico para o cartão usado

## 🧪 Teste Alternativo (cURL)

Se quiser testar via cURL com um token real:

```bash
TOKEN="f140aeff942bef1ff40039516c93ef33"
MP_TOKEN="TEST-530080609977173-112407-f564129d214fe0aadddb9edc61bd378b-187707685"

curl -X POST https://api.mercadopago.com/v1/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $MP_TOKEN" \
  -H "X-Idempotency-Key: $(uuidgen)" \
  -d "{
    \"transaction_amount\": 5.00,
    \"description\": \"Teste\",
    \"payment_method_id\": \"mastercard\",
    \"payer\": {
      \"email\": \"test@test.com\",
      \"first_name\": \"Test\",
      \"last_name\": \"User\"
    },
    \"token\": \"$TOKEN\",
    \"installments\": 1,
    \"capture\": true
  }"
```

## 📝 Checklist

- [ ] Token gerado no frontend
- [ ] Token copiado corretamente
- [ ] Cartão MASTERCARD oficial usado
- [ ] Token testado dentro de 1 hora
- [ ] Logs do navegador verificados
- [ ] Configuração do Mercado Pago verificada

## 🎯 Conclusão

O SDK está funcionando corretamente. O problema é com o token ou com o cartão usado para gerá-lo.

**Próximo passo:** Gere um novo token usando exatamente o cartão MASTERCARD `5031 4332 1540 6351` e teste novamente.

