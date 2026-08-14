import Badge from "../atoms/Badge";

function EquipmentCard({
  image,
  brand,
  model,
  price,
  status = "Available",
  onClick,
}) {
  const statusVariant = {
    Available: "available",
    Booked: "booked",
    Maintenance: "maintenance",
  };

  return (
    <article className="group cursor-pointer">
      {/* Image */}
      <div
        className="relative aspect-square overflow-hidden rounded-2xl bg-[#EAECF0] lg:aspect-[4/3]"
        onClick={onClick}
      >
        <img
          src={image}
          alt={`${brand} ${model}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Status */}
        <div className="absolute left-3 top-3">
          <Badge
            variant={statusVariant[status] || "default"}
            size="sm"
          >
            {status}
          </Badge>
        </div>

        {/* Quick View */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center bg-[#233D4D]/90 py-3 transition-transform duration-300 group-hover:translate-y-0">
          <span className="text-xs font-semibold uppercase tracking-wide text-white">
            Quick View
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2">
        <p className="text-[10px] font-medium uppercase tracking-wide text-[#233D4D]/50">
          {brand}
        </p>

        <h3 className="truncate text-base font-semibold text-[#000000]">
          {model}
        </h3>

        <div className="flex items-baseline whitespace-nowrap">
          <span className="text-base font-bold text-[#233D4D]">
            Rp {price?.toLocaleString("id-ID")}
          </span>

          <span className="text-[10px] text-[#233D4D]/50">
            / day
          </span>
        </div>
      </div>
    </article>
  );
}

export default EquipmentCard;