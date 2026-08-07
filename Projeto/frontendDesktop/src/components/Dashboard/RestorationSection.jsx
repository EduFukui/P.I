import {
  MapIcon,
  MapPinIcon,
  TrashIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import RestorationCard from "./RestorationCard";

const fallbackAreas = [
  { title: "Pavement", icon: <WrenchScrewdriverIcon className="w-6" /> },
  { title: "Lighting", icon: <MapPinIcon className="w-6" /> },
  { title: "Green", icon: <MapIcon className="w-6" /> },
  { title: "Sanitation", icon: <TrashIcon className="w-6" /> },
];

function iconForCategory(name, index) {
  const value = String(name || "").toLowerCase();

  if (value.includes("luz") || value.includes("ilum")) {
    return <MapPinIcon className="w-6" />;
  }

  if (value.includes("lixo") || value.includes("sanea") || value.includes("resíduo")) {
    return <TrashIcon className="w-6" />;
  }

  if (value.includes("rua") || value.includes("buraco") || value.includes("pav")) {
    return <WrenchScrewdriverIcon className="w-6" />;
  }

  const icons = [
    <MapIcon className="w-6" key="map" />,
    <MapPinIcon className="w-6" key="pin" />,
    <WrenchScrewdriverIcon className="w-6" key="tool" />,
    <TrashIcon className="w-6" key="trash" />,
  ];

  return icons[index % icons.length];
}

export default function RestorationSection({ reports = [], loading = false }) {
  const counts = reports.reduce((acc, report) => {
    const category = report.problema?.categoria?.nome || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const dynamicAreas = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([title, total], index) => ({
      title,
      total: `${total} report${total === 1 ? "" : "s"}`,
      icon: iconForCategory(title, index),
    }));

  const areas = dynamicAreas.length
    ? dynamicAreas
    : fallbackAreas.map((area) => ({ ...area, total: "0 reports" }));

  return (
    <>
      <h2 className="mb-5 text-xl font-bold">Report Categories</h2>

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {areas.map((area) => (
          <RestorationCard
            key={area.title}
            title={area.title}
            total={loading ? "Loading..." : area.total}
            icon={area.icon}
          />
        ))}
      </div>
    </>
  );
}
