import IncidentCard from "./IncidentCard";
import IncidentFilters from "./IncidentFilters";

const incidents = [
  {
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800",
    badge: "CRITICAL",
    title: "Severe Pothole - Av. Paulista",
    desc:
      "Large excavation forming on the left lane causing vehicle damage and traffic.",
    location: "Sector 4, Central",
    action: "Assign Team",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800",
    badge: "URGENT",
    title: "Light Failure - Praça da Sé",
    desc:
      "Entire block of street lighting is offline, increasing accident risk.",
    location: "Sector 1, Central",
    action: "Dispatch Now",
  },
];

export default function IncidentSection() {
  return (
    <div className="col-span-2">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Urgent Incident Reports
        </h2>

        <IncidentFilters />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {incidents.map((incident) => (
          <IncidentCard
            key={incident.title}
            {...incident}
          />
        ))}
      </div>
    </div>
  );
}