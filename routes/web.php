<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/', fn() => view('welcome'))->name('home');
Route::get('/categorias', fn() => view('categorias'))->name('categorias');

Route::get('/db-check', function () {
    DB::connection()->getPdo(); // lanza excepción si falla
    $row = DB::select('SELECT 1 AS ok');
    return ['status' => 'OK', 'db' => $row[0]->ok];
});