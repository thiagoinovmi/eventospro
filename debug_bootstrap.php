<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== DEBUG BOOTSTRAP ===\n";

try {
    echo "1. Loading autoload...\n";
    require 'vendor/autoload.php';
    echo "   ✓ Autoload loaded\n";
    
    echo "2. Loading bootstrap/app.php...\n";
    $app = require 'bootstrap/app.php';
    echo "   ✓ Bootstrap loaded\n";
    
    echo "3. Getting router...\n";
    $router = $app['router'];
    echo "   ✓ Router obtained\n";
    
    echo "4. Loading routes from web.php...\n";
    require 'routes/web.php';
    echo "   ✓ Web routes loaded\n";
    
    echo "5. Loading routes from api.php...\n";
    require 'routes/api.php';
    echo "   ✓ API routes loaded\n";
    
    echo "6. Getting all routes...\n";
    $routes = $router->getRoutes();
    echo "   ✓ Routes retrieved: " . count($routes) . " total\n";
    
    echo "\n=== MERCADO PAGO ROUTES ===\n";
    foreach ($routes as $route) {
        if (strpos($route->uri(), 'mercado') !== false) {
            echo "Found: " . $route->uri() . "\n";
        }
    }
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
    echo "Trace:\n" . $e->getTraceAsString() . "\n";
}
