<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Request;

class CategoryRequest extends FormRequest
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
                    'name' => 'required',
                    'slug' => 'required',
                    'image' => 'required'
                ];
            case ('PUT'):
                return [
                    'name' => 'required',
                    'slug' => 'required',
                ];
        }

    }
}
