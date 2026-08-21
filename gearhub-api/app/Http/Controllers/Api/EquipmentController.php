<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Equipment;

class EquipmentController extends Controller
{

    public function index(){
        $equipments = Equipment::with('category')->get();

        $equipments->transform(function ($equipment) {
            $equipment->image = $equipment->image
                ? url(Storage::url('equipments/' . $equipment->image))
                : null;

            return $equipment;
        });

        return response()->json([
            'success' => true,
            'message' => 'Equipments fetched successfully',
            'data' => $equipments
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'unit_number' => 'required|string|max:50|unique:equipments,unit_number',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'price_per_day' => 'required|numeric|min:0',
            'status' => 'required|in:available,booked,maintenance',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:equipment_categories,id',
        ]);

        if ($request->hasFile('image')) {
            $filename = $request->file('image')->store('equipments', 'public');

            $validated['image'] = basename($filename);
        }

        $equipment = Equipment::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Equipment created successfully',
            'data' => $equipment,
        ], 201);
    }


    public function show(string $id)
    {
        $equipment = Equipment::with('category')->find($id);

        if (!$equipment) {
            return response()->json([
                'success' => false,
                'message' => 'Equipment not found',
            ], 404);
        }

        $equipment->image = $equipment->image
        ? url(Storage::url('equipments/' . $equipment->image))
        : null;

        return response()->json([
            'success' => true,
            'message' => 'Equipment fetched successfully',
            'data' => $equipment,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $equipment = Equipment::find($id);

        if (!$equipment) {
            return response()->json([
                'success' => false,
                'message' => 'Equipment not found',
            ], 404);
        }

        $validated = $request->validate([
            'brand' => 'sometimes|required|string|max:100',
            'model' => 'sometimes|required|string|max:100',
            'unit_number' => 'sometimes|required|string|max:50|unique:equipments,unit_number,' . $id,
            'year' => 'sometimes|required|integer|min:1900|max:' . date('Y'),
            'price_per_day' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|in:available,booked,maintenance',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'description' => 'nullable|string',
            'category_id' => 'sometimes|required|exists:equipment_categories,id',
        ]);

        if ($request->hasFile('image')) {

            // Delete old image
            if ($equipment->image) {
                Storage::disk('public')->delete(
                    'equipments/' . $equipment->image
                );
            }

            // Upload new image
            $filename = $request->file('image')->store(
                'equipments',
                'public'
            );

            $validated['image'] = basename($filename);
        }

        $equipment->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Equipment updated successfully',
            'data' => $equipment,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $equipment = Equipment::find($id);

        if (!$equipment) {
            return response()->json([
                'success' => false,
                'message' => 'Equipment not found',
            ], 404);
        }

        if ($equipment->image) {
            Storage::disk('public')->delete(
                'equipments/' . $equipment->image
            );
        }

        $equipment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Equipment deleted successfully',
        ], 200);
    }
}
