@extends('eventmie::layouts.app')

@section('title')
    @lang('eventmie-pro::em.mybookings')
@endsection

@section('content')
<main>
    <section class="bg-light">
        <router-view :is_success="{{ json_encode($is_success, JSON_HEX_APOS) }}"></router-view>
    </section>
</main>
@endsection


@section('javascript')
<script>
    var path = {!! json_encode($path, JSON_HEX_TAG) !!};
    var disable_booking_cancellation = {!! json_encode(setting('booking.disable_booking_cancellation'), JSON_HEX_TAG) !!};
    var hide_ticket_download = {!! json_encode(setting('booking.hide_ticket_download'), JSON_HEX_TAG) !!};
    var hide_google_calendar = {!! json_encode(setting('booking.hide_google_calendar'), JSON_HEX_TAG) !!};
    
    // 👤 Dados do usuário para o frontend (necessário para MercadoPagoCheckout)
    @auth
    window.currentUser = {!! json_encode(auth()->user()) !!};
    console.log('✅ Dados do usuário carregados via Blade:', window.currentUser);
    @else
    window.currentUser = null;
    console.log('⚠️ Usuário não logado');
    @endauth
</script>
@vite(['eventmie-pro/resources/js/bookings_customer/index.js'])

@stop
