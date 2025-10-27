# Checklist Sprint 1 - Infraestrutura e Qualidade

## 🎯 Objetivo
Estabelecer base sólida para desenvolvimento com ferramentas de qualidade, testes e CI/CD.

**Duração**: 2 semanas
**Equipe**: 2-3 desenvolvedores
**Resultado**: PHPStan 5, 40% cobertura de testes, CI/CD funcionando

---

## 📋 Tarefas Detalhadas

### Semana 1: Configuração Inicial

#### ✅ Tarefa 1.1: Instalar PHPStan
- [ ] Adicionar ao composer.json
  ```bash
  composer require --dev phpstan/phpstan
  ```
- [ ] Criar arquivo `phpstan.neon`
  ```neon
  level: 5
  paths:
    - eventmie-pro/src
    - app
  excludePaths:
    - eventmie-pro/publishable
    - vendor
  ```
- [ ] Executar análise inicial
  ```bash
  ./vendor/bin/phpstan analyse
  ```
- [ ] Documentar erros encontrados
- [ ] Criar issue para cada erro crítico

**Tempo Estimado**: 2 horas
**Responsável**: Dev 1

---

#### ✅ Tarefa 1.2: Instalar PHPUnit
- [ ] Adicionar ao composer.json
  ```bash
  composer require --dev phpunit/phpunit
  ```
- [ ] Criar arquivo `phpunit.xml`
  ```xml
  <phpunit>
    <testsuites>
      <testsuite name="Unit">
        <directory suffix="Test.php">./tests/Unit</directory>
      </testsuite>
      <testsuite name="Feature">
        <directory suffix="Test.php">./tests/Feature</directory>
      </testsuite>
    </testsuites>
    <coverage>
      <include>
        <directory suffix=".php">./eventmie-pro/src</directory>
        <directory suffix=".php">./app</directory>
      </include>
    </coverage>
  </phpunit>
  ```
- [ ] Criar estrutura de diretórios
  ```bash
  mkdir -p tests/Unit tests/Feature
  ```
- [ ] Criar arquivo base de teste
  ```bash
  touch tests/Unit/ExampleTest.php
  touch tests/Feature/ExampleTest.php
  ```

**Tempo Estimado**: 1.5 horas
**Responsável**: Dev 1

---

#### ✅ Tarefa 1.3: Instalar Laravel Pint
- [ ] Adicionar ao composer.json
  ```bash
  composer require --dev laravel/pint
  ```
- [ ] Criar arquivo `pint.json`
  ```json
  {
    "preset": "laravel",
    "rules": {
      "align_double_arrow": true,
      "align_equals": true
    }
  }
  ```
- [ ] Executar formatação
  ```bash
  ./vendor/bin/pint
  ```
- [ ] Revisar mudanças
- [ ] Commit das mudanças

**Tempo Estimado**: 1 hora
**Responsável**: Dev 2

---

#### ✅ Tarefa 1.4: Criar Estrutura de Testes Iniciais
- [ ] Criar `tests/Unit/Models/UserModelTest.php`
  ```php
  namespace Tests\Unit\Models;
  
  use Tests\TestCase;
  use Classiebit\Eventmie\Models\User;
  
  class UserModelTest extends TestCase {
      public function test_user_can_be_created() {
          $user = User::factory()->create();
          $this->assertInstanceOf(User::class, $user);
      }
  }
  ```
- [ ] Criar `tests/Unit/Models/EventModelTest.php`
- [ ] Criar `tests/Feature/Auth/LoginTest.php`
- [ ] Criar `tests/Feature/Events/EventListingTest.php`
- [ ] Executar testes
  ```bash
  php artisan test
  ```
- [ ] Verificar cobertura
  ```bash
  php artisan test --coverage
  ```

**Tempo Estimado**: 3 horas
**Responsável**: Dev 2

---

### Semana 2: CI/CD e Documentação

