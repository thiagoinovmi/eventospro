<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Gate;
use Classiebit\Eventmie\Models\Kit;
use Classiebit\Eventmie\Models\KitItem;
use Classiebit\Eventmie\Policies\KitPolicy;
use Classiebit\Eventmie\Policies\KitItemPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Kit::class => KitPolicy::class,
        KitItem::class => KitItemPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        if($this->app->environment('production')) {
            \URL::forceScheme('https');
        }
        
        // Register policies
        foreach ($this->policies as $model => $policy) {
            Gate::policy($model, $policy);
        }
    }
}
