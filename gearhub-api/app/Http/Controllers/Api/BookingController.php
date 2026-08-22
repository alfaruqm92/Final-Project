<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Equipment;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with([
            'user',
            'equipment.category',
        ])->get();
        return response()->json([
            'success' => true,
            'message' => 'Bookings fetched successfully',
            'data' => $bookings
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipment_ids' => 'required|array|min:1',
            'equipment_ids.*' => 'required|exists:equipments,id',
            'pickup_date' => 'required|date|after_or_equal:today',
            'return_date' => 'required|date|after:pickup_date',
        ]);

        $equipments = Equipment::whereIn(
            'id',
            $validated['equipment_ids']
        )->get();

        $unavailableEquipment = $equipments->first(function ($equipment) {
            return strtolower($equipment->status) !== 'available';
        });

        if ($unavailableEquipment) {
            return response()->json([
                'success' => false,
                'message' => "{$unavailableEquipment->brand} {$unavailableEquipment->model} is not available for booking.",
            ], 422);
        }

        $totalDays = Carbon::parse(
            $validated['pickup_date']
        )->diffInDays(
            Carbon::parse($validated['return_date'])
        );

        foreach ($equipments as $equipment) {
            $hasConflict = Booking::where(
                'equipment_id',
                $equipment->id
            )
                ->whereIn('status', [
                    'pending',
                    'approved',
                    'on_rent',
                ])
                ->where(function ($query) use ($validated) {
                    $query->whereBetween(
                        'pickup_date',
                        [
                            $validated['pickup_date'],
                            $validated['return_date'],
                        ]
                    )
                    ->orWhereBetween(
                        'return_date',
                        [
                            $validated['pickup_date'],
                            $validated['return_date'],
                        ]
                    )
                    ->orWhere(function ($query) use ($validated) {
                        $query->where(
                            'pickup_date',
                            '<=',
                            $validated['pickup_date']
                        )
                        ->where(
                            'return_date',
                            '>=',
                            $validated['return_date']
                        );
                    });
                })
                ->exists();

            if ($hasConflict) {
                return response()->json([
                    'success' => false,
                    'message' => "{$equipment->brand} {$equipment->model} is already booked for the selected dates.",
                ], 422);
            }
        }

        $bookings = DB::transaction(function () use (
            $request,
            $equipments,
            $validated,
            $totalDays
        ) {
            return $equipments->map(function ($equipment) use (
                $request,
                $validated,
                $totalDays
            ) {
                return Booking::create([
                    'user_id' => $request->user()->id,
                    'equipment_id' => $equipment->id,
                    'pickup_date' => $validated['pickup_date'],
                    'return_date' => $validated['return_date'],
                    'total_days' => $totalDays,
                    'total_price' => $equipment->price_per_day * $totalDays,
                    'status' => 'pending',
                ]);
            });
        });

        return response()->json([
            'success' => true,
            'message' => 'Bookings created successfully',
            'data' => $bookings,
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
            'pickup_date' => 'sometimes|required|date|after_or_equal:today',
            'return_date' => 'sometimes|required|date|after:pickup_date',
            'status' => 'sometimes|required|in:pending,approved,on_rent,returned,completed,cancelled',
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
        $bookings = Booking::where(
            'user_id',
            $request->user()->id
        )
            ->where('status', '!=', 'cancelled')
            ->with(['equipment.category'])
            ->latest()
            ->get();

        $bookings->transform(function ($booking) {
            if ($booking->equipment && $booking->equipment->image) {
                $booking->equipment->image = url(
                    Storage::url(
                        'equipments/' . $booking->equipment->image
                    )
                );
            }

            return $booking;
        });

        return response()->json([
            'success' => true,
            'message' => 'My bookings fetched successfully',
            'data' => $bookings
        ], 200);
    }

    public function cancel(Request $request, Booking $booking)
    {
        // Pastikan booking milik user yang sedang login
        if ($booking->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to cancel this booking.',
            ], 403);
        }

        // Untuk sementara hanya booking pending yang bisa dibatalkan
        if ($booking->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending bookings can be cancelled.',
            ], 422);
        }

        $booking->update([
            'status' => 'cancelled',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully.',
            'data' => $booking,
        ], 200);
    }
}
