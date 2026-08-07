const API_URL = "http://localhost:3000";

export default function ReportDetails({ report, onClose }) {
    return (
        <div className="p-6">
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">Ocorrência</p>
                <h2 className="mt-2 text-2xl font-bold">{report.title}</h2>
                <p className="mt-1 text-sm text-gray-500">{report.protocol}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Info title="Categoria" value={report.category} />
                <Info title="Prioridade" value={`● ${report.priority}`} />
            </div>

            <div className="mt-4"><Info title="Status" value={report.status} /></div>
            <div className="mt-4"><Info title="Reportado" value={report.reported} /></div>

            {report.endereco && (
                <div className="mt-4 rounded-xl bg-[#252525] p-4">
                    <p className="text-xs uppercase text-gray-500">Endereço</p>
                    <p className="mt-2 leading-6 text-gray-300">
                        {report.endereco.bairro} - {report.endereco.cidade}/{report.endereco.estado}
                        <br />
                        CEP {report.endereco.cep} • Nº {report.endereco.numero}
                    </p>
                </div>
            )}

            <h3 className="mb-3 mt-8 text-lg font-semibold">Descrição</h3>
            <p className="leading-7 text-gray-400">{report.description}</p>

            {report.imagens?.length > 0 && (
                <div className="mt-8">
                    <h3 className="mb-3 text-lg font-semibold">Imagens</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {report.imagens.map((imagem) => (
                            <a
                                key={imagem.id}
                                href={`${API_URL}/report/image/${imagem.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="overflow-hidden rounded-xl border border-[#333] bg-[#252525]"
                            >
                                <img
                                    src={`${API_URL}/report/image/${imagem.id}`}
                                    alt={imagem.nome}
                                    className="h-28 w-full object-cover"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <button
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
            <p className="text-xs uppercase text-gray-500">{title}</p>
            <p className="mt-2 font-semibold">{value}</p>
        </div>
    );
}
