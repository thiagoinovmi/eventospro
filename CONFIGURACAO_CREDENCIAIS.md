# 🔐 Configuração de Credenciais - Mercado Pago

## 📍 Onde as Credenciais Estão Armazenadas

As credenciais do Mercado Pago **NÃO estão no .env**, mas sim no **banco de dados** (tabela `settings`).

### Acesso via Painel Admin
```
https://eventos.inovmi.com.br/dashboard/mercadopago/api/settings
```

Ou via Menu:
```
Dashboard → Mercado Pago → Configurações
```

## ✅ Verificar Credenciais Atuais

### Via Banco de Dados
```sql
SELECT * FROM settings WHERE key LIKE '%mercadopago%';
```

Deve retornar:
```
key: mercadopago.access_token
value: TEST-530080609977173-112407-f564129d214fe0aadddb9edc61bd378b-187707685

key: mercadopago.public_key
value: TEST-xxxxxxxxxxxxxxxxxxx
```

### Via Painel Admin
1. Acesse: `https://eventos.inovmi.com.br/dashboard/mercadopago/api/settings`
2. Verifique os campos:
   - **Access Token**: deve começar com `TEST-`
   - **Public Key**: deve começar com `TEST-`
   - **Modo**: deve estar em `Teste`

## 🔧 Se Precisar Atualizar

### Via Painel Admin (Recomendado)
1. Acesse o painel
2. Preencha os campos
3. Clique em "Salvar"
4. Clique em "Testar Conexão"

### Via Banco de Dados (Se Necessário)
```sql
UPDATE settings 
SET value = 'TEST-530080609977173-112407-f564129d214fe0aadddb9edc61bd378b-187707685'
WHERE key = 'mercadopago.access_token';

UPDATE settings 
SET value = 'TEST-xxxxxxxxxxxxxxxxxxx'
WHERE key = 'mercadopago.public_key';
```

## 🎯 Credenciais Corretas para Teste

### Access Token (Backend)
```
TEST-530080609977173-112407-f564129d214fe0aadddb9edc61bd378b-187707685
```

### Public Key (Frontend)
```
TEST-xxxxxxxxxxxxxxxxxxx
```

**Importante:** Ambas devem começar com `TEST-` para ambiente de teste.

## ✅ Checklist

- [ ] Access Token começa com `TEST-`
- [ ] Public Key começa com `TEST-`
- [ ] Modo está em `Teste`
- [ ] Conexão testada com sucesso
- [ ] Frontend está usando a mesma Public Key
- [ ] Backend está usando o mesmo Access Token

## 🚀 Próximo Passo

Após confirmar as credenciais, siga o **CHECKLIST_FINAL_MERCADOPAGO.md** para testar o fluxo completo.

