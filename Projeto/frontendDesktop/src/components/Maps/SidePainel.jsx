import ReportDetails from "./ReportDetails";

export default function SidePainel({ selectedReport, setSelectedReport }) {
    return (
        <aside className="w-95 shrink-0 overflow-y-auto border-l border-[#2a2a2a] bg-[#1b1b1b]">
            {!selectedReport ? (
                <div className="flex h-full items-center justify-center p-8 text-center">
                    <div>
                        <h2 className="mb-3 text-2xl font-bold">
                            Nenhuma ocorrência selecionada
                        </h2>

                        <p className="text-gray-400">
                            Clique em um marcador no mapa para visualizar os detalhes.
                        </p>
                    </div>
                </div>
            ) : (
                <ReportDetails
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                />
            )}
        </aside>
    );
}
