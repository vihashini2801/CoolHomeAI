export default function SustainabilityScoreCard({
  score
}) {

  const getColor = () => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getLabel = () => {
    if (score >= 70) return "Excellent";
    if (score >= 40) return "Moderate";
    return "Needs Improvement";
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="font-bold text-2xl text-slate-800">
            Sustainability Score
          </h2>

          <p className="text-gray-500 mt-1">
            Eco-friendly room rating
          </p>
        </div>

        <span
          className="
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            bg-green-100
            text-green-700
          "
        >
          {getLabel()}
        </span>

      </div>

      <div className="mt-8 text-center">

        <div className="text-5xl font-bold text-green-600">
          {score}
        </div>

        <div className="text-gray-500">
          /100
        </div>

      </div>

      <div className="mt-6">

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className={`
              ${getColor()}
              h-4
              rounded-full
              transition-all
              duration-500
            `}
            style={{
              width: `${score}%`
            }}
          />

        </div>

      </div>

    </div>
  );
}