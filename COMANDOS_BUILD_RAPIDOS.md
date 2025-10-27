# Comandos de Build - Referência Rápida

## 🚀 Comandos Essenciais

### 1️⃣ Setup Inicial (Primeira Vez)

```bash
# Navegar até o diretório do projeto
cd /www/wwwroot/eventos.inovmi.com.br

# Instalar dependências Node.js
npm install

# Instalar dependências PHP (se necessário)
composer install
```

**Tempo**: ~5-10 minutos

---

### 2️⃣ Gerar Build para Produção

```bash
# Build otimizado (minificado, comprimido)
npm run build
```

**Resultado**:
- ✅ Arquivos compilados em `/public/build/`
- ✅ `manifest.json` atualizado
- ✅ Assets minificados
- ✅ Pronto para produção

**Tempo**: ~5-15 segundos

---

### 3️⃣ Desenvolvimento com Hot Reload

```bash
# Terminal 1: Vite dev server
npm run dev

# Terminal 2: Laravel server (em outro terminal)
php artisan serve
```

**Benefícios**:
- ✅ Recompila automaticamente
- ✅ Hot Module Replacement (HMR)
- ✅ Atualização instantânea no navegador

**Acesso**: http://localhost:8000

---

### 4️⃣ Modo Watch (Observação)

```bash
# Recompila automaticamente ao salvar
npm run watch
```

**Ideal para**:
- ✅ Desenvolvimento contínuo
- ✅ Sem servidor Vite rodando
- ✅ Integração com servidor existente

---

## 🔄 Workflow Completo

### Cenário 1: Desenvolvimento Local

```bash
# Terminal 1: Iniciar Vite dev server
cd /www/wwwroot/eventos.inovmi.com.br
npm run dev

# Terminal 2: Iniciar Laravel server
cd /www/wwwroot/eventos.inovmi.com.br
php artisan serve

# Terminal 3: Iniciar queue listener (opcional)
cd /www/wwwroot/eventos.inovmi.com.br
php artisan queue:listen

# Acessar no navegador
# http://localhost:8000
```

**Fluxo**:
1. Edite arquivo em `eventmie-pro/resources/js/` ou `eventmie-pro/resources/sass/`
2. Salve o arquivo
3. Vite recompila automaticamente
4. Navegador atualiza com HMR
5. Veja mudanças em tempo real

---

### Cenário 2: Deploy em Produção

```bash
# 1. Navegar até o diretório
cd /www/wwwroot/eventos.inovmi.com.br

# 2. Instalar dependências (se necessário)
npm install

# 3. Gerar build otimizado
npm run build

# 4. Verificar se build foi criado
ls -la public/build/

# 5. Limpar cache Laravel
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# 6. Otimizar autoloader (opcional)
composer install --optimize-autoloader --no-dev

# 7. Reiniciar servidor (se necessário)
sudo systemctl restart php-fpm
sudo systemctl restart nginx
```

**Tempo total**: ~2-3 minutos

---

### Cenário 3: Atualizar Dependências

```bash
# 1. Atualizar package.json
npm update

# 2. Instalar novas dependências
npm install

# 3. Gerar novo build
npm run build

# 4. Testar localmente
npm run dev
```

---

## 🧹 Limpeza e Manutenção

### Limpar Build Anterior

```bash
# Remover arquivos compilados
rm -rf public/build/*

# Gerar novo build
npm run build
```

---

### Limpar Cache Laravel

```bash
# Limpar todos os caches
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear

# Ou tudo de uma vez
php artisan optimize:clear
```

---

### Reinstalar Dependências

```bash
# Remover node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Gerar novo build
npm run build
```

---

## 📊 Verificação e Monitoramento

### Verificar Build

```bash
# Ver estrutura do build
tree public/build/

# Ver tamanho dos arquivos
du -sh public/build/
du -sh public/build/assets/*

# Ver manifest.json
cat public/build/manifest.json | jq .
```

---

### Medir Performance

```bash
# Tempo de build
time npm run build

# Resultado esperado: 5-15 segundos
```

---

### Verificar Dependências

```bash
# Ver versões instaladas
npm list

# Ver dependências desatualizadas
npm outdated

# Ver vulnerabilidades
npm audit
```

---

## 🐛 Troubleshooting

### Build falha com erro de SASS

```bash
# Solução: Usar variável de ambiente
SASS_WARN_DEPRECATION=0 npm run build

# Ou adicionar ao .env
export SASS_WARN_DEPRECATION=0
npm run build
```

---

### Assets não carregam em produção

```bash
# 1. Verificar se manifest.json existe
ls -la public/build/manifest.json

# 2. Limpar cache Laravel
php artisan cache:clear

# 3. Regenerar build
npm run build

# 4. Verificar permissões
chmod -R 755 public/build/
```

---

### Porta 5173 já está em uso

```bash
# Usar porta diferente
npm run dev -- --port 3000

# Ou matar processo anterior
lsof -i :5173
kill -9 <PID>
```

---

### Dependências conflitantes

