<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== REVALIDAÇÃO COMPLETA ===\n\n";

// 1. Verificar se as traduções estão carregadas
echo "1. Verificar Traduções Carregadas:\n";
echo "   trans('voyager::generic.name') = " . trans('voyager::generic.name') . "\n";
echo "   trans('voyager::generic.email') = " . trans('voyager::generic.email') . "\n";
echo "   trans('voyager::generic.password') = " . trans('voyager::generic.password') . "\n";

// 2. Verificar template edit-add.blade.php
echo "\n2. Verificar Template Edit-Add:\n";
$templatePath = '/www/wwwroot/eventos.inovmi.com.br/resources/views/vendor/voyager/bread/edit-add.blade.php';
if (file_exists($templatePath)) {
    $content = file_get_contents($templatePath);
    if (strpos($content, "trans('voyager::generic.' . \$row->field)") !== false) {
        echo "   ✓ Template contém a lógica de tradução correta\n";
    } else {
        echo "   ✗ Template NÃO contém a lógica de tradução\n";
    }
} else {
    echo "   ✗ Template não encontrado\n";
}

// 3. Verificar se há template customizado para users
echo "\n3. Verificar Templates Customizados:\n";
$usersEditPath = '/www/wwwroot/eventos.inovmi.com.br/resources/views/vendor/voyager/users/edit-add.blade.php';
$usersEditPath2 = '/www/wwwroot/eventos.inovmi.com.br/eventmie-pro/resources/views/vendor/voyager/users/edit-add.blade.php';
echo "   resources/views/users/edit-add.blade.php: " . (file_exists($usersEditPath) ? "EXISTS" : "NOT FOUND") . "\n";
echo "   eventmie-pro/resources/views/users/edit-add.blade.php: " . (file_exists($usersEditPath2) ? "EXISTS" : "NOT FOUND") . "\n";

// 4. Verificar se há template customizado para venues
echo "\n4. Verificar Templates de Venues:\n";
$venuesEditPath = '/www/wwwroot/eventos.inovmi.com.br/resources/views/vendor/voyager/venues/edit-add.blade.php';
$venuesEditPath2 = '/www/wwwroot/eventos.inovmi.com.br/eventmie-pro/resources/views/vendor/voyager/venues/edit-add.blade.php';
echo "   resources/views/venues/edit-add.blade.php: " . (file_exists($venuesEditPath) ? "EXISTS" : "NOT FOUND") . "\n";
echo "   eventmie-pro/resources/views/venues/edit-add.blade.php: " . (file_exists($venuesEditPath2) ? "EXISTS" : "NOT FOUND") . "\n";

echo "\n=== FIM DA REVALIDAÇÃO ===\n";
