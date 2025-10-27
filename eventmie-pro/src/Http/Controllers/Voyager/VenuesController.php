<?php

namespace Classiebit\Eventmie\Http\Controllers\Voyager;

use Facades\Classiebit\Eventmie\Eventmie;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use TCG\Voyager\Database\Schema\SchemaManager;
use TCG\Voyager\Events\BreadDataAdded;
use TCG\Voyager\Events\BreadDataDeleted;
use TCG\Voyager\Events\BreadDataRestored;
use TCG\Voyager\Events\BreadDataUpdated;
use TCG\Voyager\Events\BreadImagesDeleted;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Http\Controllers\Traits\BreadRelationshipParser;
use Illuminate\Http\RedirectResponse;
use Auth;
use Illuminate\Support\Facades\Storage;

use Classiebit\Eventmie\Models\Venue;
use Illuminate\Support\Carbon;
use Intervention\Image\Facades\Image;

class VenuesController extends VoyagerBaseController
{
    use BreadRelationshipParser;

    public function __construct()
    {
        $this->middleware(['admin.user']);
        
    }

    // POST BR(E)AD
    public function update(Request $request, $id)
    {

        $slug = $this->getSlug($request);

        $dataType = Voyager::model('DataType')->where('slug', '=', $slug)->first();

        // Compatibility with Model binding.
        $id = $id instanceof \Illuminate\Database\Eloquent\Model ? $id->{$id->getKeyName()} : $id;

        $storageDisk = getDisk(); // Get current storage disk

        $model = app($dataType->model_name);
        $query = $model->query();
        if ($dataType->scope && $dataType->scope != '' && method_exists($model, 'scope'.ucfirst($dataType->scope))) {
            $query = $query->{$dataType->scope}();
        }
        if ($model && in_array(SoftDeletes::class, class_uses_recursive($model))) {
            $query = $query->withTrashed();
        }

        $data = $query->findOrFail($id);

        // Check permission
        $this->authorize('edit', $data);

        // Validate fields with ajax
        $val = $this->validateBread($request->all(), $dataType->editRows, $dataType->name, $id)->validate();

        // Get fields with images to remove before updating and make a copy of $data
        $to_remove = $dataType->editRows->where('type', 'image')
            ->filter(function ($item, $key) use ($request) {
                return $request->hasFile($item->field);
            });
        $original_data = clone($data);

        // Initialize an empty array for image URLs
        $imageUrl = [];
        
        if ($storageDisk === 's3') {
            $path = 'venues/' . Carbon::now()->format('FY') . '/';

            if ($request->hasFile('images')) {
                $files = $request->file('images');

                foreach ($files as $file) {
                    // Generate a unique name for the image
                    $imageName = time() . rand(1, 999) . '.webp';

                    // Process and resize the image
                    $image = Image::make($file)
                        ->encode('webp', 90)
                        ->resize(480, 270, function ($constraint) {
                            $constraint->aspectRatio();
                        });

                    

                    // Store in S3 with public visibility
                    Storage::disk('s3')->put($path . $imageName, $image);

                    // Get the S3 URL of the uploaded image
                    $imageUrl[] = $path . $imageName;
                }

            }
        }
        
        
        $this->insertUpdateData($request, $slug, $dataType->editRows, $data);
        
        // Delete Images
        $this->deleteBreadImages($original_data, $to_remove);



        // Get the venue if it exists
        $venue = Venue::where(['id' => $data->id])->first();
        
        // Function to check if filename contains only numbers before the extension
        function filterOnlyNumbers($image) {
            $filename = pathinfo($image, PATHINFO_FILENAME); // Get filename without extension
            return ctype_digit($filename); // Check if filename contains only numbers
        }

        if ($venue) {
            if (!empty($imageUrl)) {
                // Decode existing images or initialize as an empty array
                $existingImages = json_decode($venue->images, true) ?? [];

                // Filter new and existing images while keeping the full path
                $filteredNewImages = array_filter($imageUrl, function ($image) {
                    return filterOnlyNumbers($image); // Keep only those with numeric filenames
                });

                $filteredExistingImages = array_filter($existingImages, function ($image) {
                    return filterOnlyNumbers($image); // Keep only those with numeric filenames
                });

                // Merge new images with existing ones and remove duplicates
                $mergedImages = array_unique(array_merge($filteredExistingImages, $filteredNewImages));

                // Update the venue's images and save
                $venue->update(['images' => json_encode(array_values($mergedImages))]);
            }
        }

        event(new BreadDataUpdated($dataType, $data));

        if (auth()->user()->can('browse', app($dataType->model_name))) {
            $redirect = redirect()->route("voyager.{$dataType->slug}.index");
        } else {
            $redirect = redirect()->back();
        }

        return $redirect->with([
            'message'    => __('voyager::generic.successfully_updated')." {$dataType->getTranslatedAttribute('display_name_singular')}",
            'alert-type' => 'success',
        ]);
    }


