# Guia de Build com Vite - Eventos Inovmi

## 📋 Visão Geral

O projeto Eventos Inovmi usa **Vite** como bundler para compilar assets (JavaScript e SCSS). O build compilado está em `/public/build/`.

### Stack de Build
- **Bundler**: Vite 6.x
- **Framework Frontend**: Vue 2.7
- **Preprocessador CSS**: SASS/SCSS
- **Plugin Laravel**: laravel-vite-plugin
- **Node.js**: 16+ recomendado

---

## 🔧 Configuração Atual

### Arquivo: `vite.config.js`
```javascript
// Entrada de arquivos a compilar
input: [
    "eventmie-pro/resources/js/events_manage/index.js",
    "eventmie-pro/resources/js/events_show/index.js",
    "eventmie-pro/resources/js/events_listing/index.js",
    "eventmie-pro/resources/js/myevents/index.js",
    "eventmie-pro/resources/js/bookings_customer/index.js",
    "eventmie-pro/resources/js/bookings_organiser/index.js",
    "eventmie-pro/resources/js/welcome/index.js",
    "eventmie-pro/resources/js/tags_manage/index.js",
    "eventmie-pro/resources/js/venues_manage/index.js",
    "eventmie-pro/resources/js/ticket_scanner/index.js",
    "eventmie-pro/resources/js/event_earning/index.js",
    "eventmie-pro/resources/js/venues_listing/index.js",
    "eventmie-pro/resources/js/profile/index.js",
    'eventmie-pro/resources/sass/theme.scss',
    'eventmie-pro/resources/sass/vendor.scss'
]

// Saída
output: /public/build/
```

### Arquivo: `package.json`
```json
{
    "scripts": {
        "dev": "SASS_WARN_DEPRECATION=0 vite",
        "build": "SASS_WARN_DEPRECATION=0 vite build",
        "watch": "SASS_WARN_DEPRECATION=0 vite build --watch"
    }
}
```

---

## 🚀 Como Gerar Novo Build

### Opção 1: Build Único (Produção)

```bash
# Navegar até o diretório raiz
cd /www/wwwroot/eventos.inovmi.com.br

# Instalar dependências (primeira vez)
npm install

# Gerar build otimizado
npm run build
```

**Resultado**:
- Arquivos compilados em `/public/build/`
- Arquivo `manifest.json` atualizado
- Assets minificados e otimizados

---

### Opção 2: Watch Mode (Desenvolvimento)

```bash
# Modo observação - recompila automaticamente ao salvar
npm run watch
```

**Benefícios**:
- Recompila automaticamente ao detectar mudanças
- Ideal para desenvolvimento
- Mantém o build atualizado

---

### Opção 3: Dev Server (Desenvolvimento)

```bash
# Inicia servidor Vite com hot reload
npm run dev
```

**Benefícios**:
- Hot Module Replacement (HMR)
- Recompilação instantânea
- Ideal para desenvolvimento ativo

---

## 📁 Estrutura de Arquivos

### Entrada (Source)
```
eventmie-pro/resources/
├── js/
│   ├── events_manage/index.js
│   ├── events_show/index.js
│   ├── events_listing/index.js
│   ├── myevents/index.js
│   ├── bookings_customer/index.js
│   ├── bookings_organiser/index.js
│   ├── welcome/index.js
│   ├── tags_manage/index.js
│   ├── venues_manage/index.js
│   ├── ticket_scanner/index.js
│   ├── event_earning/index.js
│   ├── venues_listing/index.js
│   └── profile/index.js
└── sass/
    ├── theme.scss
    └── vendor.scss
```

### Saída (Build)
```
public/build/
├── assets/
│   ├── app-XXXXX.js
│   ├── app-XXXXX.css
│   ├── vendor-XXXXX.js
│   └── [outros assets]
└── manifest.json
```

---

## 📊 Manifest.json

O arquivo `manifest.json` mapeia os arquivos de entrada para os arquivos compilados:

```json
{
    "eventmie-pro/resources/js/events_manage/index.js": {
        "file": "assets/events_manage-XXXXX.js",
        "src": "eventmie-pro/resources/js/events_manage/index.js",
        "isEntry": true,
        "imports": ["_vue-XXXXX.js"]
    },
    ...
}
```

**Importante**: Este arquivo é gerado automaticamente e usado pelo Laravel para carregar os assets corretos.

---

## 🔄 Workflow de Desenvolvimento

### Passo 1: Setup Inicial
```bash
cd /www/wwwroot/eventos.inovmi.com.br
npm install
```

### Passo 2: Desenvolvimento
```bash
# Terminal 1: Vite dev server
npm run dev

# Terminal 2: Laravel dev server
php artisan serve

# Terminal 3: Queue listener (opcional)
php artisan queue:listen
```

### Passo 3: Fazer Mudanças
- Edite arquivos em `eventmie-pro/resources/js/` ou `eventmie-pro/resources/sass/`
- Vite recompila automaticamente
- Navegador atualiza com HMR

### Passo 4: Build para Produção
```bash
npm run build
```

---

## ⚙️ Configurações Importantes

### 1. Aliases (vite.config.js)
```javascript
resolve: {
    alias: {
        "@": path.resolve(__dirname, "resources/js"),
        "vuex$": "vuex/dist/vuex.esm.js",
        'vue2-google-maps': 'vue2-google-maps/dist/vue-google-maps.js',
        "MarkerClusterer": path.resolve(__dirname, "node_modules/@googlemaps/markerclusterer"),
        'vue': 'vue/dist/vue.esm.js',
        "vue-confirm-dialog": path.resolve(__dirname, "node_modules/vue-confirm-dialog"),
        'vue-match-heights': path.resolve(__dirname, 'node_modules/vue-match-heights/dist/vue-match-heights.js'),
    }
}
```

