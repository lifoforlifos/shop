<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderProduct;
use Illuminate\Http\Request;
use Auth;
use App\Http\Requests\OrderRequest;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrderRequest $request)
    {
        // Insert into orders table
        $order = new Order();
        $order->random = md5(time());
        $order->status = 'pending';
        $order->billing_email = auth()->guard('api')->user()->email;
        $order->user_id = auth()->guard('api')->user()->id;
        $order->first_name = $request->first_name;
        $order->last_name = $request->last_name;
        $order->billing_address = $request->street_address;
        $order->billing_city = $request->city;
        $order->billing_postalcode = $request->postcode;
        $order->billing_phone = $request->phone_number;
        $order->billing_discount = isset($request->coupon_value) ? $request->coupon_value : 0.00;
        $order->billing_discount_code = $request->coupon;
        $order->billing_subtotal = $request->subtotal;
        $order->billing_total = $request->total_cost;
        $order->save();

        // Insert into order_product table
        foreach (json_decode($request->session_cart) as $item) {
            OrderProduct::create([
                'order_id' => $order->id,
                'product_id' => $item->id,
                'quantity' => $item->count,
            ]);
        }
        return response()->json([
            "stored" => auth()->guard('api')->user()->email
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
