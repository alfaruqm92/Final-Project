function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
}) {
  const variants = {
    primary: "bg-[#FE7F2D] text-white hover:bg-[#e86f20]",
    secondary: "bg-[#EAECF0] text-[#233D4D] hover:bg-[#dfe2e6]",
    dark: "bg-[#233D4D] text-white hover:bg-[#1b303d]",
    outline: "border border-[#233D4D] text-[#233D4D] hover:bg-[#233D4D] hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg font-medium transition 
        ${variants[variant] || variants.primary} ${sizes[size] || sizes.md}`}
    >
      {children}
    </button>
  );
}

export default Button;