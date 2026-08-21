import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../contexts/CartContext";
import DashboardLayout from "../../components/templates/DashboardLayout";

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

function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const totalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;

    const pickup = new Date(pickupDate);
    const returnDay = new Date(returnDate);

    const difference = returnDay - pickup;

    return difference > 0
      ? Math.ceil(difference / (1000 * 60 * 60 * 24))
      : 0;
  }, [pickupDate, returnDate]);

  const totalPerDay = cartItems.reduce(
    (total, item) => total + Number(item.price_per_day || 0),
    0
  );

  const totalPrice = totalPerDay * totalDays;

  if (cartItems.length === 0) {
    return (
      <DashboardLayout menuItems={customerMenu}>
        <div className="px-4 py-8 md:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[#233D4D]">
              Your cart is empty
            </h1>

            <p className="mt-2 text-sm text-[#233D4D]/60">
              Add equipment before continuing to checkout.
            </p>

            <button
              type="button"
              onClick={() => navigate("/equipment")}
              className="mt-6 rounded-xl bg-[#FE7F2D] px-5 py-3 font-semibold text-white transition hover:bg-[#233D4D]"
            >
              Browse Equipment
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menuItems={customerMenu}>
      <div className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
            Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#233D4D]">
            Complete your booking
          </h1>

          <p className="mt-2 text-sm text-[#233D4D]/60">
            Select your rental dates and review your equipment.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            
            {/* LEFT */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#233D4D]">
                  Rental Schedule
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#233D4D]">
                      Pickup Date
                    </label>

                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full rounded-xl border border-[#EAECF0] px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#233D4D]">
                      Return Date
                    </label>

                    <input
                      type="date"
                      value={returnDate}
                      min={pickupDate || undefined}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full rounded-xl border border-[#EAECF0] px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D]"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#233D4D]">
                  Your Equipment
                </h2>

                <div className="mt-5 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-[#EAECF0] pb-4 last:border-0"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#EAECF0]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={`${item.brand} ${item.model}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-[#233D4D]">
                          {item.brand} {item.model}
                        </h3>

                        <p className="mt-1 text-sm text-[#233D4D]/60">
                          {item.category?.name || "Equipment"}
                        </p>

                        <p className="mt-2 text-sm font-bold text-[#FE7F2D]">
                          Rp{" "}
                          {Number(item.price_per_day).toLocaleString("id-ID")}
                          {" / day"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT - SUMMARY */}
            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#233D4D]">
                Booking Summary
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#233D4D]/60">
                    Equipment
                  </span>

                  <span className="font-medium text-[#233D4D]">
                    {cartItems.length} item
                    {cartItems.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#233D4D]/60">
                    Duration
                  </span>

                  <span className="font-medium text-[#233D4D]">
                    {totalDays} day{totalDays !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#233D4D]/60">
                    Total / Day
                  </span>

                  <span className="font-medium text-[#233D4D]">
                    Rp {totalPerDay.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="border-t border-[#EAECF0] pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#233D4D]">
                      Total Price
                    </span>

                    <span className="text-xl font-bold text-[#FE7F2D]">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={!pickupDate || !returnDate || totalDays <= 0}
                className="mt-6 w-full rounded-xl bg-[#FE7F2D] px-5 py-4 font-semibold text-white transition hover:bg-[#233D4D] disabled:cursor-not-allowed disabled:bg-[#233D4D]/30"
              >
                Proceed to Payment
              </button>
            </aside>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Checkout;