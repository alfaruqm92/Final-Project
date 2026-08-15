import Input from "../atoms/Input";
import Icon from "../atoms/Icon";

function SearchBar({ value, onChange, placeholder = "Search equipment..." }) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#233D4D]">
        <Icon name="search" size={18} />
      </div>

      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
}

export default SearchBar;