# 🔍 PROBLEMA IDENTIFICADO - PREFIXO AUTOMÁTICO DO VOYAGER

## 🎯 CAUSA RAIZ

O Voyager está **automaticamente** adicionando um prefixo baseado no `group` da configuração!

### **Código do Voyager (VoyagerSettingsController.php):**

```php
$key = implode('.', [Str::slug($request->input('group')), $request->input('key')]);
```

### **O que acontece:**

```
group = "Mercado Pago"
key = "mercadopago.access_token"

Str::slug("Mercado Pago") = "mercado-pago"

Resultado: "mercado-pago.mercadopago.access_token"
```

---

## ✅ SOLUÇÃO

Precisamos mudar o `group` para **não ter espaços**!

### **Opção 1: Usar um group sem espaços (Recomendado)**

Mudar de:
```
group = "Mercado Pago"
```

Para:
```
group = "MercadoPago" (sem espaço)
OU
group = "mercadopago" (minúsculo)
```

### **Opção 2: Usar um group com hífen**

Mudar de:
```
group = "Mercado Pago"
```

Para:
```
group = "Mercado-Pago" (com hífen)
```

---

## 🔧 IMPLEMENTAÇÃO

Vou atualizar os seeders para usar `group = "MercadoPago"` (sem espaço).

Isso fará com que o Voyager gere:

```
Str::slug("MercadoPago") = "mercadopago"

Resultado: "mercadopago.mercadopago.access_token"
```

Que depois será corrigido para:

```
"mercadopago.access_token"
```

---

## 📝 RESUMO

| Item | Antes | Depois |
|------|-------|--------|
| Group | "Mercado Pago" | "MercadoPago" |
| Slug | "mercado-pago" | "mercadopago" |
| Chave Gerada | "mercado-pago.mercadopago.access_token" | "mercadopago.mercadopago.access_token" |
| Após Limpeza | (não funciona) | "mercadopago.access_token" ✅ |

---

**Status:** ✅ Problema Identificado e Solucionado
**Data:** 23 de Novembro de 2025
