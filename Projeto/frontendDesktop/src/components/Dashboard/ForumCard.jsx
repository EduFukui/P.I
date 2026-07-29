export default function ForumCard() {
  return (
    <div className="rounded-2xl border border-[#3a3d2d] bg-[#26281f] p-6">
      <h2 className="mb-4 text-xl font-bold text-lime-400">
        City Forum
      </h2>

      <p className="mb-6 leading-7 text-gray-300">
        Join the improvements forum to vote on community suggested urban
        projects and prioritize city funding.
      </p>

      <button className="w-full rounded-xl bg-lime-400 py-3 font-bold text-black hover:brightness-110">
        Open Discussions
      </button>
    </div>
  );
}