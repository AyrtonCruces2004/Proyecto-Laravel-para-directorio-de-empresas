<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categorias';

    protected $fillable = [
        'nombre',
        'slug',
        'descripcion',
        'menu',
        'orden',
        'urlfoto',
    ];

    protected $casts = [
        'menu' => 'boolean',
        'orden' => 'integer',
    ];

    public function empresas()
    {
        return $this->hasMany(Empresa::class, 'categoria_id');
    }
}


