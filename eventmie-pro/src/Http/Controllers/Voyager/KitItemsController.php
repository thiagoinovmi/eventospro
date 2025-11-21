<?php

namespace Classiebit\Eventmie\Http\Controllers\Voyager;

use Classiebit\Eventmie\Models\KitItem;
use Classiebit\Eventmie\Models\Kit;
use Illuminate\Http\Request;
use TCG\Voyager\Http\Controllers\VoyagerBaseController;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Events\BreadDataAdded;
use TCG\Voyager\Events\BreadDataUpdated;

class KitItemsController extends VoyagerBaseController
{
    public function __construct()
    {
        $this->middleware(['admin.user']);
    }

    /**
     * Index - List all kit items or filter by kit
     */
    public function index(Request $request)
    {
        // Se houver kit_id, usar view customizada
        if ($request->has('kit_id') && $request->kit_id) {
            $kit = Kit::findOrFail($request->kit_id);
            
            // Buscar itens do kit
            $dataType = Voyager::model('DataType')->where('slug', 'kit-items')->firstOrFail();
            $dataTypeContent = KitItem::where('kit_id', $kit->id)
                ->orderBy('order')
                ->paginate(15);
            
            $isServerSide = true;
            
            return view('voyager::kit_items.browse-by-kit', compact('dataType', 'dataTypeContent', 'kit', 'isServerSide'));
        }
        
        return parent::index($request);
    }

    /**
     * Create - Show create form
     */
    public function create(Request $request)
    {
        $kitId = $request->get('kit_id');
        
        // Chamar parent para obter a response
        $response = parent::create($request);
        
        // Se for uma view, adicionar kit_id ao dataTypeContent
        if ($response instanceof \Illuminate\View\View) {
            // Obter o dataTypeContent da view
            $dataTypeContent = $response->getData()['dataTypeContent'] ?? null;
            
            if ($dataTypeContent && $kitId) {
                // Definir kit_id no dataTypeContent para que o Voyager renderize corretamente
                $dataTypeContent->kit_id = $kitId;
            }
        }
        
        return $response;
    }

