import {
  MapIcon,
  MapPinIcon,
  TrashIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import RestorationCard from "./RestorationCard";

const restorationAreas = [
  {
    title: "Pavement",
    total: "14 Active",
    icon: <WrenchScrewdriverIcon className="w-6" />,
  },
  {
    title: "Lighting",
    total: "8 Requests",
    icon: <MapPinIcon className="w-6" />,
  },
  {
    title: "Green",
    total: "5 Scheduled",
    icon: <MapIcon className="w-6" />,
  },
  {
    title: "Sanitation",
    total: "7 Reports",
    icon: <TrashIcon className="w-6" />,
  },
];

export default function RestorationSection() {
  return (
    <>
      <h2 className="mb-5 text-xl font-bold">
        Restoration Areas
      </h2>

      <div className="mb-8 grid grid-cols-4 gap-5">
        {restorationAreas.map((area) => (
          <RestorationCard
            key={area.title}
            title={area.title}
            total={area.total}
            icon={area.icon}
          />
        ))}
      </div>
    </>
  );
}