# 📋 WEBHOOK MERCADO PAGO - DOCUMENTAÇÃO COMPLETA

## 🎯 Objetivo
Receber notificações do Mercado Pago quando um pagamento é processado e atualizar o status da transação e booking no banco de dados.

---

## 📊 Status Atual

❌ **Problema:** Rota retorna HTTP 419 (Page Expired - erro de CSRF)
- URL: `https://eventos.inovmi.com.br/api/mercadopago/webhook`
- Método: POST
- Controller: Não está sendo chamado (bloqueado por CSRF)
- Middleware: `withoutMiddleware()` não está funcionando

---

## 🏗️ Arquitetura

### Fluxo de Dados
```
Mercado Pago
    ↓
POST /api/mercadopago/webhook
    ↓
MercadoPagoWebhookController@handle
    ↓
Buscar MercadoPagoTransaction pelo payment_id
    ↓
Atualizar status para 'approved'
    ↓
Atualizar Booking para is_paid = 1
    ↓
Retornar 200 OK
```

---

## 📁 Arquivos Envolvidos

### 1. **Rota** - `/routes/web.php`

```php
<?php

use Illuminate\Support\Facades\Route;
use TCG\Voyager\Models\Page;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(!file_exists(storage_path()."/installed")) {
        header('location:license');die;
    }

    return view('welcome');
});

Route::get('/license', 'App\Http\Controllers\LicenseController@index');
Route::get('/52cab7070ba5124895a63a3703f66893232', function() {
    header('location:install');die;
});

// API route para buscar páginas (Política de Privacidade e Termos)
Route::get('/api/pages/{id}', function ($id) {
    $page = Page::find($id);
    
    if (!$page) {
        return response()->json(['error' => 'Página não encontrada'], 404);
    }
    
    return response()->json([
        'id' => $page->id,
        'title' => $page->title,
        'body' => $page->body,
        'slug' => $page->slug,
    ]);
})->name('api.pages.show');

// ⚠️ PROBLEMA: Esta rota retorna 419 (CSRF)
// Mercado Pago Webhook - sem CSRF
Route::post('/api/mercadopago/webhook', 'App\Http\Controllers\MercadoPagoWebhookController@handle')
    ->name('api.mercadopago.webhook')
    ->withoutMiddleware([\Classiebit\Eventmie\Middleware\VerifyCsrfToken::class, \App\Http\Middleware\VerifyCsrfToken::class]);

if(file_exists(storage_path()."/installed")) {
    Eventmie::routes();
}
```

**Problema:** O `withoutMiddleware()` não está removendo o middleware de CSRF corretamente.

---

### 2. **Controller** - `/app/Http/Controllers/MercadoPagoWebhookController.php`

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\MercadoPagoTransaction;
use Classiebit\Eventmie\Models\Booking;

class MercadoPagoWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // Logar tudo que o Mercado Pago mandar, pra debug
        $logFile = storage_path('logs/webhook_debug.log');
        $timestamp = date('Y-m-d H:i:s');
        
        file_put_contents($logFile, "\n[$timestamp] === WEBHOOK MERCADO PAGO RECEBIDO ===\n", FILE_APPEND);
        file_put_contents($logFile, "[$timestamp] Method: " . $request->method() . "\n", FILE_APPEND);
        file_put_contents($logFile, "[$timestamp] URL: " . $request->url() . "\n", FILE_APPEND);
        file_put_contents($logFile, "[$timestamp] Payload: " . json_encode($request->all()) . "\n", FILE_APPEND);
        file_put_contents($logFile, "[$timestamp] Headers: " . json_encode($request->headers->all()) . "\n", FILE_APPEND);
        
        Log::info('=== WEBHOOK MERCADO PAGO RECEBIDO - CONTROLLER CHAMADO ===');
        Log::info('Payload:', $request->all());
        Log::info('Headers:', $request->headers->all());

        try {
            // Mercado Pago envia o tipo de evento em 'type' e o ID do recurso em 'data.id'
            $type = $request->input('type');
            $dataId = $request->input('data.id');
            
            Log::info('Webhook Info:', [
                'type' => $type,
                'data_id' => $dataId,
            ]);
            
            // Validar se é um evento de pagamento
            if (!$type || !$dataId) {
                Log::warning('⚠️ Webhook inválido - type ou data.id vazio');
                return response()->json(['status' => 'ok'], 200);
            }
            
            // Se for um pagamento, processar
            if ($type === 'payment') {
                Log::info('🔵 Processando pagamento com ID:', ['payment_id' => $dataId]);
                
                $transaction = MercadoPagoTransaction::where('payment_id', $dataId)->first();
                
                if ($transaction) {
                    Log::info('✅ Transação encontrada:', [
                        'id' => $transaction->id,
                        'payment_id' => $transaction->payment_id,
                        'booking_id' => $transaction->booking_id,
                        'status_atual' => $transaction->status
                    ]);
                    
                    // Atualizar status da transação para 'approved'
                    $transaction->status = 'approved';
                    $transaction->save();
                    
                    Log::info('✅ Transação atualizada para approved');
                    
                    // Atualizar booking se existir
                    if ($transaction->booking_id) {
                        $booking = Booking::find($transaction->booking_id);
                        if ($booking) {
                            Log::info('📦 Booking encontrado - atualizando is_paid');
                            
                            $booking->is_paid = 1;
                            $booking->save();
                            
                            Log::info('✅ Booking atualizado para paid:', [
                                'booking_id' => $booking->id
                            ]);
                        } else {
                            Log::warning('❌ Booking não encontrado:', ['booking_id' => $transaction->booking_id]);
                        }
                    } else {
                        Log::warning('⚠️ Transação não tem booking_id');
                    }
                } else {
                    Log::warning('❌ Transação não encontrada para payment_id:', ['payment_id' => $dataId]);
                }
            } else {
                Log::info('ℹ️ Evento não é payment, ignorando:', ['type' => $type]);
            }
            
            // Sempre retornar 200 OK para Mercado Pago
            return response()->json(['status' => 'ok'], 200);
            
        } catch (\Exception $e) {
            Log::error('❌ Erro ao processar webhook:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            // Retornar 200 mesmo em caso de erro para não fazer retry infinito
            return response()->json(['status' => 'ok'], 200);
        }
    }
}
```

**Status:** ✅ Controller está pronto, mas não está sendo chamado (bloqueado por CSRF antes de chegar aqui)

---

### 3. **Models**

#### A. MercadoPagoTransaction
**Localização:** `/app/Models/MercadoPagoTransaction.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MercadoPagoTransaction extends Model
{
    protected $table = 'mercadopago_transactions';
    
    protected $fillable = [
        'booking_id',
        'user_id',
        'payment_id',
        'status',
        'amount',
        'currency',
        'payment_method_type',
        'payer_email',
        'payer_name',
    ];
    
    // Relacionamento com Booking
    public function booking()
    {
        return $this->belongsTo(\Classiebit\Eventmie\Models\Booking::class);
    }
}
```

#### B. Booking
**Localização:** `/eventmie-pro/src/Models/Booking.php`

```php
// Já existe no projeto
// Campos importantes:
// - id (PK)
// - is_paid (boolean) - Marca se o booking foi pago
// - order_number (string) - Número do pedido
// - net_price (decimal) - Valor total
```

---

### 4. **Middleware CSRF** - `/eventmie-pro/src/Middleware/VerifyCsrfToken.php`

```php
<?php

namespace Classiebit\Eventmie\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
    ];
}
```

**Problema:** O webhook não está na lista de exceções `$except`

---

## 🔧 Soluções Testadas

### ❌ Solução 1: `withoutMiddleware()` em routes/web.php
```php
Route::post('/api/mercadopago/webhook', '...')
    ->withoutMiddleware([\Classiebit\Eventmie\Middleware\VerifyCsrfToken::class]);
```
**Resultado:** Não funcionou - ainda retorna 419

### ❌ Solução 2: Usar routes/api.php
```php
// routes/api.php
Route::post('/mercadopago/webhook', '...');
```
**Resultado:** Rota não foi encontrada

### ❌ Solução 3: Remover prefixo /api
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->api(remove: ['auth:api']);
})
```
**Resultado:** Não funcionou

---

## ✅ Solução Recomendada

### Opção 1: Adicionar à lista de exceções do middleware CSRF

**Arquivo:** `/eventmie-pro/src/Middleware/VerifyCsrfToken.php`

```php
<?php

namespace Classiebit\Eventmie\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'api/mercadopago/webhook',
        '*/api/mercadopago/webhook',
    ];
}
```

**Passos:**
1. Editar `/eventmie-pro/src/Middleware/VerifyCsrfToken.php`
2. Adicionar `'api/mercadopago/webhook'` à lista `$except`
3. Executar: `php artisan optimize:clear`
4. Testar: `curl -X POST https://eventos.inovmi.com.br/api/mercadopago/webhook -H "Content-Type: application/json" -d '{"type":"payment","data":{"id":123456789}}'`

---

