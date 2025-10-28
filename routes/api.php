<?php

use App\Http\Controllers\GeneralController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(
    [
        'middleware' => 'api',
    ],
    function ($router) {
        Route::get('get-profit', [GeneralController::class, 'claimProfit']);
        Route::get('get-history', [GeneralController::class, 'getHistory']);
        Route::get('get-all-history', [GeneralController::class, 'getAllHistory']);
        Route::get('get-reward', [GeneralController::class, 'getReward']);
        Route::post('exchange', [GeneralController::class, 'exchange']);
        Route::post('withdraw', [GeneralController::class, 'withdraw']);
    }
);