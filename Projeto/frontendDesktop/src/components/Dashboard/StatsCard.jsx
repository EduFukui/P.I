export default function StatsCard({
  icon,
  value,
  title,
  subtitle,
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-lime-400 p-8 text-black">
      <div>{icon}</div>

      <div>
        <h1 className="text-5xl font-bold">
          {value}
        </h1>

        <p className="mt-2 font-semibold">
          {title}
        </p>

        <p className="text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}