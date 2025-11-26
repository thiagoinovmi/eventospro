# 🔐 POLÍTICA DE SEGURANÇA - VERSÃO 1.0.5

**Data:** 26 de Novembro de 2025  
**Versão:** 1.0.5  
**Status:** ✅ ATIVA

---

## ⚠️ REGRAS CRÍTICAS DE SEGURANÇA

### 🚫 NUNCA COMMITAR

```
❌ Dados de cartões de crédito
❌ Tokens de API (Mercado Pago, PayPal, etc)
❌ Credenciais de acesso (usuários, senhas)
❌ Chaves privadas (SSH, API keys)
❌ Senhas de banco de dados
❌ Tokens de autenticação
❌ Dados de webhooks com informações sensíveis
❌ Logs com dados pessoais
```

### ✅ SEMPRE USAR

```
✅ Variáveis de ambiente (.env)
✅ Arquivo .env.example para documentação
✅ .gitignore para arquivos sensíveis
✅ Criptografia para dados sensíveis
✅ Hashing para senhas
✅ Tokens temporários com expiração
✅ Logging sem dados sensíveis
```

---

## 🔑 VARIÁVEIS DE AMBIENTE SENSÍVEIS

### Mercado Pago
```
MERCADOPAGO_ACCESS_TOKEN=seu_token_aqui
MERCADOPAGO_PUBLIC_KEY=sua_chave_publica_aqui
MERCADOPAGO_MODE=test|production
```

### PayPal
```
PAYPAL_CLIENT_ID=seu_client_id_aqui
PAYPAL_SECRET=seu_secret_aqui
PAYPAL_MODE=test|production
```

### Banco de Dados
```
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=sql_eventos
DB_USERNAME=usuario
DB_PASSWORD=senha_segura
```

### Aplicação
```
APP_KEY=base64:sua_chave_aqui
APP_SECRET=sua_secret_aqui
WEBHOOK_SECRET=seu_webhook_secret_aqui
```

---

## 🛡️ PROTEÇÃO DE DADOS

### Frontend
- ✅ Tokenização de cartões no frontend (SDK Mercado Pago)
- ✅ Nunca enviar dados de cartão ao backend
- ✅ Validação de dados em tempo real
- ✅ HTTPS obrigatório
- ✅ Content Security Policy (CSP)

### Backend
- ✅ Validação de todos os inputs
- ✅ Sanitização de dados
- ✅ Prepared statements para SQL
- ✅ Rate limiting em endpoints críticos
- ✅ Autenticação e autorização
- ✅ Logging sem dados sensíveis

### Banco de Dados
- ✅ Criptografia de dados sensíveis
- ✅ Backups regulares
- ✅ Acesso restrito
- ✅ Auditoria de mudanças
- ✅ Isolamento de dados

---

## 📋 CHECKLIST DE SEGURANÇA

### Antes de Commitar
- [ ] Revisar mudanças com `git diff`
- [ ] Verificar se há dados sensíveis
- [ ] Confirmar que .gitignore está correto
- [ ] Revisar logs para dados pessoais
- [ ] Testar em ambiente local

### Antes de Deploy
- [ ] Revisar variáveis de ambiente
- [ ] Confirmar HTTPS ativo
- [ ] Validar certificados SSL
- [ ] Testar webhooks
- [ ] Revisar permissões de arquivo
- [ ] Fazer backup do banco

### Monitoramento Contínuo
- [ ] Revisar logs de erro
- [ ] Monitorar transações
- [ ] Verificar tentativas de acesso não autorizado
- [ ] Atualizar dependências
- [ ] Revisar vulnerabilidades conhecidas

---

## 🔍 AUDITORIA DE COMMITS

### Verificar Histórico
```bash
# Procurar por padrões sensíveis
git log --all -p | grep -i "password\|token\|secret\|key"

# Verificar arquivos deletados
git log --diff-filter=D --summary | grep delete

# Ver mudanças em arquivo específico
git log -p -- arquivo.php
```

### Se Encontrar Dados Sensíveis
```bash
# Remover do histórico (CUIDADO!)
git filter-branch --tree-filter 'rm -f arquivo_sensivel.txt' HEAD

# Ou usar BFG Repo-Cleaner
bfg --delete-files arquivo_sensivel.txt
```

---

## 🚨 INCIDENTES DE SEGURANÇA

### Procedimento de Resposta
1. **Identificar** - Confirmar o incidente
2. **Conter** - Parar a exposição imediatamente
3. **Remover** - Deletar dados sensíveis
4. **Notificar** - Informar stakeholders
5. **Revisar** - Analisar causa raiz
6. **Prevenir** - Implementar proteções

### Contatos de Emergência
- **Desenvolvedor:** thiago.inovmi@gmail.com
- **Admin:** admin@inovmi.com.br
- **Segurança:** security@inovmi.com.br

---

## 📚 REFERÊNCIAS

### PCI DSS Compliance
- https://www.pcisecuritystandards.org/
- Requisitos para armazenar dados de cartão
- Validação anual obrigatória

### OWASP Top 10
- https://owasp.org/www-project-top-ten/
- Vulnerabilidades mais comuns
- Técnicas de mitigação

### Mercado Pago Security
- https://www.mercadopago.com.br/developers/pt/docs
- Boas práticas de integração
- Validação de webhooks

### Laravel Security
- https://laravel.com/docs/security
- Autenticação e autorização
- Proteção contra ataques comuns

---

## ✅ CONFIRMAÇÃO

Ao trabalhar neste projeto, você concorda em:

- ✅ Nunca commitar dados sensíveis
- ✅ Usar variáveis de ambiente para credenciais
- ✅ Revisar mudanças antes de commitar
- ✅ Reportar vulnerabilidades imediatamente
- ✅ Seguir as boas práticas de segurança
- ✅ Manter logs sem dados pessoais
- ✅ Usar HTTPS em produção
- ✅ Fazer backups regulares

---

**Política Efetiva:** 26 de Novembro de 2025  
**Versão:** 1.0.5  
**Status:** ✅ ATIVA E OBRIGATÓRIA
