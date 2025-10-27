@extends('eventmie::layouts.app')
@section('content')
@php $scan_page = in_array(Route::currentRouteName(), ['eventmie.scan_ticket_camera', 'eventmie.scan_ticket_laser']); @endphp
    @if(!$scan_page)
        @include('eventmie::o_dashboard.sidebar')
    @endif
    <div id="db-wrapper">
        <div class="bg-light" id="page-content-for-mini" @if($scan_page) style="margin-left: 0px !important;" @endif>
            @if(!$scan_page)
                <div class="mt-8">
                    <button type="button" id="nav-toggle" class="btn btn-sm bg-secondary position-absolute rounded-0" onclick="clickToggle()">
                        <i class="fas fa-bars text-white"></i>
                    </button>
                </div>
                <section class="mt-14">
                    @yield('o_dashboard')
                </section>
            @else
                @yield('o_dashboard')
            @endif
        </div>
    </div>

    @if(str_contains(request()->url(), 'dashboard'))
        <footer class="dashboard-footer text-center py-3">
            <div class="footer-links mb-1">
                <a class="footer-link mx-2" href="{{ route('eventmie.page', ['page' => 'about']) }}">@lang('eventmie-pro::em.about')</a>
                <a class="footer-link mx-2" href="{{ route('eventmie.page', ['page' => 'terms']) }}">@lang('eventmie-pro::em.terms')</a>
                <a class="footer-link mx-2" href="{{ route('eventmie.page', ['page' => 'privacy']) }}">@lang('eventmie-pro::em.privacy')</a>
                <a class="footer-link mx-2" href="{{ route('eventmie.contact') }}">@lang('eventmie-pro::em.contact_send_message')</a>
            </div>
            <div class="footer-brand small text-gray-500">
                &copy; {{ date('Y') }} <a class="footer-link fw-bold" href="{{ eventmie_url() }}">{{ setting('site.site_name') ?? config('app.name') }}</a>
                <span class="mx-1">|</span>
                @if (!empty(setting('site.site_footer'))) {!! setting('site.site_footer') !!}@endif
            </div>
        </footer>
    @endif
@endsection


@push('scriptsDashboard')
    <script>
        var arabic = {!! json_encode(App::isLocale('ar') ? true : false) !!};
        if (arabic) {
            document.getElementById('page-content-for-mini').style.cssText = "margin-left:0px; margin-right:75px";

        }
    </script>
@endpush
