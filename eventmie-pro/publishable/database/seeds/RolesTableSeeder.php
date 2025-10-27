<?php

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\Role;

class RolesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        $role = $this->role('id', 1);
        if (!$role->exists) 
        {
            $role->fill([
                'name' => 'admin',
                'display_name' => 'Administrator',
            ])->save();
        }
        
        $role = $this->role('id', 2);
        if (!$role->exists) 
        {
            $role->fill([
                'name' => 'customer',
                'display_name' => 'Customer (non-admin)',
            ])->save();
        }
        
        $role = $this->role('id', 3);
        if (!$role->exists) 
        {
            $role->fill([
                'name' => 'organiser',
                'display_name' => 'Organiser (Semi-admin)',
            ])->save();
        }

        $role = $this->role('id', 4);
        if (!$role->exists) 
        {
            $role->fill([
                'name' => 'pos',
                'display_name' => 'POS',
            ])->save();
        }   

        $role = $this->role('id', 5);
        if (!$role->exists) 
        {
            $role->fill([
                'name' => 'scanner',
                'display_name' => 'Scanner',
            ])->save();
        }
        
    }

    protected function role($field, $for)
    {
        return Role::firstOrNew([$field => $for]);
    }
}