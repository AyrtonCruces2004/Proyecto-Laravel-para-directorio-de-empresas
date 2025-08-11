<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;


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
Route::middleware(['auth','verified'])->group(function () {
    Route::view('/components/users', 'users')->name('users');
    // y más adelante:
    // Route::view('/admin/categorias', 'admin.categorias')->name('admin.categorias');
    // Route::view('/admin/empresas',  'admin.empresas')->name('admin.empresas');
  });
// routes/web.php

Route::middleware(['auth','verified'])->get('/users/data', [UserController::class, 'index']);
Route::middleware(['auth','verified'])
    ->get('/users/{id}/edit', function ($id) {
        // 404 si no existe
        abort_unless(\App\Models\User::whereKey($id)->exists(), 404);
        return view('users_edit', ['userId' => $id]);
    })
    ->name('users.edit');

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

    Route::middleware(['auth','verified'])->group(function () {
        Route::get('/users/show/{id}', fn ($id) =>
            User::select('id','name','email')->findOrFail($id)
        );
    
        Route::put('/users/{id}', function (Request $r, $id) {
            $data = $r->validate(['name' => ['required','string','max:255']]);
            $u = User::findOrFail($id);
            $u->name = $data['name'];
            $u->save();
            return ['ok' => true];
        });
    });