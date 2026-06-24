export default function CoolingScoreCard({
  score,
  potential
}) {
  const improvement = potential - score;

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="font-bold text-2xl text-slate-800">
            Cooling Score
          </h2>

          <p className="text-gray-500 mt-1">
            Current cooling performance
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
          +{improvement} Potential
        </div>

      </div>

      <div className="mt-8 text-center">

        <div className="text-6xl font-bold text-blue-600">
          {score}
        </div>

        <div className="text-gray-500 text-lg">
          /100
        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between mb-2 text-sm">

          <span className="text-gray-500">
            Current
          </span>

          <span className="font-medium">
            {score}/100
          </span>

        </div>

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

      <div className="mt-6 bg-green-50 rounded-xl p-4">

        <p className="text-sm text-gray-600">
          Potential Score
        </p>

        <p className="text-2xl font-bold text-green-600">
          {potential}/100
        </p>

      </div>

    </div>
  );
}