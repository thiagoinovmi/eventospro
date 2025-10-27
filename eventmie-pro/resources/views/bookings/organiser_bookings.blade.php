@extends('eventmie::o_dashboard.index')

@section('title')
    @lang('eventmie-pro::em.mybookings')
@endsection

@section('o_dashboard')
<div class="container-fluid my-2">
    <div class="row">
        <div class="col-md-12">
            <router-view :role="{{ json_encode(Auth::user()->role, JSON_HEX_APOS) }}"  :is_success="{{ json_encode($is_success, JSON_HEX_APOS) }}"></router-view>
        </div>
    </div>
</div>
@endsection

@section('javascript')
<script>
    var path = {!! json_encode($path, JSON_HEX_TAG) !!};
    var hide_ticket_download = {!! json_encode(setting('booking.hide_ticket_download'), JSON_HEX_TAG) !!};
    var hide_google_calendar = {!! json_encode(setting('booking.hide_google_calendar'), JSON_HEX_TAG) !!};

</script>

@vite(['eventmie-pro/resources/js/bookings_organiser/index.js'])

@stop
