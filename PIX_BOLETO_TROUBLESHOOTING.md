# 🔧 TROUBLESHOOTING - PIX, BOLETO E CARTEIRA

## ❌ ERRO: HTTP 403 - PolicyAgent UNAUTHORIZED

### O Problema
```
At least one policy returned UNAUTHORIZED.
blocked_by: PolicyAgent
code: PA_UNAUTHORIZED_RESULT_FROM_POLICIES
```

### Causa Raiz
O token de acesso do Mercado Pago **não tem permissão** para processar PIX, Boleto ou Carteira. Isso é uma **restrição de segurança** configurada na conta Mercado Pago.

### Por que Cartão Funciona e PIX Não?
- **Cartão de Crédito:** Geralmente habilitado por padrão em todas as contas
- **PIX:** Requer habilitação explícita na conta
- **Boleto:** Requer habilitação explícita na conta
- **Carteira:** Requer habilitação explícita na conta

### ✅ SOLUÇÃO

#### 1. **Verificar Permissões no Painel Mercado Pago**

Acesse: https://www.mercadopago.com.br/admin/

1. Vá para **Configurações** → **Integrações** → **Credenciais**
2. Verifique qual token está sendo usado (Production ou Sandbox)
3. Vá para **Configurações** → **Métodos de Pagamento**
4. Certifique-se de que PIX, Boleto e Carteira estão **habilitados**

#### 2. **Verificar Restrições de Política**

Se o erro persistir:

1. Acesse **Configurações** → **Segurança** → **Políticas de Acesso**
2. Verifique se há restrições por tipo de pagamento
3. Se houver, remova as restrições ou crie uma nova credencial sem restrições

#### 3. **Gerar Nova Credencial (Se Necessário)**

Se a credencial atual tiver restrições:

1. Vá para **Configurações** → **Integrações** → **Credenciais**
2. Clique em **Gerar Credencial**
3. Selecione **Produção** (ou **Sandbox** para testes)
4. Copie o novo **Access Token**
5. Atualize em **Voyager Settings** → `apps.mercadopago_access_token`

#### 4. **Atualizar Token no Sistema**

```bash
# Via Voyager Admin
1. Acesse /admin/settings
2. Procure por "Mercado Pago Access Token"
3. Cole o novo token
4. Salve as alterações
```

Ou via banco de dados:

```sql
UPDATE settings 
SET value = 'seu_novo_token_aqui' 
WHERE key = 'apps.mercadopago_access_token';
```

#### 5. **Limpar Cache**

```bash
cd /www/wwwroot/eventos.inovmi.com.br
php artisan cache:clear
php artisan config:clear
rm -rf bootstrap/cache/*
```

#### 6. **Testar Novamente**

Tente fazer um pagamento com PIX novamente. Se funcionar, o problema foi resolvido!

---

## 📊 DIFERENÇAS ENTRE OS MÉTODOS

| Método | Status | Permissão Necessária | Observações |
|--------|--------|----------------------|-------------|
| **Cartão de Crédito** | ✅ FUNCIONAL | Padrão | Funciona em qualquer conta |
| **PIX** | ❌ 403 UNAUTHORIZED | Explícita | Requer habilitação na conta |
| **Boleto** | ❌ 403 UNAUTHORIZED | Explícita | Requer habilitação na conta |
| **Carteira** | ❌ 403 UNAUTHORIZED | Explícita | Requer habilitação na conta |

---

## 🔍 LOGS PARA DIAGNÓSTICO

### Log de PIX com Erro 403
```
[2025-11-24 10:54:54] local.INFO: === INICIANDO PROCESSAMENTO DE PIX ===
[2025-11-24 10:54:54] local.INFO: Dados PIX preparados: {...}
[2025-11-24 10:54:54] local.ERROR: Erro ao processar PIX - HTTP 403 {
  "response": "{\"status\":403,\"message\":\"At least one policy returned UNAUTHORIZED.\",\"blocked_by\":\"PolicyAgent\",\"code\":\"PA_UNAUTHORIZED_RESULT_FROM_POLICIES\"}"
}
```

### Log de Cartão Funcionando
```
[2025-11-24 10:57:27] local.INFO: === INICIANDO PROCESSAMENTO DE CARTÃO ===
[2025-11-24 10:57:27] local.INFO: Dados do pagamento preparados: {...}
[2025-11-24 10:57:30] local.INFO: Resposta do Mercado Pago (cartão): {
  "httpCode": 201,
  "status": "approved"
}
[2025-11-24 10:57:30] local.INFO: MercadoPagoTransaction salva com sucesso: {...}
```

---

## 🛠️ CHECKLIST DE VERIFICAÇÃO

- [ ] Token de acesso está correto?
- [ ] PIX está habilitado na conta Mercado Pago?
- [ ] Boleto está habilitado na conta Mercado Pago?
- [ ] Carteira está habilitada na conta Mercado Pago?
- [ ] Não há restrições de política no token?
- [ ] Cache foi limpo após atualizar o token?
- [ ] Está usando o token de Produção (não Sandbox)?
- [ ] A conta Mercado Pago está ativa e verificada?

---

## 📞 PRÓXIMOS PASSOS

1. **Verificar Permissões:** Acesse o painel Mercado Pago e confirme que PIX, Boleto e Carteira estão habilitados
2. **Gerar Novo Token:** Se necessário, gere um novo token sem restrições
3. **Atualizar Sistema:** Atualize o token em Voyager Settings
4. **Limpar Cache:** Execute `php artisan cache:clear`
5. **Testar:** Tente fazer um pagamento com PIX novamente

---

## 💡 DICA

Se você tiver múltiplas credenciais, certifique-se de estar usando a **credencial de produção** correta, não a de sandbox!

Para verificar qual token está em uso:

```php
// Via Laravel Tinker
php artisan tinker
> setting('apps.mercadopago_access_token')
```

Se começar com `TEST-`, é sandbox. Se começar com `APP_USR-`, é produção.
