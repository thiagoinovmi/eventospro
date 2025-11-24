# Comece Aqui - Guia Rápido de Arquitetura

## 🚀 5 Minutos para Entender o Projeto

### O que é Eventos Inovmi?
Sistema de gerenciamento de eventos multi-vendor com:
- ✅ Criação e gerenciamento de eventos
- ✅ Venda de ingressos online
- ✅ Processamento de pagamentos (PayPal)
- ✅ Check-in com scanner QR
- ✅ Dashboard para organizadores
- ✅ Painel admin completo

### Stack Tecnológico
```
Backend:  PHP 8.2 + Laravel 11
Frontend: Vue.js + Blade Templates
Database: MySQL/MariaDB
Admin:    Voyager CMS
```

---

## 📁 Estrutura Básica (2 minutos)

```
eventmie-pro/src/
├── Http/Controllers/     ← 44 controllers (lógica)
├── Models/              ← 23 modelos (dados)
├── Middleware/          ← 16 middlewares (segurança)
├── Services/            ← 2 services (lógica de negócio)
├── Notifications/       ← Notificações
└── routes/eventmie.php  ← 522 linhas de rotas
```

---

## 🎯 Papéis de Usuário

| Papel | Acesso | Funcionalidades |
|-------|--------|-----------------|
| **Admin** | `/admin` | Gerenciar tudo |
| **Organizador** | `/organiser` | Criar eventos, ver ganhos |
| **Cliente** | `/events` | Comprar ingressos |
| **POS** | `/pos` | Vender no local |
| **Scanner** | `/scanner` | Check-in |

---

## 🔄 Fluxos Principais (3 minutos)

### Fluxo 1: Cliente Compra Ingresso
```
Cliente → Seleciona Evento → Escolhe Ingresso → Paga (PayPal)
         → Recebe QR Code → Pode fazer Check-in
```

### Fluxo 2: Organizador Cria Evento
```
Organizador → Preenche Formulário → Cria Ingressos
            → Publica Evento → Recebe Vendas
```

### Fluxo 3: Check-in no Evento
```
Scanner → Escaneia QR Code → Valida Ingresso
       → Registra Presença → Confirmação Visual
```

---

## 📊 Arquitetura em Camadas

```
┌─────────────────────────────────────────┐
│  FRONTEND (Vue.js + Blade)              │
├─────────────────────────────────────────┤
│  ROTAS (eventmie.php)                   │
├─────────────────────────────────────────┤
│  MIDDLEWARES (Autenticação, Autorização)│
├─────────────────────────────────────────┤
│  CONTROLLERS (44 controllers)           │
├─────────────────────────────────────────┤
│  SERVICES (Lógica de Negócio)           │
├─────────────────────────────────────────┤
│  MODELS (23 modelos)                    │
├─────────────────────────────────────────┤
│  DATABASE (MySQL)                       │
└─────────────────────────────────────────┘
```

---

## 🔑 Modelos Principais

### User
- Usuários do sistema (Admin, Organizador, Cliente, POS, Scanner)
- Autenticação e autorização

### Event
- Eventos criados por organizadores
- Relacionado com: Tickets, Bookings, Schedules, Tags

### Ticket
- Ingressos para venda
- Relacionado com: Event, Bookings, Taxes

### Booking
- Reservas de ingressos (compras)
- Relacionado com: User, Event, Ticket, Transactions, Commissions

### Commission
- Comissões geradas por venda
- Relacionado com: Event, Booking, Ticket, User

---

## 🚨 Problemas Identificados

### 🔴 Críticos
1. **Acoplamento forte** - Lógica espalhada
2. **Consultas N+1** - Performance ruim
3. **Sem testes** - 0% cobertura
4. **Autorização manual** - Segurança fraca
5. **Sem cache** - Lento

### 🟡 Importantes
- Métodos muito longos
- Validação espalhada
- Sem documentação de API
- Sem tratamento de erros
- Sem logging

### 🟠 Atenção
- Escalabilidade limitada
- Sem versionamento de API
- Sem rate limiting
- Sem soft deletes
- Sem paginação em algumas queries

---

## ✅ Solução: Plano de 5 Sprints

### Sprint 1: Qualidade (2 semanas)
```bash
composer require --dev phpstan/phpstan phpunit/phpunit laravel/pint
```
- PHPStan nível 5
- PHPUnit 40% cobertura
- CI/CD com GitHub Actions

### Sprint 2: Desacoplamento (3 semanas)
- Criar Services
- Implementar Repositories
- Criar DTOs
- Implementar Policies

### Sprint 3: Performance (2 semanas)
- Otimizar queries N+1
- Implementar cache
- Configurar filas
- Adicionar índices

### Sprint 4: Testes (3 semanas)
- 70% cobertura
- Testes de integração
- PHPStan nível 7

### Sprint 5: Documentação (1 semana)
- API documentation
- Guia de contribuição
- Treinamento

---

## 📚 Documentação Disponível

