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

        // Check permission
        $this->authorize('add', app($dataType->model_name));

        // Validate fields with ajax
        $val = $this->validateBread($request->all(), $dataType->addRows)->validate();

        // Agora o insertUpdateData já recebe kit_id preenchido
        $data = $this->insertUpdateData($request, $slug, $dataType->addRows, new $dataType->model_name());

        // Corrigir nome da imagem se necessário
        $this->fixImagePath($data);

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
     * Corrigir o caminho da imagem se o arquivo no banco não corresponder ao arquivo no disco
     */
    private function fixImagePath($data)
    {
        if (!$data->image) {
            return;
        }

        $imagePath = $data->image;
        $fullPath = storage_path('app/public/' . $imagePath);

        // Se o arquivo não existe, procurar na mesma pasta
        if (!\File::exists($fullPath)) {
            $directory = dirname($fullPath);
            
            if (\File::exists($directory)) {
                $files = \File::files($directory);
                
                if (!empty($files)) {
                    // Usar o arquivo mais recente
                    $latestFile = null;
                    $latestTime = 0;
                    
                    foreach ($files as $file) {
                        $time = $file->getMTime();
                        if ($time > $latestTime) {
                            $latestTime = $time;
                            $latestFile = $file->getFilename();
                        }
                    }
                    
                    if ($latestFile) {
                        $newPath = str_replace(basename($imagePath), $latestFile, $imagePath);
                        $data->image = $newPath;
                        $data->save();
                        
                        \Log::info('KitItemsController - Imagem corrigida', [
                            'old_path' => $imagePath,
                            'new_path' => $newPath,
                        ]);
                    }
                }
            }
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

        // Check permission
        $this->authorize('edit', app($dataType->model_name));

        // Validate fields with ajax
        $val = $this->validateBread($request->all(), $dataType->editRows, $id)->validate();

        $data = $this->insertUpdateData($request, $slug, $dataType->editRows, app($dataType->model_name)->findOrFail($id));

        // Corrigir nome da imagem se necessário
        $this->fixImagePath($data);

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
