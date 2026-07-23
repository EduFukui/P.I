import { useState } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";

import Sidebar from "../components/SideBar";
import TopBar from "../components/Dashboard/TopBar";
import WelcomeCard from "../components/Dashboard/WelcomeBar";
import StatsCard from "../components/Dashboard/StatsCard";
import RestorationSection from "../components/Dashboard/RestorationSection";
import IncidentSection from "../components/Dashboard/IncidentSection";
import ForumCard from "../components/Dashboard/ForumCard";
import LiveOperations from "../components/Dashboard/LiveOperation";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#111111] text-white">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="p-8">

        <TopBar
          setSidebarOpen={setSidebarOpen}
        />

        <div className="mb-8 grid grid-cols-3 gap-6">
          <WelcomeCard
            name="Welcome back."
            reports={24}
          />

          <StatsCard
            icon={<BoltIcon className="h-10 w-10" />}
            value="89%"
            title="Resolution Speed"
            subtitle="+12% from last month"
          />
        </div>

        <RestorationSection />

        <div className="grid grid-cols-3 gap-6">
          <IncidentSection />

          <div className="space-y-6">
            <ForumCard />
            <LiveOperations />
          </div>
        </div>

      </main>

    </div>
  );
}