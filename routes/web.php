<?php

Route::get('/admin', function () {
    return view('admin');
})->where(['any' => '/admin.*']);

Route::get('/{any}', function () {
    return view('user');
})->where(['any' => '.*']);


