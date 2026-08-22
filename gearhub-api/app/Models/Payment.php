<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';

    protected $primaryKey = 'id';

    protected $fillable = [
        'booking_id',
        'order_id',
        'transaction_id',
        'amount',
        'payment_method',
        'status',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