| Documento | Tempo | Propósito |
|-----------|-------|----------|
| **README_ARQUITETURA.md** | 5 min | Visão geral |
| **ARQUITETURA_DETALHADA.md** | 30 min | Mapa completo |
| **PLANO_REFATORACAO.md** | 20 min | Roadmap |
| **PROBLEMAS_E_RECOMENDACOES.md** | 15 min | Análise crítica |
| **DIAGRAMA_ARQUITETURA.md** | 15 min | Visualizações |
| **RESUMO_EXECUTIVO.md** | 10 min | Para stakeholders |
| **INDICE_ARQUITETURA.md** | 5 min | Guia de navegação |

---

## 🎯 Próximos Passos

### Hoje
1. [ ] Ler este documento (5 min)
2. [ ] Ler README_ARQUITETURA.md (5 min)
3. [ ] Explorar ARQUITETURA_DETALHADA.md (30 min)

### Esta Semana
4. [ ] Revisar DIAGRAMA_ARQUITETURA.md (15 min)
5. [ ] Estudar PLANO_REFATORACAO.md (20 min)
6. [ ] Discutir com equipe

### Próximas 2 Semanas
7. [ ] Iniciar Sprint 1
8. [ ] Configurar ferramentas
9. [ ] Criar estrutura de testes

---

## 💡 Dicas Rápidas

### Para Entender o Código
1. Comece pelos **Controllers** (o que faz o quê)
2. Depois estude os **Models** (dados e relações)
3. Depois explore os **Services** (lógica de negócio)

### Para Adicionar Nova Feature
1. Crie o **Model** (dados)
2. Crie o **Controller** (rotas)
3. Crie o **Service** (lógica)
4. Crie os **Testes**
5. Documente

### Para Debugar
1. Verifique **DIAGRAMA_ARQUITETURA.md** - Fluxo
2. Verifique **ARQUITETURA_DETALHADA.md** - Controllers
3. Use `dd()` ou debugger
4. Consulte logs em `storage/logs/`

---

## 🔗 Recursos Úteis

### Documentação
- [Laravel Docs](https://laravel.com/docs)
- [Vue.js Docs](https://vuejs.org/)
- [Eventmie Pro](https://classiebit.com/eventmie-pro)

### Ferramentas
- PHPStan: `./vendor/bin/phpstan analyse`
- PHPUnit: `./vendor/bin/phpunit`
- Pint: `./vendor/bin/pint`

### Comandos Úteis
```bash
# Rodar testes
php artisan test

# Análise estática
./vendor/bin/phpstan analyse

# Formatar código
./vendor/bin/pint

# Gerar migrations
php artisan make:migration

# Seed database
php artisan db:seed
```

---

## ❓ Perguntas Frequentes

### P: Por onde começo?
**R**: Leia README_ARQUITETURA.md, depois ARQUITETURA_DETALHADA.md

### P: Como adiciono uma nova feature?
**R**: Siga o padrão: Model → Controller → Service → Testes

### P: Onde estão os controllers?
**R**: `eventmie-pro/src/Http/Controllers/`

### P: Como funciona a autenticação?
**R**: Veja `Auth/LoginController.php` e middlewares

### P: Como adiciono testes?
**R**: Crie em `tests/Unit/` ou `tests/Feature/`

### P: Qual é o plano de refatoração?
**R**: Veja PLANO_REFATORACAO.md (5 sprints, 11 semanas)

---

## 🎓 Aprendizado Recomendado

### Semana 1
- [ ] Entender arquitetura geral
- [ ] Conhecer modelos principais
- [ ] Explorar controllers
- [ ] Estudar fluxos

### Semana 2
- [ ] Entender middlewares
- [ ] Estudar autenticação
- [ ] Explorar banco de dados
- [ ] Conhecer rotas

### Semana 3+
- [ ] Começar a implementar features
- [ ] Escrever testes
- [ ] Seguir padrões
- [ ] Contribuir para refatoração

---

## 📞 Suporte

### Dúvidas sobre Arquitetura?
→ Consulte **ARQUITETURA_DETALHADA.md**

### Dúvidas sobre Fluxos?
→ Consulte **DIAGRAMA_ARQUITETURA.md**

### Dúvidas sobre Problemas?
→ Consulte **PROBLEMAS_E_RECOMENDACOES.md**

### Dúvidas sobre Refatoração?
→ Consulte **PLANO_REFATORACAO.md**

### Dúvidas sobre Navegação?
→ Consulte **INDICE_ARQUITETURA.md**

---

## 🚀 Comece Agora!

1. ✅ Leia este documento (5 min)
2. ✅ Abra **README_ARQUITETURA.md**
3. ✅ Explore **ARQUITETURA_DETALHADA.md**
4. ✅ Estude **DIAGRAMA_ARQUITETURA.md**
5. ✅ Revise **PLANO_REFATORACAO.md**

**Tempo Total**: ~1 hora para entender tudo

---

**Bem-vindo ao Eventos Inovmi! 🎉**

Você agora tem tudo que precisa para entender e contribuir com o projeto.

Qualquer dúvida, consulte a documentação ou entre em contato com o time.

**Boa sorte! 🚀**
