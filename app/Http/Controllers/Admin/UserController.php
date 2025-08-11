<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $r)
    {
        $q = $r->string('q')->toString();

        return User::when($q, fn($w) =>
                    $w->where(fn($s)=>$s
                        ->where('name','like',"%{$q}%")
                        ->orWhere('email','like',"%{$q}%")
                    )
                )
                ->select('id','name','email','created_at')
                ->orderByDesc('id')
                ->paginate(10);
    }
}   
