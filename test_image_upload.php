<?php

require 'vendor/autoload.php';

$url = 'https://api.inovmi.com/api/arq-public/cami_fre.png';
$imageContent = file_get_contents($url);
$path = 'kit-items/' . date('FY') . '/';
$imageName = time() . rand(1, 999) . '.jpg';

echo "URL: " . $url . PHP_EOL;
echo "Image Content Size: " . strlen($imageContent) . " bytes" . PHP_EOL;
echo "Path: " . $path . PHP_EOL;
echo "Image Name: " . $imageName . PHP_EOL;
echo "---" . PHP_EOL;

// Tentar processar com Intervention Image
try {
    $image = \Intervention\Image\ImageManagerStatic::make($imageContent)->encode('jpg', 90);
    echo "Image Processed: " . strlen((string)$image) . " bytes" . PHP_EOL;
    
    // Tentar salvar localmente
    $fullPath = storage_path('app/public/' . $path . $imageName);
    $dir = dirname($fullPath);
    
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
        echo "Directory Created: " . $dir . PHP_EOL;
    }
    
    file_put_contents($fullPath, (string)$image);
    
    echo "Image Saved Successfully!" . PHP_EOL;
    echo "Full Path: " . $fullPath . PHP_EOL;
    
    // Verificar se arquivo existe
    if (file_exists($fullPath)) {
        echo "File Exists: YES" . PHP_EOL;
        echo "File Size: " . filesize($fullPath) . " bytes" . PHP_EOL;
    } else {
        echo "File Exists: NO" . PHP_EOL;
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . PHP_EOL;
    echo "Stack: " . $e->getTraceAsString() . PHP_EOL;
}
