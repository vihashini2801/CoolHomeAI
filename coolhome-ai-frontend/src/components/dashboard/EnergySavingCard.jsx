export default function EnergySavingCard({
  score
}) {

  const getStatus = () => {
    if (score >= 70) return "High Efficiency";
    if (score >= 40) return "Moderate Efficiency";
    return "Low Efficiency";
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="font-bold text-2xl text-slate-800">
            Energy Saving Score
          </h2>

          <p className="text-gray-500 mt-1">
            Electricity saving potential
          </p>
        </div>

        <div
          className="
            bg-blue-100
            text-blue-700
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
          "
        >
          {getStatus()}
        </div>

      </div>

      <div className="mt-8 flex items-center justify-center">

        <div className="text-center">

          <div className="text-6xl font-bold text-blue-600">
            {score}
          </div>

          <div className="text-gray-500">
            /100
          </div>

        </div>

      </div>

      <div className="mt-6">

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="
              bg-blue-600
              h-4
              rounded-full
              transition-all
              duration-500
            "
            style={{
              width: `${score}%`
            }}
          />

        </div>

      </div>

      <div className="mt-4 text-center text-gray-600">
        Potential electricity savings
      </div>

    </div>
  );
}