import {
  MapIcon,
  MapPinIcon,
  TrashIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const restorationAreas = [
  {
    title: "Pavimentação",
    total: "14 ativos",
    icon: <WrenchScrewdriverIcon className="w-6" />,
  },
  {
    title: "Iluminação",
    total: "8 solicitações",
    icon: <MapPinIcon className="w-6" />,
  },
  {
    title: "Áreas Verdes",
    total: "5 agendados",
    icon: <MapIcon className="w-6" />,
  },
  {
    title: "Limpeza Urbana",
    total: "7 relatos",
    icon: <TrashIcon className="w-6" />,
  },
];

export default function RestorationSection() {
  return (
    <>
      <h2 className="mb-5 text-xl font-bold">
        Áreas de atendimento
      </h2>

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {restorationAreas.map((area) => (
          <div
            key={area.title}
            className="rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d] p-6 transition hover:border-lime-400"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#292929] text-lime-400">
              {area.icon}
            </div>

            <h3 className="mt-5 font-semibold">
              {area.title}
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              {area.total}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
