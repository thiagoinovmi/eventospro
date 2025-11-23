@extends('eventmie::layouts.app')

@section('title', $event->title)
@section('meta_title', $event->meta_title)
@section('meta_keywords', $event->meta_keywords)
@section('meta_description', $event->meta_description)
@section('meta_image', getStorageImage($event['thumbnail']))
@section('meta_url', url()->current())


@section('content')

    <!--ABOUT-->
    <section>
        <div class="pb-lg-11 py-2 mt-7">
            <div class="container-fluid cover-img-bg" style="background-image: url({{ getStorageImage($event['thumbnail']) }});">
                <div class="row">
                    <div class="col-12 bg-dark-p3 z-3">
                        
                        <div class="row g-3">
                            <div class="col-lg-4 col-md-12 col-12 py-lg-5 pt-5 pb-2 text-lg-end text-center">
                                <div>
                                    <img src="{{ getStorageImage($event['thumbnail']) }}" alt="" class="img-fluid rounded-3">
                                </div>
                            </div>
                            <div class="col-lg-8 col-md-12 col-12 pb-8 py-lg-5 pb-lg-8 px-4 px-lg-2">
                                <div class="text-lg-start text-center text-white">
                                    <span class="badge rounded-1 bg-dark text-white mb-1"><i class="fas fa-tag"></i> {{ $category['name'] }}</span>
                                    <h1 class="mb-2 fw-bolder mb-2 fw-bolder mb-2 fw-bolder mb-2 fw-bolder lh-1">{{ $event['title'] }}</h1>

                                    <p>
                                        @if (!empty($event['online_location']))
                                           <i class="fas fa-circle-play"></i> <strong>@lang('eventmie-pro::em.online_event')</strong>
                                        @endif
        
                                        @if ($event->venues->isNotEmpty())
                                            <a class="text-white text-decoration-underline"
                                                href="{{ route('eventmie.venues.show', [$event->venues[0]->slug]) }}"><i class="fas fa-map-marker-alt"></i> <strong>{{ $event->venue }}
                                                    <i class="fas fa-external-link-alt"></i></strong> </a>
                                        @else
                                            <strong>{{ $event->venue }}</strong>
                                        @endif
        
                                        <br>
                                        @if ($event->address)
                                            {{ $event->address }} {{ $event->zipcode }}
                                        @endif
                                        
                                        @if ($event->zipcode)
                                            {{ $event->zipcode }}
                                        @endif
        
                                        @if ($event->city)
                                            {{ $event->city }},
                                        @endif
        
                                        @if ($event->state)
                                            {{ $event->state }},
                                        @endif
        
                                        @if ($country)
                                            {{ $country->get('country_name') }}
                                        @endif
                                    </p>

                                    @if (!$event->repetitive)
                                        <p class="h3 fw-bolder text-priamry">
                                            <i class="fa-regular fa-clock"></i>&nbsp;
                                            @if (userTimezone($event->start_date, 'Y-m-d', 'Y-m-d') == userTimezone($event->end_date, 'Y-m-d', 'Y-m-d'))
                                                {{ userTimezone($event->start_date . ' ' . $event->start_time, 'Y-m-d H:i:s', format_carbon_date(false)) }}
                                                {{ showTimezone() }}
                                            @else
                                                {{ userTimezone($event->start_date . ' ' . $event->start_time, 'Y-m-d H:i:s', format_carbon_date(false)) }}
                                                {{ showTimezone() }}
                                                -
                                                {{ userTimezone($event->end_date . ' ' . $event->end_time, 'Y-m-d H:i:s', format_carbon_date(false)) }}
                                                {{ showTimezone() }}
                                            @endif
                                        </p>
                                    @else
                                        <p class="h3 fw-bolder text-priamry">
                                            <i class="fa-regular fa-clock"></i>&nbsp;
                                            {{ userTimezone($event->start_date . ' ' . $event->start_time, 'Y-m-d H:i:s', format_carbon_date(true)) }}
        
                                            -
        
                                            {{ userTimezone($event->start_date . ' ' . $event->start_time, 'Y-m-d H:i:s', 'Y-m-d') <= userTimezone($event->end_date . ' ' . $event->end_time, 'Y-m-d H:i:s', 'Y-m-d') ? userTimezone($event->end_date . ' ' . $event->end_time, 'Y-m-d H:i:s', format_carbon_date(true)) : userTimezone($event->start_date . ' ' . $event->start_time, 'Y-m-d H:i:s', format_carbon_date(true)) }}
        
                                        </p>
                                    @endif

                                    <br>
                                    <h6>@lang('eventmie-pro::em.about')</h6>
                                    <p class="mb-2 fs-8 lh-sm p-0 m-0">{{ $event['excerpt'] }} <a class="small text-white text-decoration-underline text-lowercase" href="#overview-content">@lang('eventmie-pro::em.more')</a></p>
                                    
                                    <div class="position-absolute bottom-0 mb-3">
                                        <i class="fa fa-share me-1"></i>
                                        <strong class="me-1">@lang('eventmie-pro::em.share_event')</strong>
                                        <a class="me-1 text-white  badge text-bg-primary" target="_blank"
                                            href="https://www.facebook.com/sharer/sharer.php?u={{ url()->current() }}">
                                            <i class="fab fa-facebook"></i>
                                        </a>
                                        <a class="me-1 text-white  badge text-bg-primary" target="_blank"
                                            href="https://x.com/intent/tweet?text={{ urlencode($event->title) }}&url={{ url()->current() }}">
        
                                            <i class="fab fa-x"></i>
                                        </a>
                                        <a class="me-1 text-white  badge text-bg-primary" target="_blank"
                                            href="http://www.linkedin.com/shareArticle?mini=true&url={{ url()->current() }}&title={{ urlencode($event->title) }}">
                                            <i class="fab fa-linkedin"></i>
                                        </a>
                                        <a class="me-1 text-white  badge text-bg-primary" target="_blank"
                                            href="https://wa.me/?text={{ url()->current() }}">
                                            <i class="fab fa-whatsapp"></i>
                                        </a>
                                        <a class="me-1 text-white  badge text-bg-primary" target="_blank"
                                            href="https://www.reddit.com/submit?title={{ urlencode($event->title) }}&url={{ url()->current() }}">
                                            <i class="fab fa-reddit"></i>
                                        </a>
        
                                        <a class="me-1 text-white  badge text-bg-primary" href="javascript:void(0)"
                                            onclick="copyToClipboard()"><i class="fas fa-link"></i></a>
                                    </div>
                                </div>
        
                                <!-- widget --> 
                                <a class="btn btn-dark btn-lg scrollEvent border-1 border-white white-shadow-lg" href="#buy-tickets">
                                    <i class="fas fa-ticket"></i> @lang('eventmie-pro::em.get_tickets')
                                </a>
                                <!-- widget END --> 
                                
                            </div>    
                        </div>

                    </div>
                </div> 
            </div>

            <div class="container mt-5" >
                <div class="row g-3">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-12">

                        <!--SCHEDULE-->
                        <div class="card border-0 mb-4 bg-light" id="buy-tickets">
                            <div class="card-body p-4">
                                <div class="mb-4 text-left">
                                    @if ($event->merge_schedule)
                                        <h4 class="mb-0 fw-bold h4">
                                            @lang('eventmie-pro::em.get_tickets') &nbsp;
                                            <div class="badge bg-primary position-relative">
                                                @lang('eventmie-pro::em.seasonal_tickets')
                                                <span
                                                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                                    <i class="fas fa-medal"></i>
                                                    <span class="visually-hidden">&nbsp;</span>
                                                </span>
                                            </div>
                                        </h4>

                                        <p class="text-primary"> @lang('eventmie-pro::em.seasonal_tickets_ie')</p>
                                    @else
                                        <h4 class="mb-0 fw-bold h4">@lang('eventmie-pro::em.get_tickets')</h4>
                                    @endif
                                </div>
                                <div class="row">
                                    <div class="col-xl-12 col-md-12 col-12">
                                        <div class="row">
                                            <div class="col-12">
                                                <select-dates :event="{{ json_encode($event, JSON_HEX_APOS) }}"
                                                    :max_ticket_qty="{{ json_encode($max_ticket_qty, JSON_HEX_APOS) }}"
                                                    :login_user_id="{{ json_encode(\Auth::id(), JSON_HEX_APOS) }}"
                                                    :is_customer="{{ Auth::id() ? (Auth::user()->hasRole('customer') ? 1 : 0) : 1 }}"
                                                    :is_organiser="{{ Auth::id() ? (Auth::user()->hasRole('organiser') ? 1 : 0) : 0 }}"
                                                    :is_admin="{{ Auth::id() ? (Auth::user()->hasRole('admin') ? 1 : 0) : 0 }}"
                                                    :is_paypal="{{ $is_paypal }}"
                                                    :is_mercadopago="{{ $is_mercadopago }}"
                                                    :is_offline_payment_organizer="{{ setting('booking.offline_payment_organizer') ? 1 : 0 }}"
                                                    :is_offline_payment_customer="{{ setting('booking.offline_payment_customer') ? 1 : 0 }}"
                                                    :tickets="{{ json_encode($tickets, JSON_HEX_APOS) }}"
                                                    :booked_tickets="{{ json_encode($booked_tickets, JSON_HEX_APOS) }}"
                                                    :currency="{{ json_encode($currency, JSON_HEX_APOS) }}"
                                                    :total_capacity="{{ $total_capacity }}"
                                                    :date_format="{{ json_encode(
                                                        [
                                                            'vue_date_format' => format_js_date(),
                                                            'vue_time_format' => format_js_time(),
                                                        ],
                                                        JSON_HEX_APOS,
                                                    ) }}">

                                                </select-dates>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <!--SCHEDULE END-->


                        <div class="css-accordion text-black p-0">
                            <!-- post single -->
                            <div class="css-accordion-item">
                                <input type="checkbox" id="overview" checked>
                                <label class="css-accordion-label bg-light text-black" for="overview" tabindex="0" aria-controls="overview-content" aria-expanded="true">
                                    @lang('eventmie-pro::em.overview')
                                </label>
                                <div class="css-accordion-content quillWrapper bg-light text-black" id="overview-content">
                                    <p>{!! $event['description'] !!}</p>
                                </div>
                            </div>

                            <!-- post single -->

                           <!-- Event FAQ -->
                           @if ($event['faq'])
                                <div class="css-accordion-item">
                                    <input type="checkbox" id="faq">
                                    <label class="css-accordion-label bg-light text-black" for="faq">
                                        @lang('eventmie-pro::em.event_info')
                                    </label>
                                    <div class="css-accordion-content quillWrapper bg-light text-black">
                                        <p>{!! $event['faq'] !!}</p>
                                    </div>
                                </div>
                            @endif
                            <!--Event FAQ END-->


                            <!-- Tag Groups -->
                            @php $i = 0; @endphp
                            @foreach ($tag_groups as $key => $group)
                                @php $i++; @endphp
                                <div class="css-accordion-item">
                                    <input type="checkbox" id="taggroup{{ $i }}">
                                    <label class="css-accordion-label bg-light text-black" for="taggroup{{ $i }}">
                                        {{ ucfirst($key) }}
                                    </label>
                                    <div class="css-accordion-content bg-light text-black">
                                        <div class="row">
                                            @foreach ($group as $key1 => $value)
                                                <div class="col-lg-2 col-md-6 col-6 text-center">
                                                    <!-- member -->
                                                    @if ($value['is_page'] > 0)
                                                        <a
                                                            href="{{ route('eventmie.events_tags', [$event->slug, str_replace(' ', '-', $value['title'])]) }}">
                                                    @elseif($value['website'])
                                                        <a href="{{ $value['website'] }}" target="_blank">
                                                    @endif
                                                    <div class="mb-3">
                                                        @if ($value['image'])
                                                            <img src="{{ getStorageImage($value['image']) }}"
                                                                alt="{{ $value['title'] }}" class="rounded-3 w-100 mb-4 " />
                                                        @else
                                                            <img src="{{ asset('ep_img/512x512.webp') }}"
                                                                alt="{{ $value['title'] }}" class="rounded-3 w-100 mb-4 " />
                                                        @endif
                                                        <h5 class="mb-0">
                                                            @if ($value['is_page'] > 0)
                                                                <a
                                                                    href="{{ route('eventmie.events_tags', [$event->slug, str_replace(' ', '-', $value['title'])]) }}">{{ $value['title'] }}</a>
                                                            @elseif($value['website'])
                                                                <a href="{{ $value['website'] }}"
                                                                    target="_blank">{{ $value['title'] }}</a>
                                                            @else
                                                                {{ $value['title'] }}
                                                            @endif
                                                        </h5>
                                                        <p class="small font-weight-semibold mb-1">
                                                            @if ($value['sub_title'])
                                                                {{ $value['sub_title'] }}
                                                            @endif
                                                        </p>

                                                    </div>
                                                    @if ($value['is_page'] > 0 || $value['website'])
                                                        </a>
                                                    @endif
                                                </div>
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                            <!--Tags END-->

                             <!--Event Video-->
                            @if (!empty($event->video_link))
                                @php
                                    // Clean the URL to get only the video ID and convert it to embed URL
                                    parse_str(parse_url($event->video_link, PHP_URL_QUERY), $queryParams);
                                    $videoId = $queryParams['v'] ?? null;
                                    $embedUrl = $videoId ? 'https://www.youtube.com/embed/' . $videoId : $event->video_link;
                                @endphp

                                @if ($videoId)
                                    <div class="css-accordion-item">
                                        <input type="checkbox" id="video">
                                        <label class="css-accordion-label bg-light text-black" for="video">
                                            @lang('eventmie-pro::em.watch_trailer')
                                        </label>
                                        <div class="css-accordion-content bg-light text-black">
                                            <div class="ratio ratio-16x9">
                                                <iframe src="{{ $embedUrl }}" allowfullscreen class="rounded-4 img-hover"></iframe>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            @endif
                            <!--Event Video END-->

                            <!-- Google Map -->
                            @if ($event->latitude && $event->longitude)
                                <div class="css-accordion-item">
                                    <input type="checkbox" id="map">
                                    <label class="css-accordion-label bg-light text-black" for="map">
                                        @lang('eventmie-pro::em.location')
                                    </label>
                                    <div class="css-accordion-content bg-light text-black">
                                        <div class="col-md-12">
                                            <div class="innerpage-section g-map-wrapper">
                                                <div class="lgxmapcanvas map-canvas-default">
                                                    <g-component :lat="{{ json_encode($event->latitude, JSON_HEX_APOS) }}"
                                                        :lng="{{ json_encode($event->longitude, JSON_HEX_APOS) }}">
                                                    </g-component>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            @endif
                            <!--GOOGLE MAP END-->

                        </div>

                    </div>

                    <!-- comment-form -->
                </div>
            </div>
        </div>

    </section>
    
    @if (!empty($event->images))
    <div class="z-3">
        <gallery-images :gimages="{{ $event->images }}"></gallery-images>
    </div>
    @endif
