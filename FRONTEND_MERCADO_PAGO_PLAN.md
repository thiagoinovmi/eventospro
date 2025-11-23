# 🎨 PLANO DETALHADO - FRONTEND MERCADO PAGO

## 📋 ESTRUTURA DO FRONTEND

O frontend será dividido em **4 telas principais**, cada uma com sua própria responsabilidade:

---

## 1️⃣ **TELA 1: ADMIN - CONFIGURAÇÕES MERCADO PAGO**

### **URL:**
```
https://eventos.inovmi.com.br/dashboard/mercadopago/settings
```

### **Localização:**
```
eventmie-pro/resources/views/mercadopago/admin/settings.blade.php
eventmie-pro/resources/js/components/MercadoPago/AdminSettings.vue
```

### **Estrutura de Abas:**

#### **Aba 1: Configurações Globais**
- [ ] Access Token (input text, masked)
- [ ] Public Key (input text)
- [ ] Modo (select: Teste/Produção)
- [ ] URL do Webhook (readonly)
- [ ] Token do Webhook (input text, masked)
- [ ] Botão "Testar Conexão"
- [ ] Botão "Salvar"

#### **Aba 2: Métodos de Pagamento Globais**
- [ ] Tabela com 5 métodos:
  - Cartão de Crédito
  - Cartão de Débito
  - Boleto
  - PIX
  - Carteira Mercado Pago
- [ ] Colunas: Nome, Habilitado (toggle), Parcelamento (toggle), Máx Parcelas (input)
- [ ] Botão "Salvar"

#### **Aba 3: Transações (Admin)**
- [ ] Dashboard com estatísticas:
  - Total de transações
  - Total aprovado
  - Total reembolsado
  - Reembolsos pendentes
- [ ] Tabela com filtros:
  - Status (select)
  - Método de Pagamento (select)
  - Data Inicial (date)
  - Data Final (date)
  - Busca (text: ID, Email, Nome)
- [ ] Colunas: ID, Cliente, Evento, Valor, Status, Data, Ações
- [ ] Ações: Ver Detalhes, Reembolsar

#### **Aba 4: Reembolsos (Admin)**
- [ ] Tabela com reembolsos:
  - ID do Reembolso
  - Transação
  - Cliente
  - Valor
  - Motivo
  - Status
  - Data
- [ ] Ações: Ver Detalhes, Cancelar

### **Componentes Vue Necessários:**
```
AdminSettings.vue
  ├── SettingsTab.vue
  ├── PaymentMethodsTab.vue
  ├── TransactionsTab.vue
  └── RefundsTab.vue
```

### **API Calls:**
```
GET  /dashboard/mercadopago/api/settings
POST /dashboard/mercadopago/api/settings
POST /dashboard/mercadopago/api/test-connection
GET  /dashboard/mercadopago/api/payment-methods
PUT  /dashboard/mercadopago/api/payment-methods/{id}
GET  /admin/mercadopago/api/transactions
GET  /admin/mercadopago/api/stats
```

---

## 2️⃣ **TELA 2: ORGANIZADOR/ADMIN - EDIÇÃO DE EVENTO**

### **URL:**
```
https://eventos.inovmi.com.br/events/{event-id}/edit
```

### **Localização:**
```
eventmie-pro/resources/js/components/Events/EventPaymentMethods.vue
```

### **Estrutura:**

#### **Aba: Métodos de Pagamento do Evento**
- [ ] Tabela com 5 métodos:
  - Nome do Método
  - Habilitado (toggle)
  - Parcelamento (toggle)
  - Máx Parcelas (input)
- [ ] Botão "Inicializar com Padrões Globais"
- [ ] Botão "Salvar"

### **Componentes Vue Necessários:**
```
EventPaymentMethods.vue
```

### **API Calls:**
```
GET  /api/mercadopago/payment-methods/event/{eventId}
POST /api/mercadopago/payment-methods/event/{eventId}
PUT  /api/mercadopago/payment-methods/event/{eventId}/{methodId}
DELETE /api/mercadopago/payment-methods/event/{eventId}/{methodId}
POST /api/mercadopago/payment-methods/event/{eventId}/initialize
```

