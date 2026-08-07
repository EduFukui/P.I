import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
    Squares2X2Icon,
    MapIcon,
    PlusCircleIcon,
    QuestionMarkCircleIcon,
    ArrowLeftOnRectangleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}) {

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
        }
    ];


    function handleNavigate(path) {

        if (!path) return;

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

            {/* FUNDO */}

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-[1px]"
                />
            )}


            {/* DRAWER */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-[9999]
                    flex
                    h-screen
                    w-64
                    flex-col
                    justify-between
                    border-r
                    border-[#2a2a2a]
                    bg-[#181818]
                    shadow-2xl
                    transition-transform
                    duration-300
                    ease-in-out
                    ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >

                {/* PARTE SUPERIOR */}

                <div>

                    {/* LOGO */}

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


                        {/* FECHAR */}

                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-[#252525] hover:text-white"
                            aria-label="Fechar menu"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                    </div>


                    {/* MENU */}

                    <nav className="space-y-2 p-4">

                        {menu.map((item) => {

                            const Icon = item.icon;

                            const selected =
                                location.pathname === item.path;

                            return (
                                <button
                                    key={item.nome}
                                    type="button"
                                    onClick={() =>
                                        handleNavigate(item.path)
                                    }
                                    className={`
                                        flex
                                        w-full
                                        items-center
                                        gap-4
                                        rounded-xl
                                        px-4
                                        py-3
                                        font-semibold
                                        transition-all
                                        duration-200
                                        ${selected
                                            ? "bg-lime-400 text-black"
                                            : "text-gray-300 hover:bg-[#252525] hover:text-white"
                                        }
                                    `}
                                >

                                    <Icon className="h-5 w-5 shrink-0" />

                                    {item.nome}

                                </button>
                            );

                        })}

                    </nav>

                </div>


                {/* PARTE INFERIOR */}

                <div>

                    {/* NOVO RELATÓRIO */}

                    <div className="p-4">

                        <button
                            type="button"
                            onClick={() => {
                                setActive("New Report");
                                setSidebarOpen(false);
                                navigate("/maps", {
                                    state: { newReport: true },
                                });
                            }}
                            className={`
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                py-3
                                font-semibold
                                transition-all
                                duration-200
                                ${active === "New Report"
                                    ? "bg-lime-500 text-white"
                                    : "bg-lime-400 text-black hover:brightness-110"
                                }
                            `}
                        >

                            <PlusCircleIcon className="h-5 w-5" />

                            New Report

                        </button>

                    </div>


                    {/* RODAPÉ */}

                    <div className="space-y-2 border-t border-[#2a2a2a] p-4">

                        {/* HELP */}

                        <button
                            type="button"
                            onClick={() => {
                                setActive("Help");
                                setSidebarOpen(false);
                            }}
                            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 font-semibold text-gray-400 transition hover:bg-blue-500 hover:text-white"
                        >

                            <QuestionMarkCircleIcon className="h-5 w-5" />

                            Help

                        </button>


                        {/* LOGOUT */}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 font-semibold text-gray-400 transition hover:bg-red-500 hover:text-white"
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
