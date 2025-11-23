#\!/bin/bash

# Fix Laravel permissions
cd /www/wwwroot/eventos.inovmi.com.br

# Set correct ownership
sudo chown -R www-data:www-data storage bootstrap/cache

# Set correct permissions
sudo chmod -R u+rwX,g+rwX,o= storage bootstrap/cache

echo "✅ Permissões corrigidas com sucesso\!"
echo "storage: drwxrwx---"
echo "bootstrap/cache: drwxr-xr-x"
