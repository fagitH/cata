<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $guarded = ['id'];
    protected $casts = ['donor_address' => 'array', 'amount' => 'decimal:2'];
}
