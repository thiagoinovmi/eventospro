@extends('eventmie::o_dashboard.index')

@section('title')
    @lang('eventmie-pro::em.dashboard')
@endsection

@section('o_dashboard')
    <div class="container-fluid my-2">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-12">
                <div class="mb-3 d-md-flex justify-content-between align-items-center">
                    <div class="mb-3 mb-md-0">
                        <h3 class="mb-0 fw-bold lh-1 text-dark">@lang('eventmie-pro::em.hello') {{ Auth::user()->name }}</h3>
                        <p class="mb-0 lh-sm">@lang('eventmie-pro::em.organizer_dashboard_activity')</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Stats Grid -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon fa-calendar-alt">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">{{ $total_events }}</div>
                    <div class="stat-currency text-uppercase">@lang('eventmie-pro::em.total')</div>
                    <div class="stat-label">@lang('eventmie-pro::em.events')</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon fa-wallet">
                    <i class="fas fa-wallet"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">{{ $total_earning }}</div>
                    <div class="stat-currency text-uppercase">@lang('eventmie-pro::em.total')</div>
                    <div class="stat-label">@lang('eventmie-pro::em.earning')</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon fa-ticket-alt">
                    <i class="fas fa-ticket-alt"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">{{ $total_bookings }}</div>
                    <div class="stat-currency text-uppercase">@lang('eventmie-pro::em.total')</div>
                    <div class="stat-label">@lang('eventmie-pro::em.bookings')</div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12 col-md-12 col-12">
                <!-- Card -->
                <div class="card mb-3 border-0 shadow-sm dashboard-chart-card">
                    <!-- Card body -->
                    <div class="card-body rounded-3 p-4">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <h4 class="card-title mb-0 fw-bold text-dark">{{ __('voyager::generic.Top 10 Selling Events') }}</h4>
                            <div class="chart-icon-wrapper">
                                <i class="fas fa-chart-line"></i>
                            </div>
                        </div>
                        <!-- Earning chart -->
                        <div id="earning" class="apex-charts">
                            {!! $eventsChart->container() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('javascript')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
    {!! $eventsChart->script() !!}
@stop