---

## 3️⃣ **TELA 3: CLIENTE - CHECKOUT TRANSPARENTE**

### **URL:**
```
https://eventos.inovmi.com.br/events/{event-slug}#/checkout
```

### **Localização:**
```
eventmie-pro/resources/js/components/Events/CheckoutMercadoPago.vue
```

### **Estrutura:**

#### **Seção 1: Resumo do Pedido**
- [ ] Evento (nome, data)
- [ ] Ingressos (quantidade, tipo)
- [ ] Subtotal
- [ ] Taxas
- [ ] Total

#### **Seção 2: Seleção de Método de Pagamento**
- [ ] Radio buttons com métodos habilitados:
  - Cartão de Crédito
  - Cartão de Débito
  - Boleto
  - PIX
  - Carteira Mercado Pago

#### **Seção 3: Formulário de Pagamento**
- [ ] Nome Completo (input text)
- [ ] Email (input email)
- [ ] CPF (input text, masked)
- [ ] Telefone (input text, masked)
- [ ] Número do Cartão (input text, masked)
- [ ] Validade (input text, MM/YY)
- [ ] CVV (input text, masked)
- [ ] Parcelamento (select, se habilitado)
- [ ] Checkbox: Salvar cartão (opcional)

#### **Seção 4: Ações**
- [ ] Botão "Voltar"
- [ ] Botão "Pagar Agora"
- [ ] Spinner de carregamento

### **Componentes Vue Necessários:**
```
CheckoutMercadoPago.vue
  ├── OrderSummary.vue
  ├── PaymentMethodSelector.vue
  ├── PaymentForm.vue
  └── LoadingSpinner.vue
```

### **Integração com SDK:**
```javascript
// Mercado Pago SDK
<script src="https://sdk.mercadopago.com/js/v2"></script>

// Inicializar
const mp = new MercadoPago('PUBLIC_KEY');

// Criar cardform
const cardform = mp.cardform({
  amount: "100.00",
  autoMount: true,
  form: {
    id: "form-checkout",
    cardNumber: {
      id: "cardNumber",
      placeholder: "Número do cartão"
    },
    expirationDate: {
      id: "expirationDate",
      placeholder: "MM/YY"
    },
    securityCode: {
      id: "securityCode",
      placeholder: "CVV"
    },
    cardholderName: {
      id: "cardholderName",
      placeholder: "Nome do titular"
    },
    cardholderEmail: {
      id: "cardholderEmail",
      placeholder: "Email"
    }
  },
  callbacks: {
    onFormMounted: error => {},
    onSubmit: event => {},
    onFetching: resource => {},
    onError: error => {}
  }
});
```

### **API Calls:**
```
GET  /api/mercadopago/payment-methods/event/{eventId}
POST /api/mercadopago/checkout
POST /api/mercadopago/process-payment
```

---

## 4️⃣ **TELA 4: CLIENTE - PAINEL DE TRANSAÇÕES**

### **URL:**
```
https://eventos.inovmi.com.br/mercadopago/transactions
```

### **Localização:**
```
eventmie-pro/resources/views/mercadopago/user/transactions.blade.php
eventmie-pro/resources/js/components/User/UserTransactions.vue
```

### **Estrutura:**

#### **Seção 1: Filtros**
- [ ] Status (select)
- [ ] Data Inicial (date)
- [ ] Data Final (date)
- [ ] Busca (text)

#### **Seção 2: Tabela de Transações**
- [ ] Colunas: ID, Evento, Valor, Método, Status, Data, Ações
- [ ] Paginação

#### **Seção 3: Modal de Detalhes**
- [ ] ID da Transação
- [ ] Evento
- [ ] Valor
- [ ] Método de Pagamento
- [ ] Status
- [ ] Data
- [ ] Botão "Solicitar Reembolso" (se aprovado)

#### **Seção 4: Modal de Reembolso**
- [ ] Valor (pré-preenchido, editável)
- [ ] Motivo (select)
- [ ] Observações (textarea)
- [ ] Botão "Solicitar Reembolso"

