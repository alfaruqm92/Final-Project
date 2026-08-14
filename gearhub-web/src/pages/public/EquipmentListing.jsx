import SearchBar from "../../components/molecules/SearchBar";
import EquipmentGrid from "../../components/organisms/EquipmentGrid";

function Equipment() {
  return (
    <div className="min-h-screen bg-[#EAECF0]">
      <section className="px-4 pb-12 pt-28 md:px-8 md:pt-32">
        <div className="mx-auto max-w-7xl">

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
            <SearchBar />
          </div>

          {/* Category */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            <button className="shrink-0 rounded-full bg-[#233D4D] px-4 py-2 text-xs font-medium text-white">
              All
            </button>

            <button className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#233D4D]">
              Cameras
            </button>

            <button className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#233D4D]">
              Lenses
            </button>

            <button className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#233D4D]">
              Accessories
            </button>
          </div>

          {/* Equipment */}
          <div className="mt-8">
            <EquipmentGrid />
          </div>

        </div>
      </section>
    </div>
  );
}

export default Equipment;