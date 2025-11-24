# 🔑 CORREÇÃO CRÍTICA - UNIFICAÇÃO DE TOKEN

## ❌ O PROBLEMA

### Antes (Código com Bug)
```php
// Cartão - FUNCIONA ✅
$accessToken = setting('mercadopago.access_token');

// PIX - ERRO 403 ❌
$accessToken = setting('apps.mercadopago_access_token');

// Boleto - ERRO 403 ❌
$accessToken = setting('apps.mercadopago_access_token');

// Carteira - ERRO 403 ❌
$accessToken = setting('apps.mercadopago_access_token');
```

### Por que isso causava erro?
- **Cartão** usava `mercadopago.access_token` (token correto com permissões)
- **PIX/Boleto/Carteira** usavam `apps.mercadopago_access_token` (token diferente, sem permissões)
- Resultado: Cartão funciona, PIX/Boleto/Carteira retornam **HTTP 403 - PolicyAgent UNAUTHORIZED**

---

## ✅ A SOLUÇÃO

### Depois (Código Corrigido)
```php
// Todos usam o MESMO token
$accessToken = setting('mercadopago.access_token');

// Com validação
if (!$accessToken) {
    \Log::error('Access token do Mercado Pago não configurado');
    return [
        'status' => false,
        'message' => 'Mercado Pago não está configurado'
    ];
}
```

### Arquivos Modificados

#### 1. **BookingsController.php**
- ✅ `processPixPayment()` - Agora usa `setting('mercadopago.access_token')`
- ✅ `processBoletoPayment()` - Agora usa `setting('mercadopago.access_token')`
- ✅ `processWalletPayment()` - Agora usa `setting('mercadopago.access_token')`
- ✅ Adicionada validação de token em cada método

#### 2. **MercadoPagoService.php**
- ✅ Construtor agora tenta múltiplas fontes:
  1. `$settings['access_token']` (passado ao construir)
  2. `setting('mercadopago.access_token')` (Voyager Settings)
  3. `env('MERCADOPAGO_ACCESS_TOKEN')` (Variável de ambiente)
- ✅ Logging detalhado de onde o token foi obtido

---

## 🧪 COMO TESTAR

### 1. Verificar Token Configurado
```bash
cd /www/wwwroot/eventos.inovmi.com.br
php artisan tinker
> setting('mercadopago.access_token')
# Deve retornar: "APP_USR-530080609977..." (começa com APP_USR-)
```

### 2. Testar PIX
```
1. Vá para a página de evento
2. Selecione PIX como método de pagamento
3. Clique em "Confirmar pagamento"
4. Verifique o log: storage/logs/laravel.log
```

### 3. Verificar Logs
```bash
tail -f storage/logs/laravel.log | grep -E "(PIX|Boleto|Carteira|INICIANDO)"
```

### 4. Esperado
```
[2025-11-24 ...] local.INFO: === INICIANDO PROCESSAMENTO DE PIX ===
[2025-11-24 ...] local.INFO: Dados PIX preparados: {...}
[2025-11-24 ...] local.INFO: Resposta PIX recebida: {"httpCode":201,"status":"pending",...}
[2025-11-24 ...] local.INFO: PIX processado com sucesso: {...}
```

---

## 📊 COMPARAÇÃO

| Aspecto | Antes | Depois |
|--------|-------|--------|
| **Cartão** | ✅ Funciona | ✅ Funciona |
| **PIX** | ❌ 403 UNAUTHORIZED | ✅ Deve funcionar |
| **Boleto** | ❌ 403 UNAUTHORIZED | ✅ Deve funcionar |
| **Carteira** | ❌ 403 UNAUTHORIZED | ✅ Deve funcionar |
| **Token Unificado** | ❌ Não | ✅ Sim |
| **Validação** | ❌ Não | ✅ Sim |

---

## 🔍 SE AINDA RECEBER 403

Se mesmo após essa correção continuar recebendo HTTP 403:

1. **Não é mais bug de código** - é configuração na conta Mercado Pago
2. **Verifique:**
   - PIX está habilitado na conta? (Configurações → Métodos de Pagamento)
   - Boleto está habilitado na conta?
   - Carteira está habilitada na conta?
3. **Se não estiverem:** Ative-os no painel Mercado Pago
4. **Se estiverem:** Pode ser restrição de política - gere novo token sem restrições

---

## 📝 RESUMO DAS MUDANÇAS

### BookingsController.php
```diff
- $accessToken = setting('apps.mercadopago_access_token');  // ❌ ERRADO
+ $accessToken = setting('mercadopago.access_token');       // ✅ CORRETO

+ if (!$accessToken) {
+     return ['status' => false, 'message' => 'Mercado Pago não está configurado'];
+ }
```

### MercadoPagoService.php
```diff
- $this->accessToken = $settings['access_token'] ?? null;
+ $this->accessToken = $settings['access_token'] 
+     ?? setting('mercadopago.access_token')
+     ?? env('MERCADOPAGO_ACCESS_TOKEN')
+     ?? null;
```

---

## ✅ PRÓXIMOS PASSOS

1. ✅ Código corrigido e commitado
2. ⏳ Testar PIX novamente
3. ⏳ Se funcionar: Testar Boleto
4. ⏳ Se funcionar: Testar Carteira
5. ⏳ Se ainda houver 403: Verificar permissões na conta Mercado Pago

**Status:** Pronto para testes!