#### ✅ Tarefa 2.1: Configurar GitHub Actions
- [ ] Criar diretório `.github/workflows`
  ```bash
  mkdir -p .github/workflows
  ```
- [ ] Criar arquivo `.github/workflows/tests.yml`
  ```yaml
  name: Tests
  
  on: [push, pull_request]
  
  jobs:
    test:
      runs-on: ubuntu-latest
      
      services:
        mysql:
          image: mysql:8.0
          env:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: eventos_test
          options: >-
            --health-cmd="mysqladmin ping"
            --health-interval=10s
            --health-timeout=5s
            --health-retries=3
      
      steps:
        - uses: actions/checkout@v3
        
        - name: Setup PHP
          uses: shivammathur/setup-php@v2
          with:
            php-version: '8.2'
            extensions: mysql, pdo_mysql
        
        - name: Install dependencies
          run: composer install
        
        - name: Copy .env
          run: cp .env.example .env.testing
        
        - name: Generate key
          run: php artisan key:generate --env=testing
        
        - name: Run PHPStan
          run: ./vendor/bin/phpstan analyse
        
        - name: Run tests
          run: php artisan test --coverage
        
        - name: Upload coverage
          uses: codecov/codecov-action@v3
  ```
- [ ] Fazer push para testar
- [ ] Verificar se pipeline passa
- [ ] Documentar no README

**Tempo Estimado**: 2 horas
**Responsável**: Dev 1

---

#### ✅ Tarefa 2.2: Criar Pre-commit Hook
- [ ] Instalar husky (opcional)
  ```bash
  npm install husky --save-dev
  npx husky install
  ```
- [ ] Criar `.husky/pre-commit`
  ```bash
  #!/bin/sh
  ./vendor/bin/pint
  ./vendor/bin/phpstan analyse
  php artisan test
  ```
- [ ] Testar hook localmente

**Tempo Estimado**: 1 hora
**Responsável**: Dev 2

---

#### ✅ Tarefa 2.3: Documentar Setup Local
- [ ] Criar/atualizar `SETUP_LOCAL.md`
  ```markdown
  # Setup Local
  
  ## Requisitos
  - PHP 8.2+
  - MySQL 8.0+
  - Composer
  - Node.js
  
  ## Instalação
  
  1. Clone o repositório
  ```bash
  git clone ...
  cd eventos.inovmi.com.br
  ```
  
  2. Instale dependências
  ```bash
  composer install
  npm install
  ```
  
  3. Configure ambiente
  ```bash
  cp .env.example .env
  php artisan key:generate
  ```
  
  4. Crie banco de dados
  ```bash
  php artisan migrate
  php artisan db:seed
  ```
  
  5. Rode servidor
  ```bash
  php artisan serve
  ```
  
  ## Testes
  
  ```bash
  php artisan test
  ./vendor/bin/phpstan analyse
  ./vendor/bin/pint
  ```
  ```
- [ ] Adicionar ao README.md
- [ ] Revisar com equipe

**Tempo Estimado**: 1 hora
**Responsável**: Dev 1

---

#### ✅ Tarefa 2.4: Criar Documentação de Padrões
- [ ] Criar `docs/CODING_STANDARDS.md`
  ```markdown
  # Padrões de Código
  
  ## PHP
  - Seguir PSR-12
  - Usar type hints
  - Documentar métodos públicos
  - Máximo 80 caracteres por linha
  
  ## Testes
  - Cobertura mínima: 70%
  - Nomes descritivos
  - Um assert por teste
  - Usar factories
  
  ## Controllers
  - Máximo 10 métodos
  - Lógica em Services
  - Validação em Form Requests
  
  ## Models
  - Máximo 20 métodos
  - Relações bem definidas
  - Scopes para filtros
  ```
- [ ] Revisar com equipe
- [ ] Adicionar ao CONTRIBUTING.md

**Tempo Estimado**: 1.5 horas
**Responsável**: Dev 2

