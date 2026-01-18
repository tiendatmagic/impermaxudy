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
    Schema::create('blocked_withdraws', function (Blueprint $table) {
      $table->id();
      $table->string('address');
      $table->string('chain_id');
      $table->timestamps();
      $table->unique(['address', 'chain_id']);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('blocked_withdraws');
  }
};
