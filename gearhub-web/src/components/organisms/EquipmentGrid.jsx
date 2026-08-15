import EquipmentCard from "../molecules/EquipmentCard";

function EquipmentGrid({ equipments = [], onEquipmentClick }) {
  return (
    <div className="grid grid-cols-2 gap-3 transition-opacity duration-300 md:grid-cols-3 lg:grid-cols-4">
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
  );
}

export default EquipmentGrid;