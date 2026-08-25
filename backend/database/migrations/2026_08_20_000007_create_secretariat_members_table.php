<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('secretariat_members')) {
            Schema::create('secretariat_members', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('title');
                $table->text('role')->nullable();
                $table->string('image')->nullable();
                $table->unsignedInteger('sort_order')->default(0)->index();
                $table->timestamps();
            });
        }

        if (DB::table('secretariat_members')->count() === 0) {
            $now = now();
            DB::table('secretariat_members')->insert([
                ['name' => 'Saman SEN', 'title' => 'Executive Director', 'role' => 'Overall Executive Management & Strategic Execution', 'sort_order' => 1, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Sokry Fy', 'title' => 'Administration and Senior Finance Officer', 'role' => 'Financial Operations & Administrative Management', 'sort_order' => 2, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Sapirin Soprey', 'title' => 'Program Innovation & Senior Marketing Officer', 'role' => 'Program Development & Outreach Marketing', 'sort_order' => 3, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Neang Bovyna', 'title' => 'Membership Services Executive (Internship)', 'role' => 'Member Support & Community Relations', 'sort_order' => 4, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Solaiman Rohanan', 'title' => 'Membership Services Executive (Internship)', 'role' => 'Member Relations & Onboarding Assistance', 'sort_order' => 5, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Hosanita Hosen', 'title' => 'Graphic Design Assistant (Internship)', 'role' => 'Media Design & Visual Branding Support', 'sort_order' => 6, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'EL SUFINA', 'title' => 'Membership Services Executive (Internship)', 'role' => 'Member Services & Operational Operations', 'sort_order' => 7, 'created_at' => $now, 'updated_at' => $now],
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('secretariat_members');
    }
};
