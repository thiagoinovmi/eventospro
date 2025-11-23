@extends('eventmie::layouts.app')

@section('title', 'Configurações Mercado Pago')

@section('content')
<div class="container mt-5">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0">
                        <i class="fas fa-cog"></i> Configurações Mercado Pago
                    </h4>
                </div>
                <div class="card-body">
                    <!-- Vue Component for Admin Settings -->
                    <admin-mercadopago-settings></admin-mercadopago-settings>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    // Mercado Pago SDK
    document.addEventListener('DOMContentLoaded', function() {
        const publicKey = '{{ config("mercadopago.public_key") }}';
        if (publicKey) {
            const script = document.createElement('script');
            script.src = 'https://sdk.mercadopago.com/js/v2';
            script.async = true;
            document.head.appendChild(script);
        }
    });
</script>
@endpush
