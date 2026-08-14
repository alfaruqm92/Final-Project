function Badge({ children, variant = "default" }) {
  const variants = {
    available: "bg-green-100 text-green-700",
    booked: "bg-blue-100 text-blue-700",
    maintenance: "bg-orange-100 text-orange-700",
    pending: "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    default: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        variants[variant] || variants.default
      }`}
    >
      {children}
    </span>
  );
}

export default Badge;