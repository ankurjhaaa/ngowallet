<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string');
            $table->timestamps();
        });

        // seed some defaults
        DB::table('settings')->insert([
            ['key' => 'ngo_name', 'value' => 'Bazm-e-Haidri', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'ngo_email', 'value' => 'info@bazm-e-haidri.org', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'ngo_phone', 'value' => '+91 90000 00000', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'ngo_address', 'value' => 'NGO Address, City, State, India', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};