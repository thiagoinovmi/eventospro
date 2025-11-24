# 📱 TRATAMENTO DE RESPOSTA - PIX, BOLETO E CARTEIRA

## ✅ Resposta do Backend Agora Corrigida

### PIX
```javascript
{
  "status": true,
  "payment_id": 134446328299,
  "payment_method": "pix",
  "pix_status": "pending",
  "qr_code": "00020126360014br.gov.bcb.pix0136...",
  "qr_code_url": "https://...",
  "message": "QR Code PIX gerado com sucesso"
}
```

### Boleto
```javascript
{
  "status": true,
  "payment_id": 134446328299,
  "payment_method": "boleto",
  "boleto_status": "pending",
  "barcode_url": "https://...",
  "message": "Boleto gerado com sucesso"
}
```

### Carteira
```javascript
{
  "status": true,
  "payment_id": 134446328299,
  "payment_method": "wallet",
  "wallet_status": "pending",
  "message": "Pagamento via Carteira Mercado Pago processado"
}
```

---

## 🎯 Como Tratar no Frontend (MercadoPagoCheckout.vue)

### Estrutura Atual (Incorreta)
```javascript
// ❌ ERRADO - Procurando por pix_data que não existe
if (response.data.pix_data) {
    // mostrar QR Code
}
```

### Estrutura Corrigida (Esperada)
```javascript
// ✅ CORRETO - Usar os campos corretos
if (response.data.payment_method === 'pix') {
    // PIX foi gerado com sucesso
    const qrCode = response.data.qr_code;        // String do QR Code
    const qrCodeUrl = response.data.qr_code_url; // URL da imagem
    const status = response.data.pix_status;     // 'pending'
    
    // Mostrar QR Code ao usuário
    this.showPixQrCode(qrCode, qrCodeUrl);
}
```

---

## 📋 Campos Retornados por Método

### PIX
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `status` | boolean | Sucesso da operação |
| `payment_id` | number | ID do pagamento no Mercado Pago |
| `payment_method` | string | "pix" |
| `pix_status` | string | "pending" (aguardando confirmação) |
| `qr_code` | string | Código QR em formato texto |
| `qr_code_url` | string | URL da imagem do QR Code |
| `message` | string | Mensagem de sucesso |

### Boleto
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `status` | boolean | Sucesso da operação |
| `payment_id` | number | ID do pagamento no Mercado Pago |
| `payment_method` | string | "boleto" |
| `boleto_status` | string | "pending" (aguardando pagamento) |
| `barcode_url` | string | URL para visualizar/pagar o boleto |
| `message` | string | Mensagem de sucesso |

### Carteira
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `status` | boolean | Sucesso da operação |
| `payment_id` | number | ID do pagamento no Mercado Pago |
| `payment_method` | string | "wallet" |
| `wallet_status` | string | "pending" (aguardando confirmação) |
| `message` | string | Mensagem de sucesso |

---

## 🔧 Exemplo de Implementação Completa

```javascript
async processPayment() {
    try {
        const response = await axios.post('/bookings/api/mercadopago/process', paymentData);
        
        if (response.data.status) {
            // Sucesso geral
            
            if (response.data.payment_method === 'pix') {
                // ✅ PIX
                this.handlePixSuccess(response.data);
            } 
            else if (response.data.payment_method === 'boleto') {
                // ✅ Boleto
                this.handleBoletoSuccess(response.data);
            }
            else if (response.data.payment_method === 'wallet') {
                // ✅ Carteira
                this.handleWalletSuccess(response.data);
            }
            else if (response.data.payment_method === 'credit_card') {
                // ✅ Cartão
                this.handleCardSuccess(response.data);
            }
        } else {
            // Erro
            this.errorMessage = response.data.message;
        }
    } catch (error) {
        this.errorMessage = 'Erro ao processar pagamento';
    }
}

handlePixSuccess(data) {
    // data.qr_code = "00020126360014br.gov.bcb.pix..."
    // data.qr_code_url = "https://..."
    // data.pix_status = "pending"
    
    // Mostrar QR Code
    this.showQrCodeModal({
        qrCode: data.qr_code,
        qrCodeUrl: data.qr_code_url,
        paymentId: data.payment_id,
        status: data.pix_status
    });
}

handleBoletoSuccess(data) {
    // data.barcode_url = "https://..."
    // data.boleto_status = "pending"
    
    // Redirecionar ou abrir em nova aba
    window.open(data.barcode_url, '_blank');
}

handleWalletSuccess(data) {
    // data.wallet_status = "pending"
    // Redirecionar para confirmação
    this.$router.push('/mybookings');
}

handleCardSuccess(data) {
    // data.is_paid = 1
    // data.booking_status = 1
    // Redirecionar para confirmação
    this.$router.push('/mybookings');
}
```

---

## 🎨 UI/UX Sugerida

### Para PIX
1. Mostrar QR Code em modal/popup
2. Opção de copiar código PIX
3. Timer de expiração (geralmente 30 minutos)
4. Botão "Já paguei" para confirmar

### Para Boleto
1. Abrir URL em nova aba
2. Mostrar código de barras
3. Opção de copiar código
4. Data de vencimento

### Para Carteira
1. Redirecionar para Mercado Pago
2. Usuário confirma na carteira
3. Retornar ao site

### Para Cartão
1. Mostrar confirmação
2. Redirecionar para /mybookings

---

## 📝 Checklist de Implementação

- [ ] Verificar se `response.data.payment_method` é "pix"
- [ ] Extrair `qr_code` e `qr_code_url` corretamente
- [ ] Mostrar QR Code ao usuário
- [ ] Implementar timer de expiração
- [ ] Implementar polling para verificar status
- [ ] Tratar erro 403 (PIX não habilitado)
- [ ] Testar com cartão (já funciona)
- [ ] Testar com PIX
- [ ] Testar com Boleto
- [ ] Testar com Carteira

---

## 🧪 Como Testar

### 1. Verificar Resposta no Console
```javascript
// No console do navegador
// Abrir DevTools (F12) → Console
// Fazer um pagamento com PIX
// Verificar se response.data tem qr_code e qr_code_url
```

### 2. Verificar Logs do Backend
```bash
tail -f storage/logs/laravel.log | grep -E "(PIX|qr_code)"
```

### 3. Esperado
```
[2025-11-24 ...] local.INFO: PIX processado com sucesso: {
  "payment_id": 134446328299,
  "status": "pending",
  "qr_code_presente": true,
  "qr_code_url_presente": true
}
```

---

## ✅ Status

- ✅ Backend retorna dados corretos
- ⏳ Frontend precisa tratar os dados
- ⏳ UI/UX para mostrar QR Code
- ⏳ Polling para verificar status

**Próximo passo:** Atualizar MercadoPagoCheckout.vue para tratar corretamente os dados de PIX, Boleto e Carteira.
