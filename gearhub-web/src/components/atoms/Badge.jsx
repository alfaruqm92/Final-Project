function Badge({ children, variant = "default", size = "md" }) {
  const variants = {
    available: "bg-[#233D4D] text-white",
    booked: "bg-[#FE7F2D] text-white",
    maintenance: "bg-[#EAECF0] text-[#233D4D]",
    pending: "bg-[#EAECF0] text-[#233D4D]",
    paid: "bg-[#233D4D] text-white",
    cancelled: "bg-[#000000] text-white",
    default: "bg-[#EAECF0] text-[#233D4D]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[9px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
        ${variants[variant] || variants.default } ${sizes[size] || sizes.md}`}
    >
      {children}
    </span>
  );
}

export default Badge;