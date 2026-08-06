import { useState } from "react";

import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import SidePainel from "../components/Maps/SidePainel";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

const reports = [
    {
        id: 1,
        title: "Buraco na Av. João Corrêa",
        protocol: "#SL-1024",
        description:
            "Buraco grande ocupando metade da pista.",
        priority: "Alta",
        reported: "Hoje • 09:35",
        category: "Pavimentação",
        position: [-29.77108, -51.14572],

        image1:
            "src/imgs/image4.png",

        image2:
            "src/imgs/image5.png",
    },
    {
        id: 2,
        title: "Poste apagado",
        protocol: "#SL-2058",
        description:
            "Iluminação pública não está funcionando na Rodovia Br-116.",
        priority: "Média",
        reported:
            "Ontem",

        category:
            "Iluminação",

        position:
            [-29.758, -51.152],

        image1:
            "src/imgs/image2.png",

        image2:
            "src/imgs/image3.png",
    },
];

export default function Maps() {
    const [selectedReport, setSelectedReport] = useState(null);
    const [newReport, setNewReport] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#111111] text-white">

            {/* MENU LATERAL */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <main className="flex flex-1 flex-col">

                {/* TOPO */}
                <header className="px-8 pt-8">
                    <TopBar
                        setSidebarOpen={setSidebarOpen}
                    />
                </header>

                {/* CONTEÚDO */}
                <div className="flex flex-1 overflow-hidden">


                    {/* MAPA */}
                    <div className="relative z-0 flex-1">
                        <MapContainer
                            center={[-29.7549, -51.1496]}
                            zoom={14}
                            className="h-full w-full"
                        >
                            <TileLayer
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
                        </MapContainer>
                    </div>

                    {/* PAINEL DIREITO */}
                    <SidePainel
                        selectedReport={
                            selectedReport
                        }
                        setSelectedReport={
                            setSelectedReport
                        }
                        newReport={
                            newReport
                        }
                        setNewReport={
                            setNewReport
                        }
                    />
                </div>
            </main>
        </div>
    );
}