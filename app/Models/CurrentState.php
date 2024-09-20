<?php

namespace App\Models;

use App\Casts\Serialize;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrentState extends Model
{
    use HasFactory;

    protected $table = 'current_states';
    protected $primaryKey = 'key';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected function casts(): array
    {
        return [
            'value' => Serialize::class,
        ];
    }

}
