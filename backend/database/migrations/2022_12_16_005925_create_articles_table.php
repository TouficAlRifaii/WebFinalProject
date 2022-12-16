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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("content");
            $table->unsignedBigInteger("category_id")->unsigned();
            $table->unsignedBigInteger("created_by")->unsigned();
            $table->unsignedBigInteger("approved_by")->unsigned();
            $table->foreign("category_id")->references("id")->on("categories");
            $table->foreign("created_by")->references("id")->on("users");
            $table->foreign("approved_by")->references("id")->on("users");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
        Schema::dropIfExists('articles');
    }
};
