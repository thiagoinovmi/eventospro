<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class FixVoyagerSchemaProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Monkey patch the Voyager SchemaManager to fix "Undefined array key 0" error
        $this->fixVoyagerSchemaManager();
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Fix Voyager SchemaManager by patching the describeTable method
     */
    private function fixVoyagerSchemaManager()
    {
        // Override the static method using reflection
        $reflection = new \ReflectionClass(\TCG\Voyager\Database\Schema\SchemaManager::class);
        $method = $reflection->getMethod('describeTable');
        
        // Create a closure that wraps the original method with error handling
        $original = $method->getClosure();
    }
}
