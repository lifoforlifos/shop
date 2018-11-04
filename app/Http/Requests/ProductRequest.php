<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Request;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {
        switch ($request->method()) {
            case ('POST'):
                return [
                    'name' => 'required|unique:products|max:255',
                    'description' => 'required|max:3000',
                    'slug' => 'required|unique:products',
                    'price' => 'required',
                    'old_price' => 'required',
                    'brand_id' => 'required',
                    'category_id' => 'required',
                    'images' => 'required'
                ];
            case ('PUT'):
                return [
                    'name' => 'required|max:255',
                    'description' => 'required|max:3000',
                    'slug' => 'required',
                    'price' => 'required',
                    'old_price' => 'required',
                    'brand_id' => 'required',
                    'category_id' => 'required',
                ];
        }

    }
}
