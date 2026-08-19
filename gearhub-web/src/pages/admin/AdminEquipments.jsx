import { useEffect, useState } from "react";
import apiClient from "../../services/api/client";
import LoadingState from "../../components/molecules/LoadingState";
import DashboardLayout from "../../components/templates/DashboardLayout";
import EquipmentForm from "../../components/organisms/EquipmentForm";
import Toast from "../../components/molecules/Toast";

const adminMenu = [
    {
        label: "Home",
        path: "/",
        icon: "home",
    },
    {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: "dashboard",
    },
    {
        label: "Equipment",
        path: "/admin/equipments",
        icon: "camera",
    },
    {
        label: "Categories",
        path: "/admin/categories",
        icon: "folder",
    },
    {
        label: "Bookings",
        path: "/admin/bookings",
        icon: "calendar",
    }
];

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
function AdminEquipments() {
    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [toast, setToast] = useState({type: "success", message: ""});
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
            setLoading(true);

            const [equipmentResponse, categoryResponse] = await Promise.all([
                apiClient.get("/equipments"),
                apiClient.get("/categories"),
            ]);

            setEquipments(equipmentResponse.data.data);
            setCategories(categoryResponse.data.data);
            } catch (error) {
            console.error("Failed to fetch admin equipment data:", error);
            } finally {
            setLoading(false);
            }
        };

        fetchData();
        }, []);
    const showToast = (type, message) => {
        setToast({
            type,
            message,
        });

        setTimeout(() => {
            setToast({
            type: "success",
            message: "",
            });
        }, 3000);
    };
    const handleCreate = async (form) => {
        try {
            setFormLoading(true);

            const formData = new FormData();

            formData.append("category_id", form.category_id);
            formData.append("brand", form.brand);
            formData.append("model", form.model);
            formData.append("unit_number", form.unit_number);
            formData.append("year", form.year);
            formData.append("price_per_day", form.price_per_day);
            formData.append("status", form.status);
            formData.append("description", form.description);

            if (form.image) {
            formData.append("image", form.image);
            }

            const response = await apiClient.post("/equipments",formData);

            await delay(500);

            console.log("Create equipment response:", response.data);

            setShowForm(false);

            setSelectedEquipment(null);

            const equipmentResponse = await apiClient.get("/equipments");

            setEquipments(equipmentResponse.data.data);

            showToast(
                "success",
                "Equipment created successfully."
            );
        } catch (error) {
            console.error(
            "Failed to create equipment:",
            error.response?.data || error
            );

            showToast(
                "error",
                error.response?.data?.message ||
                "Failed to create equipment."
            );
        } finally {
            setFormLoading(false);
        }
    };
    
    const handleEdit = (equipment) => {
        setSelectedEquipment(equipment);
        setShowForm(true);
    };

    const handleUpdate = async (form) => {
        try {
            setFormLoading(true);

            const formData = new FormData();

            formData.append("category_id", form.category_id);
            formData.append("brand", form.brand);
            formData.append("model", form.model);
            formData.append("unit_number", form.unit_number);
            formData.append("year", form.year);
            formData.append("price_per_day", form.price_per_day);
            formData.append("status", form.status);
            formData.append("description", form.description);

            if (form.image) {
            formData.append("image", form.image);
            }

            formData.append("_method", "PUT");

            await apiClient.post(
            `/equipments/${selectedEquipment.id}`,
            formData
            );

            await delay(500);
            
            showToast(
                "success",
                "Equipment updated successfully."
            );

            setShowForm(false);
            setSelectedEquipment(null);

            const response = await apiClient.get("/equipments");
            setEquipments(response.data.data);
        } catch (error) {
            console.error("Failed to update equipment:", error);

            showToast(
                "error",
                error.response?.data?.message ||
                    "Failed to update equipment."
            );
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (equipment) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${equipment.brand} ${equipment.model}?`
        );

        if (!confirmed) return;

        try {
            setDeleteLoading(equipment.id);

            await apiClient.delete(`/equipments/${equipment.id}`);

            await delay(500);

            setEquipments((prev) =>
            prev.filter((item) => item.id !== equipment.id)
            );

            showToast(
            "success",
            "Equipment deleted successfully."
            );
        } catch (error) {
            console.error(
            "Failed to delete equipment:",
            error.response?.data || error
            );

            showToast(
            "error",
            error.response?.data?.message ||
                "Failed to delete equipment."
            );
        } finally {
            setDeleteLoading(null);
        }
    };

    if (loading) {
        return (
        <DashboardLayout menuItems={adminMenu}>
            <LoadingState />
        </DashboardLayout>
        );
    }

    return (
        <DashboardLayout menuItems={adminMenu}>

        <Toast
            type={toast.type}
            message={toast.message}
            onClose={() =>
            setToast({
                type: "success",
                message: "",
            })
            }
        />

        <div className="px-4 py-8 md:px-8">
            <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
                    Management
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#000000]">
                    Equipment
                </h1>

                <p className="mt-2 text-sm text-[#233D4D]/60">
                    Manage GearHub photography equipment.
                </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setSelectedEquipment(null);
                        setShowForm(true);
                    }}
                    className="rounded-full bg-[#FE7F2D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#233D4D]"
                >
                + Add Equipment
                </button>
            </div>

            {showForm && (
                <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                    <EquipmentForm
                        equipment={selectedEquipment}
                        categories={categories}
                        onSubmit={selectedEquipment ? handleUpdate : handleCreate}
                        onCancel={() => {
                            setShowForm(false);
                            setSelectedEquipment(null);
                        }}
                        loading={formLoading}
                    />
                </div>
            )}

            {/* Equipment Table */}
            <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left">
                    <thead className="border-b border-[#EAECF0] bg-[#F8F9FA]">
                    <tr>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#233D4D]/60">
                        Equipment
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#233D4D]/60">
                        Category
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#233D4D]/60">
                        Unit
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#233D4D]/60">
                        Price / Day
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#233D4D]/60">
                        Status
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#233D4D]/60">
                        Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {equipments.map((equipment) => (
                        <tr
                        key={equipment.id}
                        className="border-b border-[#EAECF0] last:border-b-0"
                        >
                        {/* Equipment */}
                        <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#EAECF0]">
                                {equipment.image ? (
                                <img
                                    src={equipment.image}
                                    alt={`${equipment.brand} ${equipment.model}`}
                                    className="h-full w-full object-cover"
                                />
                                ) : (
                                <div className="flex h-full items-center justify-center text-xs text-[#233D4D]/40">
                                    No image
                                </div>
                                )}
                            </div>

                            <div>
                                <p className="font-semibold text-[#233D4D]">
                                {equipment.brand}
                                </p>

                                <p className="text-sm text-[#233D4D]/60">
                                {equipment.model}
                                </p>
                            </div>
                            </div>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4 text-sm text-[#233D4D]">
                            {equipment.category?.name ?? "-"}
                        </td>

                        {/* Unit */}
                        <td className="px-5 py-4 text-sm text-[#233D4D]">
                            {equipment.unit_number}
                        </td>

                        {/* Price */}
                        <td className="px-5 py-4 text-sm font-medium text-[#233D4D]">
                            Rp{" "}
                            {Number(
                            equipment.price_per_day
                            ).toLocaleString("id-ID")}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                            <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                equipment.status === "available"
                                ? "bg-green-50 text-green-600"
                                : equipment.status === "booked"
                                    ? "bg-yellow-50 text-yellow-600"
                                    : "bg-red-50 text-red-600"
                            }`}
                            >
                            {equipment.status}
                            </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                            <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => handleEdit(equipment)}
                                className="rounded-lg border border-[#EAECF0] px-3 py-1.5 text-xs font-medium text-[#233D4D] transition-colors hover:border-[#FE7F2D] hover:text-[#FE7F2D]"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDelete(equipment)}
                                disabled={deleteLoading === equipment.id}
                                className="inline-flex min-w-[70px] items-center justify-center gap-2 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition-all hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {deleteLoading === equipment.id ? (
                                    <>
                                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
                                    <span>Deleting</span>
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>

            </div>
        </div>
        </DashboardLayout>
    );
}

export default AdminEquipments;