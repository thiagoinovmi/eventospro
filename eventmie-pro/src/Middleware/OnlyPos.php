<?php

namespace Classiebit\Eventmie\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OnlyPos
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
        if(Auth::check())
            if(Auth::user()->hasRole('pos'))
                return $next($request);
                
        if($request->ajax());
        {
            return response()->json(['status' => false, 'message' => __('eventmie-pro::em.unauthorized')]);
        }

        return redirect()->route('eventmie.welcome');
    }
}
