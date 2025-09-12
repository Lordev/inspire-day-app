<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['web', 'auth', 'verified'])->group(function () {
    Route::post('prompt/{prompt}/analyze', [\App\Http\Controllers\AppController::class, 'analyze'])
        ->name('api.analyzeResponse')
        ->middleware('throttle:analyze');
});
