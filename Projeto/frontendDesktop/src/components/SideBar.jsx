import { useNavigate, useLocation } from "react-router-dom";
import {
    Squares2X2Icon,
    MapIcon,
    ArrowLeftOnRectangleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menu = [
        {
            nome: "Painel",
            icon: Squares2X2Icon,
            path: "/dashboard",
        },
        {
            nome: "Mapa",
            icon: MapIcon,
            path: "/maps",
        },
    ];

    function handleNavigate(path) {
        navigate(path);
        setSidebarOpen(false);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setSidebarOpen(false);
        navigate("/login");
    }

    return (
        <>
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-[1px]"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-[9999] flex h-screen w-64 flex-col justify-between border-r border-[#2a2a2a] bg-[#181818] shadow-2xl transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div>
                    <div className="flex items-center justify-between border-b border-[#2a2a2a] p-6">
                        <div>
                            <h1 className="text-2xl font-bold text-lime-400">
                                Muda SL
                            </h1>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Eduardo Fukui
                                <br />
                                Bruno Garcia
                                <br />
                                Matheus Medtler
                                <br />
                                Arthur Vargas
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-[#252525] hover:text-white"
                            aria-label="Fechar menu"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="space-y-2 p-4">
                        {menu.map((item) => {
                            const Icon = item.icon;
                            const selected = location.pathname === item.path;

                            return (
                                <button
                                    key={item.nome}
                                    type="button"
                                    onClick={() => handleNavigate(item.path)}
                                    className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 font-semibold transition-all duration-200 ${
                                        selected
                                            ? "bg-lime-400 text-black"
                                            : "text-gray-300 hover:bg-[#252525] hover:text-white"
                                    }`}
                                >
                                    <Icon className="h-5 w-5 shrink-0" />
                                    {item.nome}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="border-t border-[#2a2a2a] p-4">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 rounded-xl px-4 py-3 font-semibold text-gray-400 transition hover:bg-red-500 hover:text-white"
                    >
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                        Sair
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
