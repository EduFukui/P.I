const filters = ["All", "Critical", "Pending", "Fixed"];

export default function IncidentFilters({ value = "All", onChange = () => {} }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          className={`rounded-full px-4 py-2 font-semibold transition ${
            value === filter
              ? "bg-lime-400 text-black"
              : "bg-[#242424] text-gray-300 hover:bg-[#303030]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
