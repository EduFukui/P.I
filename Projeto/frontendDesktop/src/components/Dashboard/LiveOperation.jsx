import LiveOperationItem from "./LiveOperationItem";

const operations = [
  {
    title: "Team Alpha dispatched",
    subtitle: "Water leak - Rua Augusta",
  },
  {
    title: "Repair #8902 resolved",
    subtitle: "Graffiti cleanup complete",
  },
  {
    title: "Scheduled Maintenance",
    subtitle: "Bridge inspection - 08:00 AM",
  },
  {
    title: "New Incident Received",
    subtitle: "Streetlight outage - Sector 5",
  },
];

export default function LiveOperations() {
  return (
    <div className="rounded-2xl border border-[#2a2a2a] bg-[#1d1d1d] p-6">
      <h2 className="mb-6 font-bold">
        LIVE OPERATIONS
      </h2>

      <div className="space-y-5">
        {operations.map((operation, index) => (
          <LiveOperationItem
            key={index}
            {...operation}
          />
        ))}
      </div>
    </div>
  );
}