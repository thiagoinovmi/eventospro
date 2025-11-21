<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('privacy_policy_accepted')->default(false)->after('pix_key');
            $table->boolean('terms_conditions_accepted')->default(false)->after('privacy_policy_accepted');
            $table->timestamp('privacy_policy_accepted_at')->nullable()->after('terms_conditions_accepted');
            $table->timestamp('terms_conditions_accepted_at')->nullable()->after('privacy_policy_accepted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'privacy_policy_accepted',
                'terms_conditions_accepted',
                'privacy_policy_accepted_at',
                'terms_conditions_accepted_at',
            ]);
        });
    }
};