### **Componentes Vue Necessários:**
```
UserTransactions.vue
  ├── TransactionsList.vue
  ├── TransactionDetails.vue
  └── RefundRequest.vue
```

### **API Calls:**
```
GET /api/mercadopago/transactions
GET /api/mercadopago/transaction/{transaction_id}
POST /api/mercadopago/refund
```

---

## 📁 ESTRUTURA DE ARQUIVOS

```
eventmie-pro/
├── resources/
│   ├── views/
│   │   ├── mercadopago/
│   │   │   ├── admin/
│   │   │   │   └── settings.blade.php
│   │   │   ├── user/
│   │   │   │   └── transactions.blade.php
│   │   │   └── checkout.blade.php
│   │   └── events/
│   │       └── edit-payment-methods.blade.php
│   └── js/
│       └── components/
│           ├── MercadoPago/
│           │   ├── AdminSettings.vue
│           │   ├── SettingsTab.vue
│           │   ├── PaymentMethodsTab.vue
│           │   ├── TransactionsTab.vue
│           │   └── RefundsTab.vue
│           ├── Events/
│           │   ├── EventPaymentMethods.vue
│           │   └── CheckoutMercadoPago.vue
│           └── User/
│               ├── UserTransactions.vue
│               ├── TransactionsList.vue
│               ├── TransactionDetails.vue
│               └── RefundRequest.vue
```

---

## 🔄 FLUXO DE DADOS

### **Admin Settings:**
```
AdminSettings.vue
  ↓
API: GET /dashboard/mercadopago/api/settings
  ↓
Exibir dados em abas
  ↓
Usuário edita
  ↓
API: POST /dashboard/mercadopago/api/settings
  ↓
Salvar e mostrar sucesso
```

### **Checkout:**
```
CheckoutMercadoPago.vue
  ↓
Carregar métodos de pagamento
  ↓
API: GET /api/mercadopago/payment-methods/event/{eventId}
  ↓
Usuário seleciona método
  ↓
Usuário preenche formulário
  ↓
API: POST /api/mercadopago/checkout (criar token)
  ↓
Integrar com SDK do Mercado Pago
  ↓
Usuário clica "Pagar Agora"
  ↓
API: POST /api/mercadopago/process-payment
  ↓
Webhook: Mercado Pago notifica
  ↓
Atualizar status
  ↓
Redirecionar para sucesso/erro
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### **Fase 7.1: Admin Settings** ✅ CONCLUÍDA
- [x] Criar componente Vue `AdminSettings.vue` ✅
- [x] Criar componente `SettingsTab.vue` ✅
- [x] Criar componente `PaymentMethodsTab.vue` ✅
- [x] Criar componente `TransactionsTab.vue` ✅
- [x] Criar componente `RefundsTab.vue` ✅
- [ ] Testar abas
- [ ] Testar API calls
- [ ] Registrar componentes no app.js

### **Fase 7.2: Event Payment Methods**
- [ ] Criar componente Vue EventPaymentMethods
- [ ] Integrar na tela de edição de eventos
- [ ] Testar API calls

### **Fase 7.3: Checkout Transparente**
- [ ] Criar view blade checkout
- [ ] Criar componente Vue CheckoutMercadoPago
- [ ] Integrar SDK do Mercado Pago
- [ ] Criar componente PaymentForm
- [ ] Testar validações
- [ ] Testar integração com SDK

### **Fase 7.4: Painel do Usuário**
- [ ] Criar view blade transactions
- [ ] Criar componente Vue UserTransactions
- [ ] Criar componente TransactionsList
- [ ] Criar componente TransactionDetails
- [ ] Criar componente RefundRequest
- [ ] Testar API calls

---

## 🚀 PRÓXIMAS ETAPAS

1. Revisar e corrigir rotas em `eventmie.php`
2. Criar views blade
3. Criar componentes Vue
4. Integrar com APIs
5. Testar fluxos completos

---

**Última atualização:** 23 de Novembro de 2025
**Versão:** 1.0
**Status:** 📋 Planejamento
