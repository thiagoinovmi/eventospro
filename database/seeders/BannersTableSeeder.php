<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Classiebit\Eventmie\Models\Banner;

class BannersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        $banner = Banner::count();
        if($banner) 
            return true;

        $banner = $this->banner('id', 1);
        if (!$banner->exists) {
            $banner->fill([
                'title' => '',
                'subtitle' => '',
                'image' => 'banners/May2025/A8XifDakbgJ3B3zgKzWD.webp',
                'status' => 1,
                'order' => 1,
                'button_url' => '/events',
                'button_title' => '',
            ])->save();
        }
        
    }

    protected function banner($field, $for)
    {
        return Banner::firstOrNew([$field => $for]);
    }
}