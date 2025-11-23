<!-- Packages CSS -->
@if (app()->environment('production'))
    @Vite('eventmie-pro/resources/sass/vendor.scss')
@else
    <link rel="stylesheet" href="{{ asset('build/assets/vendor-COXwJFx6.css') }}">
@endif

<!-- Bootstrap RTL CSS only if langauge is RTL -->
@if (is_rtl())
<link rel="stylesheet" href="{{ eventmie_asset('css/bootstrap-rtl.min.css') }}">
@endif

<!-- New Themese Theme CSS -->
@if (app()->environment('production'))
    @Vite('eventmie-pro/resources/sass/theme.scss')
@else
    <link rel="stylesheet" href="{{ asset('build/assets/theme-oIv5yIpx.css') }}">
@endif

<!-- Custom CSS -->
<link rel="stylesheet" href="{{ eventmie_asset('css/theme-custom.css') }}">
