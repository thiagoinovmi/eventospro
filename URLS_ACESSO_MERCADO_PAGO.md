# 🔗 URLS DE ACESSO - MERCADO PAGO

## 📋 ÍNDICE DE URLS

---

## 🎯 PAINEL ADMINISTRATIVO - CONFIGURAÇÕES

### **URL Principal:**
```
https://eventos.inovmi.com.br/dashboard/mercadopago/settings
```

### **Como Acessar:**
1. Faça login como **ADMIN**
2. Vá para: **Dashboard** → **Financeiro** → **Mercado Pago**
3. Ou acesse diretamente a URL acima

### **O que você vê:**
- **Aba 1: Configurações**
  - Access Token
  - Public Key
  - Modo (Teste/Produção)
  - URL do Webhook
  - Token do Webhook
  - Botão "Testar Conexão"

- **Aba 2: Métodos de Pagamento**
  - Lista de 5 métodos (Cartão Crédito, Débito, Boleto, PIX, Carteira)
  - Toggle para habilitar/desabilitar
  - Configuração de parcelamento
  - Número máximo de parcelas

- **Aba 3: Transações**
  - Tabela com todas as transações
  - Filtros (Status, Método, Data)
  - Busca por ID/Email/Nome
  - Dashboard com estatísticas

- **Aba 4: Reembolsos**
  - Lista de reembolsos
  - Status de cada reembolso
  - Opções de ação

---

## 💳 PAINEL DO USUÁRIO - TRANSAÇÕES

### **URL:**
```
https://eventos.inovmi.com.br/mercadopago/transactions
```

### **Como Acessar:**
1. Faça login como **CLIENTE**
2. Vá para: **Painel do Usuário** → **Transações Mercado Pago**
3. Ou acesse diretamente a URL acima

### **O que você vê:**
- Lista de suas transações
- Detalhes de cada transação
- Opção para solicitar reembolso
- Status em tempo real

---

## 🛒 CHECKOUT - MERCADO PAGO

### **URL:**
```
https://eventos.inovmi.com.br/mercadopago/checkout
```

### **Como Acessar:**
1. Acesse um evento: `https://eventos.inovmi.com.br/events/{event-slug}#/checkout`
2. Selecione ingressos
3. Selecione "Mercado Pago" como método de pagamento
4. Clique em "Checkout"
5. Você será redirecionado para a página de checkout

### **O que você vê:**
- Seleção de método de pagamento
- Formulário com dados do titular
- Resumo do pedido
- Botão "Pagar Agora"

---

## 🔧 API ENDPOINTS

### **Configurações:**
```
GET  /dashboard/mercadopago/api/settings
POST /dashboard/mercadopago/api/settings
POST /dashboard/mercadopago/api/test-connection
```

### **Métodos de Pagamento:**
```
GET  /api/mercadopago/payment-methods/
GET  /api/mercadopago/payment-methods/{id}
PUT  /api/mercadopago/payment-methods/{id}
GET  /api/mercadopago/payment-methods/event/{eventId}
POST /api/mercadopago/payment-methods/event/{eventId}
PUT  /api/mercadopago/payment-methods/event/{eventId}/{methodId}
DELETE /api/mercadopago/payment-methods/event/{eventId}/{methodId}
POST /api/mercadopago/payment-methods/event/{eventId}/initialize
```

### **Checkout:**
```
POST /api/mercadopago/checkout
POST /api/mercadopago/process-payment
POST /api/mercadopago/capture-payment
```

### **Reembolsos:**
```
POST /api/mercadopago/refund
```

### **Transações:**
```
GET /api/mercadopago/transaction/{transaction_id}
GET /api/mercadopago/transactions
```

### **Webhooks:**
```
POST /webhooks/mercadopago
```

---

## 📊 PAINEL ADMIN - TRANSAÇÕES

### **URL:**
```
https://eventos.inovmi.com.br/admin/mercadopago/transactions
```

### **Como Acessar:**
1. Faça login como **ADMIN**
2. Vá para: **Dashboard** → **Financeiro** → **Mercado Pago** → **Transações**
3. Ou acesse diretamente a URL acima

### **O que você vê:**
- Dashboard com estatísticas
- Tabela de todas as transações do sistema
- Filtros avançados
- Busca por ID, Email ou Nome
- Opções para ver detalhes e solicitar reembolso

---

## 🎯 EDIÇÃO DE EVENTOS - MÉTODOS DE PAGAMENTO

### **URL:**
```
https://eventos.inovmi.com.br/events/{event-id}/edit
```

