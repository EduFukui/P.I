import LiveOperationItem from "./LiveOperationItem";

function statusTitle(report) {
  if (report.status === "Resolvido") return `Report #${report.id} resolved`;
  if (report.status === "Em Andamento") return `Report #${report.id} in progress`;
  return `New report #${report.id}`;
}

export default function LiveOperations({ reports = [], loading = false }) {
  const operations = [...reports]
    .sort((a, b) => new Date(b.dataRelatorio) - new Date(a.dataRelatorio))
    .slice(0, 4)
    .map((report) => ({
      id: report.id,
      title: statusTitle(report),
      subtitle: report.problema?.nome || "Incident report",
    }));

  return (
    <div className="rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d] p-6">
      <h2 className="mb-6 font-bold">LIVE REPORTS</h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : operations.length === 0 ? (
        <p className="text-sm text-gray-500">No reports registered yet.</p>
      ) : (
        <div className="space-y-5">
          {operations.map((operation) => (
            <LiveOperationItem key={operation.id} {...operation} />
          ))}
        </div>
      )}
    </div>
  );
}
