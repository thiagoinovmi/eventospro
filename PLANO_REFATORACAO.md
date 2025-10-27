# Plano de Refatoração em 5 Sprints

## Visão Geral

Roadmap de refatoração incremental para melhorar a qualidade, desempenho e manutenibilidade do sistema Eventos Inovmi. Cada sprint tem duração de 2-3 semanas com critérios de aceite, riscos identificados e métricas de sucesso.

---

## Sprint 1: Infraestrutura e Qualidade (2 semanas)

### 🎯 Objetivo
Estabelecer base sólida para desenvolvimento com ferramentas de qualidade, testes e CI/CD.

### 📋 Tarefas

#### 1.1 Configurar PHPStan (Análise Estática)
- [ ] Instalar PHPStan nível 5
- [ ] Configurar arquivo `phpstan.neon`
- [ ] Executar análise inicial
- [ ] Corrigir erros críticos (nível 5)
- [ ] Integrar no CI/CD

**Arquivo**: `phpstan.neon`
```neon
level: 5
paths:
  - eventmie-pro/src
  - app
```

#### 1.2 Configurar PHPUnit (Testes)
- [ ] Instalar PHPUnit 11
- [ ] Criar estrutura de testes (`tests/Unit`, `tests/Feature`)
- [ ] Configurar `phpunit.xml`
- [ ] Implementar 5 testes unitários básicos
- [ ] Atingir 40% de cobertura

**Testes Iniciais**:
- `UserModelTest` - Testes do modelo User
- `EventModelTest` - Testes do modelo Event
- `BookingServiceTest` - Testes de reserva
- `AuthControllerTest` - Testes de autenticação
- `MiddlewareTest` - Testes de middlewares

#### 1.3 Configurar Laravel Pint (Code Style)
- [ ] Instalar Laravel Pint
- [ ] Criar arquivo `pint.json`
- [ ] Executar formatação em todo código
- [ ] Integrar no pre-commit hook

#### 1.4 Implementar CI/CD (GitHub Actions)
- [ ] Criar `.github/workflows/tests.yml`
- [ ] Configurar pipeline de testes
- [ ] Adicionar análise estática
- [ ] Adicionar verificação de cobertura

**Arquivo**: `.github/workflows/tests.yml`
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: php-actions/setup-php@v1
        with:
          php-version: '8.2'
      - run: composer install
      - run: ./vendor/bin/phpstan analyse
      - run: ./vendor/bin/phpunit
```

### ✅ Critérios de Aceite
- [ ] PHPStan nível 5 configurado e sem erros
- [ ] 40% de cobertura de testes atingida
- [ ] CI/CD pipeline funcionando
- [ ] Código formatado com Pint
- [ ] Documentação de setup atualizada

### ⚠️ Riscos
- Tempo necessário para corrigir erros do PHPStan
- Resistência da equipe a novas ferramentas
- Falsos positivos em análise estática

### 📊 Métricas
- **PHPStan Level**: 5
- **Test Coverage**: 40%
- **Code Style Compliance**: 100%
- **CI/CD Success Rate**: 100%

---

## Sprint 2: Desacoplamento e Arquitetura (3 semanas)

### 🎯 Objetivo
Reduzir acoplamento e implementar padrões de arquitetura limpa.

### 📋 Tarefas

#### 2.1 Criar Service Layer
- [ ] Criar `app/Services/EventService.php`
- [ ] Criar `app/Services/BookingService.php`
- [ ] Criar `app/Services/PaymentService.php`
- [ ] Extrair lógica de controllers para services
- [ ] Implementar injeção de dependência

**Exemplo**: `app/Services/EventService.php`
```php
namespace App\Services;

class EventService {
    public function createEvent(array $data): Event { }
    public function updateEvent(Event $event, array $data): Event { }
    public function deleteEvent(Event $event): bool { }
    public function getEventWithRelations(int $id): Event { }
}
```

#### 2.2 Implementar Repository Pattern
- [ ] Criar `app/Repositories/EventRepository.php`
- [ ] Criar `app/Repositories/BookingRepository.php`
- [ ] Criar `app/Repositories/UserRepository.php`
- [ ] Substituir queries diretas por repositories
- [ ] Adicionar interface `RepositoryInterface`

**Exemplo**: `app/Repositories/EventRepository.php`
```php
namespace App\Repositories;

interface EventRepositoryInterface {
    public function all();
    public function find(int $id): ?Event;
    public function create(array $data): Event;
    public function update(Event $event, array $data): Event;
    public function delete(Event $event): bool;
}

