<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\Menu;
use TCG\Voyager\Models\MenuItem;

class MenuItemsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        $menu = Menu::where('name', 'admin')->firstOrFail();

        $items = [
            // order, title, route, icon_class, color, parameters
            [1,  'Dashboard',    'voyager.dashboard',        'voyager-boat',        '#000000', null],
            [2,  'Categories',   'voyager.categories.index', 'voyager-categories',  null,      null],
            [3,  'Tags',         'voyager.tags.index',       'voyager-puzzle',      null,      null],
            [4,  'Events',       'voyager.events.index',     'voyager-calendar',    '#000000', null],
            [5,  'Bookings',     'voyager.bookings.index',   'voyager-dollar',      null,      null],
            [6,  'Commissions',  'voyager.commissions.index','voyager-wallet',      null,      null],
            [7,  'Taxes',        'voyager.taxes.index',      'voyager-documentation','#000000', null],
            [8,  'Users',        'voyager.users.index',      'voyager-people',      '#000000', null],
            [9,  'Contacts',     'voyager.contacts.index',   'voyager-mail',        '#000000', null],
            [10, 'Media',        'voyager.media.index',      'voyager-images',      null,      null],
            [11, 'Banners',      'voyager.banners.index',    'voyager-photo',       '#000000', null],
            [12, 'Pages',        'voyager.pages.index',      'voyager-file-text',   null,      null],
            [13, 'Blog Posts',   'voyager.posts.index',      'voyager-news',        '#000000', null],
            [14, 'Header Menu',  'voyager.menus.builder',    'voyager-list',        '#000000', 2],
            [15, 'Footer Menu',  'voyager.menus.builder',    'voyager-list',        '#000000', 3],
            [16, 'Venues',       'voyager.venues.index',     'voyager-lighthouse',  null,      null],
            [17, 'Settings',     'voyager.settings.index',   'voyager-settings',    null,      null],
        ];

        foreach ($items as [$order, $title, $route, $icon, $color, $parameters]) {
            MenuItem::updateOrCreate(
                [
                    'menu_id'    => $menu->id,
                    'title'      => $title,
                ],
                [
                    'url'        => '',
                    'route'      => $route,
                    'parameters' => $parameters,
                    'target'     => '_self',
                    'icon_class' => $icon,
                    'color'      => $color,
                    'parent_id'  => null,
                    'order'      => $order,
                ]
            );
        }
    }
}
