import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PublicLayout from "../../components/templates/PublicLayout";
import HeroSection from "../../components/organisms/HeroSection";
import EquipmentGrid from "../../components/organisms/EquipmentGrid";
import FeatureSection from "../../components/organisms/FeatureSection";
import LoadingState from "../../components/molecules/LoadingState";
import EmptyState from "../../components/molecules/EmptyState";


import apiClient from "../../services/api/client";

import NikonZ6 from "../../assets/images/Nikon.jpg";

function Home() {
  const navigate = useNavigate();

  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEquipmentClick = (equipment) => {
    navigate(`/equipment/${equipment.id}`);
  };


  useEffect(() => {
    const fetchFeaturedEquipments = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get("/equipments");

        setEquipments(response.data.data.slice(0, 8));
      } catch (error) {
        console.error(
          "Failed to fetch featured equipments:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEquipments();
  }, []);


  return (
    <>
      <PublicLayout>
        <HeroSection image={NikonZ6} />

        <section
          id="equipment"
          className="scroll-mt-20 bg-[#EAECF0] px-4 py-10"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
                Our Equipment
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#000000]">
                Find the right gear
              </h2>

              <p className="mt-2 text-sm text-[#233D4D]/60">
                Choose from our collection of professional photography equipment.
              </p>
            </div>

            {loading ? (
              <LoadingState />
            ) : equipments.length > 0 ? (
              <EquipmentGrid
                equipments={equipments}
                onEquipmentClick={handleEquipmentClick}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </section>

        <FeatureSection />
      </PublicLayout>
    </>
  );
}

export default Home;