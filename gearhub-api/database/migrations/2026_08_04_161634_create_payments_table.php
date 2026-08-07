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
        Schema::create('payments', function (Blueprint $table) {
            $table->id('id');

            $table->foreignId('booking_id')
                  ->constrained('bookings', 'id')
                  ->cascadeOnUpdate()
                  ->cascadeOnDelete();

            $table->enum('payment_method', [
                'Cash',
                'Transfer',
                'E-Wallet'
            ]);

            $table->decimal('amount', 12, 2);

            $table->dateTime('payment_date')->nullable();

            $table->enum('status', [
                'Pending',
                'Paid',
                'Failed'
            ])->default('Pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
