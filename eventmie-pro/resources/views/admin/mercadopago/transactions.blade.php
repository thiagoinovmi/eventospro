@extends('voyager::master')

@section('page_title', trans('em.mercadopago_transactions'))

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-bordered">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <i class="voyager-credit"></i> {{ trans('em.mercadopago_transactions') }}
                    </h3>
                </div>
                <div class="panel-body">
                    <div id="app">
                        <mercadopago-admin-transactions></mercadopago-admin-transactions>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('javascript')
<script>
    // Component will be registered globally
</script>
@endsection
