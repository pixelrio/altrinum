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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('series_id')->constrained()->onDelete('cascade');
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('streetaddress1')->nullable();
            $table->string('streetaddress2')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('country')->nullable();
            $table->string('postal')->nullable();
            $table->enum('format', ['online', 'in-person', 'hybrid'])->default('in-person');
            $table->string('primaryContact');
            $table->string('primaryContactTitle');
            $table->string('primaryContactPhone');
            $table->string('primaryContactEmail');
            $table->string('secondaryContact');
            $table->string('secondaryContactTitle');
            $table->string('secondaryContactPhone');
            $table->string('secondaryContactEmail');
            $table->integer('cost');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->integer('capacity')->nullable();
            $table->integer('guest_limit')->default(0);
            $table->boolean('is_sold_out')->default(false);
            $table->boolean('is_active')->default(true);
            $table->foreignId('category_id')->nullable();
            $table->enum('waitlist_type', ['none', 'manual', 'automatic'])->default('none');
            $table->dateTime('early_bird_end')->nullable();
            $table->string('custom_link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
