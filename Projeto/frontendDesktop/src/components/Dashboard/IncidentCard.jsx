export default function IncidentCard({
  image,
  badge,
  title,
  desc,
  location,
  action,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d]">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-52 w-full object-cover"
        />

        <span className="absolute top-4 right-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold">
          {badge}
        </span>
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold">
          {title}
        </h3>

        <p className="text-sm leading-6 text-gray-400">
          {desc}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-lime-400">
            📍 {location}
          </span>

          <button className="font-semibold text-lime-400 hover:underline">
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}