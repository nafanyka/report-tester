<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('currentstate')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\CurrentStateController::class, 'index']);
    Route::post('/store', [\App\Http\Controllers\Api\CurrentStateController::class, 'store']);
});

Route::apiResource('env', \App\Http\Controllers\Api\EnvironmentController::class);
