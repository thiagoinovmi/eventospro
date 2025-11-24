<?php

require 'vendor/autoload.php';

$app = require 'bootstrap/app.php';

try {
    $routes = $app['router']->getRoutes();
    
    echo "=== TODAS AS ROTAS ===\n";
    foreach ($routes as $route) {
        if (strpos($route->uri(), 'mercado') !== false || strpos($route->uri(), 'api') !== false) {
            echo "URI: " . $route->uri() . "\n";
            echo "Methods: " . implode(',', $route->methods()) . "\n";
            echo "Action: " . $route->getActionName() . "\n";
            echo "Middleware: " . implode(',', $route->middleware()) . "\n";
            echo "---\n";
        }
    }
    
    echo "\n=== TOTAL DE ROTAS ===\n";
    echo "Total: " . count($routes) . "\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
}
