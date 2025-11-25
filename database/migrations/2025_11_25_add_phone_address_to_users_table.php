<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPhoneAddressToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // 📱 Phone - Recomendado para Mercado Pago
            $table->string('phone')->nullable()->after('email');
            
            // 🏠 Address - Boas práticas para Mercado Pago
            $table->string('address_street')->nullable()->after('phone');
            $table->string('address_number')->nullable()->after('address_street');
            $table->string('address_neighborhood')->nullable()->after('address_number');
            $table->string('address_city')->nullable()->after('address_neighborhood');
            $table->string('address_state')->nullable()->after('address_city');
            $table->string('address_zip_code')->nullable()->after('address_state');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone',
                'address_street',
                'address_number',
                'address_neighborhood',
                'address_city',
                'address_state',
                'address_zip_code'
            ]);
        });
    }
}
