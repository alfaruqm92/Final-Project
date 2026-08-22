import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

import apiClient from "../../services/api/client";

import LoadingState from "../../components/molecules/LoadingState";
import Icon from "../../components/atoms/Icon";
import EquipmentGrid from "../../components/organisms/EquipmentGrid";
import PublicLayout from "../../components/templates/PublicLayout";
import DashboardLayout from "../../components/templates/DashboardLayout";
import LoginModal from "../../components/organisms/LoginModal";

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

function EquipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [equipment, setEquipment] = useState(null);
  const [relatedEquipments, setRelatedEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        setError("");

        const [equipmentResponse, equipmentsResponse] =
          await Promise.all([
            apiClient.get(`/equipments/${id}`),
            apiClient.get("/equipments"),
          ]);

        const currentEquipment = equipmentResponse.data.data;

        setEquipment(currentEquipment);

        const otherEquipments = equipmentsResponse.data.data
          .filter((item) => item.id !== currentEquipment.id)
          .filter(
            (item) =>
              item.status?.toLowerCase() === "available"
          )
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

  const handleRelatedEquipmentClick = (item) => {
    navigate(`/equipment/${item.id}`);
  };

  const detailContent = (
    <section
      className={
        isAuthenticated
          ? "px-4 py-8 md:px-8"
          : "px-4 pb-12 pt-28 md:px-8 md:pt-32"
      }
    >
      <div className="mx-auto max-w-7xl">

        {/* Back Button - Guest Only */}
        {!isAuthenticated && (
          <button
            type="button"
            onClick={() => navigate("/equipment")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#233D4D] transition-colors hover:text-[#FE7F2D]"
          >
            <Icon name="circlearrowleft" size={16} />
            Back to Equipment
          </button>
        )}

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Equipment Detail */}
        {!loading && !error && equipment && (
          <>
            <div className="grid gap-8 lg:grid-cols-2">

              {/* Equipment Image */}
              <div className="overflow-hidden rounded-3xl bg-white">
                {equipment.image ? (
                  <img
                    src={equipment.image}
                    alt={`${equipment.brand} ${equipment.model}`}
                    className="min-h-[350px] w-full object-cover"
                  />
                ) : (
                  <div className="flex min-h-[350px] items-center justify-center text-sm text-[#233D4D]/50">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Equipment Information */}
              <div className="flex flex-col">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {/* Category */}
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#FE7F2D]">
                      {equipment.category?.name || "Equipment"}
                    </p>

                    {/* Equipment Name */}
                    <h1 className="mt-2 text-3xl font-bold text-[#233D4D] md:text-4xl">
                      {equipment.brand} {equipment.model}
                    </h1>
                  </div>

                  {/* Availability Status */}
                  <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${
                      equipment.status?.toLowerCase() === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {equipment.status?.toLowerCase() === "available"
                      ? "Available"
                      : "Not Available"}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 leading-7 text-[#233D4D]/60">
                  {equipment.description ||
                    "Professional equipment available for your next project."}
                </p>

                {/* Price */}
                <div className="mt-6 rounded-2xl bg-white p-5">
                  <p className="text-sm text-[#233D4D]/60">
                    Rental price
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#233D4D]">
                    Rp{" "}
                    {Number(
                      equipment.price_per_day || 0
                    ).toLocaleString("id-ID")}

                    <span className="ml-1 text-sm font-normal text-[#233D4D]/50">
                      / day
                    </span>
                  </p>
                </div>

                {/* Add to Cart */}
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={
                      equipment.status?.toLowerCase() !== "available"
                    }
                    className="w-full rounded-xl bg-[#FE7F2D] px-6 py-4 font-semibold text-white transition hover:bg-[#233D4D] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Add to Cart
                  </button>

                  {addedToCart && (
                    <p className="mt-3 text-center text-sm font-medium text-green-600">
                      Equipment added to cart successfully!
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Related Equipment */}
            {relatedEquipments.length > 0 && (
              <section className="mt-16 border-t border-[#233D4D]/10 pt-10">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

                  <div>
                    <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
                      Explore More
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-[#233D4D]">
                      Other Equipment You May Like
                    </h2>

                    <p className="mt-2 text-sm text-[#233D4D]/60">
                      Discover more equipment available for your next project.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/equipment")}
                    className="shrink-0 text-sm font-semibold text-[#FE7F2D] transition hover:text-[#233D4D]"
                  >
                    View All Equipment →
                  </button>

                </div>

                <div className="mt-8">
                  <EquipmentGrid
                    equipments={relatedEquipments}
                    onEquipmentClick={handleRelatedEquipmentClick}
                  />
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </section>
  );

  const loginModal = showLoginModal && (
    <LoginModal
      onClose={() => setShowLoginModal(false)}
    />
  );

  if (isAuthenticated) {
    return (
      <>
        <DashboardLayout
          menuItems={customerMenu}
          showCart={true}
        >
          {detailContent}
        </DashboardLayout>

        {loginModal}
      </>
    );
  }


  return (
    <>
      <PublicLayout>
        {detailContent}
      </PublicLayout>

      {loginModal}
    </>
  );
}

export default EquipmentDetail;