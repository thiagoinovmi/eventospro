<?php

namespace Classiebit\Eventmie\Http\Controllers\Voyager;

use Classiebit\Eventmie\Models\KitItem;
use Classiebit\Eventmie\Models\Kit;
use Illuminate\Http\Request;
use TCG\Voyager\Http\Controllers\VoyagerBaseController;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Events\BreadDataAdded;

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
        return parent::create($request);
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

        // Pegando kit_id da rota ou do request (query string)
        $kitId = $request->route('kit_id') ?? $request->get('kit_id');

        if (!$kitId) {
            // Trate o erro de maneira explícita
            return back()
                ->withInput()
                ->withErrors(['kit_id' => 'O kit é obrigatório.']);
        }

        // Garante que o Voyager enxergue o kit_id ANTES de validar
        $request->merge(['kit_id' => $kitId]);

        // Check permission
        $this->authorize('add', app($dataType->model_name));

        // Validate fields with ajax
        $val = $this->validateBread($request->all(), $dataType->addRows)->validate();

        // Agora o insertUpdateData já recebe kit_id preenchido
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
        return parent::update($request, $id);
    }

    /**
     * Delete - Remove kit item
     */
    public function destroy(Request $request, $id)
    {
        return parent::destroy($request, $id);
    }
}
