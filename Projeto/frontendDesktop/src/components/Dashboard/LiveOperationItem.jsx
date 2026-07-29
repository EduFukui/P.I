export default function LiveOperationItem({
  title,
  subtitle,
}) {
  return (
    <div>
      <p className="font-semibold text-lime-400">
        {title}
      </p>

      <span className="text-sm text-gray-500">
        {subtitle}
      </span>
    </div>
  );
}