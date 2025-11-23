@extends('eventmie::layouts.app')

@section('title', 'Minhas Transações')

@section('content')
<div class="container mt-5">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-success text-white">
                    <h4 class="mb-0">
                        <i class="fas fa-credit-card"></i> Minhas Transações Mercado Pago
                    </h4>
                </div>
                <div class="card-body">
                    <!-- Vue Component for User Transactions -->
                    <user-mercadopago-transactions></user-mercadopago-transactions>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
