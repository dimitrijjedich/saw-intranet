<?php

use App\Models\Picture;
use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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

    Route::post('/create/{data}', function (string $data) {
        Quote::factory()->create(['quote'=>$data]);
        return "OK";
    })->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);
});

Route::group(['prefix' => 'picture'], function () {
    Route::get('/', function () {
        return Picture::orderBy('created_at', 'DESC')->take(10)->get();
    });

    Route::post('/create', function (Request $request) {
        if (!$request->hasFile('file')) {
            return response('No file found', 400);
        }
        $file = $request->file('file');
        if (!$file->isValid()) {
            return response('Invalid file upload', 400);
        }
        $name = bin2hex(random_bytes(50)). '.' . $request->file('file')->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('', $request->file('file'), $name);
        Picture::create(['path' => Storage::url($name)]);
        return "OK";
    })->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);
});
