import NewReportForm from "./NewReportForm";
import ReportDetails from "./ReportDetails";

export default function SidePainel({
    selectedReport,
    setSelectedReport,
    newReport,
    setNewReport,
    markerPosition,
    setMarkerPosition,
    onReportCreated,
}) {
    return (
        <aside className="w-95 shrink-0 overflow-y-auto border-l border-[#2a2a2a] bg-[#1b1b1b]">
            {!selectedReport && !newReport && (
                <div className="flex h-full items-center justify-center p-8 text-center">
                    <div>
                        <h2 className="mb-3 text-2xl font-bold">Nenhuma ocorrência</h2>
                        <p className="text-gray-400">
                            Clique em um marcador
                            <br />
                            para visualizar os detalhes.
                        </p>
                    </div>
                </div>
            )}

            {newReport && (
                <NewReportForm
                    markerPosition={markerPosition}
                    setMarkerPosition={setMarkerPosition}
                    setNewReport={setNewReport}
                    onReportCreated={onReportCreated}
                />
            )}

            {selectedReport && !newReport && (
                <ReportDetails
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                />
            )}
        </aside>
    );
}
