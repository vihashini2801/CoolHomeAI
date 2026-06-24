import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

export default function PotentialImprovement({
  current,
  future
}) {

  const data = [
    {
      name: "Current",
      score: current
    },
    {
      name: "Potential",
      score: future
    }
  ];

  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-xl
      p-8
      "
    >
      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-3xl font-bold">
            Improvement Potential
          </h2>

          <p className="text-gray-500 mt-2">
            Predicted score after implementing recommendations
          </p>

        </div>

        <div
          className="
          bg-green-100
          text-green-700
          px-4
          py-2
          rounded-full
          font-semibold
          "
        >
          +{future - current} Points
        </div>

      </div>

      <div className="h-96">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            barCategoryGap={80}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="score"
              radius={[12, 12, 0, 0]}
            >
              <Cell fill="#2563eb" />
              <Cell fill="#10b981" />
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Current Score
          </p>

          <h3 className="text-3xl font-bold text-blue-600">
            {current}
          </h3>
        </div>

        <div className="bg-green-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Potential Score
          </p>

          <h3 className="text-3xl font-bold text-green-600">
            {future}
          </h3>
        </div>

      </div>

    </div>
  );
}