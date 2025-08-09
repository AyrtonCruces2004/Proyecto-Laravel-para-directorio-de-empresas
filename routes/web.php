<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\Categoria;
use App\Models\Empresa;

Route::get('/', fn() => view('welcome'))->name('home');
Route::get('/categorias', fn() => view('categorias'))->name('categorias');

Route::get('/db-check', function () {
    DB::connection()->getPdo(); // lanza excepción si falla
    $row = DB::select('SELECT 1 AS ok');
    return ['status' => 'OK', 'db' => $row[0]->ok];
});

// API simples para React
Route::get('/api/categorias', function () {
    return Categoria::query()
        ->orderBy('orden')
        ->orderBy('id')
        ->get();
});

Route::get('/api/empresas', function () {
    return Empresa::query()
        ->with(['categoria:id,nombre,slug'])
        ->orderBy('orden')
        ->orderBy('id')
        ->get();
});