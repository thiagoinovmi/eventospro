# ⚙️ CONFIGURAÇÃO MERCADO PAGO - GUIA COMPLETO

## 📋 RESUMO

As configurações do Mercado Pago foram criadas no banco de dados, mas os **valores estão vazios**. Você precisa preenchê-los manualmente no painel administrativo.

---

## 🔑 ONDE ENCONTRAR AS CREDENCIAIS

### **No Painel do Mercado Pago:**

1. Acesse: https://www.mercadopago.com.br/
2. Faça login com sua conta
3. Vá para: **Configurações** → **Credenciais**
4. Você verá:
   - **Access Token** (Começa com `APP_USR-`)
   - **Public Key** (Começa com `APP_USR-`)

---

## 🎯 COMO CONFIGURAR NO PAINEL ADMINISTRATIVO

### **Passo 1: Acessar as Configurações**

URL:
```
https://eventos.inovmi.com.br/admin/settings
```

### **Passo 2: Procurar pela Aba "Mercado Pago"**

Na página de settings, você verá várias abas no topo:
- Site Settings
- Email Settings
- Payment Settings (PayPal)
- **Mercado Pago** ← CLIQUE AQUI

### **Passo 3: Preencher os Campos**

Na aba "Mercado Pago", você encontrará:

#### **1. Access Token** (Campo de Senha)
- Cole o token do Mercado Pago
- Exemplo: `APP_USR-1234567890123456789012345678901234567890`

#### **2. Public Key** (Campo de Texto)
- Cole a chave pública do Mercado Pago
- Exemplo: `APP_USR-9876543210987654321098765432109876543210`

#### **3. Modo de Operação** (Select)
- **Teste (Sandbox)** - Para desenvolvimento
- **Produção** - Para ambiente de produção

#### **4. URL do Webhook** (Readonly)
- Será preenchida automaticamente
- Exemplo: `https://eventos.inovmi.com.br/webhooks/mercadopago`

#### **5. Token do Webhook** (Campo de Senha)
- Deixe em branco por enquanto (será configurado no Mercado Pago)

#### **6. Habilitar Mercado Pago** (Toggle)
- **Habilitado** (verde) - Ativa o Mercado Pago
- **Desabilitado** (cinza) - Desativa o Mercado Pago

### **Passo 4: Configurar Métodos de Pagamento**

Ainda na aba "Mercado Pago", você verá configurações para cada método:

#### **Cartão de Crédito**
- Habilitado: ✅ (já vem marcado)
- Parcelamento: ✅ (já vem marcado)
- Máx. Parcelas: 12

#### **Cartão de Débito**
- Habilitado: ✅ (já vem marcado)
- Parcelamento: ❌ (não marcado)
- Máx. Parcelas: 1

#### **Boleto**
- Habilitado: ✅ (já vem marcado)
- Parcelamento: ❌ (não marcado)
- Máx. Parcelas: 1

#### **PIX**
- Habilitado: ✅ (já vem marcado)
- Parcelamento: ❌ (não marcado)
- Máx. Parcelas: 1

#### **Carteira Mercado Pago**
- Habilitado: ✅ (já vem marcado)
- Parcelamento: ✅ (já vem marcado)
- Máx. Parcelas: 12

### **Passo 5: Salvar Configurações**

Clique no botão **"Save"** ou **"Salvar"** no final da página.

---

## 🧪 TESTE RÁPIDO

### **Verificar se Está Funcionando:**

1. Acesse um evento: `https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout`
2. Selecione ingressos
3. Você deve ver a opção **"Mercado Pago"** aparecendo

Se não aparecer:
- Verifique se o Access Token e Public Key foram preenchidos
- Verifique se o toggle "Habilitar Mercado Pago" está ativado
- Limpe o cache do navegador (Ctrl+Shift+Delete)

---

## 🔐 CREDENCIAIS DE TESTE

### **Para Testar em Modo Sandbox:**

Use estas credenciais de teste do Mercado Pago:

**Access Token de Teste:**
```
APP_USR-4366590-111111111111111111111111111111-123456789
```

**Public Key de Teste:**
```
APP_USR-4366590-222222222222222222222222222222-123456789
```

**Cartões de Teste:**

Cartão Aprovado:
```
Número: 4111 1111 1111 1111
Validade: 11/25
CVV: 123
```

Cartão Recusado:
```
Número: 5555 5555 5555 4444
Validade: 11/25
CVV: 123
```

---

## ⚠️ TROUBLESHOOTING

### **Problema: "Mercado Pago não aparece no checkout"**

**Solução:**
1. Verifique se Access Token foi preenchido
2. Verifique se Public Key foi preenchida
3. Verifique se o toggle "Habilitar Mercado Pago" está ativado
4. Limpe o cache do navegador
5. Recarregue a página

### **Problema: "Erro ao processar pagamento"**

**Solução:**
1. Verifique se as credenciais estão corretas
2. Verifique se o modo está correto (Teste/Produção)
3. Verifique os logs em `storage/logs/laravel.log`
4. Teste com um cartão de teste

### **Problema: "Public Key não definida"**

**Solução:**
1. Certifique-se de que a Public Key foi preenchida
2. Aguarde alguns segundos e recarregue a página
3. Limpe o cache do navegador

---

## 📝 CAMPOS NA ABA MERCADO PAGO

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Access Token | Senha | ✅ Sim | Token de acesso do Mercado Pago |
| Public Key | Texto | ✅ Sim | Chave pública do Mercado Pago |
| Modo de Operação | Select | ✅ Sim | Teste ou Produção |
| URL do Webhook | Readonly | ❌ Não | Preenchida automaticamente |
| Token do Webhook | Senha | ❌ Não | Para validar webhooks |
| Habilitar Mercado Pago | Toggle | ✅ Sim | Ativa/desativa o Mercado Pago |

---

## 🔄 FLUXO APÓS CONFIGURAÇÃO

```
1. Usuário acessa evento
   ↓
2. EventsController verifica is_mercadopago()
   ↓
3. Verifica se Access Token e Public Key estão preenchidos
   ↓
4. Se sim, passa is_mercadopago = 1 para view
   ↓
5. TicketList.vue exibe opção "Mercado Pago"
   ↓
6. Usuário seleciona Mercado Pago
   ↓
7. Clica em "Checkout"
   ↓
8. CheckoutMercadoPago.vue é exibido
   ↓
9. Usuário preenche dados e clica "Pagar Agora"
```

---

## ✅ CHECKLIST DE CONFIGURAÇÃO

- [ ] Acessei https://eventos.inovmi.com.br/admin/settings
- [ ] Encontrei a aba "Mercado Pago"
- [ ] Preenchei o Access Token
- [ ] Preenchei a Public Key
- [ ] Selecionei o Modo (Teste ou Produção)
- [ ] Habilitei o toggle "Habilitar Mercado Pago"
- [ ] Cliquei em "Salvar"
- [ ] Acessei um evento e verifiquei se "Mercado Pago" aparece

---

**Última atualização:** 23 de Novembro de 2025
**Versão:** 1.0
**Status:** ✅ Pronto para Uso
