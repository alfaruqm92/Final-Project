function Logo({ dark = false }) {
  return (
    <div
      className={`text-xl font-bold tracking-tight ${
        dark ? "text-white" : "text-[#233D4D]"
      }`}
    >
      Gear<span className="text-[#FE7F2D]">Hub</span>
    </div>
  );
}

export default Logo;