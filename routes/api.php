<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('/currentstate')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\CurrentStateController::class, 'index']);
    Route::post('/store', [\App\Http\Controllers\Api\CurrentStateController::class, 'store']);
});

Route::prefix('/reports')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\CurrentStateController::class, 'reports']);
    Route::post('/add', [\App\Http\Controllers\Api\CurrentStateController::class, 'reportAdd']);
});

Route::apiResource('/env', \App\Http\Controllers\Api\EnvironmentController::class);

Route::prefix('/statistic')->group(function () {
    Route::post('/metrics', [\App\Http\Controllers\Api\StatisticController::class, 'metrics']);
});
