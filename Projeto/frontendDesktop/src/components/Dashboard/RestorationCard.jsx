export default function RestorationCard({
  title,
  total,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d] p-6 transition hover:border-lime-400">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#292929] text-lime-400">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        {total}
      </p>
    </div>
  );
}