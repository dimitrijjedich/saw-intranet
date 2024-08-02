<?php

use App\Models\Quote;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/event/{data}', function (string $data) {
    (new \App\Events\MyEvent($data))->dispatch($data);
    return "OK";
});

Route::group(['prefix' => 'quote'], function () {
    Route::get('/', function () {
        return Quote::orderBy('created_at', 'DESC')->take(10)->get();
    });

    Route::get('/create/{data}', function (string $data) {
        Quote::factory()->create(['quote'=>$data]);
        return "OK";
    });
});
