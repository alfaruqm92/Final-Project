<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Booking;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::all();
        return response()->json([
            'success' => true,
            'message' => 'Payments fetched successfully',
            'data' => $payments
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
        ]);

        $booking = Booking::findOrFail($validated['booking_id']);

        if ($booking->user_id !== $request->user()->id) {
            return response()->json([
            'success' => false,
            'message' => 'You are not authorized to pay this booking.',
        ], 403);
        }

        $amount = $booking->total_price;

        $orderId = 'GH-' . $booking->id . '-' . time();

        $payment = Payment::create([
            'booking_id' => $booking->id,
            'order_id' => $orderId,
            'amount' => $amount,
            'status' => 'Pending',
        ]);

        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $amount,
            ]
        ];

        $snapToken = Snap::getSnapToken($params);

        return response()->json([
            'success' => true,
            'message' => 'Payment created successfully',
            'data' => [
                'payment' => $payment,
                'snap_token' => $snapToken,
            ],
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $payment = Payment::find($id);

        if(!$payment){
            return response()->json([
                'success' => false,
                'message' => 'Payment not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Payment fetched successfully',
            'data' => $payment
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found',
            ], 404);
        }

        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:50',
            'status' => 'required|in:Pending,Completed,Failed',
        ]);

        $payment->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Payment updated successfully',
            'data' => $payment,
        ], 200);

        return response()->json([
            'success' => false,
            'message' => 'Attention! Something must be filled in the form',
            'errors' => $validator->errors(),
        ], 422);
    }


    public function destroy(string $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found',
            ], 404);
        }

        $payment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Payment deleted successfully',
        ], 200);

        return response()->json([
            'success' => false,
            'message' => 'Attention! Something must be filled in the form',
            'errors' => $validator->errors(),
        ], 422);
    }
}
