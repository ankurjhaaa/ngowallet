<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('price');
            $table->string('session');
            $table->timestamps();
        });
        DB::table('plans')->insert([
            ['title' => 'Basic', 'price' => '3000', 'session' => 'yearly'],
            ['title' => 'Standard', 'price' => '4000', 'session' => 'yearly'],
            ['title' => 'Premium', 'price' => '5000', 'session' => 'yearly'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
