<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Equipment;
use carbon\Carbon;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::all();
        return response()->json([
            'success' => true,
            'message' => 'Bookings fetched successfully',
            'data' => $bookings
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipment_id' => 'required|exists:equipments,id',
            'pickup_date' => 'required|date|after_or_equal:today',
            'return_date' => 'required|date|after:pickup_date',
        ]);

        $equipment = Equipment::findOrFail($validated['equipment_id']);

        if ($equipment->status !== 'Available') {
            return response()->json([
                'success' => false,
                'message' => 'Equipment is not available for booking.',
            ], 400);
        }

        $totalDays = Carbon::parse($validated['pickup_date'])
            ->diffInDays(Carbon::parse($validated['return_date']));

        $totalPrice = $equipment->price_per_day * $totalDays;

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'equipment_id' => $validated['equipment_id'],
            'pickup_date' => $validated['pickup_date'],
            'return_date' => $validated['return_date'],
            'total_days' => $totalDays,
            'total_price' => $totalPrice,
            'status' => 'Pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Booking created successfully',
            'data' => $booking
        ], 201);
    }

    public function show(string $id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Booking fetched successfully',
            'data' => $booking
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not found',
            ], 404);
        }

        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'equipment_id' => 'sometimes|required|exists:equipments,id',
            'start_date' => 'sometimes|required|date|after_or_equal:today',
            'end_date' => 'sometimes|required|date|after:start_date',
            'total_price' => 'sometimes|required|numeric|min:0',
        ]);

        $booking->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Booking updated successfully',
            'data' => $booking,
        ], 200);
    }

    public function destroy(string $id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not Found!'
            ], 404);
        }

        $booking->delete();

        return response()->json([
            'success' => true,
            'message' => 'Booking deleted successfully'
        ], 200);
    }

    public function myBookings(Request $request)
    {
        $bookings = Booking::where('user_id', $request->user()->id)
        ->with(['equipment'])
        ->latest()
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'My bookings fetched successfully',
            'data' => $bookings
        ], 200);
    }
}