## 📝 Formato do Webhook do Mercado Pago

### Requisição Recebida
```json
{
  "type": "payment",
  "data": {
    "id": 123456789
  }
}
```

### Headers Esperados
```
Content-Type: application/json
User-Agent: MercadoPago/1.0
```

### Resposta Esperada
```json
{
  "status": "ok"
}
```

**HTTP Status:** 200 OK

---

## 🧪 Testes

### Teste 1: cURL Manual
```bash
curl -X POST https://eventos.inovmi.com.br/api/mercadopago/webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"payment","data":{"id":123456789}}'
```

### Teste 2: Verificar Logs
```bash
tail -f /www/wwwroot/eventos.inovmi.com.br/storage/logs/webhook_debug.log
tail -f /www/wwwroot/eventos.inovmi.com.br/storage/logs/laravel.log
```

### Teste 3: Verificar Banco de Dados
```sql
SELECT * FROM mercadopago_transactions WHERE payment_id = 123456789;
SELECT * FROM bookings WHERE id = (SELECT booking_id FROM mercadopago_transactions WHERE payment_id = 123456789);
```

---

## 📊 Banco de Dados

### Tabela: mercadopago_transactions
```sql
CREATE TABLE mercadopago_transactions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    booking_id BIGINT UNSIGNED,
    user_id BIGINT UNSIGNED,
    payment_id BIGINT,
    status VARCHAR(50), -- pending, approved, rejected, cancelled
    amount DECIMAL(10, 2),
    currency VARCHAR(3),
    payment_method_type VARCHAR(50),
    payer_email VARCHAR(255),
    payer_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX (payment_id),
    INDEX (booking_id)
);
```

### Tabela: bookings
```sql
-- Campos importantes:
-- is_paid (TINYINT) - 0 ou 1
-- order_number (VARCHAR)
-- net_price (DECIMAL)
```

---

## 🔐 Segurança

### ⚠️ Importante
- Webhook deve estar em HTTPS
- Sem autenticação (Mercado Pago envia de seus servidores)
- Sem CSRF (gateway externo)
- Sempre retornar 200 OK (mesmo em erro) para evitar retry infinito

---

## 📞 Configuração no Mercado Pago

1. Acessar: https://www.mercadopago.com.br/developers
2. Ir para: **Configurações** → **Webhooks**
3. Adicionar URL: `https://eventos.inovmi.com.br/api/mercadopago/webhook`
4. Selecionar eventos: `payment.created`, `payment.updated`
5. Método: POST

---

## 🚀 Próximos Passos

1. ✅ Implementar solução de CSRF (adicionar à lista `$except`)
2. ✅ Testar webhook com cURL
3. ✅ Verificar logs
4. ✅ Testar com Mercado Pago sandbox
5. ✅ Testar com Mercado Pago produção

---

## 📋 Checklist

- [ ] Adicionar rota à lista de exceções CSRF
- [ ] Limpar cache Laravel: `php artisan optimize:clear`
- [ ] Testar webhook com cURL
- [ ] Verificar arquivo de log: `storage/logs/webhook_debug.log`
- [ ] Verificar Laravel log: `storage/logs/laravel.log`
- [ ] Verificar banco de dados
- [ ] Testar com Mercado Pago sandbox
- [ ] Configurar webhook no Mercado Pago produção
- [ ] Testar com pagamento real

---

## 📂 Arquivos Criados/Modificados

1. ✅ `/routes/web.php` - Rota do webhook adicionada
2. ✅ `/app/Http/Controllers/MercadoPagoWebhookController.php` - Controller criado
3. ✅ `/app/Models/MercadoPagoTransaction.php` - Model (já existe)
4. ✅ `/eventmie-pro/src/Middleware/VerifyCsrfToken.php` - Middleware (precisa atualizar)
5. ✅ `/bootstrap/app.php` - Configuração do Laravel
6. ✅ `/routes/api.php` - Arquivo de rotas de API (criado mas não usado)

---

## 🎯 Resumo

**Problema:** Rota retorna 41(CSRF) porque o middleware não está sendo removido corretamente.

**Solução:** Adicionar `'api/mercadopago/webhook'` à lista `$except` do middleware CSRF em `/eventmie-pro/src/Middleware/VerifyCsrfToken.php`

**Arquivo a Modificar:** `/eventmie-pro/src/Middleware/VerifyCsrfToken.php`

**Mudança Necessária:**
```php
protected $except = [
    'api/mercadopago/webhook',
    '*/api/mercadopago/webhook',
];
```

Depois executar: `php artisan optimize:clear`
