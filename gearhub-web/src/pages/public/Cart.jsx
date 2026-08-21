import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import PublicLayout from "../../components/templates/PublicLayout";

function Cart() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useCart();
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const totalDays =
    pickupDate && returnDate
        ? Math.ceil(
            (new Date(returnDate) - new Date(pickupDate)) /
            (1000 * 60 * 60 * 24)
        )
        : 0;
    
    const totalPricePerDay = cartItems.reduce(
        (total, item) => total + Number(item.price_per_day),0
    );
    
    const totalPrice = totalPricePerDay * totalDays;
    
    return (
        <PublicLayout>
        <main className="min-h-screen bg-[#EAECF0] px-4 pb-16 pt-28 md:px-8 md:pt-32">
            <div className="mx-auto max-w-5xl">

            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
                Your Rental
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#233D4D]">
                Rental Cart
                </h1>

                <p className="mt-2 text-sm text-[#233D4D]/60">
                Review your selected equipment before checkout.
                </p>
            </div>

            {cartItems.length === 0 ? (
                <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm">
                <h2 className="text-xl font-bold text-[#233D4D]">
                    Your cart is empty
                </h2>

                <p className="mt-2 text-sm text-[#233D4D]/60">
                    Explore our equipment and add the gear you need.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/equipment")}
                    className="mt-6 rounded-xl bg-[#FE7F2D] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#233D4D]"
                >
                    Browse Equipment
                </button>
                </div>
            ) : (
                <div className="mt-8 space-y-4">
                {cartItems.map((item) => (
                    <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
                    >
                    {/* Image */}
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EAECF0]">
                        {item.image ? (
                        <img
                            src={item.image}
                            alt={`${item.brand} ${item.model}`}
                            className="h-full w-full object-cover"
                        />
                        ) : (
                        <div className="flex h-full items-center justify-center text-xs text-[#233D4D]/40">
                            No Image
                        </div>
                        )}
                    </div>

                    {/* Information */}
                    <div className="flex flex-1 flex-col justify-between">
                        <div>
                        <p className="text-xs font-medium text-[#FE7F2D]">
                            Equipment
                        </p>

                        <h2 className="mt-1 font-bold text-[#233D4D]">
                            {item.brand} {item.model}
                        </h2>

                        <p className="mt-1 text-sm text-[#233D4D]/60">
                            Rp{" "}
                            {Number(item.price_per_day).toLocaleString("id-ID")}
                            {" / day"}
                        </p>
                        </div>

                        <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="mt-3 w-fit text-xs font-medium text-red-500 hover:underline"
                        >
                        Remove
                        </button>
                    </div>
                    </div>
                ))}

                {/* Cart summary sementara */}
                <div className="rounded-2xl bg-[#233D4D] p-5 text-white">
                    <p className="text-sm text-white/70">
                    Selected Equipment
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                    {cartItems.length} item
                    {cartItems.length > 1 ? "s" : ""}
                    </p>
                </div>

                <div className="flex justify-between gap-4">
                    <button
                    type="button"
                    onClick={() => navigate("/equipment")}
                    className="rounded-xl border border-[#233D4D]/20 px-5 py-3 text-sm font-semibold text-[#233D4D]"
                    >
                    Continue Shopping
                    </button>

                    <button
                    type="button"
                    className="rounded-xl bg-[#FE7F2D] px-5 py-3 text-sm font-semibold text-white"
                    >
                    Continue to Checkout
                    </button>
                </div>
                </div>
            )}

            </div>
        </main>
        </PublicLayout>
    );
}

export default Cart;