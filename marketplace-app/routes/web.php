<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReviewController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/productslist', [ProductController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('productslist');

    
    Route::middleware('auth')->group(function () {
        Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');    
        Route::get('/cart', fn() => Inertia('Cart'));
        Route::post('/checkout', [OrderController::class, 'store']);
        Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    });

    Route::middleware(['auth', 'sealler'])->group(function () {
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::get('/my-products', [ProductController::class, 'myProducts'])->name('products.mine');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}/update', [ProductController::class, 'update'])->name('products.update');
    });

require __DIR__.'/settings.php';
