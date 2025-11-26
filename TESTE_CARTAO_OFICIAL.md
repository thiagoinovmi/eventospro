# 🧪 Teste com Cartões Oficiais do Mercado Pago

## 📋 Cartões de Teste Disponíveis

### ✅ VISA (Aprovado)
```
Número: 4111111111111111
Expiração: 11/30
CVV: 123
Titular: USUARIO SANDBOX
```

### ✅ MASTERCARD (Aprovado)
```
Número: 5031433215406351
Expiração: 11/30
CVV: 123
Titular: USUARIO SANDBOX
```

### ⚠️ Outros Cartões (Rejeições Específicas)
- **Cartão Recusado:** 4000000000000002
- **Cartão Expirado:** 4000000000000069
- **Cartão com Limite Insuficiente:** 4000000000000010

## 🚀 Passo a Passo para Testar

### 1️⃣ Acessar o Checkout
```
URL: https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout
```

### 2️⃣ Selecionar Mercado Pago
- Clique no rádio button "Mercado Pago"
- Clique em "Confirmar pagamento"

### 3️⃣ Selecionar Cartão de Crédito
- Na modal de pagamento, selecione "Cartão de Crédito"

### 4️⃣ Preencher Dados do Cartão
- **Número do Cartão:** `4111111111111111`
- **Expiração:** `11/30`
- **CVV:** `123`
- **Titular:** `USUARIO SANDBOX`
- **Parcelas:** `1x`

### 5️⃣ Processar Pagamento
- Clique em "Pagar Agora"
- O SDK do Mercado Pago gerará o token automaticamente
- O pagamento será processado

### 6️⃣ Verificar Resultado
- ✅ Sucesso: Será redirecionado para `/mybookings`
- ❌ Erro: Mensagem de erro será exibida

## 📊 Fluxo Esperado

```
1. Usuário preenche dados do cartão
   ↓
2. SDK Mercado Pago gera token
   ↓
3. Token é enviado para backend
   ↓
4. Backend cria pagamento via SDK
   ↓
5. Mercado Pago processa pagamento
   ↓
6. Resultado é retornado
   ↓
7. Booking é criado/atualizado
   ↓
8. Usuário é redirecionado para /mybookings
```

## 🔍 Verificar Logs

Se houver erro, verifique os logs:

```bash
# Ver últimas linhas do log
tail -100 storage/logs/laravel.log

# Filtrar por Mercado Pago
tail -100 storage/logs/laravel.log | grep -i mercado
```

## ✅ Checklist de Teste

- [ ] Token de teste configurado corretamente
- [ ] SDK Mercado Pago inicializado
- [ ] Cartão VISA testado com sucesso
- [ ] Cartão MASTERCARD testado com sucesso
- [ ] Pagamento aprovado cria booking
- [ ] Redirecionamento para /mybookings funciona
- [ ] Dados do booking estão corretos
- [ ] Webhook recebe notificação

## 📝 Notas Importantes

1. **Tokens de teste são únicos:** Cada vez que você preenche o formulário, um novo token é gerado
2. **Cartões de teste não cobram:** Nenhuma cobrança real é feita
3. **Modo de teste:** O token começa com `TEST-` (não `APP_USR-`)
4. **Expiração:** Os cartões de teste não expiram
5. **Reutilização:** Você pode usar os mesmos dados quantas vezes quiser

## 🐛 Troubleshooting

### Erro: "bin_not_found"
- **Causa:** Cartão inválido ou BIN não reconhecido
- **Solução:** Use um dos cartões oficiais listados acima

### Erro: "invalid_token"
- **Causa:** Token expirado ou inválido
- **Solução:** Gere um novo token preenchendo o formulário novamente

### Erro: "Api error. Check response for details"
- **Causa:** Problema na requisição
- **Solução:** Verifique os logs para mais detalhes

### Pagamento não aparece em /mybookings
- **Causa:** Webhook não confirmou o pagamento
- **Solução:** Aguarde alguns segundos e atualize a página

## 🎯 Próximas Etapas

Após confirmar que o cartão funciona:
1. Testar PIX (ETAPA 3)
2. Testar Boleto (ETAPA 4)
3. Testar Carteira (ETAPA 5)
4. Implementar Device ID (ETAPA 6)
5. Testes completos (ETAPA 7)