class EventRepository implements EventRepositoryInterface { }
```

#### 2.3 Criar DTOs (Data Transfer Objects)
- [ ] Criar `app/DTOs/EventDTO.php`
- [ ] Criar `app/DTOs/BookingDTO.php`
- [ ] Criar `app/DTOs/UserDTO.php`
- [ ] Usar DTOs em controllers e services
- [ ] Validação centralizada

**Exemplo**: `app/DTOs/EventDTO.php`
```php
namespace App\DTOs;

class EventDTO {
    public function __construct(
        public string $title,
        public string $description,
        public DateTime $startDate,
        public DateTime $endDate,
        public int $userId,
        public int $categoryId
    ) {}
}
```

#### 2.4 Implementar Policies (Autorização)
- [ ] Criar `app/Policies/EventPolicy.php`
- [ ] Criar `app/Policies/BookingPolicy.php`
- [ ] Substituir verificações manuais por policies
- [ ] Registrar policies em `AuthServiceProvider`

**Exemplo**: `app/Policies/EventPolicy.php`
```php
namespace App\Policies;

class EventPolicy {
    public function create(User $user): bool {
        return $user->hasRole('organiser') || $user->hasRole('admin');
    }
    
    public function update(User $user, Event $event): bool {
        return $user->id === $event->user_id || $user->hasRole('admin');
    }
}
```

#### 2.5 Refatorar Controllers
- [ ] Injetar services nos controllers
- [ ] Remover lógica de negócio
- [ ] Simplificar métodos
- [ ] Adicionar validação com Form Requests

**Exemplo**: Antes vs Depois
```php
// ANTES
public function store(Request $request) {
    $event = Event::create($request->all());
    $event->tags()->sync($request->tags);
    return response()->json($event);
}

// DEPOIS
public function store(StoreEventRequest $request) {
    $event = $this->eventService->createEvent($request->toDTO());
    return response()->json($event);
}
```

### ✅ Critérios de Aceite
- [ ] 6 Services implementados
- [ ] 3 Repositories implementados
- [ ] 3 DTOs implementados
- [ ] 2 Policies implementadas
- [ ] Controllers refatorados
- [ ] Testes passando (cobertura 50%)

### ⚠️ Riscos
- Refatoração pode quebrar funcionalidades existentes
- Tempo necessário para testes de regressão
- Curva de aprendizado para novos padrões

### 📊 Métricas
- **Acoplamento**: Redução de 30%
- **Test Coverage**: 50%
- **Métodos por Controller**: Redução de 40%
- **Linhas por Método**: Redução de 35%

---

## Sprint 3: Performance e Escalabilidade (2 semanas)

### 🎯 Objetivo
Otimizar desempenho e preparar para escalabilidade.

### 📋 Tarefas

#### 3.1 Otimizar Consultas (N+1)
- [ ] Identificar queries N+1 com Laravel Debugbar
- [ ] Implementar eager loading com `with()`
- [ ] Criar query scopes reutilizáveis
- [ ] Adicionar índices no banco de dados
- [ ] Documentar padrão de queries

**Exemplo**: Antes vs Depois
```php
// ANTES - N+1 Problem
$events = Event::all();
foreach ($events as $event) {
    echo $event->category->name; // Query por evento!
}

// DEPOIS - Eager Loading
$events = Event::with('category')->get();
foreach ($events as $event) {
    echo $event->category->name; // Sem queries adicionais
}
```

#### 3.2 Implementar Cache
- [ ] Configurar Redis como cache driver
- [ ] Implementar cache em queries frequentes
- [ ] Criar cache tags para invalidação
- [ ] Adicionar cache em API responses
- [ ] Documentar estratégia de cache

**Exemplo**: `app/Services/EventService.php`
```php
public function getFeaturedEvents() {
    return Cache::tags(['events'])->remember(
        'featured_events',
        3600, // 1 hora
        fn() => Event::where('featured', true)->get()
    );
}
```

#### 3.3 Configurar Filas (Queues)
- [ ] Mudar `QUEUE_DRIVER` de `sync` para `redis`
- [ ] Criar `app/Jobs/SendBookingEmailJob.php`
- [ ] Criar `app/Jobs/GenerateReportJob.php`
- [ ] Implementar retry logic
- [ ] Monitorar filas

**Exemplo**: `app/Jobs/SendBookingEmailJob.php`
```php
namespace App\Jobs;

