# 📋 PRÓXIMAS MELHORIAS - MERCADO PAGO

## ✅ CONCLUÍDO

- ✅ Correções de tradução
- ✅ Formatação de moeda
- ✅ Ícone de cadeado
- ✅ Botão "Confirmar pagamento"
- ✅ Processamento de ingressos gratuitos
- ✅ Slidedown automático do formulário

---

## ⏳ PRÓXIMAS AÇÕES NECESSÁRIAS

### **1. Parcelas do Cartão de Crédito**

**Problema:** Está gerando 1, 2, 3, 4, 5 e pulando para 12x

**Solução Necessária:**
- Ler as parcelas habilitadas na configuração geral (admin)
- Gerar todas as parcelas de forma contínua
- Exemplo: 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x, 11x, 12x

**Arquivo:** `/eventmie-pro/resources/js/events_show/components/MercadoPagoCheckout.vue`

**Código Atual (Linha ~231):**
```javascript
installmentOptions: [
    { value: 1, label: '1x sem juros' },
    { value: 2, label: '2x sem juros' },
    { value: 3, label: '3x sem juros' },
    { value: 6, label: '6x sem juros' },
    { value: 12, label: '12x com juros' }
]
```

**Necessário:** Ler da configuração do admin e gerar dinamicamente

---

### **2. Ocultar Parcelas para Cartão de Débito**

**Problema:** Cartão de débito não tem parcelas

**Solução Necessária:**
- Quando `selectedMethod === 'debit_card'`, ocultar campo de parcelamento
- Manter apenas para cartão de crédito e carteira

**Arquivo:** `/eventmie-pro/resources/js/events_show/components/MercadoPagoCheckout.vue`

**Lógica:**
```vue
<!-- Installments - Mostrar apenas para cartão de crédito -->
<div class="mb-3" v-if="['credit_card', 'wallet'].includes(selectedMethod) && installmentOptions.length > 0">
    <!-- campo de parcelamento -->
</div>
```

---

### **3. Habilitar Métodos de Pagamento Conforme Configuração**

**Problema:** Todos os métodos aparecem, independente da configuração

**Solução Necessária:**

#### **A. Ler Configuração Geral (Admin)**
```php
// Backend - Ler de settings
$paymentMethods = [
    'credit_card' => setting('mercadopago.payment_methods.credit_card.enabled'),
    'debit_card' => setting('mercadopago.payment_methods.debit_card.enabled'),
    'boleto' => setting('mercadopago.payment_methods.boleto.enabled'),
    'pix' => setting('mercadopago.payment_methods.pix.enabled'),
    'wallet' => setting('mercadopago.payment_methods.wallet.enabled')
];
```

#### **B. Ler Configuração do Evento (Se Existir)**
```php
// Se o evento tiver configuração específica, usar essa
// Senão, usar a configuração geral
$eventPaymentMethods = EventPaymentMethod::where('event_id', $eventId)->get();
if ($eventPaymentMethods->count() > 0) {
    // Usar configuração do evento
} else {
    // Usar configuração geral
}
```

#### **C. Passar para o Frontend**
```javascript
// No componente MercadoPagoCheckout.vue
props: {
    paymentMethods: {
        type: Object,
        default: () => ({
            credit_card: true,
            debit_card: true,
            boleto: true,
            pix: true,
            wallet: true
        })
    }
}
```

#### **D. Usar no Template**
```vue
<!-- Mostrar apenas se habilitado -->
<div class="form-check mb-3" v-if="paymentMethods.credit_card">
    <!-- Cartão de Crédito -->
</div>

<div class="form-check mb-3" v-if="paymentMethods.debit_card">
    <!-- Cartão de Débito -->
</div>
```

---

## 📊 FLUXO RECOMENDADO

```
1. Backend lê configuração geral (admin)
   ↓
2. Backend lê configuração do evento (se existir)
   ↓
3. Backend mescla: evento > geral
   ↓
4. Backend passa para frontend via props
   ↓
5. Frontend renderiza apenas métodos habilitados
   ↓
6. Frontend oculta parcelas para débito
   ↓
7. Frontend gera parcelas dinamicamente
```

---

## 🔧 ARQUIVOS A MODIFICAR

1. **Backend:**
   - `EventsController.php` - Passar `paymentMethods` para view
   - `MercadoPagoController.php` - Ler configurações

2. **Frontend:**
   - `MercadoPagoCheckout.vue` - Receber props, gerar parcelas dinamicamente
   - `TicketList.vue` - Passar `paymentMethods` para componente

3. **Database:**
   - Verificar tabela `event_payment_methods` (se existir)

---

## 📝 NOTAS

- As parcelas devem ser lidas da configuração do admin
- O máximo de parcelas é definido em `mercadopago.payment_methods.*.max_installments`
- Cartão de débito nunca tem parcelamento
- PIX e Boleto também não têm parcelamento
- Apenas Cartão de Crédito e Carteira têm parcelamento

---

**Status:** 📋 Planejamento Concluído
**Data:** 23 de Novembro de 2025
