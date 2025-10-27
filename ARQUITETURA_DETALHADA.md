# Arquitetura Detalhada - Eventos Inovmi

## 1. Estrutura de Diretórios

```
eventos.inovmi.com.br/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── LicenseController.php
│   │   └── Middleware/
│   ├── Models/
│   │   └── User.php
│   └── Providers/
├── eventmie-pro/                    # Pacote Laravel (principal)
│   ├── src/
│   │   ├── Http/
│   │   │   ├── Controllers/         # 44 controllers
│   │   │   │   ├── Auth/            # 5 controllers
│   │   │   │   ├── Voyager/         # 13 controllers
│   │   │   │   └── [26 Feature Controllers]
│   │   │   └── Middleware/          # 16 middlewares
│   │   ├── Models/                  # 23 modelos Eloquent
│   │   ├── Services/                # 2 services
│   │   ├── Notifications/           # 4 notificações
│   │   ├── Commands/                # 7 comandos CLI
│   │   ├── Actions/                 # Custom actions
│   │   ├── Facades/                 # Eventmie Facade
│   │   ├── Scopes/                  # Query scopes
│   │   ├── Traits/                  # Traits compartilhados
│   │   ├── Helpers/                 # Funções auxiliares
│   │   ├── Exceptions/              # Tratamento de exceções
│   │   ├── Charts/                  # Gráficos
│   │   └── FormFields/              # Campos Voyager
│   ├── routes/
│   │   └── eventmie.php             # 522 linhas
│   ├── resources/
│   │   ├── views/                   # Templates Blade
│   │   ├── js/                      # Vue.js components
│   │   ├── css/                     # Estilos
│   │   └── lang/                    # i18n
│   └── publishable/
├── routes/
│   ├── web.php
│   └── console.php
├── config/
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── resources/
├── public/
└── storage/
```

---

## 2. Modelos de Dados (23 Modelos)

### Diagrama de Relações

```
┌─────────────────────────────────────────────────────────────┐
│                         USER (extends Voyager)              │
├─────────────────────────────────────────────────────────────┤
│ id, name, email, password, role_id, avatar, etc.           │
│                                                             │
│ Relações:                                                   │
│ ├─ hasMany: Event (como user_id/organiser)                │
│ ├─ hasMany: Booking (como customer_id)                    │
│ ├─ hasMany: Booking (como organiser_id)                   │
│ ├─ hasMany: Venue                                         │
│ ├─ hasMany: PosModel                                      │
│ ├─ hasMany: ScannerModel                                  │
│ ├─ hasMany: Transaction                                   │
│ ├─ hasMany: Commission                                    │
│ ├─ hasMany: Checkin                                       │
│ └─ hasMany: Notification                                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                         EVENT                               │
├─────────────────────────────────────────────────────────────┤
│ id, title, slug, description, start_date, end_date,       │
│ user_id, category_id, country_id, price_type, status      │
│                                                             │
│ Relações:                                                   │
│ ├─ belongsTo: User (organiser)                            │
│ ├─ belongsTo: Category                                    │
│ ├─ belongsTo: Country                                     │
│ ├─ hasMany: Ticket                                        │
│ ├─ hasMany: Booking                                       │
│ ├─ hasMany: Schedule                                      │
│ ├─ hasMany: Commission                                    │
│ ├─ belongsToMany: Tag (via tag_event)                     │
│ ├─ hasMany: PosModel                                      │
│ └─ hasMany: ScannerModel                                  │
└─────────────────────────────────────────────────────────────┘
         ↙                    ↓                    ↘
    ┌────────────┐    ┌────────────┐    ┌────────────┐
    │  TICKET    │    │  BOOKING   │    │ SCHEDULE   │
    ├────────────┤    ├────────────┤    ├────────────┤
    │ id, name   │    │ id, qty    │    │ id, date   │
    │ price      │    │ status     │    │ time       │
    │ event_id   │    │ event_id   │    │ event_id   │
    │            │    │ ticket_id  │    │            │
    │ Relações:  │    │ customer   │    │ Relações:  │
    │ ├─ hasMany │    │ organiser  │    │ ├─ belongsTo
    │ │ Booking  │    │            │    │ │ Event     │
    │ ├─ hasMany │    │ Relações:  │    │ └─ hasMany  │
    │ │ Tax      │    │ ├─ belongsTo   │   Booking   │
    │ └─ hasMany │    │ │ Event    │    └────────────┘
    │   Commission   │ ├─ belongsTo
    └────────────┘    │ │ Ticket   │
                      │ ├─ hasMany │
                      │ │ Checkin  │
                      │ ├─ hasMany │
                      │ │ Transaction
                      │ └─ hasMany │
                      │   Commission
                      └────────────┘
                           ↓
                    ┌────────────────┐
                    │   COMMISSION   │
                    ├────────────────┤
                    │ id, amount     │
                    │ event_id       │
                    │ booking_id     │
                    │ ticket_id      │
                    │ organiser_id   │
                    │                │
                    │ Relações:      │
                    │ ├─ belongsTo   │
                    │ │ Event        │
                    │ ├─ belongsTo   │
                    │ │ Booking      │
                    │ ├─ belongsTo   │
                    │ │ Ticket       │
                    │ └─ belongsTo   │
                    │   User         │
                    └────────────────┘
```

