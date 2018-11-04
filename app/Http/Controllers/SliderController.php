<?php

namespace App\Http\Controllers;

use App\Slider;
use File;
use Illuminate\Http\Request;
use App\Http\Requests\SliderRequest;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sliders = Slider::paginate(10);

        return response()->json([
            "sliders" => $sliders
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SliderRequest $request)
    {
         //store images
        $image = $request->file('image');
        $name = $image->getClientOriginalName();
        $image->move('storage/slider_image/', $name);

        $slider = new Slider($request->except('file'));
        $slider->file = $name;
        $slider->save();

        return response()->json([
            'saved' => true
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $slider = Slider::findOrFail($id);

        return response()->json([
            'slider' => $slider
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function update(SliderRequest $request, $id)
    {
        $slider = Slider::findOrFail($id);
        $slider->paragraph = $request->paragraph;
        $slider->headline = $request->headline;
        $slider->category_slug = $request->category_radio;
        $slider->save();

        return response()->json([
            'updated' => true
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $slider = Slider::findOrFail($id);

        $image_path = "storage/images_slider/" . $slider->file;
        if (File::exists($image_path)) {
            File::delete($image_path);
        }
        $slider->delete();

        return response()->json([
            'deleted' => true
        ], 200);
    }
}
