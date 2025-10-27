@extends('eventmie::o_dashboard.index')
@php 
    $laser = Route::currentRouteName() == 'eventmie.scan_ticket_laser' ? true : false;
@endphp
{{-- Page title --}}
@section('title')
{{ $laser ? __('eventmie-pro::em.laser_ticket_scanner') : __('eventmie-pro::em.ticket_scanner') }}
@endsection
@section('o_dashboard')
<section>
    <div class="bg-light ticket-scan-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <!-- Professional Header -->
                    <div class="bg-white shadow-sm border-bottom py-3 px-4 mb-3">
                        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                            <!-- Left side - Brand and Title -->
                            <div class="d-flex align-items-center w-100 w-md-auto">
                                <a class="d-flex align-items-center text-decoration-none me-3 me-md-4" href="{{ route('eventmie.o_dashboard') }}">
                                    <img src="{{ getStorageImage(setting('site.logo')) }}" 
                                         class="me-2 me-md-3" 
                                         alt="{{ setting('site.site_name') }}" 
                                         style="height: 35px; width: auto; max-width: 80px;">
                                </a>
                                <div class="border-start ps-3 ps-md-4 flex-grow-1">
                                    <h5 class="fw-bold text-dark mb-1 fs-6">
                                        {{ $laser ? __('eventmie-pro::em.laser_ticket_scanner') : __('eventmie-pro::em.ticket_scanner') }}
                                    </h5>
                                    <p class="text-muted mb-0 small">
                                        <i class="fas fa-qrcode me-1"></i>
                                        {{ $laser ? __('eventmie-pro::em.laser_scanner_mode') : __('eventmie-pro::em.camera_scanner_mode') }}
                                    </p>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>

                    <!-- Scanner Component -->
                    <div>
                        <ticket-scanner
                            :is_laser="{{ json_encode($laser, JSON_HEX_APOS) }}"
                            ref="scan"
                        ></ticket-scanner>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
</section>



@endsection

@section('javascript')
@vite(['eventmie-pro/resources/js/ticket_scanner/index.js'])
@stop