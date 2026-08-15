<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipment;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalEquipment = Equipment::count();

        $availableEquipment = Equipment::where('status', 'available')->count();

        $bookedEquipment = Equipment::where('status', 'booked')->count();

        $maintenanceEquipment = Equipment::where('status', 'maintenance')->count();

        return response()->json([
            'success' => true,
            'message' => 'Admin dashboard data fetched successfully',
            'data' => [
                'total_equipment' => $totalEquipment,
                'available_equipment' => $availableEquipment,
                'booked_equipment' => $bookedEquipment,
                'maintenance_equipment' => $maintenanceEquipment,
            ],
        ], 200);
    }
}
