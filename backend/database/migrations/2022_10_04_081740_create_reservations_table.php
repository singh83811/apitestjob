<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('guesty_id');
            $table->longText('integration');
            $table->string('listingId');
            $table->string('source');
            $table->string('accountId');
            $table->string('status');
            $table->string('guestId');
            $table->longText('money');
            $table->string('checkIn');
            $table->string('checkOut');
            $table->string('createdAt');
            $table->longText('customFields');
            $table->longText('guest');
            $table->longText('listing');
            $table->tinyInteger('saltoks_user_existed');
            $table->tinyInteger('saltoks_user_blocked');
            $table->string('saltoks_user_id');
            $table->tinyInteger('accessGroupExist');
            $table->string('confirmedAt');
            $table->integer('nightsCount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
};
