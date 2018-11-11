<?php

namespace App\Http\Controllers;

use App\Category;
use File;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
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
        if (request()->pagination) {
            $categories = Category::tree();
        } else {
            $categories = Category::with('children')
                ->paginate(10);
        }
        return response()
            ->json([
                'categories' => $categories,

                "request" => request()->pagination
            ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
        $image = $request->file('image');
        $name = $image->getClientOriginalName();
        $image->move('storage/category_image/', $name);

        $category = new Category();
        $category->name = $request->name;
        $category->slug = str_replace(' ', '-', $request->slug);
        $category->category_id = $request->cateogry_radio;
        $category->image = $name;
        $category->save();

        return response()
            ->json([
                'saved' => true
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::findorFail($id);

        return response()
            ->json([
                'category' => $category
            ], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->slug = str_replace(' ', '-', $request->slug);
        $category->category_id = $request->category_radio;
        $category->save();

        return response()
            ->json([
                'updated' => true
            ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $image_path = "storage/category_image/" . $category->image;
        if (File::exists($image_path)) {
            File::delete($image_path);
        }
        $category->delete();

        return response()->json([
            'deleted' => true
        ], 200);
    }
}
