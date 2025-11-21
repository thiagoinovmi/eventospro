<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\Permission;
use TCG\Voyager\Models\Role;

class KitsPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions for kits
        $permissions = [
            [
                'key'        => 'browse_kits',
                'table_name' => 'kits',
            ],
            [
                'key'        => 'read_kits',
                'table_name' => 'kits',
            ],
            [
                'key'        => 'edit_kits',
                'table_name' => 'kits',
            ],
            [
                'key'        => 'add_kits',
                'table_name' => 'kits',
            ],
            [
                'key'        => 'delete_kits',
                'table_name' => 'kits',
            ],
        ];

        // Create permissions for kit_items
        $kitItemPermissions = [
            [
                'key'        => 'browse_kit_items',
                'table_name' => 'kit_items',
            ],
            [
                'key'        => 'read_kit_items',
                'table_name' => 'kit_items',
            ],
            [
                'key'        => 'edit_kit_items',
                'table_name' => 'kit_items',
            ],
            [
                'key'        => 'add_kit_items',
                'table_name' => 'kit_items',
            ],
            [
                'key'        => 'delete_kit_items',
                'table_name' => 'kit_items',
            ],
        ];

        $allPermissions = array_merge($permissions, $kitItemPermissions);

        foreach ($allPermissions as $permission) {
            Permission::firstOrCreate($permission);
        }

        // Assign permissions to admin role
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $permissionIds = Permission::whereIn('key', [
                'browse_kits', 'read_kits', 'edit_kits', 'add_kits', 'delete_kits',
                'browse_kit_items', 'read_kit_items', 'edit_kit_items', 'add_kit_items', 'delete_kit_items',
            ])->pluck('id')->toArray();

            $adminRole->permissions()->syncWithoutDetaching($permissionIds);
        }

        // Assign permissions to organiser role if exists
        $organiserRole = Role::where('name', 'organiser')->first();
        if ($organiserRole) {
            $permissionIds = Permission::whereIn('key', [
                'browse_kits', 'read_kits', 'edit_kits', 'add_kits',
                'browse_kit_items', 'read_kit_items', 'edit_kit_items', 'add_kit_items',
            ])->pluck('id')->toArray();

            $organiserRole->permissions()->syncWithoutDetaching($permissionIds);
        }
    }
}
