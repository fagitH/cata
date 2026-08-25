<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('donation_projects');
        Schema::dropIfExists('scholarships');
    }

    public function down(): void
    {
        // Static frontend pages no longer require these tables.
    }
};