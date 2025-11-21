<?php

namespace Classiebit\Eventmie\Http\Controllers\Voyager;

use Classiebit\Eventmie\Models\KitItem;
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
     * Index - List all kit items
     */
    public function index(Request $request)
    {
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
