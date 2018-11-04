<?php

//user
Route::group([
    'prefix' => 'auth'
], function ($router) {

    Route::post('login', 'UserController@login');
    Route::post('register', 'UserController@register');
    Route::post('logout', 'UserController@logout');
    Route::post('refresh', 'UserController@refresh');
    Route::post('me', 'UserController@me');

});

//landing page
Route::get('/product/landingpage', [
    'uses' => 'LandingPageController@index'
]);

//coupon check
Route::get('/coupon/check', [
    'uses' => 'CouponController@check',
    'as' => 'coupon.check'
]);

Route::get('/product/get/{category_slug?}', [
    'uses' => 'LandingPageController@shop'
]);


Route::apiResources([
    'products' => 'ProductController',
    'categories' => 'CategoryController',
    'brands' => 'BrandController',
    'coupons' => 'CouponController',
    'sliders' => 'SliderController',
    'orders' => "OrderController"
]);
