export default function PriorityBadge({
  priority
}) {

  const colors = {
    high:
      "bg-red-100 text-red-700",
    medium:
      "bg-yellow-100 text-yellow-700",
    low:
      "bg-green-100 text-green-700"
  };

  const level =
    priority?.toLowerCase() || "low";

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
        ${colors[level]}
      `}
    >
      {priority} Priority
    </span>
  );
}