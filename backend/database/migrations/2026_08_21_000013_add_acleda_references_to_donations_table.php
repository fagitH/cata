<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->string('acleda_transaction_id')->nullable()->unique()->after('transaction_id');
            $table->string('acleda_payment_token_id')->nullable()->index()->after('acleda_transaction_id');
        });
    }

    public function down(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->dropUnique(['acleda_transaction_id']);
            $table->dropIndex(['acleda_payment_token_id']);
            $table->dropColumn(['acleda_transaction_id', 'acleda_payment_token_id']);
        });
    }
};
