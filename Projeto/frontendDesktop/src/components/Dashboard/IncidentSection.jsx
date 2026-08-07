import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const filters = ["Todos", "Críticos", "Pendentes", "Resolvidos"];

export default function IncidentSection({ reports = [] }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Todos");

  const incidents = useMemo(() => {
    if (filter === "Críticos") {
      return reports.filter((report) =>
        ["Urgente", "Alta"].includes(report.prioridade)
      );
    }

    if (filter === "Pendentes") {
      return reports.filter((report) => report.status !== "Resolvido");
    }

    if (filter === "Resolvidos") {
      return reports.filter((report) => report.status === "Resolvido");
    }

    return reports;
  }, [reports, filter]);

  return (
    <div className="xl:col-span-2">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">
          Relatos recentes
        </h2>

        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 font-semibold transition ${
                filter === item
                  ? "bg-lime-400 text-black"
                  : "bg-[#242424] text-gray-300 hover:bg-[#303030]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {incidents.map((report) => (
          <div
            key={report.id}
            className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d]"
          >
            <div className="relative flex h-32 items-center justify-center bg-[#272727]">
              <span className="text-4xl">📍</span>

              <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold">
                {report.prioridade.toUpperCase()}
              </span>
            </div>

            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold">
                  {report.titulo}
                </h3>

                <span className="whitespace-nowrap rounded-full bg-[#292929] px-2 py-1 text-[11px] text-gray-300">
                  {report.status}
                </span>
              </div>

              <p className="text-sm leading-6 text-gray-400">
                {report.descricao}
              </p>

              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-sm text-lime-400">
                  📍 {report.bairro}, {report.cidade}
                </span>

                <button
                  type="button"
                  onClick={() => navigate(`/maps?report=${report.id}`)}
                  className="font-semibold text-lime-400 hover:underline"
                >
                  Ver no mapa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
