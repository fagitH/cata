<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shariah_advisory_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('role')->nullable();
            $table->json('education')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });

        if (DB::table('shariah_advisory_members')->count() === 0) {
            $now = now();
            DB::table('shariah_advisory_members')->insert([
                ['name' => 'H.E No Mathsath', 'role' => 'Deputy Secretary General, Ministry of Culture and Religion', 'education' => json_encode(['Bachelor’s Degree in Business Management, National University of Management, Cambodia', 'Completed Islamic Law and Discipline', 'Completed the Highest Islamic Council Training']), 'sort_order' => 1, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Ustaz Sit Ilyes', 'role' => 'Islamic Teacher, Noorul Iman High School', 'education' => json_encode(['Bachelor’s Degree in Islamic Law, Imam Muhammad bin Saud Islamic University, Saudi Arabia', 'Master’s Degree, Madinah International University, Malaysia', 'Ph.D. Candidate, Madinah International University, Malaysia']), 'sort_order' => 2, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Ustaz. Aly Mosa', 'role' => 'Assistant to H.E Neak Oknha Datuk Dr. Othsman Hassan, Senior Minister in Charge of Special Mission', 'education' => json_encode(['Bachelor’s Degree in Islamic Law, Imam Muhammad bin Saud Islamic University, Saudi Arabia']), 'sort_order' => 3, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Ustaz. Tres Mansor', 'role' => 'Islamic Teacher, Annikmah School Phnom Penh', 'education' => json_encode(['Bachelor Islamic Law at Islamic University Al Madinah Almunawwarah, Saudi Arabia']), 'sort_order' => 4, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Ustaz. Sary Sles', 'role' => 'Teacher at Buranakarn Suksa Witya School, Pattani, Thailand', 'education' => json_encode(['Bachelor’s degree from Prince of Songkla University Pattani Campus (Major Islamic Studies International program)', 'Master of Arts from Prince of Songkla University, Pattani campus']), 'sort_order' => 5, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Uztazah. Faridah Binti Yaakob', 'role' => 'Vice Principal at Nural Imaan High School, Cambodia', 'education' => json_encode(['Master’s degree from the International Islamic University Malaysia (IIUM), Department of Islamic Reveal Knowledge and Human Sciences', 'PhD from the International Islamic University Malaysia (IIUM)']), 'sort_order' => 6, 'created_at' => $now, 'updated_at' => $now],
                ['name' => 'Uztazah. Mad Jariah', 'role' => 'Teacher at International Institute of Islamic Thought in Kuala Lumpur', 'education' => json_encode(['Master’s degree from the International Islamic University Malaysia (IIUM), Department of Islamic Reveal Knowledge and Human Sciences', 'PhD Candidate from the International Islamic University Malaysia (IIUM), Department of Islamic Reveal Knowledge and Human Sciences']), 'sort_order' => 7, 'created_at' => $now, 'updated_at' => $now],
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('shariah_advisory_members');
    }
};
