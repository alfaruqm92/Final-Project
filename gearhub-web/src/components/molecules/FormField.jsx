import Input from "../atoms/Input";

function FormField({label, type = "text", name, value, onChange, placeholder, required = false}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-[#233D4D]"
      >
        {label}
      </label>

      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default FormField;