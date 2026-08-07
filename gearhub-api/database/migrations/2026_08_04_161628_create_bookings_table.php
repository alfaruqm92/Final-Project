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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id('id');

            $table->foreignId('user_id')
                  ->constrained('users', 'id')
                  ->cascadeOnUpdate()
                  ->cascadeOnDelete();

            $table->foreignId('equipment_id')
                  ->constrained('equipments')
                  ->cascadeOnUpdate()
                  ->restrictOnDelete();

            $table->date('pickup_date');

            $table->date('return_date');

            $table->integer('total_days');

            $table->decimal('total_price', 12, 2);

            $table->enum('status', [
                'pending',
                'approved',
                'on_rent',
                'returned',
                'completed',
                'cancelled'
            ])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
