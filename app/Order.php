<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'first_name', 'last_name', 'billing_address', 'billing_city',
        'billing_province', 'billing_postalcode', 'billing_phone', 'billing_discount',
        'billing_discount_code', 'billing_subtotal', 'billing_total', 'random', 'source'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function products()
    {
        return $this->belongsToMany('App\Product')->withPivot('quantity');
    }
}
