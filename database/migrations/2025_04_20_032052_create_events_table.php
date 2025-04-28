<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('series_id')->constrained()->onDelete('restrict');
            $table->foreignId('tenant_id')->constrained()->onDelete('restrict');
            $table->foreignId('category_id')->nullable()->constrained();
            $table->string('name');
            $table->text('short_description')->nullable();
            $table->text('long_description')->nullable();
            $table->longText('know_before_you_go')->nullable();
            $table->string('image')->nullable();
            $table->string('streetaddress1')->nullable();
            $table->string('streetaddress2')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('country')->nullable();
            $table->string('postal')->nullable();
            $table->enum('format', ['online', 'in-person', 'hybrid'])->default('in-person');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->integer('capacity')->nullable();
            $table->boolean('has_guests')->default(false);
            $table->integer('guest_limit')->default(0);
            $table->boolean('is_sold_out')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_private')->default(false);
            $table->decimal('cost', 8, 2)->default(0.00);
            $table->decimal('early_bird_cost', 8, 2)->default(0.00);
            $table->dateTime('early_bird_end')->nullable();
            $table->enum('waitlist_type', ['none', 'manual', 'automatic'])->default('none');
            $table->boolean('waitlist_enabled')->default(false);
            $table->dateTime('registration_cutoff')->nullable();
            $table->boolean('discount_code_enabled')->default(false);
            $table->string('custom_link')->nullable();
            $table->string('cost_centre')->nullable();
            $table->string('accounting_code')->nullable();
            $table->boolean('promo_page_enabled')->default(true);
            $table->boolean('is_archived')->default(false);
            $table->string('event_code')->unique()->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
