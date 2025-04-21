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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('primary_fname');
            $table->string('primary_lname');
            $table->string('legal_fname');
            $table->string('legal_lname');
            $table->string('preferred_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->enum('status', ['confirmed', 'cancelled'])->default('confirmed');
            $table->string('confirmation_code')->unique();
            $table->decimal('donation_total', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
