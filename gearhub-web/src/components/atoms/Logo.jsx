function Logo({ dark = false }) {
  return (
    <div
      className={`text-xl font-bold tracking-tight ${
        dark ? "text-white" : "text-gray-900"
      }`}
    >
      Gear<span className="text-blue-600">Hub</span>
    </div>
  );
}

export default Logo;