export default function ReportDetails({ report, onClose }) {
    return (
        <div className="p-6">
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">
                    Ocorrência #{report.id}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                    {report.titulo}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    {report.data}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Info title="Categoria" value={report.categoria} />
                <Info title="Prioridade" value={report.prioridade} />
            </div>

            <div className="mt-4">
                <Info title="Status" value={report.status} />
            </div>

            <div className="mt-4 rounded-xl bg-[#252525] p-4">
                <p className="text-xs uppercase text-gray-500">
                    Localização
                </p>

                <p className="mt-2 leading-6 text-gray-300">
                    {report.bairro}, {report.cidade}
                </p>
            </div>

            <h3 className="mb-3 mt-8 text-lg font-semibold">
                Descrição
            </h3>

            <p className="leading-7 text-gray-400">
                {report.descricao}
            </p>

            <button
                type="button"
                onClick={onClose}
                className="mt-10 w-full rounded-xl border border-red-500 py-4 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
                Fechar
            </button>
        </div>
    );
}

function Info({ title, value }) {
    return (
        <div className="rounded-xl bg-[#252525] p-4">
            <p className="text-xs uppercase text-gray-500">
                {title}
            </p>
            <p className="mt-2 font-semibold">
                {value}
            </p>
        </div>
    );
}