    /**
     * POST BRE(A)D - Store data.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $slug = $this->getSlug($request);

        $dataType = Voyager::model('DataType')->where('slug', '=', $slug)->first();

        // Pegando kit_id do request (POST ou query string)
        $kitId = $request->get('kit_id');

        if (!$kitId) {
            // Trate o erro de maneira explícita
            return back()
                ->withInput()
                ->withErrors(['kit_id' => 'O kit é obrigatório.']);
        }

        // Garanta que o Voyager enxergue o kit_id ANTES de validar
        $request->merge(['kit_id' => $kitId]);

        // Processar imagem ANTES de validar (para que Voyager use o caminho correto)
        $this->processImage($request);

        // Check permission
        $this->authorize('add', app($dataType->model_name));

        // Validate fields with ajax
        $val = $this->validateBread($request->all(), $dataType->addRows)->validate();

        // Agora o insertUpdateData já recebe kit_id e imagem preenchidos
        $data = $this->insertUpdateData($request, $slug, $dataType->addRows, new $dataType->model_name());

        event(new BreadDataAdded($dataType, $data));

        if (!$request->has('_tagging')) {
            if (auth()->user()->can('browse', $data)) {
                $redirect = redirect()->route("voyager.{$dataType->slug}.index", ['kit_id' => $kitId]);
            } else {
                $redirect = redirect()->back();
            }

            return $redirect->with([
                'message'    => __('voyager::generic.successfully_added_new')." {$dataType->getTranslatedAttribute('display_name_singular')}",
                'alert-type' => 'success',
            ]);
        } else {
            return response()->json(['success' => true, 'data' => $data]);
        }
    }

    /**
     * Processar imagem antes de inserir/atualizar
     * Segue o padrão do BannersController
     */
    private function processImage($request)
    {
        $storageDisk = getDisk();

        \Log::info('KitItemsController::processImage - Iniciando', [
            'has_file' => $request->hasFile('image'),
            'disk' => $storageDisk,
        ]);

        // Apenas processar se houver arquivo de imagem
        if (!$request->hasFile('image')) {
            \Log::info('KitItemsController::processImage - Sem arquivo de imagem');
            return;
        }

        try {
            $path = 'kit-items/' . \Carbon\Carbon::now()->format('FY') . '/';
            $imageName = time() . rand(1, 999) . '.jpg';

            \Log::info('KitItemsController::processImage - Processando', [
                'path' => $path,
                'image_name' => $imageName,
            ]);

            // Processar a imagem
            $image = \Intervention\Image\Facades\Image::make($request->file('image'))
                ->encode('jpg', 90);

            $imageContent = (string) $image;

            \Log::info('KitItemsController::processImage - Imagem codificada', [
                'size' => strlen($imageContent),
            ]);

            if ($storageDisk === 's3') {
                // Salvar no S3
                \Illuminate\Support\Facades\Storage::disk('s3')->put($path . $imageName, $imageContent);
                $imageUrl = $path . $imageName;
            } else {
                // Salvar localmente - usar file_put_contents
                $fullPath = storage_path('app/public/' . $path);
                
                // Criar diretório se não existir
                if (!is_dir($fullPath)) {
                    mkdir($fullPath, 0775, true);
                    \Log::info('KitItemsController::processImage - Diretório criado', [
                        'directory' => $fullPath,
                    ]);
                }
                
                // Salvar conteúdo da imagem como arquivo
                $filePath = $fullPath . $imageName;
                file_put_contents($filePath, $imageContent);
                chmod($filePath, 0644);
                
                $imageUrl = $path . $imageName;
            }

            \Log::info('KitItemsController::processImage - Arquivo salvo', [
                'image_url' => $imageUrl,
                'full_path' => storage_path('app/public/' . $imageUrl),
                'exists' => \File::exists(storage_path('app/public/' . $imageUrl)),
                'file_size' => \File::exists(storage_path('app/public/' . $imageUrl)) ? filesize(storage_path('app/public/' . $imageUrl)) : 0,
            ]);

            // Fazer merge no request com o caminho correto
            $request->merge(['image' => $imageUrl]);

            \Log::info('KitItemsController::processImage - Sucesso', [
                'image_name' => $imageName,
                'image_url' => $imageUrl,
                'disk' => $storageDisk,
            ]);
        } catch (\Exception $e) {
            \Log::error('KitItemsController::processImage - Erro', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }

    /**
     * Show - Display kit item details
     */
    public function show(Request $request, $id)
    {
        return parent::show($request, $id);
    }

    /**
     * Edit - Show edit form
     */
    public function edit(Request $request, $id)
    {
        return parent::edit($request, $id);
    }

    /**
     * Update - Save kit item changes
     */
    public function update(Request $request, $id)
    {
        $slug = $this->getSlug($request);

        $dataType = Voyager::model('DataType')->where('slug', '=', $slug)->first();

        // Pegando kit_id do request
        $kitId = $request->get('kit_id');

        if (!$kitId) {
            // Trate o erro de maneira explícita
            return back()
                ->withInput()
                ->withErrors(['kit_id' => 'O kit é obrigatório.']);
        }

        // Garanta que o Voyager enxergue o kit_id ANTES de validar
        $request->merge(['kit_id' => $kitId]);

        // Obter dados antigos
        $oldData = app($dataType->model_name)->findOrFail($id);

        // Check permission
        $this->authorize('edit', app($dataType->model_name));

        // Processar imagem ANTES de validar (para que Voyager use o caminho correto)
        $this->processImage($request);

        // Validate fields with ajax
        $val = $this->validateBread($request->all(), $dataType->editRows, $id)->validate();

        $data = $this->insertUpdateData($request, $slug, $dataType->editRows, $oldData);

        event(new BreadDataUpdated($dataType, $data));

        if (!$request->has('_tagging')) {
            if (auth()->user()->can('browse', $data)) {
                $redirect = redirect()->route("voyager.{$dataType->slug}.index", ['kit_id' => $kitId]);
            } else {
                $redirect = redirect()->back();
            }

            return $redirect->with([
                'message'    => __('voyager::generic.successfully_updated')." {$dataType->getTranslatedAttribute('display_name_singular')}",
                'alert-type' => 'success',
            ]);
        } else {
            return response()->json(['success' => true, 'data' => $data]);
        }
    }

    /**
     * Delete - Remove kit item
     */
    public function destroy(Request $request, $id)
    {
        return parent::destroy($request, $id);
    }
}
