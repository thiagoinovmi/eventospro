<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\Menu;
use TCG\Voyager\Models\MenuItem;

class KitsMenuItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the admin menu
        $menu = Menu::where('name', 'admin')->first();

        if (!$menu) {
            return;
        }

        // Create Kits menu item
        $kitsMenuItem = MenuItem::firstOrNew([
            'menu_id' => $menu->id,
            'title'   => 'Kits',
        ]);

        if (!$kitsMenuItem->exists) {
            $kitsMenuItem->fill([
                'url'        => '/admin/kits',
                'target'     => '_self',
                'icon_class' => 'voyager-bag',
                'color'      => null,
                'parent_id'  => null,
                'order'      => 12,
            ])->save();
        }

        // Create Kit Items menu item (as child of Kits)
        $kitItemsMenuItem = MenuItem::firstOrNew([
            'menu_id' => $menu->id,
            'title'   => 'Itens do Kit',
        ]);

        if (!$kitItemsMenuItem->exists) {
            $kitItemsMenuItem->fill([
                'url'        => '/admin/kit-items',
                'target'     => '_self',
                'icon_class' => 'voyager-box',
                'color'      => null,
                'parent_id'  => $kitsMenuItem->id,
                'order'      => 1,
            ])->save();
        }
    }
}
