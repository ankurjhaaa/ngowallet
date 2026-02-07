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
            $table->string('name');                 // Donation 1000, Gold
            $table->bigInteger('yearly_amount');
            $table->integer('duration_years')->default(1);
            $table->timestamps();
        });
        DB::table('plans')->insert([
            ['name' => 'Basic', 'yearly_amount' => 3000, 'duration_years' => 1],
            ['name' => 'Standard', 'yearly_amount' => 4000, 'duration_years' => 1],
            ['name' => 'Premium', 'yearly_amount' => 5000, 'duration_years' => 1],
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
