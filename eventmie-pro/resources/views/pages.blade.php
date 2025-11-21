@extends('eventmie::layouts.app')

@section('meta_title', $page->title)
@section('meta_description', setting('site.site_name') ? setting('site.site_name') : config('app.name'))
@section('meta_url', url()->current())

@if (!empty($page))
    {{-- Page title --}}
    @section('title', $page->title)

    {{-- breadcrumb --}}
    @section('heading', $page->title)

    @section('content')
        <main>
            <!--PAGE CONTENT-->
            <section class="py-8 py-lg-10">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-10 col-12">
                            <!-- Page Header -->
                            <div class="mb-8 pb-6 border-bottom">
                                <h1 class="h2 fw-bold text-dark mb-3">{{ $page->title }}</h1>
                                <p class="text-muted">
                                    <small>Última atualização: {{ $page->updated_at->format('d \\d\\e F \\d\\e Y') }}</small>
                                </p>
                            </div>

                            <!-- Page Body with Better Styling -->
                            <div class="page-content">
                                <style>
                                    .page-content {
                                        line-height: 1.8;
                                        color: #333;
                                    }
                                    
                                    .page-content h1,
                                    .page-content h2,
                                    .page-content h3,
                                    .page-content h4,
                                    .page-content h5,
                                    .page-content h6 {
                                        margin-top: 1.5rem;
                                        margin-bottom: 0.75rem;
                                        font-weight: 600;
                                        color: #1a1a1a;
                                    }
                                    
                                    .page-content h1 { font-size: 1.75rem; }
                                    .page-content h2 { font-size: 1.5rem; }
                                    .page-content h3 { font-size: 1.25rem; }
                                    .page-content h4 { font-size: 1.1rem; }
                                    
                                    .page-content p {
                                        margin-bottom: 1rem;
                                        text-align: justify;
                                    }
                                    
                                    .page-content ul,
                                    .page-content ol {
                                        margin-bottom: 1.5rem;
                                        padding-left: 2rem;
                                    }
                                    
                                    .page-content li {
                                        margin-bottom: 0.5rem;
                                        line-height: 1.8;
                                    }
                                    
                                    .page-content strong {
                                        font-weight: 600;
                                        color: #1a1a1a;
                                    }
                                    
                                    .page-content em {
                                        font-style: italic;
                                        color: #555;
                                    }
                                    
                                    .page-content blockquote {
                                        border-left: 4px solid #007bff;
                                        padding-left: 1.5rem;
                                        margin: 1.5rem 0;
                                        color: #666;
                                        font-style: italic;
                                    }
                                    
                                    .page-content table {
                                        width: 100%;
                                        border-collapse: collapse;
                                        margin: 1.5rem 0;
                                    }
                                    
                                    .page-content table th,
                                    .page-content table td {
                                        padding: 0.75rem;
                                        border: 1px solid #ddd;
                                        text-align: left;
                                    }
                                    
                                    .page-content table th {
                                        background-color: #f8f9fa;
                                        font-weight: 600;
                                        color: #1a1a1a;
                                    }
                                    
                                    .page-content table tr:hover {
                                        background-color: #f8f9fa;
                                    }
                                    
                                    .page-content a {
                                        color: #007bff;
                                        text-decoration: none;
                                        border-bottom: 1px solid transparent;
                                        transition: all 0.3s ease;
                                    }
                                    
                                    .page-content a:hover {
                                        color: #0056b3;
                                        border-bottom-color: #0056b3;
                                    }
                                    
                                    .page-content hr {
                                        margin: 2rem 0;
                                        border: none;
                                        border-top: 1px solid #ddd;
                                    }
                                </style>
                                
                                {!! $page->body !!}
                            </div>

                            <!-- Back to Top Button -->
                            <div class="mt-8 pt-6 border-top text-center">
                                <a href="#" class="btn btn-outline-primary btn-sm">
                                    <i class="fas fa-arrow-up me-2"></i>Voltar ao topo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!--PAGE CONTENT END-->
        </main>
    @endsection
@endif
