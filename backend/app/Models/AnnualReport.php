<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnnualReport extends Model
{
    protected $guarded = ['id'];
    protected $casts = ['content' => 'array', 'stats' => 'array'];
}
