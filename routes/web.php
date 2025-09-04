<?php

use App\Http\Middleware\EnsureUserIsOnboarded;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\PromptController::class, 'dashboard'])->name('dashboard')->middleware(EnsureUserIsOnboarded::class);
    Route::get('onboarding', [\App\Http\Controllers\PromptController::class, 'onboarding'])->name('onboarding');
    Route::get('preferences', [\App\Http\Controllers\PromptController::class, 'preferences'])->name('preferences');
    Route::post('preferences', [\App\Http\Controllers\PromptController::class, 'storePreferences'])->name('storePreferences');
    Route::post('prompt/{prompt}/response', [\App\Http\Controllers\PromptController::class, 'saveResponse'])->name('saveResponse');
    Route::post('prompt/{prompt}/analyze', [\App\Http\Controllers\PromptController::class, 'analyze'])->name('analyzeResponse');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
