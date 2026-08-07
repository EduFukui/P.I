import { useEffect, useMemo, useState } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";

import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import WelcomeCard from "../components/Dashboard/WelcomeBar";
import StatsCard from "../components/Dashboard/StatsCard";
import RestorationSection from "../components/Dashboard/RestorationSection";
import IncidentSection from "../components/Dashboard/IncidentSection";
import ForumCard from "../components/Dashboard/ForumCard";
import LiveOperations from "../components/Dashboard/LiveOperation";

const API_URL = "http://localhost:3000";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/report/list`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erro ao carregar relatórios");
        }

        setReports(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
        setError(err.message || "Não foi possível carregar os relatórios.");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const urgentReports = useMemo(
    () =>
      reports.filter(
        (report) =>
          report.status !== "Resolvido" &&
          ["Urgente", "Alta"].includes(report.problema?.prioridade)
      ),
    [reports]
  );

  const resolvedReports = useMemo(
    () => reports.filter((report) => report.status === "Resolvido"),
    [reports]
  );

  const resolutionRate = reports.length
    ? Math.round((resolvedReports.length / reports.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="p-8">
        <TopBar setSidebarOpen={setSidebarOpen} />

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <WelcomeCard
            name="Welcome back."
            reports={urgentReports.length}
            totalReports={reports.length}
            loading={loading}
          />

          <StatsCard
            icon={<BoltIcon className="h-10 w-10" />}
            value={loading ? "..." : `${resolutionRate}%`}
            title="Resolution Rate"
            subtitle={`${resolvedReports.length} of ${reports.length} reports resolved`}
          />
        </div>

        <RestorationSection reports={reports} loading={loading} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <IncidentSection reports={reports} loading={loading} />

          <div className="space-y-6">
            <ForumCard />
            <LiveOperations reports={reports} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
