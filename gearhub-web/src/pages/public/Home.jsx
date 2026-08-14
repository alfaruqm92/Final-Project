import PublicLayout from "../../components/templates/PublicLayout";
import HeroSection from "../../components/organisms/HeroSection";
import EquipmentGrid from "../../components/organisms/EquipmentGrid";
import FeatureSection from "../../components/organisms/FeatureSection";

import Nikon from "../../assets/images/Nikon.jpg";
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
    image: `${Nikon}`,
  },
];

function Home() {
  const handleEquipmentClick = (equipment) => {
    console.log("Selected equipment:", equipment);
  };

  return (
    <PublicLayout>
      <HeroSection image={Nikon} />

      <EquipmentGrid
        equipments={equipments}
        onEquipmentClick={handleEquipmentClick}
      />

      <FeatureSection />
    </PublicLayout>
  );
}

export default Home;