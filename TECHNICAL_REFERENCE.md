# Referência Técnica - Menu Admin e Localização

**Última Atualização:** 27 de Outubro de 2025

---

## 🗺️ Mapa de Fluxo de Localização

```
┌─────────────────────────────────────────────────────────┐
│ Requisição HTTP                                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ Middleware Stack                                        │
├─────────────────────────────────────────────────────────┤
│ 1. CommonMiddleware                                     │
│    $lang = session('my_lang') ?? config('app.locale')  │
│    App::setLocale($lang)                               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ EventmieServiceProvider (boot)                          │
├─────────────────────────────────────────────────────────┤
│ $default_lang = config('eventmie.default_lang')        │
│ App::setLocale($default_lang)  ← SOBRESCREVE           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ VoyagerAdminMiddleware (se /admin)                      │
├─────────────────────────────────────────────────────────┤
│ $lang = session('my_lang') ?? config('app.locale')     │
│ App::setLocale($lang)                                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ Route Handler                                           │
├─────────────────────────────────────────────────────────┤
│ Locale final: app()->getLocale()                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Ordem de Precedência (Importante!)

```
1. EventmieServiceProvider::boot() 
   └─ config('eventmie.default_lang') ← VENCEDOR
   
2. VoyagerAdminMiddleware
   └─ session('my_lang') ?? config('app.locale')
   
3. CommonMiddleware
   └─ session('my_lang') ?? config('app.locale')
   
4. config/app.php
   └─ 'locale' => 'pt'
```

**Conclusão:** Sempre atualizar `config/eventmie.php` primeiro!

---

## 📁 Estrutura de Arquivos Críticos

```
/www/wwwroot/eventos.inovmi.com.br/
├── config/
│   ├── app.php                          ← Locale padrão
│   ├── eventmie.php                     ← SOBRESCREVE app.php
│   └── voyager.php                      ← Voyager config
├── .env                                 ← APP_LOCALE=pt
├── database/seeders/
│   └── MenuItemsTableSeeder.php         ← 17 itens do menu
├── resources/views/vendor/voyager/
│   └── dashboard/sidebar.blade.php      ← Override sidebar
├── eventmie-pro/
│   ├── publishable/config/
│   │   └── eventmie.php                 ← Template (não usar)
│   ├── src/
│   │   ├── EventmieServiceProvider.php  ← Seta locale aqui
│   │   └── Middleware/
│   │       ├── CommonMiddleware.php
│   │       └── VoyagerAdminMiddleware.php
│   └── routes/
│       └── eventmie.php                 ← Rota de lang
└── bootstrap/cache/
    └── *.php                            ← DELETAR se problemas
```

---

## 🔧 Configurações Críticas

### config/app.php
```php
'locale' => 'pt',                    // Padrão
'fallback_locale' => 'pt',           // Fallback
'faker_locale' => 'pt_BR',           // Faker
```

### config/eventmie.php
```php
'default_lang' => 'pt',              // ⚠️ SOBRESCREVE app.php
'locales' => ['en', 'pt', ...],      // Idiomas suportados
```

### config/voyager.php
```php
'multilingual' => [
    'default' => 'pt',               // Voyager padrão
    'locales' => ['en', 'pt'],       // Voyager suporta
],
```

### .env
```bash
APP_LOCALE=pt
APP_FALLBACK_LOCALE=pt
APP_FAKER_LOCALE=pt_BR
```

---

## 🎯 Mapa de Tradução do Menu

Localização: `resources/views/vendor/voyager/dashboard/sidebar.blade.php`

```php
$labels = [
    'voyager.dashboard'           => ['en' => 'Dashboard',      'pt' => 'Painel'],
    'voyager.categories.index'    => ['en' => 'Categories',     'pt' => 'Categorias'],
    'voyager.tags.index'          => ['en' => 'Tags',           'pt' => 'Etiquetas'],
    'voyager.events.index'        => ['en' => 'Events',         'pt' => 'Eventos'],
    'voyager.bookings.index'      => ['en' => 'Bookings',       'pt' => 'Reservas'],
    'voyager.commissions.index'   => ['en' => 'Commissions',    'pt' => 'Comissões'],
    'voyager.taxes.index'         => ['en' => 'Taxes',          'pt' => 'Impostos'],
    'voyager.users.index'         => ['en' => 'Users',          'pt' => 'Usuários'],
    'voyager.contacts.index'      => ['en' => 'Contacts',       'pt' => 'Contatos'],
    'voyager.media.index'         => ['en' => 'Media',          'pt' => 'Mídia'],
    'voyager.banners.index'       => ['en' => 'Banners',        'pt' => 'Banners'],
    'voyager.pages.index'         => ['en' => 'Pages',          'pt' => 'Páginas'],
    'voyager.posts.index'         => ['en' => 'Blog Posts',     'pt' => 'Postagens do Blog'],
    'voyager.menus.builder'       => ['en' => 'Menu Builder',   'pt' => 'Construtor de Menu'],
    'voyager.venues.index'        => ['en' => 'Venues',         'pt' => 'Locais'],
    'voyager.settings.index'      => ['en' => 'Settings',       'pt' => 'Configurações'],
];
```

---

## 📊 Estrutura do Menu (17 itens)

| Order | Title | Route | Icon | Color |
|-------|-------|-------|------|-------|
| 1 | Dashboard | voyager.dashboard | voyager-boat | #000000 |
| 2 | Categories | voyager.categories.index | voyager-categories | null |
| 3 | Tags | voyager.tags.index | voyager-puzzle | null |
| 4 | Events | voyager.events.index | voyager-calendar | #000000 |
| 5 | Bookings | voyager.bookings.index | voyager-dollar | null |
| 6 | Commissions | voyager.commissions.index | voyager-wallet | null |
| 7 | Taxes | voyager.taxes.index | voyager-documentation | #000000 |
| 8 | Users | voyager.users.index | voyager-people | #000000 |
| 9 | Contacts | voyager.contacts.index | voyager-mail | #000000 |
| 10 | Media | voyager.media.index | voyager-images | null |
| 11 | Banners | voyager.banners.index | voyager-photo | #000000 |
| 12 | Pages | voyager.pages.index | voyager-file-text | null |
| 13 | Blog Posts | voyager.posts.index | voyager-news | #000000 |
| 14 | Header Menu | voyager.menus.builder | voyager-list | #000000 |
| 15 | Footer Menu | voyager.menus.builder | voyager-list | #000000 |
| 16 | Venues | voyager.venues.index | voyager-lighthouse | null |
| 17 | Settings | voyager.settings.index | voyager-settings | null |

---

## 🔄 Fluxo de Mudança de Idioma

```
1. Usuário clica em seletor de idioma
   └─ Chama: EventmieController::change_lang($lang)

