<?php

namespace App\Http\Controllers;

use App\Image;
use App\Product;
use App\Category;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::paginate('6');
        return response()->json([
            'products' => $products
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        //perecentage off
        $percentage_off = isset($request->old_price) ? ((($request->old_price - $request->price) / $request->old_price) * 100) : 0;
        //save post
        $product = new Product($request->except('percentage_off', 'slug', 'category_id', 'brand_id', 'images'));
        $product->slug = str_replace(' ', '-', $request->slug);
        $product->percentage_off = $percentage_off;
        $product->save();

        //save images
        $this->imageSave($product->id, $request);
        //save brands and categories
        $this->brandCat($product, $request);

        return response()
            ->json([
                'save' => 'true'
            ], 200);
    }
    /**
     * Create image
     *
     * @return \Illuminate\Http\Response
     */

    private function imageSave($product_id, $request)
    {

        if (!empty($request->file('images'))) {
            foreach ($request->file('images') as $image) {
                $filename = $request->image->getClientOriginalName();
                $request->image->move('storage/images_product/', $filename);
                $images = new Image();
                $images->file = $name;
                $images->product_id = $product_id;
                $images->save();
            }
        }
    }

    /**
     * Create brands categories
     *
     * @return \Illuminate\Http\Response
     */

    private function brandCat($product, $request)
    {
        //save brand
        $product->brands()->attach($request->brand_id);
        //save category
        $category_id = $request->category_id;
        $category_parent = Category::whereHas('children', function ($query) use ($category_id) {
            $query->where('id', $category_id);
        })->first();
        $product->categories()->attach($category_id, ['parent_id' => !empty($category_parent->id) ? $category_parent->id : null]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::with('images', "brands")
            ->findOrFail($id);

        return response()->json([
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        //perecentage off
        $percentage_off = isset($request->old_price) ? ((($request->old_price - $request->price) / $request->old_price) * 100) : 0;

        $product = Product::findorFail($id);
        $product->name = $request->name;
        $product->description = $request->description;
        $product->slug = $request->slug;
        $product->price = $request->price;
        $product->percentage_off = $percentage_off;
        $product->save();

        //save images
        $this->imageSave($product->id, $request);
        //save brands and categories
        $this->brandCat($product, $request);

        return response()->json([
            'updated' => true
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::where('id', $id)
            ->delete();
        $images = Image::where('product_id', $id)
            ->get();

        foreach ($images as $image) {
            $image_path = "storage/images_product/" . $image->file;
            if (File::exists($image_path)) {
                File::delete($image_path);
            }
            $image->delete();
        }

        return response()->json([
            'deleted' => true
        ], 200);
    }
}
