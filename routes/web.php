<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => view('welcome'))->name('home');
Route::get('/categorias', fn() => view('categorias'))->name('categorias');
