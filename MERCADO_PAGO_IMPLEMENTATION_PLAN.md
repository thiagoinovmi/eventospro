# 📋 PLANO COMPLETO DE IMPLEMENTAÇÃO - MERCADO PAGO

## 🎯 OBJETIVO GERAL

Implementar integração completa do Mercado Pago seguindo o mesmo padrão do PayPal, com:
- Checkout transparente (sem sair da página)
- Painel administrativo completo (Menu Financeiro com abas)
- Controle de status de pagamentos
- Gerenciamento de reembolsos/estornos
- Validações seguras de dados
- Notificações e mensagens de erro

---

## ⚠️ PROBLEMAS IDENTIFICADOS NO TRABALHO ANTERIOR

1. **Configurações não carregam** - Falta implementação do controller/view
2. **Painel admin não funciona** - Rota não está registrada corretamente
3. **Sem menu Financeiro** - Não foi criado no Voyager
4. **Sem abas de configuração** - Layout não segue padrão do PayPal
5. **Sem integração com eventos** - Não há aba em edição de eventos
6. **Sem checkout transparente** - Apenas placeholder
7. **Sem validações de dados** - Falta CPF/CNPJ, telefone, etc
8. **Sem notificações** - Não há sistema de notificações

---

## 📊 ESTRUTURA DE BANCO DE DADOS NECESSÁRIA

### **1. Tabela: `mercadopago_settings` (Configurações Globais)**
```sql
- id (PK)
- access_token (encrypted)
- public_key (encrypted)
- webhook_token (encrypted)
- webhook_url
- mode (test/production)
- enabled (boolean)
- created_at, updated_at
```

### **2. Tabela: `mercadopago_payment_methods` (Métodos Globais)**
```sql
- id (PK)
- method_type (credit_card, debit_card, boleto, pix, mercadopago_wallet)
- enabled (boolean)
- display_name (português)
- icon (classe Font Awesome)
- description
- installments_enabled (boolean)
- max_installments (int)
- min_amount (decimal)
- max_amount (decimal)
- created_at, updated_at
```

### **3. Tabela: `event_payment_methods` (Métodos por Evento)**
```sql
- id (PK)
- event_id (FK → events)
- payment_method_id (FK → mercadopago_payment_methods)
- enabled (boolean)
- installments_enabled (boolean)
- max_installments (int)
- created_at, updated_at
```

### **4. Tabela: `mercadopago_transactions` (Transações)**
```sql
- id (PK)
- booking_id (FK → bookings)
- user_id (FK → users)
- event_id (FK → events)
- payment_id (string - ID do Mercado Pago)
- merchant_order_id (string)
- status (pending, authorized, approved, rejected, cancelled, refunded, in_process)
- status_detail (string - motivo do status)
- amount (decimal)
- currency (string - BRL)
- payment_method_type (credit_card, debit_card, boleto, pix, wallet)
- installments (int)
- payer_email (string)
- payer_name (string)
- payer_document (string - CPF/CNPJ)
- payer_phone (string)
- card_last_four (string - últimos 4 dígitos)
- card_brand (string - Visa, Mastercard, etc)
- notification_id (string)
- webhook_received (boolean)
- webhook_data (json)
- created_at, updated_at
```

### **5. Tabela: `mercadopago_refunds` (Reembolsos/Estornos)**
```sql
- id (PK)
- transaction_id (FK → mercadopago_transactions)
- booking_id (FK → bookings)
- amount (decimal)
- reason (user_request, payment_error, duplicate, fraud, etc)
- status (pending, approved, rejected, cancelled)
- refund_id (string - ID do reembolso no Mercado Pago)
- notes (text)
- requested_by (FK → users)
- processed_by (FK → users)
- requested_at (timestamp)
- processed_at (timestamp)
- created_at, updated_at
```

### **6. Tabela: `mercadopago_webhooks` (Log de Webhooks)**
```sql
- id (PK)
- event_type (string - payment.created, payment.updated, etc)
- resource_id (string)
- payload (json)
- processed (boolean)
- error_message (text)
- created_at, updated_at
```

---

## 🏗️ ESTRUTURA DE ARQUIVOS NECESSÁRIA

