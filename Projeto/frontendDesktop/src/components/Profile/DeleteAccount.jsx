import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteAccount({ handleDelete }) {
    return (
        <div className="mx-auto mt-6 w-full max-w-7xl rounded-2xl border border-red-500/20 bg-[#181818] p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="font-bold text-red-400">
                        Excluir conta
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        A exclusão da conta é permanente e não poderá ser desfeita.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                    <TrashIcon className="h-5 w-5" />
                    Excluir conta
                </button>
            </div>
        </div>
    );
}
