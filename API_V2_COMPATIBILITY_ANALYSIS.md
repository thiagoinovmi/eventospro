# 🔍 ANÁLISE DE COMPATIBILIDADE API v1 vs v2 - MERCADO PAGO

**Data:** 25/11/2025  
**Branch:** feature/api-v2-migration  
**Status:** FASE 2 - Análise de Compatibilidade  

---

## 🚨 **DESCOBERTA CRÍTICA**

### **⚠️ API v2 NÃO EXISTE PARA PAYMENTS**

Após análise detalhada da documentação oficial do Mercado Pago, descobri que:

**✅ REALIDADE:**
- **Payments API:** Continua sendo `https://api.mercadopago.com/v1/payments`
- **Checkout API v2:** É o nome do **PRODUTO**, não da versão da API
- **SDK atual:** `mercadopago/dx-php: ^3.7` já suporta todos os recursos

---

## 📊 **CHECKOUT API v2 vs PAYMENTS API v1**

### **🔧 CHECKOUT API v2 (Produto)**
- **Nome:** Checkout API v2 (nome do produto/solução)
- **URL da API:** `https://api.mercadopago.com/v1/payments` (ainda v1)
- **Recursos:** Suporte completo a `items`, `additional_info`, `device_id`
- **SDK:** `mercadopago/dx-php` v3.7+ (já instalado)

### **❌ PAYMENTS API v2**
- **Status:** **NÃO EXISTE**
- **Documentação:** Não há referência a `/v2/payments`
- **Migração:** **DESNECESSÁRIA**

---

## ✅ **SOLUÇÃO REAL**

### **O PROBLEMA NÃO É A VERSÃO DA API**

O erro `"The name of the following parameters is wrong : [items]"` **NÃO** é porque estamos usando API v1.

**CAUSA REAL:**
1. **SDK desatualizado** ou mal configurado
2. **Payload malformado** do parâmetro `items`
3. **Headers incorretos** na requisição
4. **Estrutura do array `items`** incorreta

---

## 🔧 **ANÁLISE DO SDK ATUAL**

### **SDK Instalado**
```json
"mercadopago/dx-php": "^3.7"
```

### **Compatibilidade**
- ✅ **Versão:** 3.7 (mais recente)
- ✅ **Suporte a items:** SIM
- ✅ **Suporte a additional_info:** SIM
- ✅ **Suporte a device_id:** SIM
- ✅ **Checkout API v2:** SIM

---

## 📋 **ESTRUTURA CORRETA DO PAYLOAD**

### **❌ Estrutura Atual (Incorreta)**
```php
$paymentData['items'] = [
    [
        'id' => (string)$ticket->id,
        'title' => $ticket->title,
        'description' => 'Ingresso para ' . $event->title,
        'category_id' => 'event_ticket',
        'quantity' => (int)($validated['quantity'] ?? 1),
        'unit_price' => (float)$ticket->price
    ]
];
```

### **✅ Estrutura Correta (Checkout API v2)**
```php
$paymentData['items'] = [
    [
        'id' => (string)$ticket->id,
        'title' => $ticket->title,
        'description' => 'Ingresso para ' . $event->title,
        'category_id' => 'event_ticket',
        'quantity' => (int)($validated['quantity'] ?? 1),
        'unit_price' => (float)$ticket->price,
        'picture_url' => $event->poster ?? null,
        'warranty' => 'Garantia do evento'
    ]
];
```

---

## 🎯 **CAMPOS DE OTIMIZAÇÃO SUPORTADOS**

### **1. Items (+14 pontos)**
```php
'items' => [
    [
        'id' => 'ticket_123',
        'title' => 'Entrada VIP',
        'description' => 'Ingresso VIP para evento',
        'category_id' => 'event_ticket',
        'quantity' => 1,
        'unit_price' => 50.0,
        'picture_url' => 'https://...',
        'warranty' => 'Garantia do evento'
    ]
]
```

