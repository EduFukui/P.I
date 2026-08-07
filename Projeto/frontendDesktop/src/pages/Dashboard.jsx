import { useState } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";

import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import WelcomeCard from "../components/Dashboard/WelcomeBar";
import StatsCard from "../components/Dashboard/StatsCard";
import RestorationSection from "../components/Dashboard/RestorationSection";
import IncidentSection from "../components/Dashboard/IncidentSection";
import LiveOperations from "../components/Dashboard/LiveOperation";
import { ocorrencias } from "../data/ocorrencias";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const urgentes = ocorrencias.filter(
    (item) => item.prioridade === "Urgente" || item.prioridade === "Alta"
  ).length;

  const resolvidos = ocorrencias.filter(
    (item) => item.status === "Resolvido"
  ).length;

  const taxaResolucao = Math.round(
    (resolvidos / ocorrencias.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="p-8">
        <TopBar setSidebarOpen={setSidebarOpen} />

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <WelcomeCard
            reports={urgentes}
            totalReports={ocorrencias.length}
          />

          <StatsCard
            icon={<BoltIcon className="h-10 w-10" />}
            value={`${taxaResolucao}%`}
            title="Taxa de resolução"
            subtitle={`${resolvidos} de ${ocorrencias.length} relatos resolvidos`}
          />
        </div>

        <RestorationSection />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <IncidentSection reports={ocorrencias} />

          <div className="space-y-6">
            <LiveOperations reports={ocorrencias} />
          </div>
        </div>
      </main>
    </div>
  );
}
