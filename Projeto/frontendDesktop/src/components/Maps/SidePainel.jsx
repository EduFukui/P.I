function SidePainel({ selectedReport, setSelectedReport, newReport }) {
    return (
        <aside className="w-95 overflow-y-auto border-l border-[#2a2a2a] bg-[#1b1b1b]">
            {!selectedReport && !newReport && (
                <div className="flex h-full items-center justify-center p-8 text-center">
                    <div>
                        <h2 className="mb-3 text-2xl font-bold">
                            Nenhuma ocorrência
                        </h2>
                        <p className="text-gray-400">
                            Clique em um marcador
                            <br />
                            para visualizar os detalhes.
                        </p>
                    </div>
                </div>
            )}

            {selectedReport && !newReport && (
                <div className="p-6">
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">
                            Ocorrência
                        </p>
                        <h2 className="mt-2 text-2xl font-bold">
                            {selectedReport.title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {selectedReport.protocol}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-[#252525] p-4">
                            <p className="text-xs uppercase text-gray-500">
                                Categoria
                            </p>
                            <p className="mt-2 font-semibold">
                                {selectedReport.category}
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#252525] p-4">
                            <p className="text-xs uppercase text-gray-500">
                                Prioridade
                            </p>
                            <p className={`mt-2 font-semibold ${selectedReport.priority === "Alta"
                                ? "text-red-400"
                                : selectedReport.priority === "Média"
                                    ? "text-yellow-400"
                                    : "text-green-400"
                                }`}>
                                ● {selectedReport.priority}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 rounded-xl bg-[#252525] p-4">
                        <p className="text-xs uppercase text-gray-500">
                            Reportado
                        </p>
                        <p className="mt-2">
                            {selectedReport.reported}
                        </p>
                    </div>

                    <h3 className="mt-8 mb-4 text-lg font-semibold">
                        Evidências
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        <img
                            src={selectedReport.image1}
                            className="h-36 w-full rounded-xl object-cover"
                        />
                        <img
                            src={selectedReport.image2}
                            className="h-36 w-full rounded-xl object-cover"
                        />
                    </div>
                    <h3 className="mt-8 mb-3 text-lg font-semibold">
                        Descrição
                    </h3>
                    <p className="leading-7 text-gray-400">
                        {selectedReport.description}
                    </p>

                    <div className="mt-10 space-y-3">
                        <button className="w-full rounded-xl bg-lime-400 py-4 font-bold text-black">
                            Ocorrencia Resolvida
                        </button>

                        <button className="w-full rounded-xl border border-lime-400 py-4 font-semibold text-lime-400">
                            Editar Ocorrência
                        </button>

                        <button
                            onClick={() => setSelectedReport(null)}
                            className="w-full rounded-xl border border-red-500 py-4 font-semibold text-red-400"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default SidePainel;