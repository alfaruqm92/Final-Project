import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/templates/DashboardLayout";
import apiClient from "../../services/api/client";
import LoadingState from "../../components/molecules/LoadingState";
import EmptyState from "../../components/molecules/EmptyState";
import Swal from "sweetalert2";
import { Camera } from "lucide-react";

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

  // Gabungkan booking berdasarkan booking_group_id
  const groupedBookings = Object.values(
    bookings.reduce((groups, booking) => {
      const groupId = booking.booking_group_id || `single-${booking.id}`;

      if (!groups[groupId]) {
        groups[groupId] = {
          booking_group_id: groupId,
          bookings: [],
          total_price: 0,
          pickup_date: booking.pickup_date,
          return_date: booking.return_date,
          total_days: booking.total_days,
          status: booking.status,
        };
      }

      groups[groupId].bookings.push(booking);
      groups[groupId].total_price += Number(booking.total_price || 0);

      return groups;
    }, {})
  );

  const handlePayment = async (bookingGroupId) => {
    try {
      setPaymentLoading(bookingGroupId);
      setError("");

      const response = await apiClient.post("/payments", {
        booking_group_id: bookingGroupId,
      });

      const snapToken = response.data.data.snap_token;

      if (!window.snap) {
        throw new Error("Midtrans Snap is not loaded.");
      }

      window.snap.pay(snapToken, {
        onSuccess: async function () {
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

        onPending: function () {
          Swal.fire({
            icon: "info",
            title: "Payment pending",
            text: "Your payment is still waiting to be completed.",
            confirmButtonText: "Okay",
            buttonsStyling: false,
            customClass: {
              popup: "rounded-3xl p-8",
              title: "text-2xl font-bold text-[#233D4D]",
              confirmButton:
                "rounded-xl bg-[#233D4D] px-6 py-3 font-semibold text-white",
            },
          });
        },

        onError: function () {
          Swal.fire({
            icon: "error",
            title: "Payment failed",
            text: "Your payment could not be processed. Please try again.",
            confirmButtonText: "Okay",
            buttonsStyling: false,
            customClass: {
              popup: "rounded-3xl p-8",
              title: "text-2xl font-bold text-[#233D4D]",
              confirmButton:
                "rounded-xl bg-[#233D4D] px-6 py-3 font-semibold text-white",
            },
          });
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

  const handleCancelBooking = async (group) => {
    const result = await Swal.fire({
      title: "Cancel this booking?",
      text: "All equipment in this booking will be cancelled.",
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
          "rounded-xl bg-red-500 px-5 py-3 font-semibold text-white",
        cancelButton:
          "rounded-xl border border-[#EAECF0] px-5 py-3 font-semibold text-[#233D4D]",
        actions: "flex gap-3",
      },
    });

    if (!result.isConfirmed) return;

    try {
      // Untuk sementara cancel setiap booking dalam group
      await Promise.all(
        group.bookings.map((booking) =>
          apiClient.post(`/bookings/${booking.id}/cancel`)
        )
      );

      setBookings((prevBookings) =>
        prevBookings.filter(
          (booking) =>
            booking.booking_group_id !== group.booking_group_id
        )
      );

      Swal.fire({
        icon: "success",
        title: "Booking cancelled",
        text: "All equipment in this booking has been cancelled.",
        confirmButtonText: "Okay",
        buttonsStyling: false,
        customClass: {
          popup: "rounded-3xl p-8",
          title: "text-2xl font-bold text-[#233D4D]",
          confirmButton:
            "rounded-xl bg-[#FE7F2D] px-6 py-3 font-semibold text-white",
        },
      });
    } catch (error) {
      console.error("Cancellation failed:", error);

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

          <div className="mt-8">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            ) : groupedBookings.length === 0 ? (
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
              <div className="grid gap-6 lg:grid-cols-2">
                {groupedBookings.map((group) => (
                  <div
                    key={group.booking_group_id}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                  >
                    {/* Group Header */}
                    <div className="flex items-center justify-between border-b border-[#EAECF0] px-5 py-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-[#233D4D]/50">
                          Booking
                        </p>

                        <h2 className="mt-1 font-bold text-[#233D4D]">
                          {group.booking_group_id}
                        </h2>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          group.status
                        )}`}
                      >
                        {group.status}
                      </span>
                    </div>

                    {/* Equipment List */}
                    <div className="divide-y divide-[#EAECF0]">
                      {group.bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex gap-4 p-5"
                        >
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#EAECF0]">
                            {booking.equipment?.image ? (
                              <img
                                src={booking.equipment.image}
                                alt={`${booking.equipment.brand} ${booking.equipment.model}`}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  e.currentTarget.nextElementSibling.style.display = "flex";
                                }}
                              />
                            ) : null}

                            <div
                              className={`${
                                booking.equipment?.image ? "hidden" : "flex"
                              } h-full w-full items-center justify-center`}
                            >
                              <Camera
                                size={32}
                                strokeWidth={1.5}
                                className="text-[#233D4D]/30"
                              />
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium uppercase tracking-wide text-[#FE7F2D]">
                              {booking.equipment?.category?.name ||
                                "Equipment"}
                            </p>

                            <h3 className="mt-1 font-bold text-[#233D4D]">
                              {booking.equipment?.brand}{" "}
                              {booking.equipment?.model}
                            </h3>

                            <p className="mt-2 text-sm font-semibold text-[#FE7F2D]">
                              Rp{" "}
                              {Number(
                                booking.total_price
                              ).toLocaleString("id-ID")}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/equipment/${booking.equipment_id}`
                                )
                              }
                              className="mt-2 text-xs font-medium text-[#233D4D]/60 transition hover:text-[#FE7F2D]"
                            >
                              View Equipment →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Booking Information */}
                    <div className="border-t border-[#EAECF0] bg-[#F8FAFC] p-5">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-[#233D4D]/50">
                            Pickup
                          </p>
                          <p className="mt-1 font-medium text-[#233D4D]">
                            {group.pickup_date}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#233D4D]/50">
                            Return
                          </p>
                          <p className="mt-1 font-medium text-[#233D4D]">
                            {group.return_date}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#233D4D]/50">
                            Duration
                          </p>
                          <p className="mt-1 font-medium text-[#233D4D]">
                            {group.total_days} days
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-[#EAECF0] pt-4">
                        <span className="font-semibold text-[#233D4D]">
                          Total Price
                        </span>

                        <span className="text-xl font-bold text-[#FE7F2D]">
                          Rp {group.total_price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    {group.status === "pending" && (
                      <div className="flex items-center justify-end gap-3 border-t border-[#EAECF0] px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleCancelBooking(group)
                          }
                          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                        >
                          Cancel Booking
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handlePayment(group.booking_group_id)
                          }
                          disabled={
                            paymentLoading ===
                            group.booking_group_id
                          }
                          className="rounded-xl bg-[#FE7F2D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#233D4D] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {paymentLoading ===
                          group.booking_group_id
                            ? "Processing..."
                            : "Pay Now"}
                        </button>
                      </div>
                    )}
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