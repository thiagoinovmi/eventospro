# 🔑 COMO SALVAR OS TOKENS DO MERCADO PAGO

## ⚠️ PROBLEMA IDENTIFICADO

Os tokens estão **VAZIOS** no banco de dados:

```
mercadopago.access_token = (vazio)
mercadopago.public_key = (vazio)
```

Isso significa que:
1. Você não preencheu no formulário
2. Ou o formulário não salvou corretamente

---

## ✅ SOLUÇÃO 1: PREENCHER VIA FORMULÁRIO VOYAGER

### **Passo 1: Acessar Settings**

```
https://eventos.inovmi.com.br/admin/settings
```

### **Passo 2: Procurar pela Aba "Mercado Pago"**

Na página de settings, você verá várias abas. Procure por **"Mercado Pago"**

### **Passo 3: Preencher os Campos**

**Campo 1: Access Token**
- Tipo: Campo de Senha
- Valor: Cole o token da sua conta Mercado Pago
- Exemplo: `APP_USR-1234567890123456789012345678901234567890`

**Campo 2: Public Key**
- Tipo: Campo de Texto
- Valor: Cole a chave pública da sua conta Mercado Pago
- Exemplo: `APP_USR-9876543210987654321098765432109876543210`

### **Passo 4: Clicar em "Salvar"**

Procure pelo botão "Save" ou "Salvar" no final da página

### **Passo 5: Verificar se Salvou**

Após clicar em "Salvar", você deve ver uma mensagem de sucesso

---

## ✅ SOLUÇÃO 2: SALVAR VIA LINHA DE COMANDO (Alternativa)

Se o formulário não funcionar, você pode salvar diretamente via MySQL:

### **Comando para Salvar Access Token:**

```bash
cd /www/wwwroot/eventos.inovmi.com.br
mysql -h 127.0.0.1 -u sql_eventos -p8261d7f2f44d sql_eventos -e "UPDATE settings SET value = 'SEU_ACCESS_TOKEN_AQUI' WHERE \`key\` = 'mercadopago.access_token';"
```

**Substitua `SEU_ACCESS_TOKEN_AQUI` pelo seu token real**

### **Comando para Salvar Public Key:**

```bash
mysql -h 127.0.0.1 -u sql_eventos -p8261d7f2f44d sql_eventos -e "UPDATE settings SET value = 'SUA_PUBLIC_KEY_AQUI' WHERE \`key\` = 'mercadopago.public_key';"
```

**Substitua `SUA_PUBLIC_KEY_AQUI` pela sua chave real**

---

## 🔍 VERIFICAR SE FOI SALVO

Execute este comando para verificar:

```bash
mysql -h 127.0.0.1 -u sql_eventos -p8261d7f2f44d sql_eventos -e "SELECT \`key\`, value FROM settings WHERE \`key\` IN ('mercadopago.access_token', 'mercadopago.public_key');"
```

**Resultado esperado:**
```
mercadopago.access_token | APP_USR-... (PREENCHIDO)
mercadopago.public_key   | APP_USR-... (PREENCHIDO)
```

---

## 🔑 ONDE ENCONTRAR SUAS CREDENCIAIS

### **No Painel do Mercado Pago:**

1. Acesse: https://www.mercadopago.com.br/
2. Faça login com sua conta
3. Vá para: **Configurações** → **Credenciais**
4. Você verá:
   - **Access Token** (Começa com `APP_USR-`)
   - **Public Key** (Começa com `APP_USR-`)

### **Modo Teste vs Produção:**

- **Modo Teste (Sandbox):** Use credenciais de teste
- **Modo Produção:** Use credenciais de produção

---

## 🧪 CREDENCIAIS DE TESTE

Se quiser testar antes de usar credenciais reais:

**Access Token (Teste):**
```
APP_USR-4366590-111111111111111111111111111111-123456789
```

**Public Key (Teste):**
```
APP_USR-4366590-222222222222222222222222222222-123456789
```

---

## 🎯 PRÓXIMO PASSO

1. **Preencha os tokens** (via formulário ou linha de comando)
2. **Verifique** se foram salvos
3. **Acesse o checkout** e a opção "Mercado Pago" deve aparecer!

---

## ⚠️ TROUBLESHOOTING

### **Problema: "Tokens ainda estão vazios"**

**Solução:**
1. Verifique se você preencheu corretamente
2. Verifique se clicou em "Salvar"
3. Tente salvar via linha de comando (Solução 2)
4. Limpe o cache do navegador

### **Problema: "Erro ao salvar no formulário"**

**Solução:**
1. Use a linha de comando (Solução 2)
2. Verifique os logs em `storage/logs/laravel.log`
3. Tente em outro navegador

---

**Status:** ⏳ Aguardando Tokens
**Data:** 23 de Novembro de 2025
