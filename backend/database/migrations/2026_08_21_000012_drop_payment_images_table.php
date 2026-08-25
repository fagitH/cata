<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /** Remove obsolete backend-managed KHQR images. */
    public function up(): void
    {
        Schema::dropIfExists('payment_images');
    }

    /** This feature is intentionally retired; the static QR asset is the source of truth. */
    public function down(): void
    {
        // Deliberately no-op: rolling back must not recreate the retired table.
    }
};
