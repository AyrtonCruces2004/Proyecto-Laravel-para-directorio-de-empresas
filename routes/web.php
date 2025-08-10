<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => view('welcome'));
Route::get('/categorias', fn () => view('categorias'))->name('categorias');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
    // routes/web.php
    Route::get('/api/empresas', function () {
        return \App\Models\Empresa::query()
            ->with(['categoria:id,nombre,slug'])
            ->orderBy('orden')->orderBy('id')->get();
    });
    Route::get('/api/categorias', function () {
        return \App\Models\Categoria::query()
            ->orderBy('orden')->orderBy('id')->get();
    });