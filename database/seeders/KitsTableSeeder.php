<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\DataType;
use TCG\Voyager\Models\DataRow;

class KitsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        // Register Kits DataType
        $dataType = $this->dataType('slug', 'kits');
        if (!$dataType->exists) {
            $dataType->fill([
                'name'                  => 'kits',
                'display_name_singular' => 'Kit',
                'display_name_plural'   => 'Kits',
                'icon'                  => 'voyager-bag',
                'model_name'            => 'Classiebit\\Eventmie\\Models\\Kit',
                'controller'            => 'Classiebit\\Eventmie\\Http\\Controllers\\Voyager\\KitsController',
                'generate_permissions'  => 1,
                'description'           => 'Gerenciar kits de eventos',
            ])->save();
        }

        // Register KitItems DataType
        $dataType = $this->dataType('slug', 'kit-items');
        if (!$dataType->exists) {
            $dataType->fill([
                'name'                  => 'kit_items',
                'display_name_singular' => 'Item do Kit',
                'display_name_plural'   => 'Itens do Kit',
                'icon'                  => 'voyager-box',
                'model_name'            => 'Classiebit\\Eventmie\\Models\\KitItem',
                'controller'            => 'Classiebit\\Eventmie\\Http\\Controllers\\Voyager\\KitItemsController',
                'generate_permissions'  => 1,
                'description'           => 'Gerenciar itens dos kits',
            ])->save();
        }

        // Add DataRows for Kits
        $kitsDataType = DataType::where('slug', 'kits')->firstOrFail();

        // ID
        $dataRow = $this->dataRow($kitsDataType, 'id');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'number',
                'display_name' => 'ID',
                'required'     => 1,
                'browse'       => 0,
                'read'         => 0,
                'edit'         => 0,
                'add'          => 0,
                'delete'       => 0,
                'order'        => 1,
            ])->save();
        }

        // Name
        $dataRow = $this->dataRow($kitsDataType, 'name');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => 'Nome do Kit',
                'required'     => 1,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 2,
            ])->save();
        }

        // Description
        $dataRow = $this->dataRow($kitsDataType, 'description');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text_area',
                'display_name' => 'Descrição',
                'required'     => 0,
                'browse'       => 0,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 3,
            ])->save();
        }

        // Status
        $dataRow = $this->dataRow($kitsDataType, 'status');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'checkbox',
                'display_name' => 'Ativo',
                'required'     => 0,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 0,
                'order'        => 4,
            ])->save();
        }

        // Items Relationship
        $dataRow = $this->dataRow($kitsDataType, 'kit_items');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'relationship',
                'display_name' => 'Itens do Kit',
                'required'     => 0,
                'browse'       => 0,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 0,
                'details'      => [
                    'model'       => 'Classiebit\\Eventmie\\Models\\KitItem',
                    'table'       => 'kit_items',
                    'type'        => 'hasMany',
                    'column'      => 'kit_id',
                    'key'         => 'id',
                    'label'       => 'name',
                    'pivot_table' => 'kit_items',
                    'pivot'       => 0,
                ],
                'order'        => 5,
            ])->save();
        }

        // Created At
        $dataRow = $this->dataRow($kitsDataType, 'created_at');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'timestamp',
                'display_name' => 'Criado em',
                'required'     => 0,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 0,
                'add'          => 0,
                'delete'       => 0,
                'order'        => 6,
            ])->save();
        }

        // Updated At
        $dataRow = $this->dataRow($kitsDataType, 'updated_at');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'timestamp',
                'display_name' => 'Atualizado em',
                'required'     => 0,
                'browse'       => 0,
                'read'         => 0,
                'edit'         => 0,
                'add'          => 0,
                'delete'       => 0,
                'order'        => 7,
            ])->save();
        }

        // Add DataRows for KitItems
        $kitItemsDataType = DataType::where('slug', 'kit-items')->firstOrFail();

        // ID
        $dataRow = $this->dataRow($kitItemsDataType, 'id');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'number',
                'display_name' => 'ID',
                'required'     => 1,
                'browse'       => 0,
                'read'         => 0,
                'edit'         => 0,
                'add'          => 0,
                'delete'       => 0,
                'order'        => 1,
            ])->save();
        }

        // Kit ID
        $dataRow = $this->dataRow($kitItemsDataType, 'kit_id');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'relationship',
                'display_name' => 'Kit',
                'required'     => 1,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 0,
                'details'      => [
                    'model'       => 'Classiebit\\Eventmie\\Models\\Kit',
                    'table'       => 'kits',
                    'type'        => 'belongsTo',
                    'column'      => 'kit_id',
                    'key'         => 'id',
                    'label'       => 'name',
                    'pivot_table' => 'kits',
                    'pivot'       => 0,
                ],
                'order'        => 2,
            ])->save();
        }

        // Name
        $dataRow = $this->dataRow($kitItemsDataType, 'name');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text',
                'display_name' => 'Nome do Item',
                'required'     => 1,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 3,
            ])->save();
        }

        // Description
        $dataRow = $this->dataRow($kitItemsDataType, 'description');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'text_area',
                'display_name' => 'Descrição',
                'required'     => 0,
                'browse'       => 0,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 4,
            ])->save();
        }

        // Image
        $dataRow = $this->dataRow($kitItemsDataType, 'image');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'image',
                'display_name' => 'Imagem',
                'required'     => 0,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 5,
            ])->save();
        }

        // Order
        $dataRow = $this->dataRow($kitItemsDataType, 'order');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'number',
                'display_name' => 'Ordem',
                'required'     => 0,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 1,
                'add'          => 1,
                'delete'       => 1,
                'order'        => 6,
            ])->save();
        }

        // Created At
        $dataRow = $this->dataRow($kitItemsDataType, 'created_at');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'timestamp',
                'display_name' => 'Criado em',
                'required'     => 0,
                'browse'       => 1,
                'read'         => 1,
                'edit'         => 0,
                'add'          => 0,
                'delete'       => 0,
                'order'        => 7,
            ])->save();
        }

        // Updated At
        $dataRow = $this->dataRow($kitItemsDataType, 'updated_at');
        if (!$dataRow->exists) {
            $dataRow->fill([
                'type'         => 'timestamp',
                'display_name' => 'Atualizado em',
                'required'     => 0,
                'browse'       => 0,
                'read'         => 0,
                'edit'         => 0,
                'add'          => 0,
                'delete'       => 0,
                'order'        => 8,
            ])->save();
        }
    }

    protected function dataType($field, $for)
    {
        return DataType::firstOrNew([$field => $for]);
    }

    protected function dataRow($dataType, $field)
    {
        return DataRow::firstOrNew([
            'data_type_id' => $dataType->id,
            'field'        => $field,
        ]);
    }
}
