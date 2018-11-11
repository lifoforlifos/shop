<?php

namespace App\Http\Controllers;

use File;
use Illuminate\Http\Request;
use App\Http\Requests\BrandRequest;
use App\Brand;

class BrandController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api-admin', ['except' => 'index']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (request()->pagination != false) {
            $brands = Brand::all();
        } else {
            $brands = Brand::paginate('10');
        }
        return response()
            ->json([
                "brands" => $brands
            ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BrandRequest $request)
    {
        //request image
        $image = $request->file('image');
        $file_name = $image->getClientOriginalName();
        $image->move('storage/images_brand/', $file_name);

        //uploading new brand
        $brand = new Brand();
        $brand->brand_name = $request->brand_name;
        $brand->image = $file_name;
        $brand->save();

        return response()->json([
            'saved' => true
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $brand = Brand::findOrFail($id);

        return response()
            ->json([
                "brand" => $brand
            ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function update(BrandRequest $request, $id)
    {
        $brand = Brand::findOrFail($id);
        $brand->brand_name = $request->brand_name;
        $brand->save();

        return response()
            ->json([
                'updated' => true
            ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $brand = Brand::findOrFail($id);

        $image_path = "storage/images_brand/" . $brand->image;
        if (File::exists($image_path)) {
            File::delete($image_path);
        }
        $brand->delete();

        return response()->json([
            'deleted' => true,
        ], 200);
    }
}
