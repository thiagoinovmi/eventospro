<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SkipCsrfForWebhook
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Skip CSRF verification for webhook routes
        if ($request->is('mercadopago/webhook') || $request->is('*/mercadopago/webhook')) {
            $request->attributes->set('skip_csrf', true);
        }

        return $next($request);
    }
}
