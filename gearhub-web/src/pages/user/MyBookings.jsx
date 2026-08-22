import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/templates/DashboardLayout";
import apiClient from "../../services/api/client";
import LoadingState from "../../components/molecules/LoadingState";
import EmptyState from "../../components/molecules/EmptyState";
import Swal from "sweetalert2";

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

    if (!window.snap) {
      throw new Error("Midtrans Snap is not loaded.");
    }

    window.snap.pay(snapToken, {
      onSuccess: async function (result) {
        console.log("Payment success:", result);

        await Swal.fire({
        icon: "success",
        title: "Payment successful!",
        text: "Your payment has been completed successfully.",
        confirmButtonText: "View My Bookings",
        buttonsStyling: false,
        customClass: {
          popup: "rounded-3xl p-8",
          title: "text-2xl font-bold text-[#233D4D]",
          htmlContainer: "text-sm text-[#233D4D]/60",
          confirmButton:
            "rounded-xl bg-[#FE7F2D] px-6 py-3 font-semibold text-white transition hover:bg-[#233D4D]",
        },
      });

        window.location.reload();
      },

      onPending: function (result) {
        console.log("Payment pending:", result);

        Swal.fire({
          icon: "info",
          title: "Payment pending",
          text: "Your payment is still waiting to be completed.",
          confirmButtonText: "Okay",
          buttonsStyling: false,
          customClass: {
            popup: "rounded-3xl p-8",
            title: "text-2xl font-bold text-[#233D4D]",
            htmlContainer: "text-sm text-[#233D4D]/60",
            confirmButton:
              "rounded-xl bg-[#233D4D] px-6 py-3 font-semibold text-white",
          },
        });
      },

      onError: function (result) {
        console.error("Payment error:", result);

        Swal.fire({
          icon: "error",
          title: "Payment failed",
          text: "Your payment could not be processed. Please try again.",
          confirmButtonText: "Okay",
          buttonsStyling: false,
          customClass: {
            popup: "rounded-3xl p-8",
            title: "text-2xl font-bold text-[#233D4D]",
            htmlContainer: "text-sm text-[#233D4D]/60",
            confirmButton:
              "rounded-xl bg-[#233D4D] px-6 py-3 font-semibold text-white",
          },
        });
      },

      onClose: function () {
        console.log("Payment popup closed");
      },
    });

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

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "approved":
        return "bg-blue-100 text-blue-700";

      case "on_rent":
        return "bg-purple-100 text-purple-700";

      case "returned":
      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: "Cancel this booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel booking",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        popup: "rounded-3xl p-8",
        title: "text-2xl font-bold text-[#233D4D]",
        htmlContainer: "text-sm text-[#233D4D]/60",
        confirmButton:
          "rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600",
        cancelButton:
          "rounded-xl border border-[#EAECF0] px-5 py-3 font-semibold text-[#233D4D] transition hover:bg-[#F8FAFC]",
        actions: "flex gap-3",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.post(`/bookings/${bookingId}/cancel`);

      setBookings((prevBookings) =>
        prevBookings.filter(
          (booking) => booking.id !== bookingId
        )
      );

      Swal.fire({
        icon: "success",
        title: "Booking cancelled",
        text: "Your booking has been cancelled successfully.",
        confirmButtonText: "Okay",
        buttonsStyling: false,
        customClass: {
          popup: "rounded-3xl p-8",
          title: "text-2xl font-bold text-[#233D4D]",
          confirmButton:
            "rounded-xl bg-[#FE7F2D] px-6 py-3 font-semibold text-white transition hover:bg-[#233D4D]",
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Cancellation failed",
        text:
          error.response?.data?.message ||
          "Failed to cancel this booking.",
        confirmButtonText: "Okay",
        buttonsStyling: false,
        customClass: {
          popup: "rounded-3xl p-8",
          title: "text-2xl font-bold text-[#233D4D]",
          confirmButton:
            "rounded-xl bg-[#233D4D] px-6 py-3 font-semibold text-white",
        },
      });
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

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                              booking.status
                            )}`}
                          >
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

                        <div className="flex items-center gap-3">
                          {booking.status === "pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleCancelBooking(booking.id)}
                                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600"
                              >
                                Cancel Booking
                              </button>

                              <button
                                type="button"
                                onClick={() => handlePayment(booking.id)}
                                disabled={paymentLoading === booking.id}
                                className="rounded-xl bg-[#FE7F2D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#233D4D] disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {paymentLoading === booking.id
                                  ? "Processing..."
                                  : "Pay Now"}
                              </button>
                            </>
                          )}
                        </div>


                      {/* {booking.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancellingId === booking.id}
                          className="text-sm font-medium text-red-500 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {cancellingId === booking.id
                            ? "Cancelling..."
                            : "Cancel Booking"}
                        </button>
                      )} */}


                      {/* {booking.status === "pending" && (
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
                      )} */}
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