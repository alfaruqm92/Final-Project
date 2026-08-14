function DatePicker({label, name, value, onChange, min, required = false,}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-[#233D4D]"
      >
        {label}
      </label>

      <input
        id={name}
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        required={required}
        className="w-full rounded-lg border border-[#EAECF0] bg-white px-4 py-2.5 text-sm text-[#000000] outline-none transition focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/20"
      />
    </div>
  );
}

export default DatePicker;