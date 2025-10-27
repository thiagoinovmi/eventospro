<?php

namespace Classiebit\Eventmie\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class VoyagerAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        auth()->setDefaultDriver(app('VoyagerGuard'));

        if (!Auth::guest()) {
            $user = Auth::user();
            
            // if user lang, else use default 'pt'
            $lang = session('my_lang') ?? config('app.locale', 'pt');
            \App::setLocale($lang);

            return $user->hasPermission('browse_admin') ? $next($request) : redirect('/');
        }

        $urlLogin = route('voyager.login');

        return redirect()->guest($urlLogin);
    }
}
