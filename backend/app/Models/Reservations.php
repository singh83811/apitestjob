<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;



class Reservations extends Model
{
    use HasFactory;

   // protected $fillable = ['guesty_id', 'integration', 'listingId'];
    public static $snakeAttributes = false;


    protected function integration(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (!empty($value)) ? json_decode($value) : []
        );
    }

    protected function money(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (!empty($value)) ? json_decode($value) : []
        );
    }
    
    protected function customFields(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (!empty($value)) ? json_decode($value) : []
        );
    }
    protected function guest(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (!empty($value)) ? json_decode($value) : []
        );
    }
    protected function listing(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (!empty($value)) ? json_decode($value) : []
        );
    }

}