@endsection

@section('javascript')
    <script type="text/javascript">
        var google_map_key = {!! json_encode($google_map_key) !!};
    </script>
    <script src="https://cdn.jsdelivr.net/npm/v-mask/dist/v-mask.min.js"></script>
    @vite(['eventmie-pro/resources/js/events_show/index.js'])
    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function () {
            // Select the scroll button
            var scrollEvent = document.querySelector(".scrollEvent");
            var buyTickets = document.getElementById("overview-content");

            // Debugging to ensure elements are found
            console.log(scrollEvent, "scrollEvent");
            console.log(buyTickets, "overview-content");

            if (!scrollEvent || !buyTickets) {
                console.error("Required elements not found");
                return;
            }

            function handleScroll() {
                // Get the position of the overview-content section relative to the viewport
                var rect = buyTickets.getBoundingClientRect();
                // Show the button if the top of overview-content is above the top of the viewport (scrolled past)
                if (rect.top <= 0) {
                    scrollEvent.classList.add("showBtn");
                } else {
                    scrollEvent.classList.remove("showBtn");
                }
            }

            function scrollToTop() {
                // Scroll to top smoothly
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

            // Attach event listeners
            scrollEvent.addEventListener("click", scrollToTop);
            window.addEventListener("scroll", handleScroll);
            // Initial check in case already scrolled
            handleScroll();
        });
    </script>
@stop
