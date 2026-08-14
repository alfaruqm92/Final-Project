function Input({type = "text", placeholder = "", value, onChange, name, required = false}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-lg border border-[#EAECF0] bg-white px-4 py-2.5 text-sm text-[#000000] outline-none transition placeholder:text-[#233D4D]/50 focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/20"
    />
  );
}

export default Input;