class SendBookingEmailJob implements ShouldQueue {
    public function handle() {
        Mail::send(new BookingConfirmation($this->booking));
    }
}
```

#### 3.4 Otimizar Assets
- [ ] Minificar CSS/JS
- [ ] Implementar lazy loading de imagens
- [ ] Configurar compressão GZIP
- [ ] Adicionar cache headers
- [ ] Usar CDN para assets estáticos

#### 3.5 Adicionar Índices no Banco
- [ ] Criar migration para índices
- [ ] Indexar colunas de busca frequente
- [ ] Indexar foreign keys
- [ ] Indexar colunas de filtro

**Exemplo**: Migration
```php
Schema::table('events', function (Blueprint $table) {
    $table->index('user_id');
    $table->index('category_id');
    $table->index('start_date');
    $table->fullText('title', 'description');
});
```

### ✅ Critérios de Aceite
- [ ] Redução de 50% em queries N+1
- [ ] Cache implementado em 5 endpoints
- [ ] Filas configuradas e funcionando
- [ ] Tempo de resposta reduzido em 40%
- [ ] Índices de banco otimizados

### ⚠️ Riscos
- Complexidade de cache invalidation
- Possível inconsistência de dados com cache
- Overhead de filas em desenvolvimento

### 📊 Métricas
- **Tempo de Resposta**: Redução de 40%
- **Queries por Request**: Redução de 50%
- **Database Load**: Redução de 35%
- **Memory Usage**: Redução de 25%

---

## Sprint 4: Testes e Confiabilidade (3 semanas)

### 🎯 Objetivo
Melhorar qualidade do código com testes abrangentes.

### 📋 Tarefas

#### 4.1 Testes Unitários
- [ ] Criar testes para todos os Services
- [ ] Criar testes para Repositories
- [ ] Criar testes para DTOs
- [ ] Atingir 70% de cobertura
- [ ] Usar mocks e stubs

**Exemplo**: `tests/Unit/Services/EventServiceTest.php`
```php
namespace Tests\Unit\Services;

class EventServiceTest extends TestCase {
    public function test_create_event() {
        $service = new EventService(new EventRepository());
        $event = $service->createEvent([
            'title' => 'Test Event',
            'user_id' => 1
        ]);
        $this->assertInstanceOf(Event::class, $event);
    }
}
```

#### 4.2 Testes de Integração
- [ ] Criar testes de fluxo de booking
- [ ] Criar testes de pagamento
- [ ] Criar testes de autenticação
- [ ] Testar integrações com APIs externas
- [ ] Usar database transactions

**Exemplo**: `tests/Feature/BookingFlowTest.php`
```php
namespace Tests\Feature;

class BookingFlowTest extends TestCase {
    public function test_complete_booking_flow() {
        $user = User::factory()->create();
        $event = Event::factory()->create();
        
        $response = $this->actingAs($user)
            ->post('/booking/create', [
                'event_id' => $event->id,
                'quantity' => 2
            ]);
        
        $response->assertStatus(200);
        $this->assertDatabaseHas('bookings', [
            'user_id' => $user->id,
            'event_id' => $event->id
        ]);
    }
}
```

#### 4.3 Testes de Aceitação
- [ ] Criar testes com Dusk (browser automation)
- [ ] Testar fluxos de usuário completos
- [ ] Testar responsividade
- [ ] Testar validações de formulário

#### 4.4 Análise Estática Contínua
- [ ] Aumentar nível do PHPStan para 7
- [ ] Adicionar Psalm para análise de tipos
- [ ] Configurar SonarQube ou similar
- [ ] Adicionar verificações no CI/CD

#### 4.5 Testes de Performance
- [ ] Criar testes de carga
- [ ] Testar com Apache Bench
- [ ] Identificar gargalos
- [ ] Documentar limites de performance

### ✅ Critérios de Aceite
- [ ] 70% de cobertura de testes
- [ ] 100% de testes passando
- [ ] PHPStan nível 7
- [ ] Sem erros de análise estática
- [ ] Testes de aceitação implementados

### ⚠️ Riscos
- Tempo necessário para escrever testes
- Testes frágeis que quebram facilmente
- Falsos positivos em análise estática

### 📊 Métricas
- **Test Coverage**: 70%
- **Test Pass Rate**: 100%
- **PHPStan Level**: 7
- **Code Quality Score**: +40%

---

## Sprint 5: Documentação e Entrega (1 semana)

### 🎯 Objetivo
Finalizar refatoração e documentar para manutenção futura.

### 📋 Tarefas

#### 5.1 Documentação de API
- [ ] Gerar OpenAPI/Swagger
- [ ] Documentar todos os endpoints
- [ ] Adicionar exemplos de requisição/resposta
- [ ] Criar postman collection
- [ ] Publicar documentação

**Arquivo**: `openapi.yaml`
```yaml
openapi: 3.0.0
info:
  title: Eventos Inovmi API
  version: 1.0.0