2. Controller seta sessão
   └─ Session::put('my_lang', $lang)

3. Próxima requisição
   └─ CommonMiddleware lê session('my_lang')
   └─ App::setLocale($lang)

4. Página renderiza no novo idioma
   └─ __('chave') usa novo locale
```

---

## 🐛 Troubleshooting

### Problema: Idioma em Inglês
```bash
# Solução 1: Limpar cache
rm -f bootstrap/cache/*.php
php artisan cache:clear

# Solução 2: Verificar config
php artisan tinker --execute="
echo 'app.locale: ' . config('app.locale') . PHP_EOL;
echo 'eventmie.default_lang: ' . config('eventmie.default_lang') . PHP_EOL;
echo 'app()->getLocale(): ' . app()->getLocale() . PHP_EOL;
"

# Solução 3: Forçar via tinker
php artisan tinker --execute="
app()->setLocale('pt');
echo 'Locale: ' . app()->getLocale();
"
```

### Problema: Menu não aparece
```bash
# Verificar itens no banco
php artisan tinker --execute="
\$items = \TCG\Voyager\Models\MenuItem::where('menu_id', 1)->get();
echo 'Total: ' . \$items->count();
"

# Executar seeder
php artisan db:seed --class=Database\\Seeders\\MenuItemsTableSeeder
```

### Problema: Itens duplicados
```bash
# Verificar duplicatas
php artisan tinker --execute="
\$items = \TCG\Voyager\Models\MenuItem::where('menu_id', 1)
    ->groupBy('route')
    ->havingRaw('count(*) > 1')
    ->get();
echo 'Duplicatas: ' . \$items->count();
"

# Limpar (se necessário)
\TCG\Voyager\Models\MenuItem::where('menu_id', 1)->delete();
php artisan db:seed --class=Database\\Seeders\\MenuItemsTableSeeder
```

---

## 📝 Comandos Úteis

```bash
# Limpar tudo
php artisan cache:clear && php artisan view:clear && php artisan config:clear

# Verificar locale
php artisan tinker --execute="echo app()->getLocale();"

# Listar menu items
php artisan tinker --execute="
\TCG\Voyager\Models\MenuItem::where('menu_id', 1)->orderBy('order')->get()->each(function(\$item) {
    echo \$item->order.' - '.\$item->title.' ('.\$item->route.')'.PHP_EOL;
});
"

# Contar menu items
php artisan tinker --execute="
echo \TCG\Voyager\Models\MenuItem::where('menu_id', 1)->count() . ' itens';
"

# Verificar sessão
php artisan tinker --execute="
echo 'Session my_lang: ' . session('my_lang', 'não definido') . PHP_EOL;
"
```

---

## 🔐 Segurança

### Pontos de Atenção
1. **Sessão:** Validar `session('my_lang')` contra lista de idiomas suportados
2. **Config:** Não expor `config/eventmie.php` em repositório público
3. **Cache:** Limpar cache após mudanças de configuração
4. **Seeder:** Usar `updateOrCreate()` para evitar duplicatas

### Validação Recomendada
```php
$supportedLocales = config('eventmie.locales');
$lang = session('my_lang');

if (!in_array($lang, $supportedLocales)) {
    $lang = config('app.locale');
}

App::setLocale($lang);
```

---

## 📚 Referências

- **Laravel Localization:** https://laravel.com/docs/localization
- **Voyager Docs:** https://voyager.devdojo.com/
- **Eventmie Pro:** https://eventmie-pro.classiebit.com/

---

## ✅ Checklist de Manutenção

- [ ] Verificar locale ao iniciar aplicação
- [ ] Limpar cache após deploy
- [ ] Validar menu items no banco
- [ ] Testar mudança de idioma
- [ ] Verificar fallback
- [ ] Monitorar logs de erro

---

**Versão:** 1.0  
**Status:** ✅ Ativo  
**Próxima Revisão:** v1.1.0
