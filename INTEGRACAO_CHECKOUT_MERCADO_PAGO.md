# 🛒 INTEGRAÇÃO - CHECKOUT TRANSPARENTE MERCADO PAGO

## 📋 VISÃO GERAL

O componente `CheckoutMercadoPago.vue` foi criado para ser integrado no fluxo de checkout existente do sistema. Ele substitui o formulário padrão quando o usuário seleciona "Mercado Pago" como método de pagamento.

---

## 🎯 COMO FUNCIONA

### **Fluxo Atual (TicketList.vue)**

```
1. Usuário seleciona ingressos
   ↓
2. Seleciona método de pagamento (PayPal, Mercado Pago, Offline)
   ↓
3. Clica em "Checkout"
   ↓
4. Formulário é enviado para `/api/bookings/book_tickets`
```

### **Novo Fluxo com Mercado Pago**

```
1. Usuário seleciona ingressos
   ↓
2. Seleciona "Mercado Pago" como método
   ↓
3. Clica em "Checkout"
   ↓
4. CheckoutMercadoPago.vue é exibido
   ↓
5. Usuário preenche dados do cartão
   ↓
6. Clica em "Pagar Agora"
   ↓
7. Componente envia para `/api/mercadopago/checkout`
   ↓
8. Webhook do Mercado Pago confirma pagamento
   ↓
9. Redireciona para `/mercadopago/transactions`
```

---

## 🔧 INTEGRAÇÃO PASSO A PASSO

### **Passo 1: Registrar o Componente**

Abra o arquivo: `/eventmie-pro/resources/js/events_show/index.js`

Adicione a importação:

```javascript
import CheckoutMercadoPago from "../components/MercadoPago/CheckoutMercadoPago.vue";
```

Adicione ao objeto `components`:

```javascript
components: {
    SelectDates,
    GalleryImages,
    GComponent,
    CheckoutMercadoPago  // ← ADICIONE AQUI
}
```

### **Passo 2: Modificar TicketList.vue**

Abra: `/eventmie-pro/resources/js/events_show/components/TicketList.vue`

#### **Adicionar Importação:**

```javascript
import CheckoutMercadoPago from "../../components/MercadoPago/CheckoutMercadoPago.vue";
```

#### **Adicionar ao Data:**

```javascript
data() {
    return {
        // ... dados existentes ...
        showMercadoPagoCheckout: false,
        bookingId: null,
    }
}
```

#### **Adicionar ao Components:**

```javascript
components: {
    CheckoutMercadoPago  // ← ADICIONE AQUI
}
```

#### **Modificar o Método bookTickets():**

Encontre o método `bookTickets()` e modifique para:

```javascript
bookTickets(){
    // Se Mercado Pago foi selecionado
    if(this.payment_method === '2') {  // 2 = Mercado Pago
        // Preparar dados da reserva
        this.bookingId = null;  // Será criado no backend
        
        // Preparar dados do pedido
        const bookingData = {
            id: null,
            event_id: this.tickets[0].event_id,
            subtotal: this.getSubtotal(),
            taxes: this.getTaxes(),
            total: this.total,
            items: this.tickets.map((ticket, index) => ({
                ticket_id: ticket.id,
                quantity: this.quantity[index],
                price: ticket.price
            }))
        };
        
        // Exibir componente de checkout
        this.showMercadoPagoCheckout = true;
        return;
    }
    
    // Fluxo original para outros métodos
    this.showLoaderNotification(trans('em.processing'));
    this.disable = true;
    
    let post_url = route('eventmie.bookings_book_tickets');
    let post_data = new FormData(this.$refs.form);
    
    axios.post(post_url, post_data)
        .then(res => {
            // ... resto do código ...
        })
}
```

#### **Adicionar Métodos Auxiliares:**

```javascript
methods: {
    // ... métodos existentes ...
    
    getSubtotal() {
        return this.total_price.reduce((sum, price) => sum + parseFloat(price || 0), 0);
    },
    
    getTaxes() {
        let taxes = 0;
        this.tickets.forEach((ticket, index) => {
            if(this.quantity[index] > 0 && ticket.taxes.length > 0) {
                ticket.taxes.forEach(tax => {
                    taxes += this.countTax(
                        ticket.price,
                        tax.rate,
                        tax.rate_type,
                        tax.net_price,
                        this.quantity[index]
                    );
                });
            }
        });
        return taxes;
    },
    
    onMercadoPagoSuccess(data) {
        this.showMercadoPagoCheckout = false;
        this.showSuccessNotification(trans('em.payment_successful'));
        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = '/mercadopago/transactions';
        }, 2000);
    },
    
    onMercadoPagoCancel() {
        this.showMercadoPagoCheckout = false;
        this.showErrorNotification(trans('em.payment_cancelled'));
    }
}
```

