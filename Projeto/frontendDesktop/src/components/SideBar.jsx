import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Squares2X2Icon,
    MapIcon,
    ExclamationTriangleIcon,
    ChartBarIcon,
    PlusCircleIcon,
    QuestionMarkCircleIcon,
    ArrowLeftOnRectangleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const [active, setActive] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const menu = [
        {
            nome: "Dashboard",
            icon: Squares2X2Icon,
            path: "/dashboard",
        },
        {
            nome: "Map View",
            icon: MapIcon,
            path: "/maps",
        },
        {
            nome: "Reports",
            icon: ExclamationTriangleIcon,
        },
        {
            nome: "Analytics",
            icon: ChartBarIcon,
        }
    ];

    return (
        <>
            {/* Fundo escuro */}
            { sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-9998 bg-black/50"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 z-9999
                    flex h-screen w-64 flex-col justify-between
                    border-r border-[#2a2a2a]
                    bg-[#181818]
                    transition-transform duration-300
                    ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >
                <div>
                    {/* Cabeçalho */}
                    <div className="flex items-center justify-between border-b border-[#2a2a2a] p-6">
                        <div>
                            <h1 className="text-2xl font-bold text-lime-400">
                                Muda SL
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Eduardo Fukui - Bruno Garcia - Matheus Medtler - Arthur Vargas
                            </p>
                        </div>

                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="rounded-lg p-1 text-gray-400 transition hover:bg-[#252525] hover:text-white"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Menu */}
                    <nav className="space-y-2 p-4">
                        {menu.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.nome}
                                    onClick={() => {
                                        if (item.path) {
                                            navigate(item.path);
                                        }
                                        setSidebarOpen(false);
                                    }}
                                    className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 font-semibold transition-all duration-200 ${location.pathname === item.path
                                        ? "bg-lime-400 text-black"
                                        : "text-gray-300 hover:bg-[#252525] hover:text-white"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.nome}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div>
                    {/* Novo relatório */}
                    <div className="p-4">
                        <button
                            onClick={() => setActive("New Report")}
                            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all duration-200 ${active === "New Report"
                                ? "bg-lime-500 text-white"
                                : "bg-lime-400 text-black hover:brightness-110"
                                }`}
                        >
                            <PlusCircleIcon className="h-5 w-5" />
                            New Report
                        </button>
                    </div>

                    {/* Rodapé */}
                    <div className="space-y-2 border-t border-[#2a2a2a] p-4">
                        <button
                            onClick={() => setActive("Help")}
                            className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 font-semibold transition-all duration-200 ${active === "Help"
                                ? "bg-blue-500 text-white"
                                : "text-gray-400 hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <QuestionMarkCircleIcon className="h-5 w-5" />
                            Help
                        </button>

                        <button
                            onClick={() => setActive("Logout")}
                            className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 font-semibold transition-all duration-200 ${active === "Logout"
                                ? "bg-red-500 text-white"
                                : "text-gray-400 hover:bg-red-500 hover:text-white"
                                }`}
                        >
                            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;