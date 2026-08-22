import { useEffect, useState } from "react";
import DashboardLayout from "../../components/templates/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import apiClient from "../../services/api/client";

const customerMenu = [
  {
    label: "Home",
    path: "/",
    icon: "home",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "Equipment",
    path: "/equipment",
    icon: "camera",
  },
  {
    label: "My Bookings",
    path: "/my-bookings",
    icon: "calendar",
  },
];

function Dashboard() {
  const { user, loading: authLoading } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiClient.get("/my-bookings");

        setBookings(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const totalBookings = bookings.length;

  const activeBookings = bookings.filter((booking) =>
    ["pending", "approved", "on_rent"].includes(
      booking.status?.toLowerCase()
    )
  ).length;

  if (loading || authLoading) {
    return (
      <DashboardLayout menuItems={customerMenu}>
        <div className="p-8">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menuItems={customerMenu}  showCart={true}>
      <div className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#233D4D]">
            Welcome, {user?.name || "User"}!
          </h1>

          <p className="mt-2 text-sm text-[#233D4D]/60">
            Manage your equipment rentals and bookings.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            {/* Active Bookings */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-[#233D4D]/60">
                Active Bookings
              </p>

              <p className="mt-3 text-2xl font-bold text-[#233D4D]">
                {activeBookings}
              </p>
            </div>

            {/* Total Bookings */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-[#233D4D]/60">
                Total Bookings
              </p>

              <p className="mt-3 text-2xl font-bold text-[#233D4D]">
                {totalBookings}
              </p>
            </div>

            {/* Account */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-[#233D4D]/60">
                Account
              </p>

              <p className="mt-3 font-semibold text-[#233D4D]">
                {user?.name || "-"}
              </p>

              <p className="mt-1 text-sm text-[#233D4D]/60">
                {user?.email || "-"}
              </p>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;