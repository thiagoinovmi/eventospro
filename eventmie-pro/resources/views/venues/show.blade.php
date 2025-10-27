@extends('eventmie::layouts.app')

@section('title', $venue->title)
@section('meta_title', $venue->title)
@section('meta_description', $venue->short_desc)
@section('meta_url', url()->current())

@php $venue_images = json_decode($venue->images); @endphp
@if (!empty($venue_images))
    @section('meta_image', url(getStorageImage($venue_images[0])))
@endif

@section('content')
<section>
    @if(!empty(json_decode($venue->images, true)))
    <div class="container-fluid p-0">
        <div class="cover-img-bg" style="background-image: url({{ getStorageImage(json_decode($venue->images, true)[0]) }});">
            <img class="cover-img" src="{{ getStorageImage(json_decode($venue->images, true)[0]) }}" alt="{{ $venue->title }}" />
        </div>
    </div>
    @endif

    <div class="container mt-4">
        <div class="row mb-5">
            <div class="col-12">
                <div class="card mb-4">
                    
                    <div class="card-body p-4 quillWrapper">
                        <h2 class="mb-2">{{ $venue->title }}</h2>
                        @if($venue->address || $venue->city || $venue->state || !empty($venue->country['country_name']))
                        <p class="mb-4 fw-bold">
                            @if($venue->address) {{ $venue->address }} @endif
                            @if($venue->city) {{ ', '.$venue->city }} @endif
                            @if($venue->state) {{ ', '.$venue->state }} @endif
                            @if($venue->zipcode) {{ ', '.$venue->zipcode }} @endif
                            @if(!empty($venue->country['country_name'])) {{ ', '.$venue->country['country_name'] }} @endif
                        </p>
                        @endif

                        <div class="mb-4">{!! $venue->description !!}</div>
                    </div>
                </div>
                
                <!-- Gallery Section -->
                @if(!empty(json_decode($venue->images, true)))
                <div class="card my-5" id="gallery">
                    <div class="card-body p-4">
                        <h4 class="mb-4">@lang('eventmie-pro::em.gallery')</h4>
                        <div class="row g-4">
                            @foreach(json_decode($venue->images, true) as $val)
                            <div class="col-lg-4 col-md-6 col-sm-6">
                                <div class="position-relative overflow-hidden rounded shadow-sm" style="aspect-ratio: 4/3;">
                                    <a href="{{ getStorageImage($val) }}" class="d-block h-100">
                                        <img src="{{ getStorageImage($val) }}" 
                                             class="w-100 h-100 object-fit-cover venue-image-popup-trigger" 
                                             alt="{{ $venue->title }}" 
                                             loading="lazy"
                                             style="transition: transform 0.3s ease;"
                                             data-img="{{ getStorageImage($val) }}" />
                                    </a>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                @endif
                <div id="venue-image-modal" class="venue-image-modal" style="display:none;">
                  <span class="venue-image-modal-close" id="venue-image-modal-close">&times;</span>
                  <img class="venue-image-modal-content" id="venue-image-modal-img" />
                </div>
                
                <div class="card mb-4">
                    <div class="card-body p-4">
                        <h4 class="mb-1">@lang('eventmie-pro::em.location')</h4>
                        <div id="venue_map" class="listing-map" style="width:100%;height:500px"></div>
                    </div>
                </div>


            </div>
            
        </div>
    </div>
</section>
@endsection

@section('javascript')
<script src="https://maps.googleapis.com/maps/api/js?key={{ setting('apps.google_map_key') }}&callback=initMap&v=weekly" defer></script>
<script>
function initMap() {
    const myLatLng = { 
        lat: {{ $venue->glat }}, 
        lng: {{ $venue->glong }}
    };
    const map = new google.maps.Map(document.getElementById("venue_map"), {
        zoom: 15,
        center: myLatLng,
    });

    new google.maps.Marker({
        position: myLatLng,
        map,
        title: {!! setting('site.site_name') ? json_encode(setting('site.site_name')) : json_encode(config('app.name')) !!},
    });
}
window.initMap = initMap;
</script>
<script>
    function setupVenueImageModal() {
    var modal = document.getElementById('venue-image-modal');
    var modalImg = document.getElementById('venue-image-modal-img');
    var closeBtn = document.getElementById('venue-image-modal-close');
    if (!modal || !modalImg || !closeBtn) return;
    
    document.querySelectorAll('.venue-image-popup-trigger').forEach(function(img) {
        img.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
        modalImg.src = this.getAttribute('data-img');
        document.body.style.overflow = 'hidden';
        });
    });
    
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        }
    };
    }
    if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupVenueImageModal);
    } else {
    setupVenueImageModal();
    }
</script>
@endsection