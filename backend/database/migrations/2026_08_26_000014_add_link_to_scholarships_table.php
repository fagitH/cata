<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
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
                $table->string('link')->nullable();
                $table->string('status')->default('active')->index();
                $table->timestamps();
            });
        } elseif (!Schema::hasColumn('scholarships', 'link')) {
            Schema::table('scholarships', function (Blueprint $table) {
                $table->string('link')->nullable()->after('image');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('scholarships')) {
            Schema::table('scholarships', function (Blueprint $table) {
                if (Schema::hasColumn('scholarships', 'link')) {
                    $table->dropColumn('link');
                }
            });
        }
    }
};
