# 🔧 PASSO A PASSO - MIGRAÇÃO cURL → SDK MERCADO PAGO

**Data:** 26/11/2025  
**Branch:** feature/api-v2-migration  
**Objetivo:** Substituir implementação cURL por SDK oficial  

---

## 🎯 **RESUMO DA MIGRAÇÃO**

### **❌ PROBLEMA ATUAL**
- **4 métodos** usando cURL manual no `BookingsController.php`
- **Erro "items"** porque payload não está estruturado corretamente
- **Falta otimizações** (additional_info, device_id, notification_url)
- **Código duplicado** em cada método de pagamento

### **✅ SOLUÇÃO**
- **Centralizar** toda lógica no `MercadoPagoService.php` (já existe)
- **Usar SDK oficial** em vez de cURL
- **Adicionar campos** de otimização (+41 pontos)
- **Implementar Device ID** no frontend

---

## 📋 **ANÁLISE DOS ARQUIVOS ATUAIS**

### **1. BookingsController.php - MÉTODOS COM cURL**

#### **Método 1: processCardPayment (linha 1599)**
```php
// ❌ ATUAL - cURL manual
curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($paymentData));
```

#### **Método 2: processPixPayment (linha ~1813)**
```php
// ❌ ATUAL - cURL manual (PIX)
curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
```

#### **Método 3: processBoletoPayment (linha ~1964)**
```php
// ❌ ATUAL - cURL manual (Boleto)
curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
```

#### **Método 4: processWalletPayment (linha ~2097)**
```php
// ❌ ATUAL - cURL manual (Carteira)
curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
```

### **2. MercadoPagoService.php - JÁ EXISTE SDK**

#### **✅ JÁ CONFIGURADO:**
```php
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

MercadoPagoConfig::setAccessToken($this->accessToken);
$this->paymentClient = new PaymentClient();
```

#### **✅ JÁ TEM MÉTODO:**
```php
public function createPayment($paymentData = [])
{
    // Método já existe, precisa ser expandido
}
```

---

## 🔄 **PASSO A PASSO DETALHADO**

### **ETAPA 1: EXPANDIR MercadoPagoService.php**
**Tempo:** 30min  
**Arquivo:** `/eventmie-pro/src/Services/MercadoPagoService.php`

#### **1.1 Adicionar método createPaymentWithOptimizations()**
```php
public function createPaymentWithOptimizations($paymentData)
{
    // Estruturar payload completo com items, additional_info, device_id
    // Usar $this->paymentClient->create($payload)
    // Retornar resposta padronizada
}
```

#### **1.2 Adicionar método buildOptimizedPayload()**
```php
private function buildOptimizedPayload($paymentData)
{
    // Construir items array
    // Construir additional_info
    // Adicionar device_id
    // Adicionar notification_url
    // Retornar payload completo
}
```

#### **1.3 Adicionar método handlePaymentResponse()**
```php
private function handlePaymentResponse($response, $paymentData)
{
    // Processar resposta do SDK
    // Extrair dados importantes
    // Padronizar retorno
}
```

### **ETAPA 2: ATUALIZAR BookingsController.php - CARTÃO**
**Tempo:** 20min  
**Arquivo:** `/eventmie-pro/src/Http/Controllers/BookingsController.php`

#### **2.1 Substituir processCardPayment (linha 1599)**
```php
// ❌ REMOVER: Todo o bloco cURL (linhas 1598-1626)
// ✅ ADICIONAR:
$mercadoPagoService = new \Classiebit\Eventmie\Services\MercadoPagoService();
$result = $mercadoPagoService->createPaymentWithOptimizations([
    'amount' => $validated['total'],
    'description' => 'Pagamento de ingresso - Evento #' . $event->id,
    'payment_method_id' => $validated['payment_method_id'],
    'token' => $validated['token'],
    'installments' => $validated['installments'] ?? 1,
    'payer' => [...],
    'external_reference' => 'BOOKING-' . time(),
    'statement_descriptor' => 'EVENTO',
    'event' => $event,
    'ticket' => $ticket,
    'user' => $user,
    'device_id' => $validated['device_id'] ?? null
]);
```

### **ETAPA 3: ATUALIZAR BookingsController.php - PIX**
**Tempo:** 15min  
**Arquivo:** `/eventmie-pro/src/Http/Controllers/BookingsController.php`

#### **3.1 Substituir processPixPayment (linha ~1813)**
```php
// ❌ REMOVER: Todo o bloco cURL
// ✅ ADICIONAR: Mesmo padrão, mas payment_method_id = 'pix'
```

### **ETAPA 4: ATUALIZAR BookingsController.php - BOLETO**
**Tempo:** 15min  
**Arquivo:** `/eventmie-pro/src/Http/Controllers/BookingsController.php`

#### **4.1 Substituir processBoletoPayment (linha ~1964)**
```php
// ❌ REMOVER: Todo o bloco cURL
// ✅ ADICIONAR: Mesmo padrão, mas payment_method_id = 'bolbradesco'
```

### **ETAPA 5: ATUALIZAR BookingsController.php - CARTEIRA**
**Tempo:** 15min  
**Arquivo:** `/eventmie-pro/src/Http/Controllers/BookingsController.php`

#### **5.1 Substituir processWalletPayment (linha ~2097)**
```php
// ❌ REMOVER: Todo o bloco cURL
// ✅ ADICIONAR: Mesmo padrão, mas payment_method_id = 'account_money'
```

