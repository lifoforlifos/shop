<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Request;

class SliderRequest extends FormRequest
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
                    'paragraph' => 'required',
                    'headline' => 'required',
                    'image' => 'required',
                    'category_slug' => 'required'
                ];
            case ('PUT'):
                return [
                    'paragraph' => 'required',
                    'headline' => 'required',
                    'category_slug' => 'required',
                ];
        }

    }
}
