import {
    BellIcon,
    Cog6ToothIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";

import SearchBar from "./Dashboard/SearchBar";
import { useNavigate } from "react-router-dom";

export default function TopBar({ setSidebarOpen }) {

    const navigate = useNavigate();

    let user = {};

    try {
        user = JSON.parse(
            localStorage.getItem("user") || "{}"
        );
    } catch {
        user = {};
    }

    return (
        <div className="mb-8 flex items-center gap-6">

            {/* BOTÃO DA SIDEBAR */}

            <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2a2a2a] bg-[#181818] text-gray-400 transition hover:border-lime-400 hover:text-lime-400"
                aria-label="Abrir menu"
            >
                <Bars3Icon className="h-6 w-6" />
            </button>


            {/* PESQUISA */}

            <div className="flex-1">
                <SearchBar />
            </div>


            {/* AÇÕES */}

            <div className="flex shrink-0 items-center gap-4">

                {/* Notificações */}

                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-400 transition hover:bg-[#252525] hover:text-white"
                >
                    <BellIcon className="h-6 w-6" />
                </button>


                {/* Configurações */}

                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-400 transition hover:bg-[#252525] hover:text-white"
                >
                    <Cog6ToothIcon className="h-6 w-6" />
                </button>


                {/* PERFIL */}

                <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-[#252525]"
                >

                    <div className="text-right">

                        <h2 className="max-w-[180px] truncate font-semibold text-white">
                            {user.nomeCompleto || "Usuário"}
                        </h2>

                        <p className="text-xs font-semibold uppercase text-lime-400">
                            {user.funcao === "admin"
                                ? "Administrador"
                                : "Usuário"
                            }
                        </p>

                    </div>


                    {/* FOTO */}

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-transparent bg-lime-400 font-bold text-black transition group-hover:border-lime-400">

                        {user.nomeCompleto
                            ? user.nomeCompleto
                                .charAt(0)
                                .toUpperCase()
                            : "U"
                        }

                    </div>

                </button>

            </div>

        </div>
    );
}
