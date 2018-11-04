<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name', 'slug', 'image',
    ];

    public function parent()
    {
        return $this->belongsTo('App\Category', 'category_id');
    }

    public function children()
    {
        return $this->hasMany('App\Category', 'category_id', 'id');
    }

    public static function tree()
    {
        return static::with(implode('.', array_fill(0, 4, 'children')))->where('category_id', '=', null)->get();
    }
}
