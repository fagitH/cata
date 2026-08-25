<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('management_members')) {
            Schema::create('management_members', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('title');
                $table->text('bio')->nullable();
                $table->string('image')->nullable();
                $table->unsignedInteger('sort_order')->default(0)->index();
                $table->timestamps();
            });
        }

        if (DB::table('management_members')->count() === 0) {
            $now = now();
            DB::table('management_members')->insert([
                ['name' => 'Neak Oknha Datuk Dr. Othsman Hassan', 'title' => 'Chair of Board Director', 'bio' => "Provides overall leadership, chairs meetings, and ensures the board's effectiveness in governance.", 'sort_order' => 1, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'His Excellency Mr. Sman Manan', 'title' => 'Vice Chair of Board Director', 'bio' => 'Supports the Chair, steps in when the Chair is unavailable, and may oversee specific projects or initiatives and collaborate with partners/donors overseas.', 'sort_order' => 2, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'His Excellency Mr. Rofy Othsman', 'title' => 'Vice Chair of Board Director', 'bio' => 'Supports the Chair, steps in when the Chair is unavailable, and may oversee specific projects or initiatives and leading The Muslim Youth Cambodia.', 'sort_order' => 3, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Mr. Saman SEN', 'title' => 'Executive Director', 'bio' => "Manages day-to-day CATA's operations, leads the strategic implementation of programs, and reports to the board.", 'sort_order' => 4, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Her Excellency Mrs. Loh Saroh', 'title' => 'Board Members (Treasurer)', 'bio' => "Oversees the association's financial health, including budgeting, audits, and financial reporting.", 'sort_order' => 5, 'created_at' => $now, 'updated_at' => $now],
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('management_members');
    }
};