### **Backend - Controllers**
```
/eventmie-pro/src/Http/Controllers/
├── MercadoPagoSettingsController.php (NEW - Configurações)
├── MercadoPagoCheckoutController.php (NEW - Checkout)
├── MercadoPagoTransactionController.php (NEW - Transações)
├── MercadoPagoWebhookController.php (NEW - Webhooks)
└── MercadoPagoRefundController.php (NEW - Reembolsos)
```

### **Backend - Models**
```
/app/Models/
├── MercadoPagoSetting.php (NEW)
├── MercadoPagoPaymentMethod.php (NEW)
├── EventPaymentMethod.php (NEW)
├── MercadoPagoTransaction.php (NEW)
├── MercadoPagoRefund.php (NEW)
└── MercadoPagoWebhook.php (NEW)
```

### **Backend - Services**
```
/eventmie-pro/src/Services/
├── MercadoPagoService.php (NEW - Serviço principal)
├── MercadoPagoWebhookService.php (NEW - Processamento de webhooks)
└── MercadoPagoValidationService.php (NEW - Validações)
```

### **Backend - Requests**
```
/eventmie-pro/src/Http/Requests/
├── StoreMercadoPagoSettingRequest.php (NEW)
├── ProcessPaymentRequest.php (NEW)
└── RefundRequest.php (NEW)
```

### **Frontend - Views**
```
/eventmie-pro/resources/views/
├── admin/
│   └── mercadopago/
│       ├── settings.blade.php (NEW - Configurações com abas)
│       ├── payment-methods.blade.php (NEW - Métodos de pagamento)
│       ├── transactions.blade.php (NEW - Transações)
│       └── refunds.blade.php (NEW - Reembolsos)
└── mercadopago/
    ├── checkout.blade.php (MODIFY - Checkout transparente)
    └── transactions.blade.php (MODIFY - Painel do usuário)
```

### **Frontend - Vue Components**
```
/eventmie-pro/resources/js/
├── admin/
│   └── MercadoPago/
│       ├── Settings.vue (NEW)
│       ├── PaymentMethods.vue (NEW)
│       ├── Transactions.vue (NEW)
│       └── Refunds.vue (NEW)
├── checkout/
│   └── MercadoPagoCheckout.vue (NEW - Checkout transparente)
└── events_manage/
    └── MercadoPagoMethods.vue (NEW - Aba em edição de eventos)
```

### **Frontend - Migrations**
```
/database/migrations/
├── 2025_11_23_create_mercadopago_settings_table.php (NEW)
├── 2025_11_23_create_mercadopago_payment_methods_table.php (NEW)
├── 2025_11_23_create_event_payment_methods_table.php (NEW)
├── 2025_11_23_create_mercadopago_transactions_table.php (NEW)
├── 2025_11_23_create_mercadopago_refunds_table.php (NEW)
└── 2025_11_23_create_mercadopago_webhooks_table.php (NEW)
```

---

## 🔄 FLUXO DE IMPLEMENTAÇÃO (PASSO A PASSO)

### **FASE 1: Preparação e Banco de Dados**
- [ ] Criar migrations
- [ ] Criar models
- [ ] Criar seeders (dados iniciais)
- [ ] Validar estrutura

### **FASE 2: Backend - Configurações**
- [ ] Criar MercadoPagoSettingsController
- [ ] Criar MercadoPagoService
- [ ] Implementar CRUD de configurações
- [ ] Testar conexão com Mercado Pago

### **FASE 3: Backend - Métodos de Pagamento**
- [ ] Criar MercadoPagoPaymentMethodController
- [ ] Implementar CRUD de métodos globais
- [ ] Implementar CRUD de métodos por evento
- [ ] Validações

### **FASE 4: Backend - Checkout**
- [ ] Criar MercadoPagoCheckoutController
- [ ] Implementar lógica de criação de pagamento
- [ ] Implementar validações de dados
- [ ] Integrar com BookingsController

### **FASE 5: Backend - Webhooks**
- [ ] Criar MercadoPagoWebhookController
- [ ] Implementar processamento de webhooks
- [ ] Validar assinatura
- [ ] Atualizar status de transações

