<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class FixKitItemsImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:kit-items-images';

    /**
     * The command description.
     *
     * @var string
     */
    protected $description = 'Fix kit items images by creating symlinks for missing files';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Iniciando correção de imagens de Kit Items...');

        // Obter todos os kit items com imagem
        $kitItems = DB::table('kit_items')->where('image', '!=', '')->get();

        $fixed = 0;
        $notFound = 0;

        foreach ($kitItems as $item) {
            $imagePath = $item->image;
            $fullPath = storage_path('app/public/' . $imagePath);

            // Verificar se o arquivo existe
            if (!File::exists($fullPath)) {
                $this->warn("Arquivo não encontrado: {$imagePath}");

                // Tentar encontrar um arquivo similar na mesma pasta
                $directory = dirname($fullPath);
                $filename = basename($imagePath);

                if (File::exists($directory)) {
                    $files = File::files($directory);
                    
                    if (!empty($files)) {
                        // Usar o primeiro arquivo encontrado
                        $realFile = $files[0]->getFilename();
                        $realPath = $realFile;

                        // Criar symlink
                        $linkPath = $fullPath;
                        $targetPath = $directory . '/' . $realPath;

                        if (!File::exists($linkPath)) {
                            symlink($targetPath, $linkPath);
                            $this->line("✓ Symlink criado: {$imagePath} -> {$realPath}");
                            $fixed++;
                        }
                    } else {
                        $this->error("Nenhum arquivo encontrado em: {$directory}");
                        $notFound++;
                    }
                } else {
                    $this->error("Diretório não existe: {$directory}");
                    $notFound++;
                }
            } else {
                $this->line("✓ Arquivo existe: {$imagePath}");
            }
        }

        $this->info("\n=== Resumo ===");
        $this->info("Symlinks criados: {$fixed}");
        $this->info("Arquivos não encontrados: {$notFound}");

        return 0;
    }
}
