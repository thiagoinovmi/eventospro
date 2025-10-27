<?php

use Illuminate\Database\Seeder;
use Classiebit\Eventmie\Models\Category;

class CategoriesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        $category = Category::count();
        if($category) 
            return true;

        $category = $this->category('id', 1);
        if (!$category->exists) {
            $category->fill([
                'name' => 'Business & Seminars',
                'slug' => 'business-&-seminars',
                'status' => 1,
                'icon' => 'categories/May2025/OFxKFzOj19xy99hS1r1t.png',
                'thumb' => 'categories/May2025/QYxKFzOj19xy99hS1r12.png',
                'template' => 1,
            ])->save();
        }
    }
    
    protected function category($field, $for)
    {
        return Category::firstOrNew([$field => $for]);
    }
}