### **2. Additional Info (+15 pontos)**
```php
'additional_info' => [
    'payer' => [
        'first_name' => 'João',
        'last_name' => 'Silva',
        'phone' => [
            'area_code' => '11',
            'number' => '999999999'
        ],
        'address' => [
            'zip_code' => '01310-100',
            'street_name' => 'Av. Paulista',
            'street_number' => 1000
        ]
    ],
    'shipments' => [
        'receiver_address' => [
            'zip_code' => '01310-100',
            'street_name' => 'Av. Paulista',
            'street_number' => 1000
        ]
    ]
]
```

### **3. Device ID (+10 pontos)**
```php
'device_id' => 'device_fingerprint_from_frontend'
```

### **4. Notification URL (+2 pontos)**
```php
'notification_url' => 'https://eventos.inovmi.com.br/api/mercadopago/webhook'
```

---

## 🔧 **IMPLEMENTAÇÃO USANDO SDK ATUAL**

### **Método Correto (MercadoPagoService)**
```php
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

// Configurar SDK
MercadoPagoConfig::setAccessToken($accessToken);

// Criar cliente
$client = new PaymentClient();

// Payload completo
$paymentData = [
    'transaction_amount' => 50.0,
    'description' => 'Pagamento de ingresso',
    'payment_method_id' => 'visa',
    'payer' => [...],
    'token' => 'card_token',
    'installments' => 1,
    'external_reference' => 'BOOKING-123',
    'statement_descriptor' => 'EVENTO',
    'items' => [...],
    'additional_info' => [...],
    'device_id' => 'device_123',
    'notification_url' => 'https://...'
];

// Criar pagamento
$payment = $client->create($paymentData);
```

---

## 🚨 **BREAKING CHANGES IDENTIFICADOS**

### **❌ Não há breaking changes de API**
- URL permanece: `https://api.mercadopago.com/v1/payments`
- Headers permanecem iguais
- Autenticação permanece igual
- Estrutura de resposta permanece igual

### **✅ Mudanças necessárias:**
1. **Corrigir implementação atual** (cURL → SDK)
2. **Adicionar campos de otimização** 
3. **Implementar Device ID** no frontend
4. **Melhorar estrutura do payload**

---

## 📱 **DEVICE ID - IMPLEMENTAÇÃO FRONTEND**

### **1. Adicionar Script de Segurança**
```html
<script src="https://www.mercadopago.com/v2/security.js" view="checkout"></script>
```

### **2. Capturar Device ID**
```javascript
// Variável global criada automaticamente
const deviceId = window.MP_DEVICE_SESSION_ID;

// Ou usar output customizado
<script src="https://www.mercadopago.com/v2/security.js" view="checkout" output="deviceId"></script>
const deviceId = window.deviceId;
```

### **3. Enviar no Payload**
```javascript
const paymentData = {
    // ... outros campos
    device_id: deviceId
};
```

---

## 🎯 **ESTRATÉGIA DE MIGRAÇÃO REVISADA**

### **❌ NÃO FAZER:**
- Migrar para API v2 (não existe)
- Alterar URLs de endpoints
- Atualizar SDK (já está atualizado)

### **✅ FAZER:**
1. **Corrigir implementação atual** (cURL → SDK)
2. **Adicionar campos de otimização**
3. **Implementar Device ID**
4. **Melhorar payload structure**
5. **Testar com SDK oficial**

---

## ⏭️ **PRÓXIMA FASE AJUSTADA**

### **FASE 3: IMPLEMENTAÇÃO DE OTIMIZAÇÕES (2h)**

**Não é migração de API, é otimização da implementação atual:**

1. **Substituir cURL por SDK** nos 4 métodos
2. **Adicionar items** com estrutura correta
3. **Implementar additional_info**
4. **Adicionar Device ID** (frontend + backend)
5. **Configurar notification_url**

---

## 📊 **IMPACTO ESPERADO**

### **Antes:** 56 pontos
### **Depois:** 97 pontos (+41)

**Ganhos:**
- ✅ Items: +14 pontos
- ✅ Additional Info: +15 pontos
- ✅ Device ID: +10 pontos
- ✅ Notification URL: +2 pontos

---

*Análise concluída: O problema não é a versão da API, é a implementação atual que precisa ser otimizada.*