### Lista Completa de Modelos

| Modelo | Tabela | Propósito |
|--------|--------|----------|
| **User** | users | Usuários (Admin, Organiser, Customer, POS, Scanner) |
| **Event** | events | Eventos |
| **Ticket** | tickets | Ingressos/Tickets |
| **Booking** | bookings | Reservas de ingressos |
| **Category** | categories | Categorias de eventos |
| **Tag** | tags | Tags para eventos e posts |
| **Venue** | venues | Locais de eventos |
| **Schedule** | schedules | Agendamentos de eventos |
| **Commission** | commissions | Comissões por venda |
| **Transaction** | transactions | Transações financeiras |
| **Checkin** | checkins | Check-in de participantes |
| **Tax** | taxes | Impostos |
| **Country** | countries | Países |
| **Currency** | currencies | Moedas |
| **Banner** | banners | Banners promocionais |
| **Post** | posts | Posts de blog |
| **Contact** | contacts | Formulários de contato |
| **Notification** | notifications | Notificações do sistema |
| **PosModel** | pos_models | Configurações POS |
| **ScannerModel** | scanner_models | Configurações Scanner |
| **UserRole** | roles | Papéis de usuário |
| **Translation** | translations | Traduções |
| **Page** | pages | Páginas estáticas |

---

## 3. Controllers (44 Total)

### Autenticação (5)
- `Auth/LoginController` - Login
- `Auth/RegisterController` - Registro
- `Auth/ForgotPasswordController` - Recuperação de senha
- `Auth/ResetPasswordController` - Reset de senha
- `Auth/VerificationController` - Verificação de email

### Frontend - Público (10)
- `EventsController` - Listagem e detalhes de eventos
- `BookingsController` - Processamento de reservas
- `TicketsController` - Gerenciamento de ingressos
- `VenueController` - Listagem de locais
- `TagsController` - Gerenciamento de tags
- `SchedulesController` - Agendamentos
- `PagesController` - Páginas estáticas
- `BlogsController` - Blog/Posts
- `ContactController` - Formulário de contato
- `DownloadsController` - Downloads

### Frontend - Usuário Logado (3)
- `MyBookingsController` - Minhas reservas
- `ProfileController` - Perfil do usuário
- `EventmieController` - Controlador principal

### Organizador (6)
- `MyEventsController` - Meus eventos
- `MyEarningsController` - Meus ganhos
- `MyVenueController` - Meus locais
- `OBookingsController` - Reservas do meu evento
- `ODashboardController` - Dashboard do organizador
- `SendEmailController` - Envio de emails

### POS - Point of Sale (3)
- `PosController` - Vendas no local
- `PosODashboardController` - Dashboard POS

