@extends('eventmie::layouts.app')

@section('title') @lang('eventmie-pro::em.home') @endsection

@section('content')
    @php
        $perPage = 3;
    @endphp
    <!--Banner slider start-->
    <section class="bg-dark mt-8">
        <div class="col-sm-12">
            @component('eventmie::skeleton.banner') @endcomponent
            
            <banner-slider 
                :banners="{{ json_encode($banners, JSON_HEX_APOS) }}" 
                :demo_mode="{{ config('voyager.demo_mode') }}"
                :check_session="{{ json_encode(session('verify'), JSON_HEX_TAG) }}"
                :s_host="{{ json_encode($_SERVER['REMOTE_ADDR'], JSON_HEX_TAG) }}"
            ></banner-slider>
            
        </div>
    </section>
    <!--Banner slider end-->

    <!-- New Themes Event Featured Start -->
    @if ($featured_events->isNotEmpty())
        <div class="py-3">
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <h5>@lang('eventmie-pro::em.featured_events')</h5>
                    </div>
                    <div class="col-4">
                        <a class="btn btn-sm text-primary mt-lg-2 {{ App::isLocale('ar') ? 'float-start' : 'float-end' }}"
                            href="{{ route('eventmie.events_index') }}">@lang('eventmie-pro::em.view_all') <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>

                @component('eventmie::skeleton.event') @endcomponent

                <event-listing :events="{{ json_encode($featured_events, JSON_HEX_APOS) }}"
                    :currency="{{ json_encode($currency, JSON_HEX_APOS) }}" :item_count="{{ 4 }}"
                    :date_format="{{ json_encode(
                        [
                            'vue_date_format' => format_js_date(),
                            'vue_time_format' => format_js_time(),
                        ],
                        JSON_HEX_APOS,
                    ) }}">
                </event-listing>

            </div>
        </div>
    @endif
    <!-- New Themes Event Featured End -->

    <!-- New Themes Top-selling Start-->
    @if ($top_selling_events->isNotEmpty())
        <div class="py-3">
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <h5>@lang('eventmie-pro::em.top_selling_events')</h5>
                    </div>
                    <div class="col-4">
                        <a class="btn btn-sm text-primary mt-lg-2 {{ App::isLocale('ar') ? 'float-start' : 'float-end' }}"
                            href="{{ route('eventmie.events_index') }}">@lang('eventmie-pro::em.view_all') <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>

                @component('eventmie::skeleton.event') @endcomponent

                <event-listing :events="{{ json_encode($top_selling_events, JSON_HEX_APOS) }}"
                    :currency="{{ json_encode($currency, JSON_HEX_APOS) }}" :item_count="{{ 4 }}"
                    :date_format="{{ json_encode(
                        [
                            'vue_date_format' => format_js_date(),
                            'vue_time_format' => format_js_time(),
                        ],
                        JSON_HEX_APOS,
                    ) }}">
                </event-listing>

            </div>

        </div>
    @endif
    <!-- New Themes Top-selling END -->

    <!-- New Themes Event Upcoming Start-->
    @if ($upcomming_events->isNotEmpty())
        <div class="py-3">
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <h5>@lang('eventmie-pro::em.upcoming_events')</h5>
                    </div>
                    <div class="col-4">
                        <a class="btn btn-sm text-primary mt-lg-2 {{ App::isLocale('ar') ? 'float-start' : 'float-end' }}"
                            href="{{ route('eventmie.events_index') }}">@lang('eventmie-pro::em.view_all') <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>

                @component('eventmie::skeleton.event') @endcomponent

                <event-listing :events="{{ json_encode($upcomming_events, JSON_HEX_APOS) }}"
                    :currency="{{ json_encode($currency, JSON_HEX_APOS) }}" :item_count="{{ 4 }}"
                    :date_format="{{ json_encode(
                        [
                            'vue_date_format' => format_js_date(),
                            'vue_time_format' => format_js_time(),
                        ],
                        JSON_HEX_APOS,
                    ) }}">
                </event-listing>
            </div>
        </div>
    @endif
    <!-- New Themes Event Upcoming END -->

     <!-- New Themes topVenues START-->
    @if ($topVenues->isNotEmpty())
    <div class="venue-section py-5 bg-black">
        <div class="container">

            <!-- Section Title -->
            <div class="row">
                <div class="col-8">
                    <h5 class="text-light">@lang('eventmie-pro::em.cities_events')</h5>
                </div>
                <div class="col-4">
                    <a class="btn btn-sm fw-bold text-light mt-lg-2 {{ App::isLocale('ar') ? 'float-start' : 'float-end' }}"
                        href="{{ route('eventmie.venues.index') }}">@lang('eventmie-pro::em.view_all') <i
                            class="fas fa-arrow-right"></i></a>
                </div>
            </div>

            <!-- Venue Cards Grid -->
            <div class="row g-4">
                @foreach ($topVenues as $item)
                    @php
                        $bgimg = '/images/placeholder.jpg';
                        if (!empty(json_decode($item->images, true))) {
                            $bgimg = '/storage/' . json_decode($item->images, true)[0];
                        }
                    @endphp

                    <div class="col-6 col-md-4 col-xl-3">
                        <a href="{{ route('eventmie.venues.show', [$item->slug]) }}">
                            <div class="venue-card rounded-4 overflow-hidden position-relative shadow-sm"
                                style="background-image: url('{{ $bgimg }}'); background-size: cover; background-position: center; height: 250px;">

                                <!-- Dark Overlay -->
                                <div class="position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-50 z-1">
                                </div>

                                <!-- Content -->
                                <div
                                    class="position-relative z-2 text-white h-100 d-flex flex-column justify-content-end p-3">
                                    <h5 class="fw-bold mb-1">{{ $item->title }}</h5>
                                    <p class="mb-0 small text-light">{{ $item->city }} • {{ $item->events_count }}
                                        @lang('eventmie-pro::em.events')</p>
                                </div>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>

        </div>
    </div>

