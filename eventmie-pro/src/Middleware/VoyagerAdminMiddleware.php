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

            // Patch Voyager's error handler to suppress "Undefined array key 0" errors
            // This is a workaround for a bug in Voyager's SchemaManager
            set_error_handler(function ($errno, $errstr, $errfile, $errline) {
                if (strpos($errstr, 'Undefined array key 0') !== false && 
                    strpos($errfile, 'SchemaManager.php') !== false) {
                    // Suppress this specific error
                    return true;
                }
                // Let other errors pass through
                return false;
            }, E_WARNING);

            try {
                $response = $next($request);
            } finally {
                // Restore the original error handler
                restore_error_handler();
            }

            return $response;
        }

        $urlLogin = route('voyager.login');

        return redirect()->guest($urlLogin);
    }
}
