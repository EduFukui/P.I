export default function WelcomeCard({
  reports = 0,
  totalReports = 0,
  name = "Welcome back.",
  loading = false,
}) {
  return (
    <div className="col-span-1 rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d] p-8 lg:col-span-2">
      <h2 className="mb-3 text-4xl font-bold">{name}</h2>

      {loading ? (
        <p className="text-lg text-gray-400">Loading report information...</p>
      ) : (
        <>
          <p className="text-lg text-gray-400">
            There are
            <span className="font-bold text-lime-400"> {reports} urgent reports </span>
            awaiting response.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {totalReports} reports registered in total.
          </p>
        </>
      )}
    </div>
  );
}
