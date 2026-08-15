import SearchBar from "../../components/molecules/SearchBar";
import EquipmentGrid from "../../components/organisms/EquipmentGrid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Icon from "../../components/atoms/Icon";
import EmptyState from "../../components/molecules/EmptyState";
import apiClient from "../../services/api/client";
import LoadingState from "../../components/molecules/LoadingState";

const categories = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Camera",
    label: "Cameras",
  },
  {
    value: "Lens",
    label: "Lenses",
  },
  {
    value: "Accessory",
    label: "Accessories",
  },
];

function Equipment() {

  const navigate = useNavigate();
  

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredEquipments = equipments.filter((equipment) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      equipment.brand.toLowerCase().includes(keyword) ||
      equipment.model.toLowerCase().includes(keyword);

    const matchesCategory =
      category === "All" ||
      equipment.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get("/equipments");

        setEquipments(response.data.data);
      } catch (error) {
        console.error("Failed to fetch equipments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  

  return (
    <div className="min-h-screen bg-[#EAECF0]">
      <section className="px-4 pb-12 pt-28 md:px-8 md:pt-32">
        <div className="mx-auto max-w-7xl">

          <button type="button" onClick={() => navigate("/")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#233D4D] transition-colors hover:text-[#FE7F2D]">
            <Icon name="circlearrowleft" size={16} />
            Back to Home
          </button>

          {/* Header */}
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
              Our Equipment
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#000000] md:text-4xl">
              Find the right gear
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#233D4D]/60 md:text-base">
              Explore our collection of professional cameras and photography
              equipment for your next project.
            </p>
          </div>

          {/* Search */}
          <div className="mt-7 max-w-xl">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setCategory(item.value)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ease-out ${
                  category === item.value
                    ? "bg-[#233D4D] text-white shadow-sm"
                    : "bg-white text-[#233D4D] hover:bg-[#233D4D]/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Equipment */}
          <div className="mt-8">
            {loading ? (
              <LoadingState />
            ) : filteredEquipments.length > 0 ? (
              <EquipmentGrid equipments={filteredEquipments} />
            ) : (
              <EmptyState />
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

export default Equipment;