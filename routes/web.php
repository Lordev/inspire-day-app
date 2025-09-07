<?php

use App\Http\Middleware\EnsureUserIsOnboarded;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\AppController::class, 'dashboard'])->name('dashboard')->middleware(EnsureUserIsOnboarded::class);
    Route::get('onboarding', [\App\Http\Controllers\AppController::class, 'onboarding'])->name('onboarding');
    Route::post('preferences', [\App\Http\Controllers\AppController::class, 'storePreferences'])->name('storePreferences');
    Route::post('prompt/{prompt}/response', [\App\Http\Controllers\AppController::class, 'saveResponse'])->name('saveResponse');
    Route::post('prompt/{prompt}/analyze', [\App\Http\Controllers\AppController::class, 'analyze'])
    ->name('analyzeResponse')
    ->middleware('throttle:analyze');
    Route::get('statistics', [\App\Http\Controllers\AppController::class, 'getStatistics'])->name('getStatistics');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
