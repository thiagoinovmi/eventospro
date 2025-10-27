@extends('eventmie::layouts.app')

{{-- Page title --}}
@section('title')
    @lang('eventmie-pro::em.venues')
@endsection

@section('content')

    <main>
        <section class="bg-light mt-6">
            <router-view
                :date_format="{{ json_encode(
                    [
                        'vue_date_format' => format_js_date(),
                        'vue_time_format' => format_js_time(),
                    ],
                    JSON_HEX_APOS,
                ) }}">
            </router-view>
        </section>

    </main>
@endsection

@section('javascript')

    <script>
        var path = {!! json_encode($path, JSON_HEX_TAG) !!};
    </script>
        @vite(['eventmie-pro/resources/js/venues_listing/index.js'])

@stop