### Scanner - Check-in (3)
- `ScannerController` - Leitor de QR code
- `ScannerODashboardController` - Dashboard Scanner
- `TicketScannerController` - Verificação de ingressos

### Admin/Voyager (13)
- `Voyager/DashboardController` - Dashboard admin
- `Voyager/EventsController` - Gerenciamento de eventos
- `Voyager/BookingsController` - Gerenciamento de reservas
- `Voyager/CategoriesController` - Categorias
- `Voyager/TagsController` - Tags
- `Voyager/VenuesController` - Locais
- `Voyager/AdminsController` - Administradores
- `Voyager/BannersController` - Banners
- `Voyager/PostsController` - Posts
- `Voyager/SettingsController` - Configurações
- `Voyager/CommissionsController` - Comissões
- `Voyager/ContactsController` - Contatos
- `Voyager/MediaController` - Mídia

### Utilitários (1)
- `OpenAIController` - Integração com OpenAI

---

## 4. Middlewares (16)

| Middleware | Propósito | Tipo |
|-----------|----------|------|
| `AdminMiddleware` | Restringe acesso a admins | Role-based |
| `OrganiserMiddleware` | Restringe acesso a organizadores | Role-based |
| `CustomerMiddleware` | Restringe acesso a clientes | Role-based |
| `Authenticate` | Autenticação básica | Auth |
| `EnsureEmailIsVerified` | Verifica email verificado | Auth |
| `CommonMiddleware` | Idioma, timezone, configurações | Common |
| `Pos` | Acesso para POS | Role-based |
| `OnlyPos` | Apenas POS | Role-based |
| `Scanner` | Acesso para Scanner | Role-based |
| `VoyagerAdminMiddleware` | Admin do Voyager | Role-based |
| `EncryptCookies` | Criptografia de cookies | Security |
| `TrimStrings` | Trim de strings | Data |
| `TrustProxies` | Confiança em proxies | Network |
| `VerifyCsrfToken` | Verificação CSRF | Security |
| `RedirectIfAuthenticated` | Redireciona se autenticado | Auth |
| `CheckForMaintenanceMode` | Modo manutenção | System |

---

## 5. Services (2)

### Dashboard.php
```php
- getStats()           // Estatísticas gerais
- getCharts()          // Dados para gráficos
- getOrganizerStats()  // Estatísticas do organizador
```

### PaypalExpress.php
```php
- createPayment()      // Criar pagamento
- verifyPayment()      // Verificar pagamento
- handleCallback()     // Callback do PayPal
```

---

## 6. Rotas Principais (522 linhas)

### Públicas
```
GET  /lang/{lang}                    Mudar idioma
GET  /frontend-assets                Assets do frontend
POST /set/local_timezone             Definir timezone
```

### Autenticação
```
GET  /login                          Formulário de login
POST /login                          Processar login
GET  /register                       Formulário de registro
POST /register                       Processar registro
GET  /password/reset                 Recuperar senha
POST /password/email                 Enviar email reset
GET  /forgot/password/reset/{token}  Formulário reset
POST /forgot/password/reset/post     Processar reset
GET  /email/verify                   Verificar email
GET  /email/verify/{id}              Confirmar email
GET  /email/resend                   Reenviar email
GET  /logout                         Logout
```

### Eventos (Frontend)
```
GET  /events                         Listar eventos
GET  /events/{slug}                  Detalhes do evento
POST /events/get                     Obter eventos (AJAX)
GET  /events/search                  Buscar eventos
```

### Reservas
```
POST /booking/create                 Criar reserva
GET  /my-bookings                    Minhas reservas
POST /booking/cancel                 Cancelar reserva
GET  /booking/{id}                   Detalhes da reserva
```

### Organizador
```
GET  /organiser/events               Meus eventos
POST /organiser/event/create         Criar evento
PUT  /organiser/event/{id}           Atualizar evento
DELETE /organiser/event/{id}         Deletar evento
GET  /organiser/earnings             Meus ganhos
GET  /organiser/bookings             Minhas reservas
```

