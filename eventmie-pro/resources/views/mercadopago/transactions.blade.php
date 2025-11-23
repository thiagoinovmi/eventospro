@extends('eventmie-pro::layouts.app')

@section('content')
<div class="container mt-5 mb-5">
    <div class="row">
        <!-- Sidebar Navigation -->
        <div class="col-md-3 mb-4">
            <div class="list-group sticky-top" style="top: 20px;">
                <a href="{{ route('eventmie.profile') }}" class="list-group-item list-group-item-action">
                    <i class="fas fa-user"></i> {{ trans('em.profile') }}
                </a>
                <a href="{{ route('eventmie.mybookings_index') }}" class="list-group-item list-group-item-action">
                    <i class="fas fa-ticket-alt"></i> {{ trans('em.my_bookings') }}
                </a>
                <a href="{{ route('eventmie.mercadopago_transactions') }}" class="list-group-item list-group-item-action active">
                    <i class="fas fa-credit-card"></i> {{ trans('em.mercadopago_transactions') }}
                </a>
                <a href="{{ route('eventmie.mybookings_index') }}" class="list-group-item list-group-item-action">
                    <i class="fas fa-sign-out-alt"></i> {{ trans('em.logout') }}
                </a>
            </div>
        </div>

        <!-- Main Content -->
        <div class="col-md-9">
            <div class="card shadow-lg">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0">
                        <i class="fas fa-credit-card"></i> {{ trans('em.mercadopago_transactions') }}
                    </h4>
                </div>
                <div class="card-body">
                    <!-- Component -->
                    <mercadopago-transactions :user-id="{{ Auth::id() }}"></mercadopago-transactions>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
    // Component will be registered globally in the app
</script>
@endsection
