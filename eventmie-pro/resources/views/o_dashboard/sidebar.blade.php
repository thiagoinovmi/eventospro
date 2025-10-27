@php
    // Define menu items configuration
    $menuItems = [
        'admin' => [
            [
                'route' => 'eventmie.myevents_index',
                'active_routes' => ['eventmie.myevents_index', 'eventmie.myevents_form'],
                'icon' => 'far fa-calendar-alt',
                'title' => 'eventmie-pro::em.events',
                'tooltip' => 'eventmie-pro::em.events'
            ],
            
        ],
        'organiser' => [
            [
                'route' => 'eventmie.o_dashboard',
                'active_routes' => ['eventmie.o_dashboard'],
                'icon' => 'fas fa-gauge',
                'title' => 'eventmie-pro::em.dashboard',
                'tooltip' => 'eventmie-pro::em.dashboard'
            ],
            [
                'route' => 'eventmie.myevents_index',
                'active_routes' => ['eventmie.myevents_index', 'eventmie.myevents_form'],
                'icon' => 'far fa-calendar-alt',
                'title' => 'eventmie-pro::em.events',
                'tooltip' => 'eventmie-pro::em.events'
            ],
            [
                'route' => 'eventmie.obookings_index',
                'active_routes' => ['eventmie.obookings_index'],
                'icon' => 'fas fa-money-check-alt',
                'title' => 'eventmie-pro::em.bookings',
                'tooltip' => 'eventmie-pro::em.bookings'
            ],
            
            [
                'route' => 'eventmie.event_earning_index',
                'active_routes' => ['eventmie.event_earning_index'],
                'icon' => 'fas fa-wallet',
                'title' => 'eventmie-pro::em.earnings',
                'tooltip' => 'eventmie-pro::em.earnings'
            ],
            [
                'route' => 'eventmie.tags_form',
                'active_routes' => ['eventmie.tags_form'],
                'icon' => 'fas fa-user-tag',
                'title' => 'eventmie-pro::em.tags',
                'tooltip' => 'eventmie-pro::em.tags'
            ],
            [
                'route' => 'eventmie.myvenues.index',
                'active_routes' => ['eventmie.myvenues.index'],
                'icon' => 'fas fa-map-location',
                'title' => 'eventmie-pro::em.venues',
                'tooltip' => 'eventmie-pro::em.venues'
            ],
        ],

        'pos' => [
            [
                'route' => 'eventmie.pos.o_dashboard',
                'active_routes' => ['eventmie.pos.o_dashboard'],
                'icon' => 'fas fa-gauge',
                'title' => 'eventmie-pro::em.dashboard',
                'tooltip' => 'eventmie-pro::em.dashboard'
            ],
            [
                'route' => 'eventmie.pos.index',
                'active_routes' => ['eventmie.pos.index'],
                'icon' => 'fas fa-money-check-alt',
                'title' => 'eventmie-pro::em.bookings',
                'tooltip' => 'eventmie-pro::em.bookings'
            ],
            

        ],
        'scanner' => [
            [
                'route' => 'eventmie.scanner.o_dashboard',
                'active_routes' => ['eventmie.scanner.o_dashboard'],
                'icon' => 'fas fa-gauge',
                'title' => 'eventmie-pro::em.dashboard',
                'tooltip' => 'eventmie-pro::em.dashboard'
            ],
            [
                'route' => 'eventmie.scanner.index',
                'active_routes' => ['eventmie.scanner.index'],
                'icon' => 'fas fa-money-check-alt',
                'title' => 'eventmie-pro::em.bookings',
                'tooltip' => 'eventmie-pro::em.bookings'
            ],
           
        
        ],
    ];

    // Helper function to check if menu item is active
    function isMenuItemActive($activeRoutes) {
        return in_array(Route::currentRouteName(), $activeRoutes);
    }

    $role = Auth::user()->role->name;
@endphp
<div id="db-wrapper-two">
    <nav class="navbar-vertical-compact shadow-sm mt-9">
        <div data-simplebar style="" class="vh-100 mt-5 mx-2">
            <ul class="navbar-nav flex-column" id="sideNavbar">
                @if(isset($menuItems[$role]))
                    @foreach($menuItems[$role] as $item)
                    <li class="nav-item tooltip-custom">
                        <a class="nav-link d-flex justify-content-start align-self-center align-items-center gap-0 gap-lg-2 {{ isMenuItemActive($item['active_routes']) ? 'active' : '' }}"
                            href="{{ route($item['route']) }}"
                            title="@lang($item['title'])">
                            <span class="nav-icon"><i class="{{ $item['icon'] }}"></i></span>
                            <span class="fw-semibold d-none d-sm-block tool-h">@lang($item['title']) - t</span>
                            <span class="tooltiptext d-lg-none d-block">@lang($item['tooltip'])</span>
                        </a>
                    </li>
                    @endforeach
                @endif

                @if($role == 'organiser' || $role == 'admin' || $role == 'scanner')
                <li class="nav-item">
                    <div class="nav-divider nav-divider-scanner">
                        <span class="nav-divider-text">@lang('eventmie-pro::em.ticket_scanner')</span>
                    </div>
                </li>
                <li class="nav-item tooltip-custom">
                    <a class="nav-link d-flex justify-content-start align-self-center align-items-center gap-0 gap-lg-2 {{ isMenuItemActive(['eventmie.scan_ticket_camera']) ? 'active' : '' }}" 
                        href="{{ route('eventmie.scan_ticket_camera') }}" title="@lang('eventmie-pro::em.camera')">
                        <span class="nav-icon"><i class="fas fa-qrcode"></i></span>
                        <span class="fw-semibold d-none d-sm-block tool-h">@lang('eventmie-pro::em.camera')</span>
                        <span class="tooltiptext d-lg-none d-block">@lang('eventmie-pro::em.camera_ticket_scanner')</span>
                    </a>
                </li>
                <li class="nav-item tooltip-custom">
                    <a class="nav-link d-flex justify-content-start align-self-center align-items-center gap-0 gap-lg-2 {{ isMenuItemActive(['eventmie.scan_ticket_laser']) ? 'active' : '' }}" 
                        href="{{ route('eventmie.scan_ticket_laser') }}" title="@lang('eventmie-pro::em.laser')">
                        <span class="nav-icon"><i class="fas fa-barcode"></i></span>
                        <span class="fw-semibold d-none d-sm-block tool-h">@lang('eventmie-pro::em.laser')</span>
                        <span class="tooltiptext d-lg-none d-block">@lang('eventmie-pro::em.laser_ticket_scanner')</span>
                    </a>
                </li>
                @endif
            </ul>
        </div>
    </nav>
</div>