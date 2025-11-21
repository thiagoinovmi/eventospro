<?php

// Bootstrap Laravel
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Http\Kernel');
$response = $kernel->handle(
    $request = \Illuminate\Http\Request::capture()
);

$url = 'https://api.inovmi.com/api/arq-public/cami_fre.png';
$imageContent = file_get_contents($url);
$path = 'kit-items/' . \Carbon\Carbon::now()->format('FY') . '/';
$imageName = time() . rand(1, 999) . '.jpg';

echo "=== IMAGE UPLOAD TEST ===\n";
echo "URL: " . $url . "\n";
echo "Image Content Size: " . strlen($imageContent) . " bytes\n";
echo "Path: " . $path . "\n";
echo "Image Name: " . $imageName . "\n";
echo "---\n";

try {
    $image = \Intervention\Image\Facades\Image::make($imageContent)->encode('jpg', 90);
    echo "✓ Image Processed: " . strlen((string)$image) . " bytes\n";
    
    $fullPath = storage_path('app/public/' . $path . $imageName);
    $dir = dirname($fullPath);
    
    if (!file_exists($dir)) {
        mkdir($dir, 0775, true);
        echo "✓ Directory Created: " . $dir . "\n";
    }
    
    \Illuminate\Support\Facades\Storage::disk('public')->put($path . $imageName, (string)$image);
    echo "✓ Image Saved via Storage\n";
    
    echo "Full Path: " . $fullPath . "\n";
    
    if (file_exists($fullPath)) {
        echo "✓ File Exists: YES\n";
        echo "✓ File Size: " . filesize($fullPath) . " bytes\n";
        echo "\n✓✓✓ SUCCESS! Image uploaded correctly!\n";
    } else {
        echo "✗ File Exists: NO\n";
        echo "\n✗ ERROR: File was not saved!\n";
    }
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    echo "Stack: " . $e->getTraceAsString() . "\n";
}
