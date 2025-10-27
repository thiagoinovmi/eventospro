# Diagrama de Arquitetura - Eventos Inovmi

## 1. Arquitetura em Camadas

```
┌──────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                           │
│                    (Frontend - Vue.js + Blade)                       │
├──────────────────────────────────────────────────────────────────────┤
│  Events Listing  │  Event Details  │  Booking Form  │  My Bookings   │
│  Admin Dashboard │  Organiser Panel│  Profile       │  Scanner UI    │
└──────────────────────────────────────────────────────────────────────┘
                                 ↓
┌──────────────────────────────────────────────────────────────────────┐
│                        ROUTING LAYER                                  │
│                   (eventmie.php - 522 linhas)                        │
├──────────────────────────────────────────────────────────────────────┤
│  GET  /events                  POST /booking/create                  │
│  GET  /events/{slug}           GET  /my-bookings                     │
│  GET  /login                   GET  /organiser/events                │
│  POST /register                GET  /admin/dashboard                 │
│  GET  /scanner/dashboard       POST /pos/booking                     │
└──────────────────────────────────────────────────────────────────────┘
                                 ↓
┌──────────────────────────────────────────────────────────────────────┐
│                      MIDDLEWARE LAYER (16)                            │
├──────────────────────────────────────────────────────────────────────┤
│  CommonMiddleware ──→ Authenticate ──→ Role-based Middleware         │
│  (Lang, Timezone)     (Login Check)    (Admin/Organiser/Customer)    │
│                                                                      │
│  ├─ AdminMiddleware                                                 │
│  ├─ OrganiserMiddleware                                             │
│  ├─ CustomerMiddleware                                              │
│  ├─ Pos / OnlyPos                                                   │
│  ├─ Scanner                                                         │
│  ├─ EnsureEmailIsVerified                                           │
│  └─ [Security Middlewares]                                          │
└──────────────────────────────────────────────────────────────────────┘
                                 ↓
┌──────────────────────────────────────────────────────────────────────┐
│                   CONTROLLER LAYER (44 Controllers)                   │
├──────────────────────────────────────────────────────────────────────┤
│  EventsController    BookingsController    MyEventsController        │
│  │                   │                     │                         │
│  ├─ index()          ├─ create()           ├─ index()               │
│  ├─ show()           ├─ store()            ├─ create()              │
│  ├─ get_events()     ├─ cancel()           ├─ store()               │
│  └─ search()         └─ get_booking()      └─ update()              │
│                                                                      │
│  + 40 outros controllers (Auth, Voyager, POS, Scanner, etc)        │
└──────────────────────────────────────────────────────────────────────┘
                                 ↓
┌──────────────────────────────────────────────────────────────────────┐
│                    SERVICE LAYER (2 → 6+ Services)                   │
├──────────────────────────────────────────────────────────────────────┤
│  Dashboard.php          PaypalExpress.php                            │
│  ├─ getStats()          ├─ createPayment()                          │
│  └─ getCharts()         └─ verifyPayment()                          │
│                                                                      │
│  Propostos:                                                          │
│  ├─ EventService                                                    │
│  ├─ BookingService                                                  │
│  ├─ PaymentService (abstração)                                      │
│  ├─ NotificationService                                             │
│  ├─ ReportService                                                   │
│  └─ CommissionService                                               │
└──────────────────────────────────────────────────────────────────────┘
                                 ↓
┌──────────────────────────────────────────────────────────────────────┐
│                   REPOSITORY LAYER (Proposto)                         │
├──────────────────────────────────────────────────────────────────────┤
│  EventRepository        BookingRepository      UserRepository        │
│  ├─ all()              ├─ all()                ├─ all()              │
│  ├─ find()             ├─ find()               ├─ find()             │
│  ├─ create()           ├─ create()             ├─ create()           │
│  ├─ update()           ├─ update()             ├─ update()           │
│  └─ delete()           └─ delete()             └─ delete()           │
└──────────────────────────────────────────────────────────────────────┘
                                 ↓
┌──────────────────────────────────────────────────────────────────────┐
│                    MODEL LAYER (23 Modelos)                           │
├──────────────────────────────────────────────────────────────────────┤
│  User ──→ Event ──→ Ticket ──→ Booking ──→ Transaction              │
│   │        │        │          │           │                        │
│   ├─ Role │        ├─ Tax     ├─ Checkin  └─ Commission            │
│   │       │        │          │                                     │
│   ├─ Venue├─ Schedule         ├─ Schedule                          │
│   │       │        │          │                                     │
│   ├─ POS  ├─ Category         └─ User (Organiser)                  │
│   │       │        │                                                │
│   └─ Scanner└─ Tag             Notification                         │
│                                                                      │
│  + Modelos de suporte: Country, Currency, Banner, Post, etc.       │
└──────────────────────────────────────────────────────────────────────┘
                                 ↓
┌──────────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER (MySQL)                             │
├──────────────────────────────────────────────────────────────────────┤
│  users │ events │ tickets │ bookings │ transactions │ commissions    │
│  roles │ categories │ tags │ venues │ schedules │ checkins          │
│  posts │ banners │ contacts │ notifications │ settings              │
└──────────────────────────────────────────────────────────────────────┘
                                 ↓
┌──────────────────────────────────────────────────────────────────────┐
│                  EXTERNAL INTEGRATIONS                                │
├──────────────────────────────────────────────────────────────────────┤
│  PayPal Express  │  Google/Facebook OAuth  │  Email (Brevo SMTP)    │
│  OpenAI API      │  AWS S3 (Storage)       │  PDF Generation        │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 2. Fluxo de Dados - Criação de Evento

```
┌─────────────────────────────────────────────────────────────────────┐
│ USUÁRIO (Organizador)                                               │
│ Acessa: /organiser/events/create                                    │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ FRONTEND (Vue.js)                                                   │
│ - Renderiza formulário                                              │
│ - Valida dados no cliente                                           │
│ - Envia POST /organiser/event/create                                │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ ROUTING                                                             │
│ Route::post('/organiser/event/create', ...)                         │
│ Middleware: auth, organiser                                         │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ MIDDLEWARE STACK                                                    │
│ 1. CommonMiddleware (idioma, timezone)                              │
│ 2. Authenticate (verifica login)                                    │
│ 3. OrganiserMiddleware (verifica role)                              │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ CONTROLLER: MyEventsController::store()                             │
│ - Recebe Request                                                    │
│ - Valida dados                                                      │
│ - Chama EventService::createEvent()                                 │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ SERVICE: EventService::createEvent()                                │
│ - Prepara dados                                                     │
│ - Chama EventRepository::create()                                   │
│ - Sincroniza tags                                                   │
│ - Retorna Event DTO                                                 │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ REPOSITORY: EventRepository::create()                               │
│ - Chama Event::create()                                             │
│ - Retorna Model                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ MODEL: Event::create()                                              │
│ - Valida dados                                                      │
│ - INSERT INTO events                                                │
│ - Retorna Event Model                                               │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ DATABASE                                                            │
│ INSERT INTO events (title, description, user_id, ...)              │
│ INSERT INTO tickets (event_id, name, price, ...)                   │
│ INSERT INTO tag_event (event_id, tag_id)                           │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ NOTIFICATION                                                        │
│ Dispatch: SendEventCreatedNotification                              │
│ - Email para admin                                                  │
│ - Notificação no sistema                                            │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ RESPONSE                                                            │
│ HTTP 201 Created                                                    │
│ JSON: { event_id, title, slug, ... }                               │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ FRONTEND                                                            │
│ - Recebe resposta                                                   │
│ - Redireciona para /organiser/events/{id}                           │
│ - Exibe sucesso                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Fluxo de Dados - Reserva de Ingresso

