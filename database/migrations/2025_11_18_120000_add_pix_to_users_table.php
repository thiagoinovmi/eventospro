<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPixToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('pix_type', ['email', 'cpf', 'cnpj', 'phone', 'random'])->nullable()->after('document')->comment('Tipo de chave PIX');
            $table->string('pix_key')->nullable()->after('pix_type')->comment('Chave PIX');
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
            $table->dropColumn(['pix_type', 'pix_key']);
        });
    }
}
