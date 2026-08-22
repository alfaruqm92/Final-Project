<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EquipmentCategoryController;
use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminDashboardController;


Route::get('/categories', [EquipmentCategoryController::class, 'index']);
Route::get('/categories/{category}', [EquipmentCategoryController::class, 'show']);

Route::get('/equipments', [EquipmentController::class, 'index']);
Route::get('/equipments/{equipment}', [EquipmentController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/payments/notification', [PaymentController::class, 'notification']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);

    Route::post('/categories', [EquipmentCategoryController::class, 'store']);
    Route::put('/categories/{category}', [EquipmentCategoryController::class, 'update']);
    Route::delete('/categories/{category}', [EquipmentCategoryController::class, 'destroy']);

    Route::post('/equipments', [EquipmentController::class, 'store']);
    Route::put('/equipments/{equipment}', [EquipmentController::class, 'update']);
    Route::delete('/equipments/{equipment}', [EquipmentController::class, 'destroy']);

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{booking}', [BookingController::class, 'show']);
    Route::put('/bookings/{booking}', [BookingController::class, 'update']);
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy']);

});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/my-bookings', [BookingController::class, 'myBookings']);

    Route::apiResource('/payments', PaymentController::class);
    Route::post('/bookings/{booking}/cancel', [BookingController::class, 'cancel']);
});
