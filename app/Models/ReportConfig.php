<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportConfig extends Model
{
//    use HasFactory;
    protected $table = 'report_configs';
    protected $fillable = ['report', 'type', 'instance_name', 'value'];

    protected $casts = [
        'value' => 'json',
    ];
}