#### **Adicionar Template:**

Adicione este código antes do fechamento da div principal do template:

```vue
<!-- Mercado Pago Checkout Modal -->
<div v-if="showMercadoPagoCheckout" class="modal-overlay">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">
                <i class="fas fa-credit-card"></i> Checkout Mercado Pago
            </h5>
            <button type="button" class="btn-close" @click="onMercadoPagoCancel"></button>
        </div>
        <div class="modal-body">
            <checkout-mercado-pago
                :booking-data="bookingData"
                :event-id="tickets[0].event_id"
                @payment-success="onMercadoPagoSuccess"
                @cancel="onMercadoPagoCancel"
            ></checkout-mercado-pago>
        </div>
    </div>
</div>
```

---

## 🎨 ESTILOS CSS

Adicione ao arquivo de estilos do TicketList.vue:

```css
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
    padding: 20px;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
}

.btn-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6c757d;
}

.btn-close:hover {
    color: #000;
}

.modal-body {
    padding: 20px;
}
```

---

## 🔐 SEGURANÇA

### **Dados Sensíveis**

- ✅ Tokens de cartão são processados pelo SDK do Mercado Pago
- ✅ Nunca enviamos dados de cartão para nosso servidor
- ✅ Apenas tokens são enviados para o backend
- ✅ Criptografia SSL em todas as comunicações

### **Validações**

- ✅ Email válido
- ✅ CPF/CNPJ obrigatório
- ✅ Telefone obrigatório
- ✅ Aceitar termos obrigatório
- ✅ Validação no frontend e backend

---

## 🧪 TESTES

### **Cartões de Teste do Mercado Pago**

#### **Cartão de Crédito - Aprovado:**
```
Número: 4111 1111 1111 1111
Validade: 11/25
CVV: 123
```

#### **Cartão de Crédito - Recusado:**
```
Número: 5555 5555 5555 4444
Validade: 11/25
CVV: 123
```

#### **Cartão de Débito - Aprovado:**
```
Número: 6011 1111 1111 1117
Validade: 11/25
CVV: 123
```

### **Teste de Fluxo Completo**

1. Acesse: `https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout`
2. Selecione ingressos
3. Selecione "Mercado Pago"
4. Clique em "Checkout"
5. Preencha os dados:
   - Nome: Teste
   - Email: teste@example.com
   - CPF: 123.456.789-09
   - Telefone: (11) 99999-9999
6. Use cartão de teste acima
7. Clique em "Pagar Agora"
8. Verifique se o pagamento foi processado

---

## 📊 DADOS ENVIADOS

### **Para `/api/mercadopago/checkout`:**

```json
{
    "booking_id": null,
    "payment_method_id": "credit_card",
    "installments": 1,
    "payer_email": "cliente@example.com",
    "payer_document": "123.456.789-09",
    "payer_name": "João Silva",
    "payer_phone": "(11) 99999-9999",
    "token": "token_do_cartao_gerado_pelo_sdk"
}
```

---

## ⚠️ TROUBLESHOOTING

### **Problema: "Public Key não definida"**

**Solução:**
1. Verifique se a Public Key foi configurada em `/admin/settings`
2. Verifique se o modo está correto (Teste/Produção)
3. Limpe o cache do navegador

### **Problema: "Erro ao carregar métodos de pagamento"**

**Solução:**
1. Verifique se a rota `/api/mercadopago/payment-methods/event/{eventId}` está funcionando
2. Verifique se o evento tem métodos de pagamento habilitados
3. Verifique os logs

### **Problema: "Cartão recusado"**

**Solução:**
1. Use cartões de teste do Mercado Pago
2. Verifique se o modo está correto (Teste/Produção)
3. Verifique os logs do Mercado Pago

---

## 📝 PRÓXIMAS ETAPAS

- [ ] Testar integração completa
- [ ] Testar com credenciais de produção
- [ ] Implementar tratamento de erros
- [ ] Adicionar notificações por email
- [ ] Criar painel de transações do usuário

---

**Última atualização:** 23 de Novembro de 2025
**Versão:** 1.0
**Status:** 🔧 Em Desenvolvimento
