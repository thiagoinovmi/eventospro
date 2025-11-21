<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use TCG\Voyager\Models\Page;

// Rota para buscar páginas (Política de Privacidade e Termos)
Route::get('/pages/{id}', function ($id) {
    $page = Page::find($id);
    
    if (!$page) {
        return response()->json(['error' => 'Página não encontrada'], 404);
    }
    
    return response()->json([
        'id' => $page->id,
        'title' => $page->title,
        'body' => $page->body,
        'slug' => $page->slug,
    ]);
})->middleware('api');
