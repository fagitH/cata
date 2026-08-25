<?php

use App\Models\AdminUser;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('admin_users', 'role')) {
            Schema::table('admin_users', function (Blueprint $table) {
                $table->string('role')->default('admin')->after('password');
            });
        }

        $superAdmin = AdminUser::query()->where('email', env('ADMIN_EMAIL'))->first()
            ?? AdminUser::query()->orderBy('id')->first();

        if ($superAdmin) {
            $superAdmin->update(['role' => 'super_admin']);
        }
    }

    public function down(): void
    {
        Schema::table('admin_users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
