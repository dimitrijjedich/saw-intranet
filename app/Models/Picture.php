<?php

namespace App\Models;

use App\Events\PictureEvent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $dispatchesEvents = [
        'created' => PictureEvent::class,
    ];
}