```
┌─────────────────────────────────────────────────────────────────────┐
│ CLIENTE                                                             │
│ Acessa: /events/{slug}                                              │
│ Clica em "Comprar Ingresso"                                         │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ FRONTEND (Vue.js)                                                   │
│ - Exibe opções de ingressos                                         │
│ - Usuário seleciona quantidade                                      │
│ - POST /booking/create                                              │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ CONTROLLER: BookingsController::create()                            │
│ - Valida evento e ingressos                                         │
│ - Chama is_admin_organiser() para verificar permissões              │
│ - Chama BookingService::createBooking()                             │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ SERVICE: BookingService::createBooking()                            │
│ - Valida disponibilidade de ingressos                               │
│ - Calcula preço total (com impostos)                                │
│ - Chama PaymentService::processPayment()                            │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ SERVICE: PaymentService::processPayment()                           │
│ - Chama PaypalExpress::createPayment()                              │
│ - Redireciona para PayPal                                           │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ PAYPAL                                                              │
│ - Usuário faz login                                                 │
│ - Confirma pagamento                                                │
│ - Callback para /booking/callback                                   │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ CONTROLLER: BookingsController::callback()                          │
│ - Verifica assinatura PayPal                                        │
│ - Chama BookingService::confirmBooking()                            │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ SERVICE: BookingService::confirmBooking()                           │
│ - INSERT INTO bookings                                              │
│ - INSERT INTO transactions                                          │
│ - Calcula Commission                                                │
│ - INSERT INTO commissions                                           │
│ - Dispatch notificações                                             │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ DATABASE                                                            │
│ INSERT INTO bookings (customer_id, event_id, ticket_id, ...)       │
│ INSERT INTO transactions (booking_id, amount, status, ...)         │
│ INSERT INTO commissions (event_id, booking_id, amount, ...)        │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ NOTIFICATIONS                                                       │
│ - Email para cliente (confirmação)                                  │
│ - Email para organizador (nova venda)                               │
│ - Notificação no sistema                                            │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ RESPONSE                                                            │
│ HTTP 200 OK                                                         │
│ JSON: { booking_id, ticket_url, qr_code, ... }                     │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ FRONTEND                                                            │
│ - Exibe confirmação                                                 │
│ - Oferece download de ingresso                                      │
│ - Redireciona para /my-bookings                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Fluxo de Dados - Check-in (Scanner)

```
┌─────────────────────────────────────────────────────────────────────┐
│ SCANNER (Dispositivo)                                               │
│ Acessa: /scanner/dashboard                                          │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ FRONTEND (Scanner UI)                                               │
│ - Câmera ativa                                                      │
│ - Escaneia QR code do ingresso                                      │
│ - Extrai ticket_id                                                  │
│ - POST /scanner/verify                                              │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ CONTROLLER: TicketScannerController::verify()                       │
│ - Valida ticket_id                                                  │
│ - Chama ScannerService::verifyTicket()                              │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ SERVICE: ScannerService::verifyTicket()                             │
│ - Busca Booking pelo ticket                                         │
│ - Verifica se já foi feito check-in                                 │
│ - Verifica se evento está ativo                                     │
│ - Chama Checkin::create()                                           │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ MODEL: Checkin::create()                                            │
│ - INSERT INTO checkins (booking_id, user_id, checked_in_at)        │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ RESPONSE                                                            │
│ HTTP 200 OK                                                         │
│ JSON: { status: 'success', name: 'João Silva', ... }               │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│ FRONTEND (Scanner UI)                                               │
│ - Exibe confirmação visual (verde)                                  │
│ - Emite som de sucesso                                              │
│ - Mostra nome do participante                                       │
│ - Volta para câmera (pronto para próximo)                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Estrutura de Dados - Relações Principais

