<?php

namespace Classiebit\Eventmie\Http\Controllers\Voyager;

use Classiebit\Eventmie\Models\KitItem;
use Classiebit\Eventmie\Models\Kit;
use Illuminate\Http\Request;
use TCG\Voyager\Http\Controllers\VoyagerBaseController;
use TCG\Voyager\Facades\Voyager;

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
     * Store - Save new kit item
     */
    public function store(Request $request)
    {
        // Se houver kit_id, adicionar ao request
        if ($request->has('kit_id') && $request->kit_id) {
            $kit = Kit::findOrFail($request->kit_id);
            $request->merge(['kit_id' => $kit->id]);
        }
        
        return parent::store($request);
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
