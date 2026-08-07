export default function LiveOperations({ reports = [] }) {
  const operations = reports.slice(0, 4);

  return (
    <div className="rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d] p-6">
      <h2 className="mb-6 font-bold">
        ATIVIDADES RECENTES
      </h2>

      <div className="space-y-5">
        {operations.map((report) => (
          <div key={report.id}>
            <p className="font-semibold text-lime-400">
              Relato #{report.id} — {report.status}
            </p>

            <span className="text-sm text-gray-500">
              {report.titulo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
