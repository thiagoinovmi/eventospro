# 📊 ESTADO ATUAL DA API v1 - MERCADO PAGO

**Data de Documentação:** 25/11/2025  
**Branch:** feature/api-v2-migration  
**Objetivo:** Mapear todos os endpoints v1 antes da migração  

---

## 🔍 ENDPOINTS IDENTIFICADOS

### **1. PAGAMENTOS - BookingsController.php**

#### **Localização:** `eventmie-pro/src/Http/Controllers/BookingsController.php`

**Endpoint v1:** `https://api.mercadopago.com/v1/payments`

**Ocorrências encontradas:**
- **Linha 1599:** Cartão de Crédito (processCardPayment)
- **Linha 1813:** PIX (processPixPayment) 
- **Linha 1964:** Boleto (processBoletoPayment)
- **Linha 2097:** Carteira Mercado Pago (processWalletPayment)

**Métodos HTTP:** POST

**Estrutura do Payload Atual:**
```json
{
  "transaction_amount": 5.0,
  "description": "Pagamento de ingresso - Evento #1",
  "payment_method_id": "visa|pix|bolbradesco|account_money",
  "payer": {
    "email": "user@example.com",
    "identification": {
      "type": "CPF",
      "number": "12345678901"
    }
  },
  "token": "card_token_here",
  "installments": 1,
  "external_reference": "BOOKING-123",
  "statement_descriptor": "EVENTO"
}
```

### **2. CONSULTA DE PAGAMENTOS - MercadoPagoWebhookController.php**

#### **Localização:** `app/Http/Controllers/MercadoPagoWebhookController.php`

**Endpoint v1:** `https://api.mercadopago.com/v1/payments/{payment_id}`

**Ocorrência:** Linha 164

**Método HTTP:** GET

**Uso:** Consultar detalhes do pagamento via webhook

---

## 🔧 CONFIGURAÇÕES ATUAIS

### **Autenticação**
- **Access Token:** `setting('mercadopago.access_token')`
- **Public Key:** `setting('mercadopago.public_key')`
- **Header:** `Authorization: Bearer {access_token}`

### **Content-Type**
- **Request:** `application/json`
- **Response:** `application/json`

---

## 📱 MÉTODOS DE PAGAMENTO SUPORTADOS

| Método | payment_method_id | Status |
|--------|-------------------|--------|
| Cartão de Crédito | visa, master, amex | ✅ Funcionando |
| Cartão de Débito | debvisa, debmaster | ✅ Funcionando |
| PIX | pix | ✅ Funcionando |
| Boleto | bolbradesco, bolsantander | ✅ Funcionando |
| Carteira MP | account_money | ✅ Funcionando |

---

## 🚨 LIMITAÇÕES IDENTIFICADAS

### **1. Parâmetro `items` NÃO SUPORTADO**
**Erro retornado:** "The name of the following parameters is wrong : [items]"

**Impacto:** -14 pontos na avaliação Mercado Pago

### **2. Campos de Otimização Ausentes**
- ❌ `additional_info` (-15 pontos)
- ❌ `device_id` (-10 pontos)  
- ❌ `notification_url` (-2 pontos)

**Total de pontos perdidos:** -41 pontos

---

## 📋 ESTRUTURA DE RESPOSTA ATUAL

### **Pagamento Aprovado**
```json
{
  "id": 135062008420,
  "status": "approved",
  "status_detail": "accredited",
  "payment_method_id": "visa",
  "transaction_amount": 5.0,
  "currency_id": "BRL",
  "date_created": "2025-11-25T12:00:00.000-04:00",
  "date_approved": "2025-11-25T12:00:01.000-04:00",
  "payer": {...},
  "external_reference": "BOOKING-123"
}
```

### **Pagamento PIX**
```json
{
  "id": 135062008420,
  "status": "pending",
  "status_detail": "pending_waiting_payment",
  "payment_method_id": "pix",
  "point_of_interaction": {
    "transaction_data": {
      "qr_code": "00020126580014br.gov.bcb.pix...",
      "qr_code_base64": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  }
}
```

---

## 🔄 FLUXO ATUAL DE WEBHOOK

### **URL do Webhook**
`https://eventos.inovmi.com.br/api/mercadopago/webhook`

### **Payload Recebido**
```json
{
  "type": "payment",
  "data": {
    "id": "135062008420"
  }
}
```

### **Processamento**
1. Recebe notificação
2. Consulta `GET /v1/payments/{id}`
3. Atualiza status no banco
4. Confirma booking

---

## ⚠️ PONTOS CRÍTICOS PARA MIGRAÇÃO

### **1. URLs a Alterar**
- `https://api.mercadopago.com/v1/payments` → `https://api.mercadopago.com/v2/payments`
- `https://api.mercadopago.com/v1/payments/{id}` → `https://api.mercadopago.com/v2/payments/{id}`

### **2. Payloads a Expandir**
- Adicionar `items` array
- Adicionar `additional_info` object
- Adicionar `device_id` string
- Adicionar `notification_url` string

### **3. Respostas a Validar**
- Estrutura pode ter mudado
- Campos novos podem existir
- Status codes podem ser diferentes

---

## 🎯 PRÓXIMA FASE

**FASE 2:** Análise de Compatibilidade (45min)
- Comparar API v1 vs v2 documentation
- Mapear breaking changes
- Validar SDK compatibility
- Definir estratégia de payload migration

---

*Documentação criada automaticamente durante FASE 1 da migração*