paths:
  /api/events:
    get:
      summary: Listar eventos
      responses:
        200:
          description: Lista de eventos
```

#### 5.2 Guia de Contribuição
- [ ] Criar `CONTRIBUTING.md`
- [ ] Documentar padrões de código
- [ ] Documentar processo de PR
- [ ] Adicionar checklist de PR
- [ ] Documentar setup local

**Arquivo**: `CONTRIBUTING.md`
```markdown
# Guia de Contribuição

## Setup Local
1. Clone o repositório
2. `composer install`
3. `npm install`
4. `cp .env.example .env`
5. `php artisan key:generate`

## Padrões de Código
- Seguir PSR-12
- Usar type hints
- Adicionar testes
- Documentar métodos públicos

## Processo de PR
1. Criar branch: `feature/nome-feature`
2. Fazer commits descritivos
3. Abrir PR com descrição
4. Aguardar review
5. Merge após aprovação
```

#### 5.3 Documentação de Arquitetura
- [ ] Criar ADRs (Architecture Decision Records)
- [ ] Documentar padrões utilizados
- [ ] Criar diagramas de arquitetura
- [ ] Documentar fluxos principais
- [ ] Criar guia de troubleshooting

**Exemplo**: `docs/adr/001-service-layer.md`
```markdown
# ADR 001: Implementação de Service Layer

## Contexto
Controllers estavam com muita lógica de negócio.

## Decisão
Implementar Service Layer para separar responsabilidades.

## Consequências
- Código mais testável
- Lógica reutilizável
- Controllers mais simples
```

#### 5.4 Preparar Release
- [ ] Criar changelog
- [ ] Atualizar versão
- [ ] Criar release notes
- [ ] Fazer deploy em staging
- [ ] Fazer deploy em produção

#### 5.5 Treinamento da Equipe
- [ ] Apresentar novos padrões
- [ ] Demonstrar novos fluxos
- [ ] Responder dúvidas
- [ ] Criar documentação de referência rápida

### ✅ Critérios de Aceite
- [ ] API documentada com Swagger
- [ ] Guia de contribuição completo
- [ ] ADRs documentados
- [ ] Changelog atualizado
- [ ] Equipe treinada

### ⚠️ Riscos
- Documentação desatualizada rapidamente
- Falta de adoção dos novos padrões
- Resistência a mudanças

### 📊 Métricas
- **Documentação Completude**: 100%
- **Cobertura de API**: 100%
- **Satisfação da Equipe**: +80%

---

## Resumo de Métricas Globais

| Métrica | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Sprint 5 |
|---------|----------|----------|----------|----------|----------|
| Test Coverage | 40% | 50% | 55% | 70% | 70% |
| PHPStan Level | 5 | 5 | 5 | 7 | 7 |
| Tempo Resposta | Baseline | -10% | -40% | -40% | -40% |
| Acoplamento | Baseline | -30% | -30% | -30% | -30% |
| Queries N+1 | Baseline | -20% | -50% | -50% | -50% |
| Code Quality | Baseline | +20% | +30% | +40% | +50% |

---

## Timeline Recomendado

```
Semana 1-2:   Sprint 1 (Infraestrutura)
Semana 3-5:   Sprint 2 (Desacoplamento)
Semana 6-7:   Sprint 3 (Performance)
Semana 8-10:  Sprint 4 (Testes)
Semana 11:    Sprint 5 (Documentação)

Total: 11 semanas (2.5 meses)
```

---

## Próximos Passos

1. ✅ Revisar e validar plano com stakeholders
2. ✅ Priorizar tarefas críticas
3. ✅ Alocar recursos
4. ✅ Iniciar Sprint 1
5. ✅ Acompanhar progresso semanalmente

---

## Referências

- [Laravel Best Practices](https://laravel.com/docs)
- [Clean Code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [Design Patterns](https://refactoring.guru/design-patterns)
- [Testing Best Practices](https://laravel.com/docs/testing)
