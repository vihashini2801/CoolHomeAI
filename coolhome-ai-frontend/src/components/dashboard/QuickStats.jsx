export default function QuickStats({ data }) {

  if (!data) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-md">
        No room analysis data available.
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-md">

      <h2 className="text-2xl font-bold mb-6">
        Room Features
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <StatCard
          icon="🪟"
          title="Windows"
          value={data.windows ?? "-"}
        />

        <StatCard
          icon="🌬️"
          title="Ventilation"
          value={data.ventilation ?? "-"}
        />

        <StatCard
          icon="☀️"
          title="Sunlight"
          value={data.sunlight ?? "-"}
        />

        <StatCard
          icon="🛋️"
          title="Furniture"
          value={data.furniture_density ?? "-"}
        />

      </div>

    </div>
  );
}

function StatCard({
  icon,
  title,
  value
}) {
  return (
    <div
      className="
      bg-slate-50
      border
      rounded-2xl
      p-5
      hover:shadow-md
      transition
      "
    >
      <div className="text-3xl mb-2">
        {icon}
      </div>

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="font-bold text-xl text-slate-800 mt-1 capitalize">
        {value}
      </p>
    </div>
  );
}