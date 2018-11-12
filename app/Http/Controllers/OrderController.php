<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderProduct;
use Illuminate\Http\Request;
use Auth;
use App\Http\Requests\OrderRequest;
use App\Mail\OrderPlaced;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['only' => 'store']);
        //$this->middleware('auth:api-admin', ['only' => 'store', 'index']);

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
        $order->billing_email = auth('api')->user()->email;
        $order->user_id = auth('api')->user()->id;
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
            "saved" => true
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::with('products.images')
            ->findOrFail($id);

        return response()->json([
            'order' => $order
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        if (!empty($request->status)) {
            $order = Order::where('id', $request->id)->update(['status' => $request->status]);
            //Mail::send(new OrderPlaced($order, $request->status));

            return response()->json([
                'success' => true,
                'order' => $order
            ], 200);
        }
        return response()->json([
            'errors' => $request->all()
        ], 422);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function status($status = 0)
    {
        $order = Order::where('status', $status)
            ->get();
        return response()->json([
            'order' => $order
        ], 200);
    }
}