### **ETAPA 6: IMPLEMENTAR DEVICE ID - FRONTEND**
**Tempo:** 20min  
**Arquivo:** `/eventmie-pro/resources/js/events_show/components/MercadoPagoCheckout.vue`

#### **6.1 Adicionar script de segurança**
```html
<!-- Adicionar no template -->
<script src="https://www.mercadopago.com/v2/security.js" view="checkout"></script>
```

#### **6.2 Capturar Device ID**
```javascript
// Adicionar no mounted()
this.deviceId = window.MP_DEVICE_SESSION_ID || null;

// Adicionar no payload de pagamento
paymentData.device_id = this.deviceId;
```

### **ETAPA 7: TESTES UNITÁRIOS**
**Tempo:** 30min por método  

#### **7.1 Teste Cartão de Crédito**
- Testar pagamento aprovado
- Testar pagamento rejeitado
- Verificar se items está sendo enviado
- Verificar se additional_info está completo

#### **7.2 Teste PIX**
- Testar geração de QR Code
- Verificar estrutura de resposta
- Testar polling de status

#### **7.3 Teste Boleto**
- Testar geração de boleto
- Verificar URL de visualização

#### **7.4 Teste Carteira**
- Testar pagamento com conta MP
- Verificar redirecionamento

---

## 📊 **ESTRUTURA DOS PAYLOADS**

### **PAYLOAD ATUAL (cURL) - INCOMPLETO**
```json
{
  "transaction_amount": 5.0,
  "description": "Pagamento de ingresso",
  "payment_method_id": "visa",
  "payer": {
    "email": "user@example.com",
    "identification": {
      "type": "CPF",
      "number": "12345678901"
    }
  },
  "token": "card_token",
  "installments": 1,
  "external_reference": "BOOKING-123",
  "statement_descriptor": "EVENTO"
}
```

### **PAYLOAD OTIMIZADO (SDK) - COMPLETO**
```json
{
  "transaction_amount": 5.0,
  "description": "Pagamento de ingresso",
  "payment_method_id": "visa",
  "payer": {
    "email": "user@example.com",
    "identification": {
      "type": "CPF",
      "number": "12345678901"
    },
    "first_name": "João",
    "last_name": "Silva"
  },
  "token": "card_token",
  "installments": 1,
  "external_reference": "BOOKING-123",
  "statement_descriptor": "EVENTO",
  "items": [
    {
      "id": "2",
      "title": "Entrada 1",
      "description": "Ingresso para Corrida Outubro Rosa",
      "category_id": "event_ticket",
      "quantity": 1,
      "unit_price": 5.0,
      "picture_url": "https://...",
      "warranty": "Garantia do evento"
    }
  ],
  "additional_info": {
    "payer": {
      "first_name": "João",
      "last_name": "Silva",
      "phone": {
        "area_code": "11",
        "number": "999999999"
      },
      "address": {
        "zip_code": "01310-100",
        "street_name": "Av. Paulista",
        "street_number": 1000
      }
    },
    "shipments": {
      "receiver_address": {
        "zip_code": "01310-100",
        "street_name": "Av. Paulista",
        "street_number": 1000
      }
    }
  },
  "device_id": "device_fingerprint_123",
  "notification_url": "https://eventos.inovmi.com.br/api/mercadopago/webhook"
}
```

---

## ✅ **CHECKLIST DE EXECUÇÃO**

### **PRÉ-EXECUÇÃO**
- [ ] Confirmar que branch `feature/api-v2-migration` está ativa
- [ ] Backup atual está criado (tag `v1-api-backup`)
- [ ] SDK `mercadopago/dx-php: ^3.7` está instalado
- [ ] Tokens de teste estão configurados

### **DURANTE EXECUÇÃO**
- [x] **ETAPA 1:** MercadoPagoService expandido ✅
- [x] **ETAPA 2:** Cartão migrado para SDK ✅
- [ ] **ETAPA 3:** PIX migrado para SDK
- [ ] **ETAPA 4:** Boleto migrado para SDK
- [ ] **ETAPA 5:** Carteira migrada para SDK
- [ ] **ETAPA 6:** Device ID implementado
- [ ] **ETAPA 7:** Todos os testes passando

### **PÓS-EXECUÇÃO**
- [ ] Pontuação Mercado Pago validada (80+)
- [ ] Todos os métodos funcionando
- [ ] Logs limpos e organizados
- [ ] Commit final com resumo

---

## 🎯 **RESULTADO ESPERADO**

### **ANTES (cURL)**
- ❌ 4 implementações duplicadas
- ❌ Payload incompleto
- ❌ 56 pontos Mercado Pago
- ❌ Erro com parâmetro "items"

### **DEPOIS (SDK)**
- ✅ 1 implementação centralizada
- ✅ Payload completo e otimizado
- ✅ 97 pontos Mercado Pago (+41)
- ✅ Items funcionando perfeitamente

---

## 🚀 **PRÓXIMA AÇÃO**

**Status:** ⏳ Aguardando aprovação para iniciar

**Para começar ETAPA 1:**
```bash
# Vou expandir o MercadoPagoService.php com os novos métodos
```

**Comando:** *"Vamos começar com a ETAPA 1"*

---

*Este documento será atualizado conforme progredimos em cada etapa.*
