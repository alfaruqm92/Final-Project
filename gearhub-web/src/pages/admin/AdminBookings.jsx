import { useEffect, useState } from "react";

import DashboardLayout from "../../components/templates/DashboardLayout";
import apiClient from "../../services/api/client";
import LoadingState from "../../components/molecules/LoadingState";
import EmptyState from "../../components/molecules/EmptyState";

const adminMenu = [
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
    icon: "category",
  },
  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: "calendar",
  },
];

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get("/bookings");

        setBookings(response.data.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <DashboardLayout menuItems={adminMenu}>
      <main className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
              Bookings
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#000000]">
              Manage Bookings
            </h1>

            <p className="mt-2 text-sm text-[#233D4D]/60">
              View and manage all equipment rental bookings.
            </p>
          </div>

          {/* Content */}
          <div className="mt-8">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            ) : bookings.length === 0 ? (
              <div className="rounded-3xl bg-white p-8">
                <EmptyState />
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-[#EAECF0] bg-[#F8FAFC]">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-[#233D4D]">
                          Customer
                        </th>

                        <th className="px-6 py-4 font-semibold text-[#233D4D]">
                          Equipment
                        </th>

                        <th className="px-6 py-4 font-semibold text-[#233D4D]">
                          Pickup
                        </th>

                        <th className="px-6 py-4 font-semibold text-[#233D4D]">
                          Return
                        </th>

                        <th className="px-6 py-4 font-semibold text-[#233D4D]">
                          Total
                        </th>

                        <th className="px-6 py-4 font-semibold text-[#233D4D]">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {bookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b border-[#EAECF0] last:border-0"
                        >
                          <td className="px-6 py-4 font-medium text-[#233D4D]">
                            {booking.user?.name || "-"}
                          </td>

                          <td className="px-6 py-4 text-[#233D4D]/70">
                            {booking.equipment?.brand}{" "}
                            {booking.equipment?.model}
                          </td>

                          <td className="px-6 py-4 text-[#233D4D]/70">
                            {booking.pickup_date}
                          </td>

                          <td className="px-6 py-4 text-[#233D4D]/70">
                            {booking.return_date}
                          </td>

                          <td className="px-6 py-4 font-medium text-[#233D4D]">
                            Rp{" "}
                            {Number(
                              booking.total_price
                            ).toLocaleString("id-ID")}
                          </td>

                          <td className="px-6 py-4">
                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default AdminBookings;