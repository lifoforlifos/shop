<?php

namespace App\Http\Controllers;

use App\Brand;
use App\Slider;
use App\product;
use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LandingPageController extends Controller
{
    public function index()
    {
        $popular_products = product::with('images')
            ->limit(10)
            ->get();

        $sliders = Slider::limit(10)
            ->get();

        return response()
            ->json([
                'currency_info' => currency_changer(),
                'popular_products' => $popular_products,
                'sliders' => $sliders
            ]);

    }

    public function shop($category_name)
    {
        $brands = [];
        $categories = [];
        //gets categories and brands ids that are related to category name
        $category_id = Category::where('slug', $category_name)->first();
        $categories[] = $category_id;
        $category_products = DB::table('category_product')
            ->where('parent_id', $category_id->id)
            ->orWhere('category_id', $category_id->id)
            ->join('brand_product', 'category_product.product_id', '=', 'brand_product.product_id')
            ->get();
        //storing the values in brands and categories arrays
        foreach ($category_products as $category_product) {
            $brand = Brand::where('id', $category_product->brand_id)
                ->first();
            $brands[] = $brand;
            $category = Category::where('id', $category_product->category_id)
                ->first();
            $categories[] = $category;
        }

        //pushing all related categories names together in case of selecting the parent id
        $categories_slugs = Category::where('category_id', $category_id->id)
            ->pluck('slug');
        $categories_slug = $categories_slugs->push($category_name);

        //a mix of search for related products
        $products = product::with('brands', 'images', 'categories.children', 'wishlists')
            ->whereHas('categories', function ($query) use ($categories_slug) {
                $query->whereIn('slug', $categories_slug);
            })
            ->when(request()->brand_name, function ($query) {
                $query->whereHas('brands', function ($query) {
                    $query->where('brand_name', request()->brand_name);
                });
            })
            ->when(request()->q, function ($query) {
                return $query->where('name', 'like', '%' . request()->q . '%');
            })
            ->when(request()->selected, function ($query) {
                if (request()->selected === 'low') {
                    return $query->orderBy('price');
                } elseif (request()->selected === 'hight') {
                    return $query->orderBy('price', 'desc');
                } elseif (request()->selected === 'newest') {
                    return $query->orderBy('created_at', 'desc');
                }
            })
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()
            ->json([
                'currency_info' => currency_changer(),
                'products' => $products,
                'brands' => array_unique($brands),
                'categories' => array_unique($categories),
            ]);

    }
}
