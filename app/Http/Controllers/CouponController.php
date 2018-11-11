<?php

namespace App\Http\Controllers;

use App\Coupon;
use Illuminate\Http\Request;
use App\Http\Requests\CouponRequest;

class CouponController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api-admin', ['except' => 'check']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $coupons = Coupon::paginate(20);

        return response()->json([
            'coupons' => $coupons
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CouponRequest $request)
    {
        $coupon = new Coupon($request->all());
        $coupon->save();

        return response()->json([
            'saved' => true
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $coupon = Coupon::findOrFail($id);
        return response()->json([
            'coupon' => $coupon
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function update(CouponRequest $request, $id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->coupon = $request->coupon;
        $coupon->value = $request->value;
        $coupon->save();

        return response()->json([
            'updated' => true,
            'id' => $request->all()
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $coupon = Coupon::findOrFail($id)
            ->delete();
        return response()->json([
            'deleted' => true
        ], 200);
    }

    /**
     * Check if coupon exsists
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function check(Request $request)
    {
        $this->validate($request, [
            'coupon' => 'required|max:255',
        ]);

        $coupon = Coupon::where('coupon', $request->coupon)->first();

        if (!$coupon) {
            return response()->json([
                'errors' => 'Coupon not found'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'coupon' => $coupon
        ], 200);
    }
}
