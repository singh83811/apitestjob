<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reservations;

class ReservationsController extends Controller
{
    public function getReservations(Request $request){
        $reservations = Reservations::all();
        return response()->json([
            "success" => true,
            "message" => "Reservations data!",
            "data" => $reservations
        ], 200);
    } 
}
