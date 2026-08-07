import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import IncidentCard from "./IncidentCard";
import IncidentFilters from "./IncidentFilters";

function getLocation(report) {
  const endereco = report.endereco;

  if (!endereco) return "Location not informed";

  return [endereco.bairro, endereco.cidade]
    .filter(Boolean)
    .join(", ") || "Location not informed";
}

export default function IncidentSection({ reports = [], loading = false }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const incidents = useMemo(() => {
    let filtered = [...reports];

    if (filter === "Critical") {
      filtered = filtered.filter((report) =>
        ["Urgente", "Alta"].includes(report.problema?.prioridade)
      );
    }

    if (filter === "Pending") {
      filtered = filtered.filter((report) => report.status !== "Resolvido");
    }

    if (filter === "Fixed") {
      filtered = filtered.filter((report) => report.status === "Resolvido");
    }

    return filtered
      .sort((a, b) => new Date(b.dataRelatorio) - new Date(a.dataRelatorio))
      .slice(0, 4);
  }, [reports, filter]);

  return (
    <div className="xl:col-span-2">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Latest Incident Reports</h2>

        <IncidentFilters value={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d] p-8 text-gray-400">
          Loading reports...
        </div>
      ) : incidents.length === 0 ? (
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d] p-8 text-gray-400">
          No reports found for this filter.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {incidents.map((report) => (
            <IncidentCard
              key={report.id}
              image={null}
              badge={(report.problema?.prioridade || "Baixa").toUpperCase()}
              title={report.problema?.nome || `Report #${report.id}`}
              desc={report.descricao || report.problema?.descricao || "No description"}
              location={getLocation(report)}
              action="View on map"
              status={report.status}
              onAction={() => navigate(`/maps?report=${report.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
