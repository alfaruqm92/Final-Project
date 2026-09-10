import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/templates/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import apiClient from "../../services/api/client";

const customerMenu = [
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
  const navigate = useNavigate();

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

  // Equipment yang sedang dipinjam
  const rentedBookings = bookings.filter((booking) =>
    ["approved", "on_rent"].includes(
      booking.status?.toLowerCase()
    )
  );

  // Hitung sisa hari rental
  const getRemainingDays = (returnDate) => {
    const today = new Date();
    const returnDay = new Date(returnDate);

    // Hilangkan waktu agar perhitungan hanya berdasarkan tanggal
    today.setHours(0, 0, 0, 0);
    returnDay.setHours(0, 0, 0, 0);

    const difference = returnDay - today;

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  const getRemainingStatus = (returnDate) => {
    const remainingDays = getRemainingDays(returnDate);

    if (remainingDays < 0) {
      return {
        text: `Overdue by ${Math.abs(remainingDays)} day${
          Math.abs(remainingDays) !== 1 ? "s" : ""
        }`,
        className: "bg-red-100 text-red-700",
      };
    }

    if (remainingDays === 0) {
      return {
        text: "Return today",
        className: "bg-orange-100 text-orange-700",
      };
    }

    return {
      text: `${remainingDays} day${
        remainingDays !== 1 ? "s" : ""
      } remaining`,
      className: "bg-green-100 text-green-700",
    };
  };

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
    <DashboardLayout
      menuItems={customerMenu}
      showCart={true}
    >
      <div className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#233D4D]">
            Welcome, {user?.name || "User"}!
          </h1>

          <p className="mt-2 text-sm text-[#233D4D]/60">
            Manage your equipment rentals and bookings.
          </p>

          {/* SUMMARY CARDS */}
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

          {/* CURRENTLY RENTED */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
                  Currently Rented
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#233D4D]">
                  Equipment you're currently using
                </h2>
              </div>

              {rentedBookings.length > 0 && (
                <button
                  type="button"
                  onClick={() => navigate("/my-bookings")}
                  className="text-sm font-medium text-[#FE7F2D] transition hover:text-[#233D4D]"
                >
                  View All →
                </button>
              )}
            </div>

            {rentedBookings.length === 0 ? (
              <div className="mt-6 rounded-xl bg-[#F8FAFC] p-6 text-center">
                <p className="text-sm text-[#233D4D]/60">
                  You don't have any equipment currently rented.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/equipment")}
                  className="mt-4 rounded-xl bg-[#FE7F2D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#233D4D]"
                >
                  Browse Equipment
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {rentedBookings.map((booking) => {
                  const remainingStatus = getRemainingStatus(
                    booking.return_date
                  );

                  return (
                    <div
                      key={booking.id}
                      className="flex gap-4 rounded-xl border border-[#EAECF0] p-4"
                    >
                      {/* IMAGE */}
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EAECF0]">
                        {booking.equipment?.image ? (
                          <img
                            src={booking.equipment.image}
                            alt={`${booking.equipment.brand} ${booking.equipment.model}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-[#233D4D]/40">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* INFO */}
                      <div className="min-w-0 flex-1">

                        <p className="text-xs font-medium uppercase tracking-wide text-[#FE7F2D]">
                          {booking.equipment?.category?.name ||
                            "Equipment"}
                        </p>

                        <h3 className="mt-1 font-bold text-[#233D4D]">
                          {booking.equipment?.brand}{" "}
                          {booking.equipment?.model}
                        </h3>

                        <div className="mt-3 space-y-1 text-xs text-[#233D4D]/60">
                          <p>
                            Pickup:{" "}
                            <span className="font-medium text-[#233D4D]">
                              {booking.pickup_date}
                            </span>
                          </p>

                          <p>
                            Return:{" "}
                            <span className="font-medium text-[#233D4D]">
                              {booking.return_date}
                            </span>
                          </p>
                        </div>

                        {/* REMAINING DAYS */}
                        <div className="mt-3">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${remainingStatus.className}`}
                          >
                            {remainingStatus.text}
                          </span>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;