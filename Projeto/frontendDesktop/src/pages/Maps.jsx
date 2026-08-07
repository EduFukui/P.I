import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import SidePainel from "../components/Maps/SidePainel";
import { ocorrencias } from "../data/ocorrencias";

export default function Maps() {
  const [searchParams] = useSearchParams();
  const [selectedReport, setSelectedReport] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const reportId = Number(searchParams.get("report"));

    if (reportId) {
      const report = ocorrencias.find((item) => item.id === reportId);
      setSelectedReport(report || null);
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen bg-[#111111] text-white">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex flex-1 flex-col">
        <header className="px-8 pt-8">
          <TopBar setSidebarOpen={setSidebarOpen} />
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="relative z-0 flex-1">
            <MapContainer
              center={[-29.7549, -51.1496]}
              zoom={14}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {ocorrencias.map((report) => (
                <Marker
                  key={report.id}
                  position={report.position}
                  eventHandlers={{
                    click: () => setSelectedReport(report),
                  }}
                >
                  <Popup>
                    <div className="text-black">
                      <strong>{report.titulo}</strong>
                      <br />
                      {report.descricao}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <SidePainel
            selectedReport={selectedReport}
            setSelectedReport={setSelectedReport}
          />
        </div>
      </main>
    </div>
  );
}
