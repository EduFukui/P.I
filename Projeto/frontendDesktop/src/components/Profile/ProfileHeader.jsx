import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader() {
    const navigate = useNavigate();

    return (
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">
                    Meu Perfil
                </h1>

                <p className="mt-2 text-gray-400">
                    Gerencie suas informações pessoais e sua conta.
                </p>
            </div>

            <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 rounded-xl border border-[#333333] px-4 py-3 text-gray-300 transition hover:bg-[#252525] hover:text-white"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                Voltar
            </button>
        </div>
    );
}