### **FASE 6: Backend - Reembolsos**
- [ ] Criar MercadoPagoRefundController
- [ ] Implementar lógica de reembolso
- [ ] Implementar validações
- [ ] Integrar com webhooks

### **FASE 7: Frontend - Admin Settings**
- [ ] Criar view com abas (Settings, Payment Methods, Transactions, Refunds)
- [ ] Criar componentes Vue
- [ ] Implementar formulários
- [ ] Adicionar menu Financeiro no Voyager

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

### **FASE 11: Notificações e Mensagens**
- [ ] Implementar sistema de notificações
- [ ] Criar templates de email
- [ ] Mensagens de erro personalizadas
- [ ] Logs

### **FASE 12: Testes e Refinamentos**
- [ ] Testes manuais
- [ ] Testes de segurança
- [ ] Testes de performance
- [ ] Documentação

---

## 💡 SUGESTÕES ADICIONAIS

### **1. Segurança**
- [ ] Usar HTTPS obrigatório
- [ ] Validar CSP (Content Security Policy)
- [ ] Criptografar tokens no banco
- [ ] Rate limiting em endpoints de pagamento
- [ ] Validação de IP
- [ ] Logging de tentativas falhadas

### **2. Validações de Dados**
- [ ] CPF/CNPJ obrigatório
- [ ] Telefone com validação
- [ ] Email com confirmação
- [ ] Endereço completo
- [ ] Validação de documento

### **3. Checkout Transparente**
- [ ] Usar iframe do Mercado Pago
- [ ] Validação de cartão no frontend
- [ ] Máscara de entrada de dados
- [ ] Feedback visual em tempo real
- [ ] Suporte a 3D Secure

### **4. Relatórios**
- [ ] Relatório de vendas por período
- [ ] Relatório de reembolsos
- [ ] Relatório por método de pagamento
- [ ] Relatório por evento
- [ ] Exportar em PDF/Excel

### **5. Integração com Booking**
- [ ] Atualizar status do booking automaticamente
- [ ] Enviar ingresso após pagamento
- [ ] Integrar com sistema de check-in
- [ ] Cancelamento automático se pagamento falhar

### **6. Notificações**
- [ ] Email de confirmação de pagamento
- [ ] Email de reembolso solicitado
- [ ] Email de reembolso processado
- [ ] Notificação no painel
- [ ] SMS (opcional)

### **7. Modo Sandbox**
- [ ] Ambiente de teste separado
- [ ] Cartões de teste do Mercado Pago
- [ ] Webhooks de teste
- [ ] Dados fictícios

### **8. Compatibilidade**
- [ ] Responsivo em mobile
- [ ] Compatível com navegadores antigos
- [ ] Acessibilidade (WCAG)
- [ ] Suporte a múltiplos idiomas

---

## 📈 ESTIMATIVA DE TEMPO

| Fase | Tempo Estimado |
|------|----------------|
| 1. Preparação | 1-2 horas |
| 2. Configurações | 2-3 horas |
| 3. Métodos de Pagamento | 2-3 horas |
| 4. Checkout | 3-4 horas |
| 5. Webhooks | 2-3 horas |
| 6. Reembolsos | 2-3 horas |
| 7. Admin Frontend | 3-4 horas |
| 8. Checkout Frontend | 4-5 horas |
| 9. Painel Usuário | 2-3 horas |
| 10. Edição Eventos | 2-3 horas |
| 11. Notificações | 2-3 horas |
| 12. Testes | 3-4 horas |
| **TOTAL** | **30-40 horas** |

---

## ✅ CHECKLIST PRÉ-DESENVOLVIMENTO

- [ ] Credenciais do Mercado Pago (sandbox)
- [ ] Documentação do Mercado Pago lida
- [ ] Banco de dados preparado
- [ ] Estrutura de arquivos criada
- [ ] Migrations prontas
- [ ] Models prontos
- [ ] Rotas definidas
- [ ] Componentes Vue estruturados
- [ ] Views estruturadas

---

## 🚀 PRÓXIMOS PASSOS

1. **Você aprova este plano?**
2. **Quer que eu comece pela FASE 1?**
3. **Tem alguma sugestão a adicionar?**

---

**Data:** 23 de Novembro de 2025
**Status:** Planejamento
**Prioridade:** Alta
