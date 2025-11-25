# 📊 ANÁLISE - TABELAS MERCADO PAGO

## 🔍 SITUAÇÃO ATUAL

### Configurações Sendo Usadas
Atualmente, **TODAS** as configurações estão sendo lidas da tabela `settings` (Voyager):
- `setting('mercadopago.access_token')` - Token de acesso
- `setting('mercadopago.public_key')` - Chave pública
- `setting('mercadopago.mode')` - Modo (test/production)
- `setting('mercadopago.webhook_url')` - URL do webhook
- `setting('mercadopago.webhook_token')` - Token do webhook
- `setting('mercadopago.enabled')` - Habilitado/Desabilitado

### Onde São Usadas
1. **BookingsController.php**
   - Linha 1149: `MercadoPagoSetting::first()` - Verifica se está habilitado
   - Linha 1281: `setting('mercadopago.access_token')` - Obtém token
   - Linha 1491: `setting('mercadopago.access_token')` - Processamento de cartão
   - Linha 1692: `setting('mercadopago.access_token')` - Detecção de brand
   - Linha 1742: `setting('mercadopago.access_token')` - Débito
   - Linha 2010: `setting('mercadopago.access_token')` - PIX

2. **MercadoPagoSettingsController.php**
   - Linha 69-80: Salva configurações na tabela `settings`
   - Linha 112-126: Lê de `MercadoPagoSetting` model

3. **MercadoPagoController.php**
   - Linha 90: `$this->mercadoPagoService->getPublicKey()` - Obtém chave pública

---

## 📋 TABELAS CRIADAS

### 1. `mercadopago_settings`
```sql
- id (PK)
- access_token (varchar)
- public_key (varchar)
- mode (enum: test/production)
- webhook_url (varchar)
- webhook_token (varchar)
- enabled (boolean)
- created_at, updated_at
```

**Status:** ❌ VAZIA (não é usada atualmente)

### 2. `mercadopago_payment_methods`
```sql
- id (PK)
- method_type (credit_card, debit_card, boleto, pix, mercadopago_wallet)
- enabled (boolean)
- display_name (português)
- icon_url (varchar)
- description (text)
- installments_enabled (boolean)
- max_installments (int)
- created_at, updated_at
```

**Status:** ❌ VAZIA (não é usada atualmente)

### 3. `event_payment_methods`
```sql
- id (PK)
- event_id (FK -> events)
- payment_method_id (FK -> mercadopago_payment_methods)
- enabled (boolean)
- installments_enabled (boolean)
- max_installments (int)
- created_at, updated_at
```

**Status:** ❌ VAZIA (não é usada atualmente)

---

## 🔄 FLUXO ATUAL DE CONFIRMAÇÃO DE PAGAMENTOS

### Cartão de Crédito (processCardPayment)
1. Lê `access_token` de `settings` (Voyager)
2. Monta payload com dados do usuário
3. Envia para API Mercado Pago
4. Recebe resposta com `payment_id` e `status`
5. Registra em `mercadopago_transactions`

### Cartão de Débito (processDebitCardPayment)
1. Lê `access_token` de `settings` (Voyager)
2. Detecta brand do cartão via API
3. Monta payload com dados do usuário
4. Envia para API Mercado Pago
5. Recebe resposta com `payment_id` e `status`
6. Registra em `mercadopago_transactions`

### PIX (processPixPayment)
1. Lê `access_token` de `settings` (Voyager)
2. Monta payload com dados do usuário
3. Envia para API Mercado Pago
4. Recebe resposta com QR Code
5. Registra em `mercadopago_transactions` com `qr_code`, `qr_code_base64`, `qr_code_expires_at`

---

## ✅ VALIDAÇÃO NECESSÁRIA

### Dados Obrigatórios em Cada Requisição
```
✅ access_token (de settings)
✅ payer (email, name, document)
✅ transaction_amount (valor total)
✅ payment_method_id (visa, master, pix, etc)
✅ token (cartão tokenizado)
✅ external_reference (ID único)
✅ statement_descriptor (descrição)
✅ notification_url (webhook)
✅ device_id (segurança - opcional)
✅ issuer_id (opcional)
```

### Dados Retornados pela API
```
✅ id (payment_id)
✅ status (approved, pending, rejected, etc)
✅ status_detail (motivo do status)
✅ point_of_interaction (para PIX - contém QR Code)
✅ transaction_details (detalhes da transação)
```

---

## 📝 RECOMENDAÇÃO

### Para Agora (Manutenção)
- ✅ Manter usando `settings` (Voyager) - já está funcionando
- ✅ Não migrar para `mercadopago_settings` ainda

### Para Futuro (Quando Implementar)
- 🔄 Migrar configurações para `mercadopago_settings`
- 🔄 Usar `mercadopago_payment_methods` para gerenciar métodos globais
- 🔄 Usar `event_payment_methods` para configurar métodos por evento
- 🔄 Atualizar controllers para ler de `mercadopago_settings` em vez de `settings`

---

## 🎯 PRÓXIMAS AÇÕES

1. **Não fazer nada agora** - Sistema está funcionando com `settings`
2. **Manter tabelas vazias** - Serão usadas futuramente
3. **Quando migrar:**
   - Copiar dados de `settings` para `mercadopago_settings`
   - Atualizar controllers para ler de `mercadopago_settings`
   - Atualizar `MercadoPagoSettingsController` para salvar em `mercadopago_settings`

---

## 📊 ESTRUTURA FINAL ESPERADA

```
settings (Voyager) ← ATUAL (funcionando)
├── mercadopago.access_token
├── mercadopago.public_key
├── mercadopago.mode
├── mercadopago.webhook_url
├── mercadopago.webhook_token
└── mercadopago.enabled

mercadopago_settings ← FUTURO (auxiliar)
├── access_token
├── public_key
├── mode
├── webhook_url
├── webhook_token
└── enabled

mercadopago_payment_methods ← FUTURO (gerenciar métodos globais)
├── credit_card
├── debit_card
├── pix
├── boleto
└── mercadopago_wallet

event_payment_methods ← FUTURO (configurar por evento)
├── event_id
├── payment_method_id
├── enabled
└── max_installments
```

