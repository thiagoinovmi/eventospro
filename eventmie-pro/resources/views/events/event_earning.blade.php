@extends('eventmie::o_dashboard.index')

@section('title')
    @lang('eventmie-pro::em.myearning')
@endsection

@section('o_dashboard')
<div class="container-fluid my-2">
    <div class="row">
        <div class="col-md-12">
            <router-view></router-view>
        </div>
    </div>
</div>
@endsection

@section('javascript')
<script>
    var path = {!! json_encode($path, JSON_HEX_TAG) !!};
</script>
@vite(['eventmie-pro/resources/js/event_earning/index.js'])
@stop
