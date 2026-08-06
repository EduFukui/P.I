import { BuildingOffice2Icon } from "@heroicons/react/24/solid";


export default function Logo() {

    return (

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

    );

}