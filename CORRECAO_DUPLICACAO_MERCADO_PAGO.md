# 🔧 CORREÇÃO - DUPLICAÇÃO DE CONFIGURAÇÕES MERCADO PAGO

## ✅ PROBLEMA CORRIGIDO

A aba "Mercado Pago" estava mostrando **configurações duplicadas** porque havia **duas versões** das mesmas configurações no banco de dados:

### **Versão Antiga (DELETADA):**
```
mercado-pago.mercadopago.access_token
mercado-pago.mercadopago.public_key
mercado-pago.mercadopago.mode
... (21 configurações)
```

### **Versão Nova (MANTIDA):**
```
mercadopago.access_token
mercadopago.public_key
mercadopago.mode
... (21 configurações)
```

---

## 🔄 O QUE FOI FEITO

1. ✅ Deletadas **21 configurações antigas** (prefixo `mercado-pago.mercadopago.`)
2. ✅ Mantidas **21 configurações novas** (prefixo `mercadopago.`)
3. ✅ Reexecutados os seeders para garantir integridade

---

## 📊 RESULTADO

**Antes:**
- 42 configurações (21 duplicadas)
- Aba mostrando tudo em duplicado

**Depois:**
- 21 configurações (sem duplicação)
- Aba limpa e organizada

---

## ✅ CONFIGURAÇÕES FINAIS

A aba "Mercado Pago" agora mostra apenas:

### **Seção 1: Configurações Globais**
1. Access Token
2. Public Key
3. Modo de Operação
4. URL do Webhook
5. Token do Webhook
6. Habilitar Mercado Pago

### **Seção 2: Cartão de Crédito**
- Habilitado
- Parcelamento
- Máx. Parcelas

### **Seção 3: Cartão de Débito**
- Habilitado
- Parcelamento
- Máx. Parcelas

### **Seção 4: Boleto**
- Habilitado
- Parcelamento
- Máx. Parcelas

### **Seção 5: PIX**
- Habilitado
- Parcelamento
- Máx. Parcelas

### **Seção 6: Carteira Mercado Pago**
- Habilitado
- Parcelamento
- Máx. Parcelas

---

## 🎯 PRÓXIMO PASSO

Agora você pode:

1. Acessar: `https://eventos.inovmi.com.br/admin/settings`
2. Ir para aba "Mercado Pago"
3. Preencher as credenciais:
   - Access Token
   - Public Key
   - Modo (Teste ou Produção)
4. Habilitar o toggle "Habilitar Mercado Pago"
5. Clicar em "Salvar"

---

**Status:** ✅ Corrigido
**Data:** 23 de Novembro de 2025