    /**
     * POST BRE(A)D - Store data.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $slug = $this->getSlug($request);

        $dataType = Voyager::model('DataType')->where('slug', '=', $slug)->first();
        
        // Check permission
        $this->authorize('add', app($dataType->model_name));

        $storageDisk = getDisk(); // Get current storage disk
        
        // Validate fields with ajax
        $val = $this->validateBread($request->all(), $dataType->addRows)->validate();


         // Initialize an empty array for image URLs
        $imageUrl = [];
        
        if ($storageDisk === 's3') {
            $path = 'venues/' . Carbon::now()->format('FY') . '/';

            if ($request->hasFile('images')) {
                $files = $request->file('images');

                foreach ($files as $file) {
                    // Generate a unique name for the image
                    $imageName = time() . rand(1, 999) . '.webp';

                    // Process and resize the image
                    $image = Image::make($file)
                        ->encode('webp', 90)
                        ->resize(480, 270, function ($constraint) {
                            $constraint->aspectRatio();
                        });

                    

                    // Store in S3 with public visibility
                    Storage::disk('s3')->put($path . $imageName, $image);

                    // Get the S3 URL of the uploaded image
                    $imageUrl[] = $path . $imageName;
                }



                // Update request data dynamically (optional)
                $request->merge(['images' => []]);
            }
        }
        $data = $this->insertUpdateData($request, $slug, $dataType->addRows, new $dataType->model_name());
        

         // Get the venue if it exists
        $venue = Venue::where(['id' => $data->id])->first();
        
        // Function to check if filename contains only numbers before the extension
        function filterOnlyNumbers($image) {
            $filename = pathinfo($image, PATHINFO_FILENAME); // Get filename without extension
            return ctype_digit($filename); // Check if filename contains only numbers
        }

        if ($venue) {
            if (!empty($imageUrl)) {
                // Decode existing images or initialize as an empty array
                $existingImages = json_decode($venue->images, true) ?? [];

                // Filter new and existing images while keeping the full path
                $filteredNewImages = array_filter($imageUrl, function ($image) {
                    return filterOnlyNumbers($image); // Keep only those with numeric filenames
                });

                $filteredExistingImages = array_filter($existingImages, function ($image) {
                    return filterOnlyNumbers($image); // Keep only those with numeric filenames
                });

                // Merge new images with existing ones and remove duplicates
                $mergedImages = array_unique(array_merge($filteredExistingImages, $filteredNewImages));

                // Update the venue's images and save
                $venue->update(['images' => json_encode(array_values($mergedImages))]);
            }
        }



        event(new BreadDataAdded($dataType, $data));

        if (!$request->has('_tagging')) {
            if (auth()->user()->can('browse', $data)) {
                $redirect = redirect()->route("voyager.{$dataType->slug}.index");
            } else {
                $redirect = redirect()->back();
            }

            return $redirect->with([
                'message'    => __('voyager::generic.successfully_added_new')." {$dataType->getTranslatedAttribute('display_name_singular')}",
                'alert-type' => 'success',
            ]);
        } else {
            return response()->json(['success' => true, 'data' => $data]);
        }
    }
}
