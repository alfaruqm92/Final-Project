import PublicLayout from "../../components/templates/PublicLayout";
import HeroSection from "../../components/organisms/HeroSection";
import EquipmentGrid from "../../components/organisms/EquipmentGrid";
import FeatureSection from "../../components/organisms/FeatureSection";

import NikonZ6 from "../../assets/images/Nikon.jpg";
import EosR6 from "../../assets/images/EOSR6.jpg";
import SonyA7 from "../../assets/images/SonyA7.jpg";
import FujifilmXT5 from "../../assets/images/FujifilmXT5.jpg";

const equipments = [
  {
    id: 1,
    brand: "Sony",
    model: "A7 IV",
    price_per_day: 250000,
    status: "Available",
    image: `${SonyA7}`,
  },
  {
    id: 2,
    brand: "Canon",
    model: "EOS R6 Mark II",
    price_per_day: 300000,
    status: "Available",
    image: `${EosR6}`,
  },
  {
    id: 3,
    brand: "Fujifilm",
    model: "X-T5",
    price_per_day: 200000,
    status: "Booked",
    image: `${FujifilmXT5}`,
  },

  {
    id: 4,
    brand: "Nikon",
    model: "Z6 III",
    price_per_day: 350000,
    status: "Booked",
    image: `${NikonZ6}`,
  },
];

function Home() {
  const handleEquipmentClick = (equipment) => {
    console.log("Selected equipment:", equipment);
  };

  return (
    <PublicLayout>
      <HeroSection image={NikonZ6} />

      <section id="equipment" className="scroll-mt-20 bg-[#EAECF0] px-4 py-10">
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

          <EquipmentGrid
            equipments={equipments}
            onEquipmentClick={handleEquipmentClick}
          />
        </div>
      </section>

      <FeatureSection />
    </PublicLayout>
  );
}

export default Home;