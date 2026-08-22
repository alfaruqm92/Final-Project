import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/templates/DashboardLayout";
import apiClient from "../../services/api/client";
import LoadingState from "../../components/molecules/LoadingState";
import EmptyState from "../../components/molecules/EmptyState";

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

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get("/my-bookings");

        setBookings(response.data.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handlePayment = async (bookingId) => {
  try {
    setPaymentLoading(bookingId);
    setError("");

    const response = await apiClient.post("/payments", {
      booking_id: bookingId,
    });

    console.log(response.data);

    const snapToken = response.data.data.snap_token;

    console.log("Snap Token:", snapToken);

  } catch (error) {
    console.error("Failed to create payment:", error);

    setError(
      error.response?.data?.message ||
      "Failed to create payment. Please try again."
    );
  } finally {
    setPaymentLoading(null);
  }
};

  return (
    <DashboardLayout menuItems={customerMenu} showCart={true}>
      <main className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
              My Bookings
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#000000]">
              Your equipment rentals
            </h1>

            <p className="mt-2 text-sm text-[#233D4D]/60">
              Track and manage all of your equipment bookings.
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

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/equipment")}
                    className="rounded-xl bg-[#FE7F2D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#233D4D]"
                  >
                    Browse Equipment
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                  >
                    <div className="flex gap-4 p-4">

                      {/* Equipment Image */}
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

                      {/* Booking Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-[#FE7F2D]">
                              {booking.equipment?.category?.name || "Equipment"}
                            </p>

                            <h2 className="mt-1 truncate font-bold text-[#233D4D]">
                              {booking.equipment?.brand}{" "}
                              {booking.equipment?.model}
                            </h2>
                          </div>

                          <span className="shrink-0 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700">
                            {booking.status}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-[#233D4D]/50">
                              Pickup
                            </p>
                            <p className="mt-1 font-medium text-[#233D4D]">
                              {booking.pickup_date}
                            </p>
                          </div>

                          <div>
                            <p className="text-[#233D4D]/50">
                              Return
                            </p>
                            <p className="mt-1 font-medium text-[#233D4D]">
                              {booking.return_date}
                            </p>
                          </div>

                          <div>
                            <p className="text-[#233D4D]/50">
                              Duration
                            </p>
                            <p className="mt-1 font-medium text-[#233D4D]">
                              {booking.total_days} days
                            </p>
                          </div>

                          <div>
                            <p className="text-[#233D4D]/50">
                              Total
                            </p>
                            <p className="mt-1 font-bold text-[#233D4D]">
                              Rp{" "}
                              {Number(
                                booking.total_price
                              ).toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    {/* Action */}
                    <div className="flex items-center justify-between border-t border-[#233D4D]/10 px-4 py-3">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/equipment/${booking.equipment_id}`)
                        }
                        className="text-sm font-medium text-[#FE7F2D] transition hover:text-[#233D4D]"
                      >
                        View Equipment →
                      </button>

                      {booking.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => handlePayment(booking.id)}
                          disabled={paymentLoading === booking.id}
                          className="rounded-xl bg-[#FE7F2D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#233D4D] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {paymentLoading === booking.id
                            ? "Processing..."
                            : "Pay Now"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default MyBookings;