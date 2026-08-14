import EquipmentCard from "../molecules/EquipmentCard";

function EquipmentGrid({ equipments = [], onEquipmentClick }) {
  return (
    <section id="equipment" className="bg-[#EAECF0] px-4 py-10">
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

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {equipments.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              image={equipment.image}
              brand={equipment.brand}
              model={equipment.model}
              price={equipment.price_per_day}
              status={equipment.status}
              onClick={() => onEquipmentClick?.(equipment)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EquipmentGrid;