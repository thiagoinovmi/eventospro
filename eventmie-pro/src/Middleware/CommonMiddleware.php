<?php 

namespace Classiebit\Eventmie\Middleware;
use Closure;
use Carbon\Carbon;

class CommonMiddleware {

    public function handle($request, Closure $next)
    {
        // if user lang, else use default 'pt'
        $lang = session('my_lang') ?? config('app.locale', 'pt');
        
        \App::setLocale($lang);
        Carbon::setLocale($lang);

        return $next($request);
    }
}