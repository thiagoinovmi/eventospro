<div id="navbar_vue" class="nav-header nav-header-classic menu-space header-position header-white">
    <div class="{{ \Str::contains(url()->current(), 'dashboard') ? 'dashboard-container' : 'container' }}">
        <div class="row">
            <div class="col-md-12">
                <!-- Vue Alert message -->
                @if ($errors->any())
                    <alert-message :errors="{{ json_encode($errors->all(), JSON_HEX_APOS) }}"></alert-message>
                @endif

                @if (session('status'))
                    <alert-message :message="'{{ session('status') }}'"></alert-message>
                @endif
                <!-- Vue Alert message -->

                <nav class="navbar navbar-expand-lg py-1">
                    <a class="navbar-brand d-flex align-items-center gap-2" href="{{ url('') }}">
                        <img src="{{ getStorageImage(setting('site.logo')) }}" 
                        class="mx-auto d-blocks {{ App::isLocale('ar') ? 'float-end' : 'float-start' }}"
                            alt="{{ setting('site.site_name') }}" 
                            style="height: 40px; width: auto;">
                        <span class="fw-bold fs-6 text-white">{{ setting('site.site_name') }}</span>
                    </a>

                    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation" id='navbartoggler'>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>


                    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-lg-3">
                            <!-- Authentication Links -->
                            @guest
                                @include('eventmie::layouts.guest_header')
                            @else
                                @include('eventmie::layouts.member_header')
                            @endguest
                        </ul>
                        
                        <a href="{{ route('eventmie.venues.index') }}"
                            class="btn d-none d-lg-block text-white">
                            <i class="fas fa-map-location"></i> @lang('eventmie-pro::em.venues')
                        </a>
                        <a href="{{ route('eventmie.events_index') }}"
                            class="btn btn-primary d-none d-lg-block bg-gradient">
                            <i class="fas fa-calendar-day"></i> @lang('eventmie-pro::em.browse_events')
                        </a>

                        <ul class="navbar-nav ms-lg-2">
                            {{-- additional header menu items --}}
                            @php $headerMenuItems = headerMenu() @endphp
                            @if (!empty($headerMenuItems))
                                <li class="nav-item dropdown ">
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle nav-item dropdown"
                                        href="javascript:void(0)" data-toggle="dropdown" role="button"
                                        aria-haspopup="true" aria-expanded="false" v-pre>
                                        <i class="fas fa-grip-vertical"></i>
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </a>
                                    <ul class="dropdown-menu  dropdown-menu-start ">
                                        @foreach ($headerMenuItems as $parentItem)
                                            @if (!empty($parentItem->submenu))
                                                <li class="nav-item dropdown">
                                                    <a disabled class="dropdown-item disabled" data-toggle="dropdown"
                                                        role="button" aria-haspopup="true" aria-expanded="false"><i
                                                            class="{{ $parentItem->icon_class }}"></i>
                                                        {{ $parentItem->title }} &nbsp;&nbsp;
                                                        <i class="fas fa-angle-right d-none d-sm-inline d-sm-none d-md-inline"></i>
                                                        <i class="fas fa-angle-down  d-lg-none d-inline d-md-none d-lg-inline"></i>
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                        @foreach ($parentItem->submenu as $childItem)
                                                            <li>
                                                                <a class="dropdown-item"
                                                                    target="{{ $childItem->target }}"
                                                                    href="{{ $childItem->url }}">
                                                                    <i class="{{ $childItem->icon_class }}"></i>
                                                                    {{ $childItem->title }}
                                                                </a>
                                                            </li>
                                                        @endforeach
                                                    </ul>
                                                </li>
                                            @else
                                                <li>
                                                    <a class="dropdown-item" target="{{ $parentItem->target }}"
                                                        href="{{ $parentItem->url }}">
                                                        <i class="{{ $parentItem->icon_class }}"></i>
                                                        {{ $parentItem->title }}
                                                    </a>
                                                </li>
                                            @endif
                                        @endforeach
                                    </ul>
                                </li>
                            @endif
                        </ul>

                    </div>
                </nav>
            </div>
        </div>
    </div>
</div>
