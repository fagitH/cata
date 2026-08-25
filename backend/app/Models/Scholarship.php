<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scholarship extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'deadline' => 'date',
        'requirements' => 'array',
    ];
}
