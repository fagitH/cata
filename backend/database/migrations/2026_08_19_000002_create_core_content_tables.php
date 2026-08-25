<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('banners')) {
            Schema::create('banners', function (Blueprint $table) {
                $table->id();
                $table->text('image');
                $table->string('title');
                $table->text('description')->nullable();
                $table->string('link')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('news')) {
            Schema::create('news', function (Blueprint $table) {
                $table->id();
                $table->string('slug')->unique();
                $table->string('title');
                $table->string('date')->nullable();
                $table->string('author')->nullable();
                $table->string('category')->nullable()->index();
                $table->string('image')->nullable();
                $table->string('cover_image')->nullable();
                $table->text('excerpt')->nullable();
                $table->json('content')->nullable();
                $table->json('images')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('donation_projects')) {
            Schema::create('donation_projects', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('category')->nullable();
                $table->text('description')->nullable();
                $table->string('image')->nullable();
                $table->decimal('goal_amount', 12, 2)->default(0);
                $table->decimal('collected_amount', 12, 2)->default(0);
                $table->string('status')->default('active')->index();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('donations')) {
            Schema::create('donations', function (Blueprint $table) {
                $table->id();
                $table->string('transaction_id')->unique();
                $table->string('donor_name');
                $table->string('donor_email')->nullable();
                $table->string('donor_phone')->nullable();
                $table->json('donor_address')->nullable();
                $table->decimal('amount', 12, 2)->default(0);
                $table->string('payment_method')->nullable();
                $table->string('campaign_title')->nullable();
                $table->string('status')->default('pending')->index();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('scholarships')) {
            Schema::create('scholarships', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('description')->nullable();
                $table->decimal('amount', 12, 2)->nullable();
                $table->date('deadline')->nullable();
                $table->json('requirements')->nullable();
                $table->string('contact_email')->nullable();
                $table->string('image')->nullable();
                $table->string('status')->default('active')->index();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('annual_reports')) {
            Schema::create('annual_reports', function (Blueprint $table) {
                $table->id();
                $table->string('slug')->unique();
                $table->string('title');
                $table->integer('year')->nullable()->index();
                $table->text('description')->nullable();
                $table->json('content')->nullable();
                $table->string('pdf_url')->nullable();
                // $table->string('image')->nullable();
                $table->json('stats')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('annual_reports');
        Schema::dropIfExists('scholarships');
        Schema::dropIfExists('donations');
        Schema::dropIfExists('donation_projects');
        Schema::dropIfExists('news');
        Schema::dropIfExists('banners');
    }
};