```
USER (1) ──────→ (N) EVENT
  │                  │
  │                  ├─→ (N) TICKET
  │                  │        │
  │                  │        └─→ (N) BOOKING ←─┐
  │                  │                 │         │
  │                  └─→ (N) BOOKING ←─┘         │
  │                         │                    │
  │                         ├─→ (N) TRANSACTION  │
  │                         │                    │
  │                         ├─→ (N) COMMISSION   │
  │                         │                    │
  │                         └─→ (N) CHECKIN      │
  │                                              │
  ├─→ (N) VENUE                                  │
  │                                              │
  ├─→ (N) TRANSACTION ←──────────────────────────┘
  │
  └─→ (N) COMMISSION

CATEGORY (1) ──→ (N) EVENT
                      │
                      └─→ (N) TAG

TAG (N) ←──→ (N) EVENT (via tag_event)

COUNTRY (1) ──→ (N) EVENT

SCHEDULE (1) ──→ (N) BOOKING
```

---

## 6. Estrutura de Pastas - Organização do Código

```
eventmie-pro/src/
├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   │   ├── LoginController.php
│   │   │   ├── RegisterController.php
│   │   │   ├── ForgotPasswordController.php
│   │   │   ├── ResetPasswordController.php
│   │   │   └── VerificationController.php
│   │   │
│   │   ├── Voyager/
│   │   │   ├── DashboardController.php
│   │   │   ├── EventsController.php
│   │   │   ├── BookingsController.php
│   │   │   ├── CategoriesController.php
│   │   │   ├── TagsController.php
│   │   │   ├── VenuesController.php
│   │   │   ├── AdminsController.php
│   │   │   ├── BannersController.php
│   │   │   ├── PostsController.php
│   │   │   ├── SettingsController.php
│   │   │   ├── CommissionsController.php
│   │   │   ├── ContactsController.php
│   │   │   └── MediaController.php
│   │   │
│   │   ├── EventsController.php
│   │   ├── BookingsController.php
│   │   ├── TicketsController.php
│   │   ├── VenueController.php
│   │   ├── TagsController.php
│   │   ├── SchedulesController.php
│   │   ├── PagesController.php
│   │   ├── BlogsController.php
│   │   ├── ContactController.php
│   │   ├── DownloadsController.php
│   │   ├── MyBookingsController.php
│   │   ├── ProfileController.php
│   │   ├── MyEventsController.php
│   │   ├── MyEarningsController.php
│   │   ├── MyVenueController.php
│   │   ├── OBookingsController.php
│   │   ├── ODashboardController.php
│   │   ├── PosController.php
│   │   ├── PosODashboardController.php
│   │   ├── ScannerController.php
│   │   ├── ScannerODashboardController.php
│   │   ├── TicketScannerController.php
│   │   ├── SendEmailController.php
│   │   ├── OpenAIController.php
│   │   └── EventmieController.php
│   │
│   └── Middleware/
│       ├── AdminMiddleware.php
│       ├── OrganiserMiddleware.php
│       ├── CustomerMiddleware.php
│       ├── Authenticate.php
│       ├── EnsureEmailIsVerified.php
│       ├── CommonMiddleware.php
│       ├── Pos.php
│       ├── OnlyPos.php
│       ├── Scanner.php
│       ├── VoyagerAdminMiddleware.php
│       ├── EncryptCookies.php
│       ├── TrimStrings.php
│       ├── TrustProxies.php
│       ├── VerifyCsrfToken.php
│       ├── RedirectIfAuthenticated.php
│       └── CheckForMaintenanceMode.php
│
├── Models/
│   ├── User.php
│   ├── Event.php
│   ├── Ticket.php
│   ├── Booking.php
│   ├── Category.php
│   ├── Tag.php
│   ├── Venue.php
│   ├── Schedule.php
│   ├── Commission.php
│   ├── Transaction.php
│   ├── Checkin.php
│   ├── Tax.php
│   ├── Country.php
│   ├── Currency.php
│   ├── Banner.php
│   ├── Post.php
│   ├── Contact.php
│   ├── Notification.php
│   ├── PosModel.php
│   ├── ScannerModel.php
│   ├── UserRole.php
│   ├── Translation.php
│   └── Page.php
│
├── Services/
│   ├── Dashboard.php
│   └── PaypalExpress.php
│
├── Repositories/ (Proposto)
│   ├── EventRepository.php
│   ├── BookingRepository.php
│   └── UserRepository.php
│
├── DTOs/ (Proposto)
│   ├── EventDTO.php
│   ├── BookingDTO.php
│   └── UserDTO.php
│
├── Policies/ (Proposto)
│   ├── EventPolicy.php
│   └── BookingPolicy.php
│
├── Notifications/
│   ├── BookingNotification.php
│   ├── MailNotification.php
│   ├── ForgotPasswordNotification.php
│   └── CustomDb.php
│
├── Commands/
│   ├── ControllersCommand.php
│   ├── DataRowsSeedCommand.php
│   ├── InstallCommand.php
│   ├── MenuItemsSeedCommand.php
│   ├── SettingsSeedCommand.php
│   ├── TranslateCommand.php
│   └── UpdateCommand.php
│
├── Actions/
│   └── MyActions.php
│
├── Facades/
│   └── Eventmie.php
│
├── Scopes/
│   └── BulkScope.php
│
├── Traits/
│   └── [Traits compartilhados]
│
├── Helpers/
│   └── [Funções auxiliares]
│
├── Exceptions/
│   └── MyHandler.php
│
├── Charts/
│   └── [Gráficos]
│
├── FormFields/
│   ├── OrganiserDropdown.php
│   └── CountryDropdown.php
│
├── Eventmie.php
└── EventmieServiceProvider.php
```

---

## 7. Matriz de Responsabilidades

| Componente | Responsabilidade | Exemplo |
|-----------|-----------------|---------|
| **Controller** | Receber requisição, validar, chamar service | `BookingsController::store()` |
| **Service** | Lógica de negócio, orquestração | `BookingService::createBooking()` |
| **Repository** | Acesso a dados, queries | `BookingRepository::find()` |
| **Model** | Relações, validações, scopes | `Event::with('tickets')` |
| **Middleware** | Autenticação, autorização, logging | `AdminMiddleware` |
| **Policy** | Autorização granular | `EventPolicy::update()` |
| **DTO** | Transferência de dados | `EventDTO` |
| **Notification** | Envio de notificações | `BookingNotification` |

---

## Conclusão

Esta arquitetura em camadas proporciona separação clara de responsabilidades, facilitando manutenção, testes e escalabilidade. Seguindo este padrão, o código fica mais organizado, testável e preparado para crescimento.
