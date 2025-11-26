# 🚀 PLANO DE MIGRAÇÃO MERCADO PAGO API v1 → v2

**Data:** 25/11/2025  
**Objetivo:** Migrar para API v2 para implementar `items` e otimizações avançadas  
**Meta:** Atingir 80+ pontos na avaliação Mercado Pago  

---

## 📊 ANÁLISE DO ECOSSISTEMA ATUAL

### **🔍 COMPONENTES IDENTIFICADOS**

#### **Backend (PHP/Laravel)**
- ✅ `BookingsController.php` - **PRINCIPAL** - Processa pagamentos
- ✅ `MercadoPagoController.php` - Checkout e transações
- ✅ `MercadoPagoWebhookController.php` - Notificações
- ✅ `MercadoPagoSettingsController.php` - Configurações
- ✅ `MercadoPagoPaymentMethodController.php` - Métodos de pagamento
- ✅ `MercadoPagoService.php` - **CRÍTICO** - SDK e API calls

#### **Frontend (Vue.js)**
- ✅ `MercadoPagoCheckout.vue` - Componente principal
- ✅ `CheckoutMercadoPago.vue` - Checkout alternativo
- ✅ `MyBooking.vue` - Modal de retry
- ✅ `TicketList.vue` - Seleção de ingressos

#### **Modelos (Database)**
- ✅ `MercadoPagoTransaction.php` - Transações
- ✅ `MercadoPagoSetting.php` - Configurações
- ✅ `MercadoPagoRefund.php` - Reembolsos

#### **URLs da API v1 Identificadas**
```
https://api.mercadopago.com/v1/payments
```

---

## 🎯 ESTRATÉGIA DE MIGRAÇÃO

### **FASE 1: PREPARAÇÃO E BACKUP** ⏱️ 30min
- [x] ✅ Backup do banco de dados (já feito pelo usuário)
- [ ] 🔄 Criar branch de desenvolvimento `feature/api-v2-migration`
- [ ] 🔄 Documentar URLs e endpoints atuais
- [ ] 🔄 Criar ponto de rollback seguro

### **FASE 2: ANÁLISE DE COMPATIBILIDADE** ⏱️ 45min
- [ ] 🔄 Verificar diferenças entre API v1 e v2
- [ ] 🔄 Mapear campos obrigatórios e opcionais
- [ ] 🔄 Identificar breaking changes
- [ ] 🔄 Validar compatibilidade do SDK atual

### **FASE 3: IMPLEMENTAÇÃO GRADUAL** ⏱️ 2h
- [ ] 🔄 **Etapa 3.1:** Atualizar URLs v1 → v2
- [ ] 🔄 **Etapa 3.2:** Implementar estrutura `items`
- [ ] 🔄 **Etapa 3.3:** Adicionar campos de otimização
- [ ] 🔄 **Etapa 3.4:** Atualizar webhooks para v2

### **FASE 4: TESTES COMPLETOS** ⏱️ 1h
- [ ] 🔄 Teste em sandbox: Cartão de crédito
- [ ] 🔄 Teste em sandbox: PIX
- [ ] 🔄 Teste em sandbox: Boleto
- [ ] 🔄 Teste: Modal de retry
- [ ] 🔄 Teste: Webhooks e notificações
- [ ] 🔄 Teste: MyBookings

### **FASE 5: VALIDAÇÃO E DEPLOY** ⏱️ 30min
- [ ] 🔄 Validar pontuação Mercado Pago
- [ ] 🔄 Deploy em produção
- [ ] 🔄 Monitoramento pós-deploy

---

## 🔧 MUDANÇAS TÉCNICAS DETALHADAS

### **1. URLs DA API**
```diff
- https://api.mercadopago.com/v1/payments
+ https://api.mercadopago.com/v2/payments
```

### **2. ESTRUTURA DO PAYLOAD**

#### **Antes (API v1):**
```json
{
  "transaction_amount": 5.0,
  "description": "Pagamento de ingresso - Evento #1",
  "payment_method_id": "visa",
  "payer": {...},
  "token": "...",
  "installments": 1,
  "external_reference": "BOOKING-...",
  "statement_descriptor": "EVENTO"
}
```

#### **Depois (API v2):**
```json
{
  "transaction_amount": 5.0,
  "description": "Pagamento de ingresso - Evento #1",
  "payment_method_id": "visa",
  "payer": {...},
  "token": "...",
  "installments": 1,
  "external_reference": "BOOKING-...",
  "statement_descriptor": "EVENTO",
  "items": [
    {
      "id": "2",
      "title": "Entrada 1",
      "description": "Ingresso para Corrida Outubro Rosa",
      "category_id": "event_ticket",
      "quantity": 1,
      "unit_price": 5.0
    }
  ],
  "additional_info": {
    "payer": {
      "phone": {...},
      "address": {...}
    },
    "shipments": {...}
  }
}
```

