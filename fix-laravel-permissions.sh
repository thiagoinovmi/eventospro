#\!/bin/bash

# Fix Laravel permissions - Padrão Correto do Laravel
cd /www/wwwroot/eventos.inovmi.com.br

echo "🔧 Corrigindo permissões do Laravel..."

# Set correct ownership
sudo chown -R www-data:www-data storage bootstrap/cache

# Set correct permissions for directories (755) and files (644)
sudo find storage bootstrap/cache -type d -exec chmod 755 {} \;
sudo find storage bootstrap/cache -type f -exec chmod 644 {} \;

# Views precisa de permissão de escrita (775 para diretórios)
sudo chmod 775 storage/framework/views

# Clear caches
rm -rf storage/framework/views/* storage/framework/cache/* bootstrap/cache/*
rm -f storage/logs/laravel.log
touch storage/logs/laravel.log
chmod 644 storage/logs/laravel.log

# Clear Laravel caches
php artisan view:clear
php artisan optimize:clear

# Rebuild CSS
npm run build

echo "✅ Permissões corrigidas com sucesso\!"
echo "✅ Caches limpados"
echo "✅ CSS reconstruído"
echo "✅ Laravel pronto para usar"
