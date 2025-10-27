# Release Notes - Eventos Inovmi v1.0.0

**Data de Lançamento:** 27 de Outubro de 2025  
**Versão:** 1.0.0  
**Tipo:** Correção Crítica + Feature

---

## 🎯 Objetivo

Corrigir inconsistências no menu do admin (Voyager) e estabelecer português como idioma padrão do sistema em todas as camadas da aplicação.

---

## ✨ Principais Mudanças

### 🔧 Correções Críticas

| # | Problema | Solução | Impacto |
|---|----------|---------|--------|
| 1 | Menu admin misturado (PT/EN) | Override sidebar com mapa de tradução por rota | Menu consistente |
| 2 | Idioma forçado para inglês | Alterado `default_lang` em config/eventmie.php | Português padrão |
| 3 | Ordem de menu incorreta | Refatorado seeder com 17 itens em ordem | Menu ordenado |
| 4 | Sem fallback de idioma | Adicionado fallback 'pt' em middlewares | Robustez |

---

## 📊 Arquivos Modificados (10 arquivos)

```
✅ database/seeders/MenuItemsTableSeeder.php
✅ resources/views/vendor/voyager/dashboard/sidebar.blade.php (NOVO)
✅ config/app.php
✅ config/eventmie.php
✅ config/voyager.php
✅ .env
✅ eventmie-pro/publishable/config/eventmie.php
✅ eventmie-pro/src/Middleware/CommonMiddleware.php
✅ eventmie-pro/src/Middleware/VoyagerAdminMiddleware.php
✅ eventmie-pro/routes/eventmie.php
```

---

## 🚀 Como Fazer Deploy

### Pré-requisitos
```bash
# Backup do banco
mysqldump -u user -p database > backup_$(date +%Y%m%d).sql
```

### Passos
```bash
# 1. Atualizar código
git pull origin main

# 2. Limpar cache
php artisan cache:clear
php artisan view:clear
php artisan config:clear

# 3. Executar seeder (opcional, se menu estiver corrompido)
php artisan db:seed --class=Database\\Seeders\\MenuItemsTableSeeder

# 4. Rebuild de assets (se necessário)
npm run build

# 5. Verificar
php artisan tinker --execute="echo 'Locale: ' . app()->getLocale();"
```

---

## ✅ Testes Realizados

- [x] Menu carrega em português
- [x] 17 itens em ordem (1-17)
- [x] Sem mistura de idiomas
- [x] Fallback para português
- [x] Cache limpo
- [x] Rotas funcionando

---

## ⚠️ Notas Importantes

### 1. **Ordem de Precedência**
```
EventmieServiceProvider (config/eventmie.php) 
    ↓ SOBRESCREVE
config/app.php
```
Sempre atualizar ambos os arquivos!

### 2. **Cache Crítico**
Se o idioma continuar em inglês após deploy:
```bash
rm -f bootstrap/cache/*.php
php artisan cache:clear
```

### 3. **Middlewares**
Todos os 3 middlewares têm fallback para 'pt':
- CommonMiddleware
- VoyagerAdminMiddleware
- Route Localization

---

## 📈 Benefícios

| Métrica | Antes | Depois |
|---------|-------|--------|
| Consistência de Idioma | ❌ Misturado | ✅ 100% PT |
| Ordem de Menu | ❌ Incorreta | ✅ 1-17 |
| Fallback de Idioma | ❌ Nenhum | ✅ PT |
| Tradução Correta | ❌ Dupla (erros) | ✅ Por rota |

---

## 🔍 Verificação Pós-Deploy

```bash
# 1. Verificar localização
php artisan tinker --execute="
echo 'Locale: ' . app()->getLocale() . PHP_EOL;
echo 'Config: ' . config('app.locale') . PHP_EOL;
echo 'Eventmie: ' . config('eventmie.default_lang') . PHP_EOL;
"

# 2. Verificar menu
php artisan tinker --execute="
\$items = \TCG\Voyager\Models\MenuItem::where('menu_id', 1)->orderBy('order')->get();
echo 'Total: ' . \$items->count() . ' itens' . PHP_EOL;
foreach(\$items as \$i) echo \$i->order.' - '.\$i->title.PHP_EOL;
"

# 3. Acessar /admin e verificar visualmente
```

---

## 📞 Suporte

Em caso de problemas:

1. **Menu não aparece:** Executar seeder
2. **Idioma em inglês:** Limpar cache (bootstrap/cache/*.php)
3. **Itens duplicados:** Verificar banco de dados

---

## 📝 Próximas Versões

- [ ] v1.1.0 - Implementar cache de menu
- [ ] v1.2.0 - Adicionar testes unitários
- [ ] v1.3.0 - Melhorar performance (N+1 queries)

---

**Status:** ✅ Pronto para Produção  
**Risco:** Baixo (mudanças isoladas)  
**Rollback:** Simples (revert commit + cache clear)
