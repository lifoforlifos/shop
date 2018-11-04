<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Request;

class BrandRequest extends FormRequest
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
        switch ($request->method) {
            case ('POST'):
                return [
                    'brand_name' => 'required|unique:brands|max:255',
                    'image' => 'required'
                ];
            case ('PUT'):
                return [
                    'brand_name' => 'required|unique:brands|max:255',
                ];
        }

    }
}
