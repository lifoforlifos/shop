<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'slug', 'price', 'old_price', 'brand_id', 'category_id', 'images', 'updated_at', 'created_at'
    ];

    public function categories()
    {
        return $this->belongsToMany('App\Category');
    }

    public function images()
    {
        return $this->hasMany('App\Image', 'product_id');
    }

    public function brands()
    {
        return $this->belongsToMany('App\Brand');
    }

    public function wishlists()
    {
        return $this->hasMany('App\Wishlist');
    }

}
