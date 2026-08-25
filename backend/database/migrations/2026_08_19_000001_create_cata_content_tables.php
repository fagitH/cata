<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('contacts')) {
            Schema::create('contacts', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email');
                $table->string('phone')->nullable();
                $table->string('subject');
                $table->text('message');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('report_items')) {
            Schema::create('report_items', function (Blueprint $table) {
                $table->id();
                $table->string('report_id')->nullable()->index();
                $table->text('description');
                $table->string('amount');
                $table->string('tag')->nullable();
                $table->string('image')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('newsletters')) {
            Schema::create('newsletters', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('pdf_url')->nullable();
                $table->string('image_url')->nullable();
                $table->json('image_urls')->nullable();
                $table->timestamps();
            });
        }

        if (Schema::hasTable('annual_reports') && !Schema::hasColumn('annual_reports', 'stats')) {
            Schema::table('annual_reports', function (Blueprint $table) {
                $table->json('stats')->nullable()->after('image');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('newsletters');
        Schema::dropIfExists('report_items');
        Schema::dropIfExists('contacts');
    }
};
