export default function WelcomeCard({
  reports = 24,
  name = "Welcome back.",
}) {
  return (
    <div className="col-span-2 rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d] p-8">
      <h2 className="mb-3 text-4xl font-bold">
        {name}
      </h2>

      <p className="text-lg text-gray-400">
        There are
        <span className="font-bold text-lime-400">
          {" "}
          {reports} urgent reports{" "}
        </span>
        awaiting response today.
      </p>
    </div>
  );
}