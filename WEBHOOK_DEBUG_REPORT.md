# 🔍 RELATÓRIO DE DEBUG - WEBHOOK MERCADO PAGO

## 📊 Status Atual

❌ **Rota não está sendo encontrada**
- URL: `https://eventos.inovmi.com.br/api/mercadopago/webhook`
- HTTP Status: 200 (mas retorna HTML 404)
- Controller não está sendo chamado
- Arquivo de log não foi criado

## 🔧 Configuração Realizada

### 1. Arquivo de Rotas
**Arquivo:** `/routes/api.php`
```php
<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MercadoPagoWebhookController;

Route::post('/mercadopago/webhook', [MercadoPagoWebhookController::class, 'handle']);
```

### 2. Controller
**Arquivo:** `/app/Http/Controllers/MercadoPagoWebhookController.php`
- Método: `handle(Request $request)`
- Logs em: `/storage/logs/webhook_debug.log`
- Também usa Laravel Log

### 3. Bootstrap
**Arquivo:** `/bootstrap/app.php`
```php
->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php',
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
)
```

## 🐛 Problemas Identificados

### 1. Rota não está sendo registrada
- `php artisan route:list` não mostra a rota
- `php debug_routes.php` retorna 0 rotas

### 2. Possíveis Causas

#### A. Middleware de API
O Laravel 11 aplica middlewares automáticos às rotas de API. A rota pode estar sendo bloqueada por:
- Middleware de autenticação (`auth:api`)
- Middleware de rate limiting
- Middleware de CORS

#### B. Prefixo de API
O Laravel 11 aplica prefixo `/api` automaticamente, mas pode haver conflito com a configuração.

#### C. Arquivo de Rotas não está sendo carregado
O arquivo `/routes/api.php` pode não estar sendo carregado corretamente pelo Laravel.

## 📝 Testes Realizados

### Teste 1: cURL direto
```bash
curl -X POST https://eventos.inovmi.com.br/api/mercadopago/webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"payment","data":{"id":123456789}}'
```
**Resultado:** HTTP 200 com HTML 404

### Teste 2: Listar rotas
```bash
php artisan route:list | grep mercado
```
**Resultado:** Nenhuma rota encontrada

### Teste 3: Debug de rotas
```bash
php debug_routes.php
```
**Resultado:** 0 rotas carregadas

## 🛠️ Próximos Passos para Resolver

### Opção 1: Verificar Middlewares de API
Editar `/bootstrap/app.php` e adicionar:
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->api(remove: ['auth:api', 'throttle:api']);
})
```

### Opção 2: Usar Rota em routes/web.php
Mover a rota para `/routes/web.php` em vez de `/routes/api.php`:
```php
Route::post('/api/mercadopago/webhook', [MercadoPagoWebhookController::class, 'handle'])
    ->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);
```

### Opção 3: Verificar Configuração do Laravel
Executar:
```bash
php artisan config:cache
php artisan route:cache
php artisan optimize:clear
```

### Opção 4: Adicionar Logs no Kernel
Editar `/app/Http/Kernel.php` e adicionar logs para rastrear requisições.

## 📂 Arquivos Criados

1. ✅ `/routes/api.php` - Rota do webhook
2. ✅ `/app/Http/Controllers/MercadoPagoWebhookController.php` - Controller
3. ✅ `/debug_routes.php` - Script de debug
4. ✅ `/debug_bootstrap.php` - Script de debug bootstrap
5. ✅ `/WEBHOOK_DEBUG_REPORT.md` - Este arquivo

## 🔗 URLs para Testar

- Webhook: `https://eventos.inovmi.com.br/api/mercadopago/webhook`
- Debug: `https://eventos.inovmi.com.br/debug_routes.php`
- Debug Bootstrap: `https://eventos.inovmi.com.br/debug_bootstrap.php`

## 📋 Checklist de Verificação

- [ ] Verificar se `/routes/api.php` está sendo carregado
- [ ] Verificar middlewares aplicados às rotas de API
- [ ] Verificar se há conflito de prefixos
- [ ] Verificar logs do Apache/Nginx
- [ ] Verificar se há rewrite rules bloqueando a rota
- [ ] Testar com URL alternativa em `/routes/web.php`
- [ ] Limpar todos os caches do Laravel
- [ ] Verificar permissões de arquivo

## 📞 Informações para Suporte

**Versão do Laravel:** 11
**Versão do PHP:** 8.2+
**Servidor:** Apache/Nginx
**URL do Webhook:** `https://eventos.inovmi.com.br/api/mercadopago/webhook`
**Status HTTP:** 200 (com HTML 404)
**Controller Chamado:** Não
**Log Criado:** Não
