<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Environment extends Model
{
    use HasFactory;

    protected $table = 'environments';
    protected $primaryKey = 'name';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'domain',
        'env',
    ];

    protected function domain(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => rtrim(strtolower($value), '/') . '/',
        );
    }

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => strtolower($value),
        );
    }

    protected function casts():array
    {
        return [
            'env' => \App\Enums\Environment::class,
        ];
    }
}
