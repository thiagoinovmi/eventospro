<?php
echo "=== VERIFICANDO ARQUIVO BLADE ===\n";
$file = file_get_contents('eventmie-pro/resources/views/ticket_scanner/index.blade.php');
echo "Arquivo existe: " . (strlen($file) > 0 ? "SIM" : "NÃO") . "\n";
echo "Tamanho: " . strlen($file) . " bytes\n";
echo "Contém getUserMedia: " . (strpos($file, 'getUserMedia') !== false ? "SIM" : "NÃO") . "\n";
echo "Contém requestCamera: " . (strpos($file, 'requestCamera') !== false ? "SIM" : "NÃO") . "\n";
echo "Contém setTimeout: " . (strpos($file, 'setTimeout') !== false ? "SIM" : "NÃO") . "\n";

echo "\n=== VERIFICANDO COMPONENTE VUE ===\n";
$vue = file_get_contents('eventmie-pro/resources/js/ticket_scanner/components/TicketScanner.vue');
echo "Arquivo Vue existe: " . (strlen($vue) > 0 ? "SIM" : "NÃO") . "\n";
echo "Contém qrcode-stream: " . (strpos($vue, 'qrcode-stream') !== false ? "SIM" : "NÃO") . "\n";
echo "Contém onInit: " . (strpos($vue, 'onInit') !== false ? "SIM" : "NÃO") . "\n";
echo "Contém NotAllowedError: " . (strpos($vue, 'NotAllowedError') !== false ? "SIM" : "NÃO") . "\n";
echo "Contém position: fixed: " . (strpos($vue, 'position: fixed') !== false ? "SIM" : "NÃO") . "\n";
echo "Contém scanner-wrapper: " . (strpos($vue, 'scanner-wrapper') !== false ? "SIM" : "NÃO") . "\n";

echo "\n=== VERIFICANDO BUILD ===\n";
$buildDir = 'public/build/assets';
if (is_dir($buildDir)) {
    $files = scandir($buildDir);
    $jsFiles = array_filter($files, function($f) { return strpos($f, '.js') !== false && strpos($f, 'index') !== false; });
    echo "Arquivos JS no build: " . count($jsFiles) . "\n";
    if (count($jsFiles) > 0) {
        $latest = end($jsFiles);
        echo "Arquivo mais recente: " . $latest . "\n";
        $size = filesize($buildDir . '/' . $latest);
        echo "Tamanho: " . ($size / 1024) . " KB\n";
    }
} else {
    echo "Diretório build não encontrado\n";
}

echo "\n=== VERIFICANDO NPM PACKAGES ===\n";
$packageJson = json_decode(file_get_contents('package.json'), true);
echo "vue-qrcode-reader versão: " . ($packageJson['dependencies']['vue-qrcode-reader'] ?? 'NÃO ENCONTRADO') . "\n";
echo "vue versão: " . ($packageJson['dependencies']['vue'] ?? 'NÃO ENCONTRADO') . "\n";
?>