### Admin (Voyager)
```
PREFIX: /admin
GET    /                             Dashboard
POST   /sales/report                 Relatório de vendas
POST   /export/sales/report          Exportar relatório
[CRUD para todas as entidades]
```

### POS
```
GET  /pos/dashboard                  Dashboard POS
POST /pos/booking                    Criar venda POS
GET  /pos/bookings                   Vendas POS
```

### Scanner
```
GET  /scanner/dashboard              Dashboard Scanner
POST /scanner/verify                 Verificar ingresso
GET  /scanner/checkin                Check-in
```

---

## 7. Fluxos de Negócio Principais

### Fluxo 1: Criação de Evento
```
Organizador acessa MyEventsController
    ↓
Preenche formulário de evento
    ↓
EventsController::store() valida dados
    ↓
Event::save_event() cria/atualiza evento
    ↓
Event::event_tags() sincroniza tags
    ↓
Ticket::add_tickets() cria ingressos
    ↓
Database: INSERT INTO events, tickets
    ↓
Notificação enviada para admin
```

### Fluxo 2: Reserva de Ingresso
```
Cliente acessa BookingsController
    ↓
Seleciona evento e ingressos
    ↓
BookingsController::create() valida
    ↓
is_admin_organiser() verifica permissões
    ↓
PaypalExpress::createPayment() processa pagamento
    ↓
Booking::make_booking() cria reserva
    ↓
Commission calculada automaticamente
    ↓
Transaction registrada
    ↓
Database: INSERT INTO bookings, transactions, commissions
    ↓
Email enviado para cliente e organizador
```

### Fluxo 3: Check-in (Scanner)
```
Scanner acessa ScannerController
    ↓
Escaneia QR code do ingresso
    ↓
TicketScannerController::verify() valida
    ↓
Checkin::create() registra presença
    ↓
Database: INSERT INTO checkins
    ↓
Confirmação visual no scanner
```

---

## 8. Configurações Importantes

### .env
```
APP_NAME=Eventos
APP_ENV=production
APP_DEBUG=true
APP_URL=https://eventos.inovmi.com.br

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sql_eventos
DB_USERNAME=sql_eventos

MAIL_DRIVER=smtp
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587

QUEUE_DRIVER=sync          ⚠️ Deve ser 'redis' ou 'database'
CACHE_DRIVER=file          ⚠️ Deve ser 'redis' para produção
SESSION_DRIVER=file        ⚠️ Deve ser 'database' ou 'redis'
```

### config/eventmie.php
```php
'route.prefix'              => 'eventmie'
'route.admin_prefix'        => 'admin'
'controllers.namespace'     => 'Classiebit\Eventmie\Http\Controllers'
'multi-vendor.verify_email' => true/false
```

---

## 9. Dependências Principais

```json
{
  "classiebit/eventmie-pro": "^3.0",
  "laravel/framework": "^11.31",
  "laravel/socialite": "^5.x",
  "yajra/laravel-datatables": "^10.x",
  "barryvdh/laravel-dompdf": "^2.x",
  "consoletvs/charts": "^6.x",
  "spatie/laravel-honeypot": "^4.x",
  "devrabiul/laravel-cookie-consent": "^1.0",
  "league/flysystem-aws-s3-v3": "^3.0"
}
```

---

## 10. Integração com Sistemas Externos

- **PayPal Express** - Processamento de pagamentos
- **Google/Facebook OAuth** - Login social
- **Brevo SMTP** - Envio de emails
- **AWS S3** - Armazenamento de arquivos
- **OpenAI** - Geração de conteúdo
- **Voyager CMS** - Admin panel

---

## Conclusão

A arquitetura é bem estruturada e modular, com separação clara de responsabilidades. Porém, há oportunidades de melhoria em desacoplamento, testes e performance (ver [PLANO_REFATORACAO.md](./PLANO_REFATORACAO.md)).