```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run build
```

---

## 📝 Adicionando Novos Assets

### Adicionar novo módulo JavaScript

```bash
# 1. Criar arquivo
mkdir -p eventmie-pro/resources/js/novo_modulo
touch eventmie-pro/resources/js/novo_modulo/index.js

# 2. Editar vite.config.js e adicionar:
# "eventmie-pro/resources/js/novo_modulo/index.js",

# 3. Gerar novo build
npm run build
```

---

### Adicionar novo arquivo SCSS

```bash
# 1. Criar arquivo
touch eventmie-pro/resources/sass/novo_estilo.scss

# 2. Editar vite.config.js e adicionar:
# 'eventmie-pro/resources/sass/novo_estilo.scss'

# 3. Gerar novo build
npm run build
```

---

## 🔐 Segurança

### Verificar vulnerabilidades

```bash
# Auditoria de segurança
npm audit

# Corrigir vulnerabilidades automaticamente
npm audit fix

# Forçar correção
npm audit fix --force
```

---

### Atualizar dependências com segurança

```bash
# Ver o que será atualizado
npm outdated

# Atualizar apenas patches
npm update

# Atualizar maior versão (cuidado!)
npm install <package>@latest
```

---

## 📋 Checklist Pré-Deploy

```bash
# ✅ Verificar se há mudanças não commitadas
git status

# ✅ Instalar dependências
npm install

# ✅ Gerar build
npm run build

# ✅ Verificar se build foi criado
ls -la public/build/manifest.json

# ✅ Limpar cache
php artisan optimize:clear

# ✅ Testar localmente
npm run dev

# ✅ Verificar erros no console
# Abrir DevTools (F12) e verificar console

# ✅ Fazer commit
git add -A
git commit -m "Build assets"
git push
```

---

## 🎯 Comandos por Situação

### Situação 1: Fazer mudança no código

```bash
# 1. Editar arquivo em eventmie-pro/resources/
# 2. Salvar arquivo
# 3. Vite recompila automaticamente (se npm run dev estiver rodando)
# 4. Navegador atualiza automaticamente
```

---

### Situação 2: Preparar para produção

```bash
npm run build
php artisan optimize:clear
```

---

### Situação 3: Problema com build

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

### Situação 4: Atualizar dependências

```bash
npm update
npm run build
```

---

### Situação 5: Adicionar nova dependência

```bash
npm install <package-name>
npm run build
```

---

## 📚 Referência de Arquivos

### Arquivos de Configuração
- `vite.config.js` - Configuração do Vite
- `package.json` - Dependências e scripts
- `postcss.config.js` - Configuração do PostCSS
- `.env` - Variáveis de ambiente

### Diretórios de Entrada
- `eventmie-pro/resources/js/` - Arquivos JavaScript
- `eventmie-pro/resources/sass/` - Arquivos SCSS

### Diretório de Saída
- `public/build/` - Assets compilados
- `public/build/manifest.json` - Mapa de assets

---

## 🔗 Links Úteis

- [Vite Docs](https://vitejs.dev/)
- [Laravel Vite Plugin](https://laravel.com/docs/vite)
- [Vue 2 Docs](https://v2.vuejs.org/)
- [SASS Docs](https://sass-lang.com/)

---

## ✨ Dicas Profissionais

### 1. Use alias no terminal

```bash
# Adicionar ao ~/.bashrc ou ~/.zshrc
alias build-dev="cd /www/wwwroot/eventos.inovmi.com.br && npm run dev"
alias build-prod="cd /www/wwwroot/eventos.inovmi.com.br && npm run build"
alias build-watch="cd /www/wwwroot/eventos.inovmi.com.br && npm run watch"

# Usar
build-prod
```

---

### 2. Usar tmux para múltiplos terminais

```bash
# Criar sessão com múltiplos painéis
tmux new-session -d -s dev -x 200 -y 50
tmux send-keys -t dev "cd /www/wwwroot/eventos.inovmi.com.br && npm run dev" Enter
tmux split-window -t dev -h
tmux send-keys -t dev "cd /www/wwwroot/eventos.inovmi.com.br && php artisan serve" Enter

# Anexar à sessão
tmux attach -t dev
```

---

### 3. Usar makefile para automatizar

```makefile
# Criar arquivo Makefile
install:
	npm install

dev:
	npm run dev

build:
	npm run build

watch:
	npm run watch

clean:
	rm -rf node_modules package-lock.json public/build/*

reinstall: clean install

# Usar
make build
make dev
make clean
```

---

## 📞 Suporte Rápido

**Problema**: Build não atualiza
**Solução**: `rm -rf public/build/* && npm run build`

**Problema**: Assets não carregam
**Solução**: `php artisan cache:clear && npm run build`

**Problema**: Porta 5173 em uso
**Solução**: `npm run dev -- --port 3000`

**Problema**: Dependências conflitantes
**Solução**: `rm -rf node_modules && npm install`

---

**Última Atualização**: 27 de outubro de 2025
**Status**: ✅ Pronto para uso
