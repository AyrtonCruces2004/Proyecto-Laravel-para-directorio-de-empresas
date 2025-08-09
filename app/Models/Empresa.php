<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = 'empresas';
    protected $fillable = [
        'nombre','email','telefono','direccion','website','facebook','youtube','tiktok',
        'descripcion','urlfoto','publicado','orden','visitas','categoria_id','user_id',
    ];
    protected $casts = [
        'publicado' => 'boolean',
        'orden' => 'integer',
        'visitas' => 'integer',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
