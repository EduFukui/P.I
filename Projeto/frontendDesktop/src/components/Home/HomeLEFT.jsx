import {
    BoltIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import FeatureCard from "./FeatureCard";

export default function HomeLEFT() {
    return (
        <section className="relative hidden overflow-hidden bg-[#131313] lg:flex lg:w-1/2 items-center justify-center p-12">

            {/* Imagem */}

            <img
                src="../../imgs/image.png"
                className="absolute bottom-[-10%] right-[-10%] w-130 opacity-20"
                alt=""
            />

            <div className="relative z-10 max-w-lg">

                <div className="mb-8 flex items-center gap-3">

                    <div className="flex items-center gap-3">

                        <BuildingOffice2Icon
                            className="h-10 w-10 text-lime-400"
                        />

                        <div>

                            <h1 className="text-3xl font-bold text-lime-400">
                                Muda SL
                            </h1>

                            <p className="text-sm text-gray-400">
                                Sistema Inteligente
                            </p>

                        </div>

                    </div>

                    <h1 className="text-3xl font-bold text-lime-400">

                    </h1>

                </div>

                <h2 className="text-5xl font-bold leading-tight text-white">

                    Junte-se ao
                    <br />
                    Muda SL

                </h2>

                <p className="mt-6 text-lg leading-8 text-gray-400">

                    Faça parte da rede inteligente que transforma a manutenção
                    da nossa cidade. Reporte incidentes, acompanhe melhorias e
                    ajude a construir um ambiente urbano mais seguro e eficiente
                    para todos.

                </p>

                <div className="mt-12 grid grid-cols-2 gap-4">

                    <FeatureCard
                        icon={BoltIcon}
                        title="Resposta Rápida"
                    />

                    <FeatureCard
                        icon={ChartBarIcon}
                        title="Gestão Inteligente"
                    />

                </div>

            </div>

        </section>
    );
}