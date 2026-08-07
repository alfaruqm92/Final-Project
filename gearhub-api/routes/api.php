<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EquipmentCategoryController;
use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/categories', EquipmentCategoryController::class);
Route::apiResource('/equipments', EquipmentController::class);
Route::apiResource('/bookings', BookingController::class);
Route::apiResource('/payments', PaymentController::class);
