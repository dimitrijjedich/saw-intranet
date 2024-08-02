<?php

namespace App\Models;

use App\Events\QuoteEvent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;

    protected $dispatchesEvents = [
        'created' => QuoteEvent::class,
    ];
}
