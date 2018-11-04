<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'paragraph', 'headline', 'category_slug', 'file'
    ];


    public function categories()
    {
        return $this->belongsToMany('App\Category');
    }
}