### 2. SCSS Options
```javascript
css: {
    preprocessorOptions: {
        scss: {
            sassOptions: {
                quietDeps: true, // Suprime avisos de deprecação
            }
        }
    }
}
```

### 3. Otimização de Dependências
```javascript
optimizeDeps: {
    include: ["@googlemaps/markerclusterer", "vue"],
}
```

---

## 🛠️ Troubleshooting

### Problema 1: Build falha com erro de SASS
```
Error: Deprecation warning
```

**Solução**:
```bash
# Já configurado no package.json
SASS_WARN_DEPRECATION=0 npm run build
```

---

### Problema 2: Assets não aparecem em produção
**Causa**: manifest.json desatualizado

**Solução**:
```bash
# Limpar build anterior
rm -rf public/build/*

# Gerar novo build
npm run build
```

---

### Problema 3: HMR não funciona em desenvolvimento
**Causa**: Configuração de servidor incorreta

**Solução**:
```bash
# Verificar se Vite está rodando
npm run dev

# Verificar porta (padrão 5173)
# Acessar http://localhost:5173
```

---

### Problema 4: Dependências não encontradas
**Causa**: node_modules desatualizado

**Solução**:
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📈 Otimizações de Build

### 1. Code Splitting
Vite automaticamente divide o código em chunks:
- `vendor.js` - Dependências externas
- `app.js` - Código da aplicação
- Lazy loading de componentes

### 2. Minificação
- Habilitada automaticamente em produção
- Reduz tamanho dos arquivos em ~70%

### 3. Source Maps
```javascript
// Em desenvolvimento: source maps completos
// Em produção: source maps desabilitados (comentar se necessário)
```

---

## 🚀 Deploy em Produção

### Checklist de Deploy
```bash
# 1. Instalar dependências
npm install

# 2. Gerar build otimizado
npm run build

# 3. Verificar se /public/build/ foi criado
ls -la public/build/

# 4. Verificar manifest.json
cat public/build/manifest.json

# 5. Limpar cache Laravel
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# 6. Otimizar autoloader
composer install --optimize-autoloader --no-dev

# 7. Reiniciar servidor
sudo systemctl restart php-fpm
sudo systemctl restart nginx
```

---

## 📊 Monitoramento de Build

### Tamanho dos Assets
```bash
# Ver tamanho dos arquivos compilados
du -sh public/build/assets/*

# Ver tamanho total
du -sh public/build/
```

### Performance
```bash
# Medir tempo de build
time npm run build

# Resultado esperado: 5-15 segundos
```

---

## 🔄 Integração com CI/CD

### GitHub Actions
```yaml
name: Build Assets

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build assets
        run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: public/build/
```

---

## 📝 Adicionando Novos Assets

### Adicionar novo arquivo JavaScript

1. Criar arquivo em `eventmie-pro/resources/js/novo_modulo/index.js`
2. Adicionar ao `vite.config.js`:
```javascript
input: [
    // ... arquivos existentes
    "eventmie-pro/resources/js/novo_modulo/index.js",
]
```
3. Gerar novo build:
```bash
npm run build
```

### Adicionar novo arquivo SCSS

1. Criar arquivo em `eventmie-pro/resources/sass/novo_estilo.scss`
2. Adicionar ao `vite.config.js`:
```javascript
input: [
    // ... arquivos existentes
    'eventmie-pro/resources/sass/novo_estilo.scss'
]
```
3. Gerar novo build:
```bash
npm run build
```

---

## 🎯 Boas Práticas

### 1. Sempre Fazer Build Antes de Deploy
```bash
npm run build
```

### 2. Testar Build Localmente
```bash
npm run build
php artisan serve
# Acessar http://localhost:8000
```

### 3. Manter package-lock.json
```bash
# Commit do package-lock.json garante versões consistentes
git add package-lock.json
git commit -m "Update dependencies"
```

### 4. Usar Watch Mode em Desenvolvimento
```bash
npm run watch
```

### 5. Limpar Cache Regularmente
```bash
php artisan cache:clear
php artisan view:clear
```

---

## 📚 Referências

- [Vite Documentation](https://vitejs.dev/)
- [Laravel Vite Plugin](https://laravel.com/docs/vite)
- [Vue 2 Guide](https://v2.vuejs.org/)
- [SASS Documentation](https://sass-lang.com/)

---

## 🔗 Comandos Rápidos

```bash
# Instalar dependências
npm install

# Desenvolvimento com hot reload
npm run dev

# Modo observação (watch)
npm run watch

# Build para produção
npm run build

# Limpar build
rm -rf public/build/*

# Ver tamanho dos assets
du -sh public/build/assets/*

# Verificar manifest
cat public/build/manifest.json
```

---

## ✅ Checklist de Build

- [ ] Dependências instaladas (`npm install`)
- [ ] Mudanças no código feitas
- [ ] Build gerado (`npm run build`)
- [ ] `/public/build/` criado com assets
- [ ] `manifest.json` atualizado
- [ ] Cache Laravel limpo (`php artisan cache:clear`)
- [ ] Testado localmente
- [ ] Deployado em produção

---

**Última Atualização**: 27 de outubro de 2025
**Status**: ✅ Pronto para uso
