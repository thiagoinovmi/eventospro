<div class="side-menu sidebar-inverse">
    <nav class="navbar navbar-default" role="navigation">
        <div class="side-menu-container">
            <div class="navbar-header">
                <a class="navbar-brand" href="{{ route('voyager.dashboard') }}">
                    <div class="logo-icon-container">
                        <?php $admin_logo_img = Voyager::setting('admin.icon_image', ''); ?>
                        @if($admin_logo_img == '')
                            <img src="{{ voyager_asset('images/logo-icon-light.png') }}" alt="Logo Icon">
                        @else
                            <img src="{{ Voyager::image($admin_logo_img) }}" alt="Logo Icon">
                        @endif
                    </div>
                    <div class="title">{{Voyager::setting('admin.title', 'VOYAGER')}}</div>
                </a>
            </div>

            <div class="panel widget center bgimage"
                 style="background-image:url({{ Voyager::image( Voyager::setting('admin.bg_image'), voyager_asset('images/bg.jpg') ) }}); background-size: cover; background-position: 0px;">
                <div class="dimmer"></div>
                <div class="panel-content">
                    <img src="{{ $user_avatar }}" class="avatar" alt="{{ Auth::user()->name }} avatar">
                    <h4>{{ ucwords(Auth::user()->name) }}</h4>
                    <p>{{ Auth::user()->email }}</p>
                    <a href="{{ route('voyager.profile') }}" class="btn btn-primary">{{ __('voyager::generic.profile') }}</a>
                    <div style="clear:both"></div>
                </div>
            </div>

        </div>
        <div id="adminmenu">
            @php
                // Carregar menu "admin" do banco
                $adminMenu = \TCG\Voyager\Models\Menu::where('name', 'admin')->first();
                $items = $adminMenu ? $adminMenu->items()->whereNull('parent_id')->orderBy('order')->get() : collect();
                
                // Mapa de rotas → labels por idioma (PT e EN)
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
                
                $locale = app()->getLocale();
            @endphp
            
            <ul class="nav navbar-nav">
                @foreach($items as $item)
                    @php
                        $label = $labels[$item->route][$locale] ?? $item->title;
                        $href = $item->route ? route($item->route, $item->parameters ?? []) : $item->url;
                        $isActive = Route::currentRouteName() === $item->route;
                    @endphp
                    <li class="{{ $isActive ? 'active' : '' }}">
                        <a href="{{ $href }}" target="{{ $item->target ?? '_self' }}">
                            <span class="icon">
                                <i class="{{ $item->icon_class }}"></i>
                            </span>
                            <span class="title">{{ $label }}</span>
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
    </nav>
</div>
