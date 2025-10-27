<?php

namespace Classiebit\Eventmie\Http\Controllers\Voyager;

use Facades\Classiebit\Eventmie\Eventmie;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use TCG\Voyager\Facades\Voyager;

use Illuminate\Support\Carbon;
use Intervention\Image\Facades\Image;

class SettingsController extends VoyagerSettingsController
{

    public function __construct()
    {
        $this->middleware(['admin.user']);

    }

    public function index()
    {
        // Check permission
        $this->authorize('browse', Voyager::model('Setting'));

        $data = Voyager::model('Setting')->orderBy('order', 'ASC')->get();

        $settings = [];
        $settings[__('voyager::settings.group_general')] = [];
        foreach ($data as $d) {
            if ($d->group == '' || $d->group == __('voyager::settings.group_general')) {
                $settings[__('voyager::settings.group_general')][] = $d;
            } else {
                $settings[$d->group][] = $d;
            }
        }
        if (count($settings[__('voyager::settings.group_general')]) == 0) {
            unset($settings[__('voyager::settings.group_general')]);
        }

        $groups_data = Voyager::model('Setting')->select('group')->distinct()->get();

        $groups = [];
        foreach ($groups_data as $group) {
            if ($group->group != '') {
                $groups[] = $group->group;
            }
        }


        $active = (request()->session()->has('setting_tab')) ? request()->session()->get('setting_tab') : old('setting_tab', key($settings));
        
        return view('eventmie::vendor.voyager.settings.index', compact('settings', 'groups', 'active'));
    }

  

    public function update(Request $request)
    {
        // Check permission
        $this->authorize('edit', Voyager::model('Setting'));

        
        $settings = Voyager::model('Setting')->all();

        $storageDisk = getDisk(); // Get current storage disk

        foreach ($settings as $setting) {

            // Handle image uploads
            $fileFields = [
                'site.logo' => 'site_logo',
                'site.site_favicon' => 'site_site_favicon',
                'admin.bg_image' => 'admin_bg_image',
                'admin.loader' => 'admin_loader',
                'admin.icon_image' => 'admin_icon_image'
            ];

            if (isset($fileFields[$setting->key]) && $request->hasFile($fileFields[$setting->key])) {
                $filePath = $this->uploadImage($request->file($fileFields[$setting->key]), $storageDisk);

                if ($filePath) {
                    $setting->value = $filePath;
                    $setting->save();
                }
                continue;
            }


            $content = $this->getContentBasedOnType($request, 'settings', (object) [
                'type'    => $setting->type,
                'field'   => str_replace('.', '_', $setting->key),
                'group'   => $setting->group,
            ], $setting->details);



            if ($setting->type == 'image' && $content == null) {
                continue;
            }

            if ($setting->type == 'file' && $content == null) {
                continue;
            }






            $key = preg_replace('/^'.Str::slug($setting->group).'./i', '', $setting->key);


            $setting->group = $request->input(str_replace('.', '_', $setting->key).'_group');
            $setting->key = implode('.', [Str::slug($setting->group), $key]);
            $setting->value = $content;
            $setting->save();
        }

        request()->flashOnly('setting_tab');
        
        return back()->with([
            'message'    => __('voyager::settings.successfully_saved'),
            'alert-type' => 'success',
        ]);
    }

    /**
    * Uploads an image to storage (S3 or local) and returns the file path.
    */
    private function uploadImage($file, $storageDisk)
    {
        if (!$file) {
            return null;
        }

        $path = 'settings/' . Carbon::now()->format('FY') . '/';
        $imageName = time() . rand(1, 999) . '.webp';

        // Process and resize the image
        $image = Image::make($file)
            ->encode('webp', 90)
            ->resize(480, 270, function ($constraint) {
                $constraint->aspectRatio();
            });

        if ($storageDisk === 's3') {
            // Store the image in S3
            Storage::disk('s3')->put($path . $imageName, (string) $image);
            return $path . $imageName;
        } else {
            // Store the image locally
            $fullPath = storage_path('app/public/' . $path);
            
            // Create directory if it doesn't exist
            if (!file_exists($fullPath)) {
                mkdir($fullPath, 0755, true);
            }
            
            // Save the image
            $image->save($fullPath . $imageName);
            
            // Return the public path
            return $path . $imageName;
        }
    }



}
