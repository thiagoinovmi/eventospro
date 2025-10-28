# 🎉 Eventos Inovmi - Eventmie Pro v3.0

[![GitHub](https://img.shields.io/badge/GitHub-thiagoinovmi%2Feventospro-blue?logo=github)](https://github.com/thiagoinovmi/eventospro)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue)](https://github.com/thiagoinovmi/eventospro/releases/tag/v1.0.0)
[![Laravel](https://img.shields.io/badge/Laravel-11.45.1-red?logo=laravel)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2-purple?logo=php)](https://www.php.net)

---

## 📌 Sobre o Projeto

**Eventos Inovmi** é uma plataforma completa de gerenciamento de eventos desenvolvida pela **Inovmi Tecnologia**. Construída sobre o framework **Eventmie Pro v3.0**, oferece uma solução robusta e escalável para criar, gerenciar e monetizar eventos online e presenciais.

### 🏢 Desenvolvido por
**Inovmi Tecnologia**  
Especializada em soluções web e mobile para gestão de eventos e experiências digitais.

---

## 🎯 O que o Projeto Faz

### Funcionalidades Principais

#### 👥 Gerenciamento de Eventos
- Criar e editar eventos com múltiplas configurações
- Suporte para eventos online, presenciais e híbridos
- Categorização e tagging de eventos
- Gerenciamento de datas, horários e locais
- Upload de imagens e banners

#### 🎫 Sistema de Reservas
- Compra de ingressos online
- Múltiplos tipos de ingressos por evento
- Carrinho de compras
- Processamento de pagamentos (PayPal integrado)
- Confirmação e emissão de ingressos

#### 💰 Monetização
- Sistema de comissões automáticas
- Cálculo de impostos por região
- Relatórios de ganhos e receitas
- Pagamentos para organizadores
- Dashboard financeiro

#### 🔐 Controle de Acesso
- Autenticação de usuários
- Roles: Admin, Organizador, Cliente, Scanner
- Permissões granulares
- Verificação de email

#### 📱 Scanner de Ingressos
- Leitura de QR Code
- Validação em tempo real
- Modo câmera e laser
- Relatórios de check-in

#### 📊 Dashboard Administrativo
- Painel de controle completo
- Estatísticas e relatórios
- Gerenciamento de usuários
- Configurações do sistema
- Menu admin com 17 itens

#### 🌍 Localização
- Suporte multilíngue (16 idiomas)
- Padrão em português (PT-BR)
- Traduções completas do Voyager
- Detecção automática de idioma

#### 📝 Blog e Conteúdo
- Sistema de blog integrado
- Páginas estáticas
- Banners promocionais
- Menu de navegação customizável

---

## 🛠️ Stack Tecnológico

### Backend
- **Framework:** Laravel 11.45.1
- **PHP:** 8.2+
- **Banco de Dados:** MySQL 8.0+
- **Cache:** Redis (recomendado) / File (padrão)
- **Fila:** Sync (padrão) / Redis (recomendado)

### Frontend
- **Vue.js:** 2.x
- **Vite:** 6.4.1 (Build tool)
- **Bootstrap:** 5.x
- **Sass/SCSS:** Preprocessamento CSS
- **jQuery:** Utilitários DOM

### Pacotes Principais
- **Voyager:** Admin panel e CRUD
- **Eventmie Pro:** Pacote de eventos
- **Yajra DataTables:** Tabelas interativas
- **Omnipay:** Processamento de pagamentos
- **Spatie Honeypot:** Proteção contra spam
- **Laravel Installer:** Setup assistido

### Dependências (Composer)
```json
{
  "php": "^8.2",
  "laravel/framework": "^11.0",
  "laravel/tinker": "^2.8",
  "laravel/sanctum": "^4.0",
  "laravel/pail": "^1.1",
  "tcg/voyager": "^1.4",
  "classiebit/eventmie-pro": "^3.0",
  "yajra/laravel-datatables-oracle": "^10.0",
  "omnipay/omnipay": "^3.2",
  "omnipay/paypal": "^3.0",
  "spatie/laravel-honeypot": "^4.3",
  "laravel-lang/lang": "^14.0",
  "devrabiul/laravel-cookie-consent": "^1.0"
}
```

### Dependências (NPM)
```json
{
  "vite": "^6.4.1",
  "@vitejs/plugin-vue2": "^2.2.0",
  "laravel-vite-plugin": "^1.0.0",
  "vue": "^2.7.14",
  "vue-select": "^3.20.3",
  "vue-multiselect": "^2.1.6",
  "vue-croppa": "^1.3.8",
  "vue2-datepicker": "^9.1.0",
  "vue-slick-carousel": "^1.0.42",
  "moment": "^2.29.4",
  "moment-timezone": "^0.5.45",
  "axios": "^1.6.0",
  "bootstrap": "^5.3.0",
  "sass": "^1.69.0",
  "postcss": "^8.4.31"
}
```

---

## 📊 Arquitetura do Projeto

### Estrutura de Diretórios

```
eventos.inovmi.com.br/
├── app/                          # Código da aplicação
│   ├── Http/
│   │   ├── Controllers/          # 44 Controllers
│   │   ├── Middleware/           # 16 Middlewares
│   │   └── Requests/             # Form Requests
│   ├── Models/                   # 23 Modelos
│   ├── Services/                 # Serviços de negócio
│   └── Exceptions/               # Tratamento de erros
├── bootstrap/                    # Inicialização do Laravel
├── config/                       # Configurações
│   ├── app.php                   # Locale: pt
│   ├── eventmie.php              # default_lang: pt
│   └── voyager.php               # Admin panel
├── database/
│   ├── migrations/               # Schema do banco
│   ├── seeders/                  # Dados iniciais
│   └── factories/                # Factories para testes
├── eventmie-pro/                 # Pacote de eventos
│   ├── src/
│   │   ├── Http/Controllers/     # 26 Controllers de features
│   │   ├── Middleware/           # Middlewares customizados
│   │   └── Models/               # Modelos do pacote
│   ├── resources/
│   │   ├── views/                # Templates Blade
│   │   ├── js/                   # Componentes Vue
│   │   └── sass/                 # Estilos
│   └── publishable/
│       ├── config/               # Configurações publicáveis
│       ├── lang/                 # Traduções
│       └── database/             # Migrations do pacote
├── public/                       # Arquivos públicos
│   ├── build/                    # Assets compilados
│   ├── storage/                  # Upload de usuários
│   └── index.php                 # Entry point
├── resources/
│   ├── views/                    # Templates Blade
│   ├── js/                       # JavaScript
│   ├── sass/                     # Estilos SCSS
│   └── lang/                     # Traduções (16 idiomas)
├── routes/
│   ├── web.php                   # Rotas web
│   ├── api.php                   # Rotas API
│   └── console.php               # Comandos Artisan
├── storage/                      # Uploads e cache
│   ├── app/public/               # Arquivos públicos
│   ├── framework/                # Cache do framework
│   └── logs/                     # Logs da aplicação
├── tests/                        # Testes unitários
├── vendor/                       # Dependências Composer
├── node_modules/                 # Dependências NPM
├── vite.config.js                # Configuração Vite
├── package.json                  # Dependências NPM
├── composer.json                 # Dependências PHP
└── .env                          # Variáveis de ambiente
```

### Estatísticas de Código

| Métrica | Valor |
|---------|-------|
| **Controllers** | 44 |
| **Models** | 23 |
| **Middlewares** | 16 |
| **Rotas** | 522 linhas |
| **Código Total** | ~50.000 linhas |
| **Arquivos** | 4.304 |
| **Tamanho** | 57.28 MB |

---

## 🚀 Instalação e Setup

### Pré-requisitos
- PHP 8.2+
- MySQL 8.0+
- Composer
- Node.js 18+
- NPM ou Yarn

### Passos de Instalação

#### 1. Clonar o Repositório
```bash
git clone https://github.com/thiagoinovmi/eventospro.git
cd eventospro
```

#### 2. Instalar Dependências PHP
```bash
composer install
```

#### 3. Instalar Dependências Node
```bash
npm install
```

#### 4. Configurar Variáveis de Ambiente
```bash
cp .env.example .env
php artisan key:generate
```

#### 5. Configurar Banco de Dados
```bash
# Editar .env com credenciais do banco
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=eventos_inovmi
DB_USERNAME=root
DB_PASSWORD=
```

#### 6. Executar Migrations
```bash
php artisan migrate
```

#### 7. Executar Seeders
```bash
php artisan db:seed
```

#### 8. Build de Assets
```bash
npm run build
```

#### 9. Iniciar Servidor
```bash
php artisan serve
```

Acesse: http://localhost:8000

---

## 📋 Configuração Importante

### Localização Padrão
O projeto está configurado para português (PT-BR) por padrão:

```php
// config/app.php
'locale' => 'pt',
'fallback_locale' => 'pt',

// config/eventmie.php
'default_lang' => 'pt',
```

### Menu Admin
O menu administrativo possui 17 itens em português:
1. Painel
2. Categorias
3. Etiquetas
4. Eventos
5. Reservas
6. Comissões
7. Impostos
8. Usuários
9. Contatos
10. Mídia
11. Banners
12. Páginas
13. Postagens do Blog
14. Construtor de Menu (Header)
15. Construtor de Menu (Footer)
16. Locais
17. Configurações

---

## 🔑 Credenciais Padrão (Após Seeder)

### Admin
- **Email:** admin@example.com
- **Senha:** password
- **Acesso:** /admin

### Organizador
- **Email:** organiser@example.com
- **Senha:** password

### Cliente
- **Email:** customer@example.com
- **Senha:** password

---

## 📚 Documentação Adicional

- **[CHANGELOG_MENU_LOCALIZATION.md](CHANGELOG_MENU_LOCALIZATION.md)** - Histórico de mudanças
- **[RELEASE_NOTES_v1.0.0.md](RELEASE_NOTES_v1.0.0.md)** - Notas da release
- **[TECHNICAL_REFERENCE.md](TECHNICAL_REFERENCE.md)** - Referência técnica
- **[README_ARQUITETURA.md](README_ARQUITETURA.md)** - Arquitetura detalhada
- **[PLANO_REFATORACAO.md](PLANO_REFATORACAO.md)** - Plano de refatoração

---

## 🔧 Comandos Úteis

### Development
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Limpar cache
php artisan cache:clear
php artisan view:clear
php artisan config:clear

# Executar migrations
php artisan migrate

# Executar seeders
php artisan db:seed

# Tinker (REPL)
php artisan tinker
```

### Artisan Commands
```bash
# Listar rotas
php artisan route:list

# Criar migration
php artisan make:migration create_table_name

# Criar model
php artisan make:model ModelName

# Criar controller
php artisan make:controller ControllerName

# Executar testes
php artisan test
```

---

## 🌐 Suporte Multilíngue

O projeto suporta 16 idiomas:
- 🇬🇧 English (en)
- 🇵🇹 Português (pt) - **Padrão**
- 🇪🇸 Español (es)
- 🇫🇷 Français (fr)
- 🇩🇪 Deutsch (de)
- 🇮🇹 Italiano (it)
- 🇷🇺 Русский (ru)
- 🇯🇵 日本語 (ja)
- 🇳🇱 Nederlands (nl)
- 🇮🇳 हिन्दी (hi)
- 🇸🇦 العربية (ar)
- 🇨🇳 中文 (zh_CN)
- 🇹🇼 繁體中文 (zh_TW)
- E mais...

---

## 🔐 Segurança

### Implementações de Segurança
- ✅ Autenticação com Laravel Sanctum
- ✅ Proteção CSRF
- ✅ SQL Injection Prevention (Eloquent ORM)
- ✅ XSS Protection
- ✅ Honeypot para spam
- ✅ Rate limiting
- ✅ Validação de entrada
- ✅ Autorização com Policies

### Recomendações
- Mude as credenciais padrão em produção
- Configure HTTPS
- Use variáveis de ambiente para dados sensíveis
- Mantenha dependências atualizadas
- Configure backups automáticos

---

## 📞 Suporte e Contribuição

### Reportar Bugs
Abra uma issue no [GitHub Issues](https://github.com/thiagoinovmi/eventospro/issues)

### Contribuir
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores

**Desenvolvido por:** Inovmi Tecnologia

**Versão:** 1.0.0  
**Data:** 28 de Outubro de 2025  
**Status:** ✅ Ativo em Produção

---

## 🙏 Agradecimentos

- **Eventmie Pro** - Pacote base de eventos
- **Laravel** - Framework web
- **Vue.js** - Framework JavaScript
- **Voyager** - Admin panel
- **Bootstrap** - Framework CSS

---

## 📊 Links Importantes

- 🌐 **Website:** https://eventos.inovmi.com.br
- 📦 **GitHub:** https://github.com/thiagoinovmi/eventospro
- 📝 **Issues:** https://github.com/thiagoinovmi/eventospro/issues
- 🏷️ **Releases:** https://github.com/thiagoinovmi/eventospro/releases

---

**Desenvolvido com ❤️ pela Inovmi Tecnologia**
