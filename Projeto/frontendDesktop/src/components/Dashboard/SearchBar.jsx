import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({
  placeholder = "Search incidents...",
  value,
  onChange,
}) {
  return (
    <div className="relative w-full px-4">
      <MagnifyingGlassIcon className="absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-full
          border
          border-[#2a2a2a]
          bg-[#1d1d1d]
          py-3
          pl-12
          pr-4
          text-white
          outline-none
          transition
          placeholder:text-gray-500
          focus:border-lime-400
        "
      />
    </div>
  );
}