### **Como Acessar:**
1. Faça login como **ADMIN** ou **ORGANIZADOR**
2. Vá para: **Meus Eventos** → **Editar Evento**
3. Procure pela **Aba: Métodos de Pagamento**
4. Ou acesse diretamente a URL acima

### **O que você vê:**
- Aba com lista de métodos de pagamento
- Toggle para habilitar/desabilitar por evento
- Configuração de parcelamento por evento
- Botão para salvar

---

## 📱 ROTAS PRINCIPAIS

### **Rotas de Configuração:**
```
/dashboard/mercadopago/settings          → Configurações
/dashboard/mercadopago/payment-methods   → Métodos de Pagamento
```

### **Rotas de Usuário:**
```
/mercadopago/checkout                    → Checkout
/mercadopago/transactions                → Minhas Transações
```

### **Rotas de Admin:**
```
/admin/mercadopago/transactions          → Transações (Admin)
/admin/mercadopago/refunds               → Reembolsos (Admin)
```

---

## 🔐 REQUISITOS DE ACESSO

### **Para Acessar Configurações:**
- ✅ Estar logado como **ADMIN**
- ✅ Ter permissão de **SUPER_ADMIN** ou **ADMIN**

### **Para Acessar Painel do Usuário:**
- ✅ Estar logado como **CLIENTE**
- ✅ Ter pelo menos uma transação

### **Para Acessar Painel Admin:**
- ✅ Estar logado como **ADMIN**
- ✅ Ter permissão de **SUPER_ADMIN** ou **ADMIN**

### **Para Fazer Checkout:**
- ✅ Estar logado como **CLIENTE**
- ✅ Ter selecionado ingressos

---

## 🧪 TESTE RÁPIDO

### **Passo 1: Configurar Mercado Pago**
```
1. Acesse: https://eventos.inovmi.com.br/dashboard/mercadopago/settings
2. Preencha com credenciais de teste
3. Clique em "Testar Conexão"
4. Verifique se a mensagem de sucesso aparece
```

### **Passo 2: Habilitar Métodos**
```
1. Acesse: https://eventos.inovmi.com.br/dashboard/mercadopago/payment-methods
2. Habilite os métodos desejados
3. Clique em "Salvar"
```

### **Passo 3: Fazer Checkout**
```
1. Acesse um evento: https://eventos.inovmi.com.br/events/{event-slug}#/checkout
2. Selecione ingressos
3. Selecione "Mercado Pago"
4. Clique em "Checkout"
5. Preencha os dados e clique em "Pagar Agora"
```

### **Passo 4: Verificar Transação**
```
1. Acesse: https://eventos.inovmi.com.br/mercadopago/transactions
2. Verifique se sua transação aparece
3. Clique em "Ver Detalhes"
```

### **Passo 5: Verificar Admin**
```
1. Acesse: https://eventos.inovmi.com.br/admin/mercadopago/transactions
2. Verifique se a transação aparece
3. Verifique as estatísticas
```

---

## 📝 NOTAS IMPORTANTES

### **URLs de Teste vs Produção:**
- **Teste:** Use credenciais de sandbox do Mercado Pago
- **Produção:** Use credenciais de produção do Mercado Pago
- **Modo:** Configure em `/dashboard/mercadopago/settings`

### **Autenticação:**
- Todas as URLs requerem login
- Use `Authorization: Bearer {token}` para API calls
- Cookies de sessão são usados para web

### **HTTPS:**
- ✅ Todas as URLs usam HTTPS
- ✅ Certificado SSL está configurado
- ✅ Redirecionamento automático de HTTP para HTTPS

---

## 🚀 PRÓXIMAS FASES

### **FASE 7: Frontend - Admin Settings**
- [ ] Criar view com abas
- [ ] Criar componente Vue para Settings
- [ ] Criar componente Vue para Payment Methods
- [ ] Implementar formulários
- [ ] Criar Menu Financeiro no Voyager

### **FASE 8: Frontend - Checkout Transparente**
- [ ] Criar componente Vue para checkout
- [ ] Integrar SDK do Mercado Pago
- [ ] Implementar validações de formulário
- [ ] Tratamento de erros

### **FASE 9: Frontend - Painel do Usuário**
- [ ] Criar painel de transações
- [ ] Implementar visualização de detalhes
- [ ] Implementar solicitação de reembolso
- [ ] Notificações

### **FASE 10: Frontend - Edição de Eventos**
- [ ] Criar aba de métodos de pagamento
- [ ] Implementar seleção de métodos
- [ ] Salvar configurações por evento
- [ ] Validações

---

**Última atualização:** 23 de Novembro de 2025
**Versão:** 1.0
**Status:** ✅ Documentado