---

#### ✅ Tarefa 2.5: Criar Relatório de Status
- [ ] Documentar erros do PHPStan encontrados
- [ ] Documentar cobertura de testes atual
- [ ] Criar issues no GitHub para cada problema
- [ ] Priorizar issues
- [ ] Criar milestone para Sprint 2

**Tempo Estimado**: 1.5 horas
**Responsável**: Dev 1

---

## ✅ Critérios de Aceite

### PHPStan
- [ ] PHPStan instalado e configurado
- [ ] Nível 5 configurado
- [ ] Análise executada sem erros críticos
- [ ] Documentação de erros criada
- [ ] Issues criadas para cada erro

### PHPUnit
- [ ] PHPUnit instalado e configurado
- [ ] Estrutura de testes criada
- [ ] 5+ testes implementados
- [ ] 40% de cobertura atingida
- [ ] Testes passando 100%

### CI/CD
- [ ] GitHub Actions configurado
- [ ] Pipeline executando em cada push
- [ ] Testes rodando automaticamente
- [ ] PHPStan rodando automaticamente
- [ ] Coverage sendo rastreado

### Documentação
- [ ] Setup local documentado
- [ ] Padrões de código documentados
- [ ] README atualizado
- [ ] CONTRIBUTING.md criado
- [ ] Equipe treinada

---

## 📊 Métricas de Sucesso

| Métrica | Meta | Status |
|---------|------|--------|
| PHPStan Level | 5 | ⬜ |
| Test Coverage | 40% | ⬜ |
| CI/CD Pass Rate | 100% | ⬜ |
| Code Style Compliance | 100% | ⬜ |
| Documentação | 100% | ⬜ |

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|--------|-----------|
| Muitos erros PHPStan | Alta | Médio | Começar com nível 3, aumentar gradualmente |
| Testes frágeis | Média | Médio | Usar factories, evitar dados reais |
| CI/CD lento | Média | Baixo | Otimizar pipeline, usar cache |
| Falta de tempo | Média | Alto | Priorizar tarefas críticas |

---

## 📅 Timeline

```
Semana 1:
├─ Segunda: Instalar PHPStan (2h)
├─ Terça: Instalar PHPUnit (1.5h)
├─ Quarta: Instalar Pint (1h)
├─ Quinta: Criar testes iniciais (3h)
└─ Sexta: Revisão e ajustes (1.5h)

Semana 2:
├─ Segunda: Configurar GitHub Actions (2h)
├─ Terça: Criar pre-commit hook (1h)
├─ Quarta: Documentar setup (1h)
├─ Quinta: Documentar padrões (1.5h)
└─ Sexta: Relatório final (1.5h)

Total: 16 horas (~2 dias por dev)
```

---

## 🔗 Referências

- [PHPStan Documentation](https://phpstan.org/)
- [PHPUnit Documentation](https://phpunit.de/)
- [Laravel Pint](https://laravel.com/docs/pint)
- [GitHub Actions](https://github.com/features/actions)
- [PSR-12](https://www.php-fig.org/psr/psr-12/)

---

## 📞 Suporte

### Dúvidas sobre PHPStan?
→ Consulte `phpstan.neon` e documentação oficial

### Dúvidas sobre PHPUnit?
→ Consulte `phpunit.xml` e exemplos em `tests/`

### Dúvidas sobre GitHub Actions?
→ Consulte `.github/workflows/tests.yml`

### Dúvidas sobre Padrões?
→ Consulte `docs/CODING_STANDARDS.md`

---

## ✨ Próximos Passos (Sprint 2)

Após completar Sprint 1, você estará pronto para:
1. Criar Services
2. Implementar Repositories
3. Criar DTOs
4. Implementar Policies

---

**Sprint 1 - Infraestrutura e Qualidade**
**Status**: 🟢 Pronto para começar
**Data**: 27 de outubro de 2025
