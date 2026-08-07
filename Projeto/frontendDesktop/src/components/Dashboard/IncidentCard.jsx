export default function IncidentCard({
  image,
  badge,
  title,
  desc,
  location,
  action,
  onAction,
  status,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d]">
      {image ? (
        <div className="relative">
          <img src={image} alt={title} className="h-52 w-full object-cover" />

          <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold">
            {badge}
          </span>
        </div>
      ) : (
        <div className="relative flex h-32 items-center justify-center bg-[#272727]">
          <span className="text-4xl">📍</span>
          <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold">
            {badge}
          </span>
        </div>
      )}

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold">{title}</h3>
          {status && (
            <span className="whitespace-nowrap rounded-full bg-[#292929] px-2 py-1 text-[11px] text-gray-300">
              {status}
            </span>
          )}
        </div>

        <p className="text-sm leading-6 text-gray-400">{desc}</p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-sm text-lime-400">📍 {location}</span>

          <button
            type="button"
            onClick={onAction}
            className="font-semibold text-lime-400 hover:underline"
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
