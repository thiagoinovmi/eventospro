<!doctype html>
<html class="no-js" lang="{{ str_replace('_', '-', app()->getLocale()) }}" {!! is_rtl() ? 'dir="rtl"' : '' !!}>

<head>

    @include('eventmie::layouts.meta')

    @include('eventmie::layouts.favicon')

    @include('eventmie::layouts.include_css')
    
    {!! CookieConsent::styles() !!}

    @yield('stylesheet')

    {{-- Script de debug para rastrear erros de Vue --}}
    <script src="{{ asset('js/debug-components.js') }}"></script>
</head>

<body class="home @if(str_contains(request()->url(), 'dashboard')) dashboard-body-bg @else bg-white @endif" {!! is_rtl() ? 'dir="rtl"' : '' !!}>

    <!--[if lt IE 8]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
        your browser</a> to improve your experience.</p>
    <![endif]-->

    {{-- Ziggy directive --}}
    @routes

    {{-- Main wrapper --}}
    <div id="eventmie_app">
        @if(!in_array(Route::currentRouteName(), ['eventmie.scan_ticket_camera', 'eventmie.scan_ticket_laser']))
            @include('eventmie::layouts.header')
        @endif

        @php
            $no_breadcrumb = [
                'eventmie.welcome',
                'eventmie.events_index',
                'eventmie.events_show',
                'eventmie.login',
                'eventmie.register',
                'eventmie.register_show',
                'eventmie.password.request',
                'eventmie.password.reset',
                'eventmie.o_dashboard',
                'eventmie.myevents_index',
                'eventmie.myevents_index',
                'eventmie.myevents_form',
                'eventmie.obookings_index',
                'eventmie.event_earning_index',
                'eventmie.tags_form',
                'eventmie.myvenues.index',
                'eventmie.venues.index',
                'eventmie.venues.show',
                'eventmie.scan_ticket_camera',
                'eventmie.scan_ticket_laser',
                'eventmie.pos.o_dashboard',
                'eventmie.pos.index',
                'eventmie.pos.bookings',
                'eventmie.scanner.o_dashboard',
                'eventmie.scanner.index',
                'eventmie.profile',
            ];
        @endphp
        @if (!in_array(Route::currentRouteName(), $no_breadcrumb))
            @include('eventmie::layouts.breadcrumb')
        @endif

        <section class="db-wrapper">

            {{-- page content --}}
            @yield('content')

            {{-- set progress bar --}}
            <vue-progress-bar></vue-progress-bar>
        </section>

        @if(!in_array(Route::currentRouteName(), ['eventmie.scan_ticket_camera', 'eventmie.scan_ticket_laser']) && !str_contains(request()->url(), 'dashboard'))
            @include('eventmie::layouts.footer')
        @endif

    </div>
    <!--Main wrapper end-->

    @include('eventmie::layouts.include_js')

    {!! CookieConsent::scripts() !!}

    {{-- Script para modal de termos (carregado inline, não processado pelo Vite) --}}
    @if(Route::currentRouteName() === 'eventmie.register_show')
        <script src="{{ asset('js/terms-modal.js') }}"></script>
    @endif

    {{-- Page specific javascript --}}
    @yield('javascript')
    @stack('scriptsDashboard')

</body>

</html>