### **3. NOVOS CAMPOS DE OTIMIZAÇÃO (+41 pontos)**

#### **Items Completo (+14 pontos)**
```json
"items": [
  {
    "id": "ticket_id",
    "title": "Nome do ingresso",
    "description": "Descrição detalhada",
    "category_id": "event_ticket",
    "quantity": 1,
    "unit_price": 5.0,
    "picture_url": "https://...",
    "warranty": "Garantia do evento"
  }
]
```

#### **Additional Info (+15 pontos)**
```json
"additional_info": {
  "payer": {
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
      "street_number": 1000,
      "floor": "1",
      "apartment": "A"
    }
  }
}
```

#### **Device ID (+10 pontos)**
```json
"device_id": "device_fingerprint_from_frontend"
```

#### **Notification URL (+2 pontos)**
```json
"notification_url": "https://eventos.inovmi.com.br/api/mercadopago/webhook"
```

---

## ⚠️ PONTOS CRÍTICOS DE ATENÇÃO

### **🚨 BREAKING CHANGES**
1. **Estrutura de resposta** pode ser diferente
2. **Status codes** podem ter mudado
3. **Campos obrigatórios** podem ser diferentes
4. **Webhooks** podem ter formato diferente

### **🔒 SEGURANÇA**
1. **Tokens** permanecem os mesmos
2. **Autenticação** não muda
3. **Webhooks** precisam validação de assinatura

### **📱 FRONTEND**
1. **SDK JavaScript** pode precisar atualização
2. **Tokenização** deve permanecer no frontend
3. **Device ID** precisa ser capturado

---

## 🧪 ESTRATÉGIA DE TESTES

### **Cenários de Teste Obrigatórios**

#### **1. Pagamentos Básicos**
- [ ] Cartão de crédito aprovado
- [ ] Cartão de crédito rejeitado
- [ ] PIX aprovado
- [ ] Boleto gerado
- [ ] Parcelamento (2x, 3x, 12x)

#### **2. Fluxos Especiais**
- [ ] Modal de retry (MyBookings)
- [ ] Checkout direto (TicketList)
- [ ] Múltiplos ingressos
- [ ] Eventos diferentes

#### **3. Integrações**
- [ ] Webhooks recebidos
- [ ] Status atualizado no banco
- [ ] Emails enviados
- [ ] Booking finalizado

#### **4. Casos de Erro**
- [ ] Token inválido
- [ ] Cartão expirado
- [ ] Limite insuficiente
- [ ] Timeout de rede

---

## 📋 CHECKLIST DE EXECUÇÃO

### **PRÉ-MIGRAÇÃO**
- [ ] Backup do banco confirmado
- [ ] Branch criada e testada
- [ ] Documentação atual salva
- [ ] Tokens de sandbox validados

### **DURANTE A MIGRAÇÃO**
- [ ] Cada arquivo alterado testado individualmente
- [ ] Logs detalhados em cada etapa
- [ ] Rollback testado a cada fase
- [ ] Comunicação constante com usuário

### **PÓS-MIGRAÇÃO**
- [ ] Todos os testes passando
- [ ] Pontuação Mercado Pago validada
- [ ] Monitoramento ativo por 24h
- [ ] Documentação atualizada

---

## 🎯 RESULTADOS ESPERADOS

### **Pontuação Atual:** 56 pontos
### **Pontuação Meta:** 80+ pontos

#### **Ganhos Esperados:**
- ✅ **Items completo:** +14 pontos
- ✅ **Additional info:** +15 pontos  
- ✅ **Device ID:** +10 pontos
- ✅ **Notification URL:** +2 pontos

#### **Total:** +41 pontos = **97 pontos** 🎉

---

## 🚀 CRONOGRAMA DE EXECUÇÃO

| Fase | Duração | Início | Fim |
|------|---------|--------|-----|
| 1. Preparação | 30min | Agora | +30min |
| 2. Análise | 45min | +30min | +1h15min |
| 3. Implementação | 2h | +1h15min | +3h15min |
| 4. Testes | 1h | +3h15min | +4h15min |
| 5. Deploy | 30min | +4h15min | +4h45min |

**Total estimado:** ~5 horas

---

## ✅ APROVAÇÃO PARA INÍCIO

**Status:** ⏳ Aguardando aprovação do usuário

**Próxima ação:** Iniciar Fase 1 - Preparação e Backup

**Comando para começar:** "Vamos começar com a Fase 1"

---

*Este plano foi criado com base na análise completa do ecossistema atual e nas melhores práticas de migração de APIs críticas em produção.*
