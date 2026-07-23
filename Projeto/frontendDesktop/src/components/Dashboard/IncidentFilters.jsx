export default function IncidentFilters() {
  return (
    <div className="flex gap-2">
      <button className="rounded-full bg-lime-400 px-4 py-2 font-semibold text-black">
        All
      </button>

      <button className="rounded-full bg-[#242424] px-4 py-2">
        Critical
      </button>

      <button className="rounded-full bg-[#242424] px-4 py-2">
        Pending
      </button>

      <button className="rounded-full bg-[#242424] px-4 py-2">
        Fixed
      </button>
    </div>
  );
}