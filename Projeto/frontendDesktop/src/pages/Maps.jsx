import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import SidePainel from "../components/Maps/SidePainel";
import ClickMarker from "../components/ClickMarker";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

const API_URL = "http://localhost:3000";

function formatReport(report) {
    return {
        id: report.id,
        title: report.problema?.nome || "Ocorrência",
        protocol: `#SL-${String(report.id).padStart(4, "0")}`,
        description: report.descricao || report.problema?.descricao || "",
        priority: report.problema?.prioridade || "Baixa",
        status: report.status || "Pendente",
        reported: report.dataRelatorio
            ? new Date(report.dataRelatorio).toLocaleString("pt-BR")
            : "",
        category: report.problema?.categoria?.nome || "Sem categoria",
        position: [
            Number(report.endereco?.latitude),
            Number(report.endereco?.longitude),
        ],
        endereco: report.endereco,
        usuario: report.usuario,
        image1: null,
        image2: null,
    };
}

export default function Maps() {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [newReport, setNewReport] = useState(
        Boolean(location.state?.newReport)
    );
    const [markerPosition, setMarkerPosition] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loadingReports, setLoadingReports] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    useEffect(() => {
        if (location.state?.newReport) {
            setSelectedReport(null);
            setNewReport(true);
        }
    }, [location.state]);

    async function loadReports() {
        try {
            setLoadingReports(true);

            const response = await fetch(`${API_URL}/report/list`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao carregar relatórios");
            }

            const formatted = data
                .map(formatReport)
                .filter(
                    (report) =>
                        Number.isFinite(report.position[0]) &&
                        Number.isFinite(report.position[1])
                );

            setReports(formatted);

            const reportId = Number(searchParams.get("report"));

            if (reportId) {
                const requestedReport = formatted.find(
                    (report) => report.id === reportId
                );

                if (requestedReport) {
                    setSelectedReport(requestedReport);
                    setNewReport(false);
                }
            }
        } catch (error) {
            console.error("Erro ao carregar relatórios:", error);
        } finally {
            setLoadingReports(false);
        }
    }

    function handleReportCreated(report) {
        const formatted = formatReport(report);

        setReports((old) => [formatted, ...old]);
        setSelectedReport(formatted);
        setNewReport(false);
        setMarkerPosition(null);
    }

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

                            {reports.map((report) => (
                                <Marker
                                    key={report.id}
                                    position={report.position}
                                    eventHandlers={{
                                        click: () => {
                                            setSelectedReport(report);
                                            setNewReport(false);
                                            setMarkerPosition(null);
                                        },
                                    }}
                                >
                                    <Popup>
                                        <div className="text-black">
                                            <strong>{report.title}</strong>
                                            <br />
                                            {report.description}
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}

                            <ClickMarker
                                newReport={newReport}
                                markerPosition={markerPosition}
                                setMarkerPosition={setMarkerPosition}
                            />
                        </MapContainer>

                        {newReport && !markerPosition && (
                            <div className="pointer-events-none absolute left-1/2 top-5 z-[500] -translate-x-1/2 rounded-xl bg-black/80 px-5 py-3 text-sm font-semibold text-white shadow-xl">
                                Clique no mapa para marcar o local da ocorrência
                            </div>
                        )}

                        {loadingReports && (
                            <div className="pointer-events-none absolute bottom-5 left-5 z-[500] rounded-lg bg-black/70 px-4 py-2 text-sm text-gray-200">
                                Carregando ocorrências...
                            </div>
                        )}
                    </div>

                    <SidePainel
                        selectedReport={selectedReport}
                        setSelectedReport={setSelectedReport}
                        newReport={newReport}
                        setNewReport={setNewReport}
                        markerPosition={markerPosition}
                        setMarkerPosition={setMarkerPosition}
                        onReportCreated={handleReportCreated}
                    />
                </div>
            </main>
        </div>
    );
}
