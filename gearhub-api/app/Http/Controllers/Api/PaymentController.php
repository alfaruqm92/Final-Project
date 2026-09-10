<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Booking;
use Midtrans\Config;
use Midtrans\Snap;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{

    public function index()
    {
        $payments = Payment::all();
        return response()->json([
            'success' => true,
            'message' => 'Payments fetched successfully',
            'data' => $payments
        ], 200);
    }


    public function store(Request $request)
{
    $validated = $request->validate([
        'booking_group_id' => 'required|string|exists:bookings,booking_group_id',
    ]);

    $bookings = Booking::where(
        'booking_group_id',
        $validated['booking_group_id']
    )
        ->where('user_id', $request->user()->id)
        ->get();

    if ($bookings->isEmpty()) {
        return response()->json([
            'success' => false,
            'message' => 'You are not authorized to pay these bookings.',
        ], 403);
    }

    $amount = $bookings->sum('total_price');

    $orderId = $validated['booking_group_id'] . '-' . time();

    $payment = Payment::create([
        // Gunakan booking pertama sebagai referensi
        // karena tabel payments saat ini masih memakai booking_id
        'booking_id' => $bookings->first()->id,
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
            'gross_amount' => (int) $amount,
        ],
    ];

    $snapToken = Snap::getSnapToken($params);

    return response()->json([
        'success' => true,
        'message' => 'Payment created successfully',
        'data' => [
            'payment' => $payment,
            'snap_token' => $snapToken,
            'booking_group_id' => $validated['booking_group_id'],
        ],
    ], 201);
}

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

    public function notification(Request $request)
    {
        Log::info('Midtrans notification received', $request->all());

        $orderId = $request->input('order_id');
        $statusCode = $request->input('status_code');
        $grossAmount = $request->input('gross_amount');
        $signatureKey = $request->input('signature_key');
        $transactionStatus = $request->input('transaction_status');
        $transactionId = $request->input('transaction_id');

        $serverKey = config('services.midtrans.server_key');

        $expectedSignature = hash(
            'sha512',
            $orderId .
            $statusCode .
            $grossAmount .
            $serverKey
        );

        if (!$signatureKey || !hash_equals($expectedSignature, $signatureKey)) {
            Log::warning('Invalid Midtrans signature', [
                'order_id' => $orderId,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Invalid signature.',
            ], 403);
        }

        $payment = Payment::where('order_id', $orderId)->first();

        if (!$payment) {
            return response()->json([
                'success' => true,
                'message' => 'Notification received, but payment was not found.',
            ], 200);
        }

        $paymentStatus = $payment->status;

       if (in_array($transactionStatus, ['capture', 'settlement'])) {
            $paymentStatus = 'Completed';

            $bookingGroupId = $payment->booking->booking_group_id;

            Booking::where(
                'booking_group_id',
                $bookingGroupId
            )->update([
                'status' => 'approved',
            ]);
        }
        $payment->update([
            'transaction_id' => $transactionId,
            'payment_method' => $request->input('payment_type'),
            'status' => $paymentStatus,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Notification processed successfully.',
        ]);
    }
}