@endif
<!-- New Themes topVenues END -->

    <!-- New Themes Categories START-->
    @if (!empty($categories))
        <div class="pt-5 pb-7 bg-gradient-primary position-relative overflow-hidden">
            <div class="container position-relative">
                <div class="row mb-3">
                    <div class="col-lg-8 col-md-10 col-12">
                        <h5 class="text-white fw-bold mb-0">@lang('eventmie-pro::em.event_categories')</h5>
                        <p class="text-white-50  mb-0 small fw-bold">@lang('eventmie-pro::em.explore_categories')</p>
                    </div>
                </div>
                
                <div class="row g-4">
                    @foreach ($categories as $key => $item)
                        <div class="col-6 col-md-4 col-xl-3">
                            <a href="{{ route('eventmie.events_index', ['category' => urlencode($item['name'])]) }}">
                                <div class="category-card position-relative rounded-4 overflow-hidden shadow-lg h-100 transform-hover">
                                    @php $bgimg = asset('/storage/'.$item['thumb']); @endphp
                                    <div class="category-background position-absolute top-0 start-0 w-100 h-100" 
                                        style="background-image: url({{ $bgimg }}); background-size: cover; background-position: center;">
                                    </div>
                                    
                                    <!-- Category Icon Overlay -->
                                    <div class="position-absolute top-0 end-0 p-3">
                                        <div class="event-count-badge d-flex align-items-center justify-content-center rounded-circle shadow-sm" 
                                            style="width: 60px; height: 60px; background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15)); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.3);">
                                            <div class="text-center">
                                                <div class="text-white fw-bold fs-6" style="line-height: 1; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                                                    {{ $item['events_count'] }}
                                                </div>
                                                <div class="text-white-50" style="font-size: 0.65rem; line-height: 1; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                                                    @lang('eventmie-pro::em.events')
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Category Content -->
                                    <div class="category-content position-relative d-flex flex-column justify-content-end h-100 p-4">
                                        <div class="category-info">
                                            <h3 class="text-white fw-bold mb-2 fs-4">{{ $item['name'] }}</h3>
                                            
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    @endif
    <!-- New Themes Categories END-->

    <!-- New Themes Blogs Start-->
    @if (!empty($posts))
        <div class="py-3 bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <h5>@lang('eventmie-pro::em.blogs')</h5>
                    </div>
                    <div class="col-4">
                        <a class="btn btn-sm text-primary mt-lg-2 {{ App::isLocale('ar') ? 'float-start' : 'float-end' }}"
                            href="{{ route('eventmie.get_posts') }}">@lang('eventmie-pro::em.view_all') <i
                                class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div class="row">
                    @foreach ($posts as $item)
                        <div class="col-lg-4 col-md-6 col-12">
                            <a class="text-reset"href="{{ route('eventmie.post_view', $item['slug']) }}">
                                <div class="card smooth-shadow-sm border-0 mb-4 mb-lg-0">
                                    <div class="card-img">
                                        <div class="back-image rounded-top" style="background-image:url('{{ getStorageImage($item['image']) }}')"></div>
                                    </div>
                                    <div class="card-body ">
                                        <h5 class="mb-0">{{ Str::limit($item['title'], 35) }}</h5>
                                        <p class="text-ms font-weight-semi-bold mb-2">
                                            {{ Str::limit($item['excerpt'], 50) }}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    @endif
    <!-- New Themes Blogs End-->

    <!-- How it works-->
    <div class="home-main-how-it-work bg-white py-5">
        <div class="container">
            <!-- Section title -->
            <h2 class="mb-2">
                <span class="font-weight-light">@lang('eventmie-pro::em.how_it_works')</span>
            </h2>

            <!-- CSS-only tabs -->
            <div class="howit-tabs mb-3">
                <!-- Tab controls -->
                <input type="radio" name="howit" id="tab-organiser" checked>
                <label for="tab-organiser" class="tab-label">
                    @lang('eventmie-pro::em.for_event_organisers')
                </label>

                <input type="radio" name="howit" id="tab-customer">
                <label for="tab-customer" class="tab-label">
                    @lang('eventmie-pro::em.for_customers')
                </label>

                <!-- Tab panels -->
                <div class="tab-content">
                    <!-- Organiser flow -->
                    <div class="tab-panel organiser mt-4">
                        <div class="row">
                            <div class="col-md-4 mb-5">
                                <div class="step position-relative ps-5">
                                    <div class="step-icon mb-3">
                                        <i class="fas fa-calendar-plus"></i>
                                    </div>
                                    <h5 class="fw-semibold mb-2">
                                        @lang('eventmie-pro::em.organiser_1')
                                    </h5>
                                    <p class="text-muted">
                                        @lang('eventmie-pro::em.organiser_1_info')
                                    </p>
                                    <span class="step-number">1</span>
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <div class="step position-relative ps-5">
                                    <div class="step-icon mb-3">
                                        <i class="fas fa-calendar-check"></i>
                                    </div>
                                    <h5 class="fw-semibold mb-2">
                                        @lang('eventmie-pro::em.organiser_2')
                                    </h5>
                                    <p class="text-muted">
                                        @lang('eventmie-pro::em.organiser_2_info')
                                    </p>
                                    <span class="step-number">2</span>
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <div class="step position-relative ps-5">
                                    <div class="step-icon mb-3">
                                        <i class="fas fa-money-check-alt"></i>
                                    </div>
                                    <h5 class="fw-semibold mb-2">
                                        @lang('eventmie-pro::em.organiser_3')
                                    </h5>
                                    <p class="text-muted">
                                        @lang('eventmie-pro::em.organiser_3_info')
                                    </p>
                                    <span class="step-number">3</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Customer flow -->
                    <div class="tab-panel customer mt-4">
                        <div class="row">
                            <div class="col-md-4 mb-5">
                                <div class="step position-relative ps-5">
                                    <div class="step-icon mb-3">
                                        <i class="fas fa-calendar-alt"></i>
                                    </div>
                                    <h5 class="fw-semibold mb-2">
                                        @lang('eventmie-pro::em.customer_1')
                                    </h5>
                                    <p class="text-muted">
                                        @lang('eventmie-pro::em.customer_1_info')
                                    </p>
                                    <span class="step-number">1</span>
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <div class="step position-relative ps-5">
                                    <div class="step-icon mb-3">
                                        <i class="fas fa-ticket"></i>
                                    </div>
                                    <h5 class="fw-semibold mb-2">
                                        @lang('eventmie-pro::em.customer_2')
                                    </h5>
                                    <p class="text-muted">
                                        @lang('eventmie-pro::em.customer_2_info')
                                    </p>
                                    <span class="step-number">2</span>
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <div class="step position-relative ps-5">
                                    <div class="step-icon mb-3">
                                        <i class="fas fa-walking"></i>
                                    </div>
                                    <h5 class="fw-semibold mb-2">
                                        @lang('eventmie-pro::em.customer_3')
                                    </h5>
                                    <p class="text-muted">
                                        @lang('eventmie-pro::em.customer_3_info')
                                    </p>
                                    <span class="step-number">3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- /.tab-content -->
            </div><!-- /.howit-tabs -->


        </div>
    </div>

@endsection

@section('javascript')
    <script type="text/javascript">
        var google_map_key = {!! json_encode(setting('apps.google_map_key')) !!};
        var events_slider = true;
    </script>
    
    @vite(['eventmie-pro/resources/js/welcome/index.js'])
@stop
