<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        \Illuminate\Support\Facades\DB::table('environments')->upsert([
            ['name' => 'az_production', 'description' => 'AZ production', 'env' => 'production', 'domain' => 'https://admin-zone.adtelligent.com/', 'is_blocked' => true],
            ['name' => 'az_staging', 'description' => 'AZ staging', 'env' => 'staging', 'domain' => 'https://stage.admin-zone.adtelligent.com/', 'is_blocked' => true],
        ], 'name');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
