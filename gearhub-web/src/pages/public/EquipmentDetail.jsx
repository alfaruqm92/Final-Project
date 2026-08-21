import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

import apiClient from "../../services/api/client";
import LoadingState from "../../components/molecules/LoadingState";
import Icon from "../../components/atoms/Icon";
import EquipmentGrid from "../../components/organisms/EquipmentGrid";
import PublicLayout from "../../components/templates/PublicLayout";
import LoginModal from "../../components/organisms/LoginModal";

function EquipmentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();
    const { addToCart } = useCart();

    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [relatedEquipments, setRelatedEquipments] = useState([]);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState("");
    const [bookingSuccess, setBookingSuccess] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
            setLoading(true);
            setError("");

            const [equipmentResponse, equipmentsResponse] = await Promise.all([
                apiClient.get(`/equipments/${id}`),
                apiClient.get("/equipments"),
            ]);

            const currentEquipment = equipmentResponse.data.data;

            setEquipment(currentEquipment);

            const otherEquipments = equipmentsResponse.data.data
                .filter((item) => item.id !== currentEquipment.id)
                .slice(0, 4);

            setRelatedEquipments(otherEquipments);

            } catch (error) {
            console.error("Failed to fetch equipment:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load equipment."
            );
            } finally {
            setLoading(false);
            }
        };

        fetchEquipment();
        }, [id]);

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return ( 
        <div className="min-h-screen bg-[#EAECF0] px-4 py-32">
            <div className="mx-auto max-w-7xl">
            <button
                type="button"
                onClick={() => navigate("/equipment")}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#233D4D] hover:text-[#FE7F2D]"
            >
                <Icon name="circlearrowleft" size={16} />
                Back to Equipment
            </button>

            <p className="mt-8 text-red-500">
                {error}
            </p>
            </div>
        </div>
        );
    }

    if (!equipment) {
        return null;
    }

    const isAvailable =
    equipment.status?.toLowerCase() === "available";

    const totalDays =
    pickupDate && returnDate
        ? Math.ceil(
            (new Date(returnDate) - new Date(pickupDate)) /
            (1000 * 60 * 60 * 24)
        )
        : 0;

    const totalPrice =
    totalDays > 0
        ? totalDays * Number(equipment.price_per_day)
        : 0;

    const handleBooking = async (e) => {
        e.preventDefault();

        setBookingError("");
        setBookingSuccess("");

        if (!pickupDate || !returnDate) {
            setBookingError("Please select pickup and return dates.");
            return;
        }

        try {
            setBookingLoading(true);

            const response = await apiClient.post("/bookings", {
            equipment_id: equipment.id,
            pickup_date: pickupDate,
            return_date: returnDate,
            });

            setBookingSuccess(
            response.data.message || "Booking created successfully!"
            );

            setPickupDate("");
            setReturnDate("");
            setShowBookingForm(false);
        } catch (error) {
            console.error("Failed to create booking:", error);

            setBookingError(
            error.response?.data?.message ||
                "Failed to create booking. Please try again."
            );
        } finally {
            setBookingLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }

        addToCart(equipment);

        setAddedToCart(true);

        setTimeout(() => {
            setAddedToCart(false);
        }, 2000);
    };

    return (
        <PublicLayout>
            <main className="min-h-screen bg-[#EAECF0] px-4 pb-16 pt-28 md:px-8 md:pt-32">
            <div className="mx-auto max-w-7xl">

                {/* Back Button */}
                <button
                type="button"
                onClick={() => navigate("/equipment")}
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#233D4D] transition-colors hover:text-[#FE7F2D]"
                >
                <Icon name="circlearrowleft" size={16} />
                Back to Equipment
                </button>

                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-sm">
                    {equipment.image ? (
                        <img
                        src={equipment.image}
                        alt={`${equipment.brand} ${equipment.model}`}
                        className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-[#233D4D]/40">
                        No Image
                        </div>
                    )}
                </div>

                {/* Detail */}
                <div className="flex flex-col justify-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
                    {equipment.category?.name || "Equipment"}
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-[#233D4D] md:text-5xl">
                    {equipment.brand} {equipment.model}
                    </h1>

                    <div className="mt-5">
                    <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        isAvailable
                            ? "bg-green-100 text-green-700"
                            : equipment.status === "Booked"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                        {equipment.status}
                    </span>
                    </div>

                    <p className="mt-6 text-2xl font-bold text-[#233D4D]">
                    Rp {Number(equipment.price_per_day).toLocaleString("id-ID")}
                    <span className="ml-1 text-sm font-normal text-[#233D4D]/60">
                        / day
                    </span>
                    </p>

                    {equipment.description && (
                    <div className="mt-6">
                        <h2 className="text-sm font-semibold text-[#233D4D]">
                        Description
                        </h2>

                        <p className="mt-2 leading-7 text-[#233D4D]/70">
                        {equipment.description}
                        </p>
                    </div>
                    )}

                    {/* Information */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs text-[#233D4D]/60">
                        Brand
                        </p>
                        <p className="mt-1 font-semibold text-[#233D4D]">
                        {equipment.brand}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs text-[#233D4D]/60">
                        Year
                        </p>
                        <p className="mt-1 font-semibold text-[#233D4D]">
                        {equipment.year}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs text-[#233D4D]/60">
                        Category
                        </p>
                        <p className="mt-1 font-semibold text-[#233D4D]">
                        {equipment.category?.name || "-"}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs text-[#233D4D]/60">
                        Unit Number
                        </p>
                        <p className="mt-1 font-semibold text-[#233D4D]">
                        {equipment.unit_number}
                        </p>
                    </div>
                    </div>

                    {/* Booking Button */}
                    <button
                    type="button"
                    disabled={!isAvailable || addedToCart}
                    onClick={handleAddToCart}
                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white transition-all duration-300 ${
                        addedToCart
                        ? "bg-green-600"
                        : "bg-[#FE7F2D] hover:bg-[#233D4D]"
                    } disabled:cursor-not-allowed`}
                    >
                    {addedToCart ? (
                        <>
                        <span>✓</span>
                        Added to Cart
                        </>
                    ) : (
                        <>
                        <Icon name="cart" size={20} />
                        Add to Cart
                        </>
                    )}
                    </button>
                    {bookingSuccess && (
                        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {bookingSuccess}
                        </div>
                        )}

                        {bookingError && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {bookingError}
                        </div>
                        )}

                        {showBookingForm && (
                        <form
                            onSubmit={handleBooking}
                            className="mt-5 rounded-2xl border border-[#233D4D]/10 bg-white p-5 shadow-sm"
                        >
                            <h2 className="text-lg font-bold text-[#233D4D]">
                            Book This Equipment
                            </h2>

                            <p className="mt-1 text-sm text-[#233D4D]/60">
                            Select your rental period.
                            </p>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {/* Pickup Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#233D4D]">
                                Pickup Date
                                </label>

                                <input
                                type="date"
                                value={pickupDate}
                                onChange={(e) => setPickupDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full rounded-xl border border-[#EAECF0] px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D]"
                                />
                            </div>

                            {/* Return Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#233D4D]">
                                Return Date
                                </label>

                                <input
                                type="date"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                min={pickupDate || new Date().toISOString().split("T")[0]}
                                className="w-full rounded-xl border border-[#EAECF0] px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D]"
                                />
                            </div>
                            </div>

                            {/* Booking Summary */}
                            {totalDays > 0 && (
                            <div className="mt-5 rounded-xl bg-[#EAECF0] p-4">
                                <div className="flex justify-between text-sm">
                                <span className="text-[#233D4D]/60">
                                    Rental Duration
                                </span>

                                <span className="font-semibold text-[#233D4D]">
                                    {totalDays} day{totalDays > 1 ? "s" : ""}
                                </span>
                                </div>

                                <div className="mt-3 flex justify-between text-sm">
                                <span className="text-[#233D4D]/60">
                                    Price per day
                                </span>

                                <span className="font-semibold text-[#233D4D]">
                                    Rp{" "}
                                    {Number(equipment.price_per_day).toLocaleString("id-ID")}
                                </span>
                                </div>

                                <div className="mt-4 flex justify-between border-t border-[#233D4D]/10 pt-4">
                                <span className="font-semibold text-[#233D4D]">
                                    Estimated Total
                                </span>

                                <span className="text-lg font-bold text-[#FE7F2D]">
                                    Rp {totalPrice.toLocaleString("id-ID")}
                                </span>
                                </div>
                            </div>
                            )}

                            <button
                            type="submit"
                            disabled={bookingLoading || totalDays <= 0}
                            className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#233D4D] px-5 py-3 font-semibold text-white transition hover:bg-[#FE7F2D] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                            {bookingLoading ? "Creating Booking..." : "Confirm Booking"}
                            </button>
                        </form>
                        )}

                </div>
                </div>
                
                {/* Related Equipment */}
                {relatedEquipments.length > 0 && (
                <section className="mt-20 border-t border-[#233D4D]/10 pt-10">
                    <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
                        Explore More
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-[#233D4D] md:text-3xl">
                        You may also like
                        </h2>

                        <p className="mt-2 text-sm text-[#233D4D]/60">
                        Explore more professional equipment for your next project.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/equipment")}
                        className="hidden shrink-0 text-sm font-medium text-[#233D4D] transition-colors hover:text-[#FE7F2D] md:block"
                    >
                        View All →
                    </button>
                    </div>

                    <div className="mt-8">
                    <EquipmentGrid
                        equipments={relatedEquipments}
                        onEquipmentClick={(item) =>
                        navigate(`/equipment/${item.id}`)
                        }
                    />
                    </div>

                    <button
                    type="button"
                    onClick={() => navigate("/equipment")}
                    className="mt-6 text-sm font-medium text-[#233D4D] transition-colors hover:text-[#FE7F2D] md:hidden"
                    >
                    View All Equipment →
                    </button>
                </section>
                )}

            </div>
            </main>

            {showLoginModal && (
            <LoginModal
                onClose={() => setShowLoginModal(false)}
                onSuccess={(user) => {
                addToCart(equipment);
                setShowLoginModal(false);
                }}
            />
            )}

        </PublicLayout>
    );
}

export default EquipmentDetail;