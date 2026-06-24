import PriorityBadge from "./PriorityBadge";

export default function RecommendationCard({
  recommendation,
  rank
}) {

  const categoryIcons = {
    Ventilation: "🪟",
    "Sunlight Reduction": "☀️",
    "Passive Cooling": "🌱",
    "Heat Absorption": "🏠",
    Airflow: "💨"
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-start">

        <div className="flex items-center gap-4">

          <div className="text-4xl">
            {categoryIcons[
              recommendation.category
            ] || "💡"}
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              #{rank} {recommendation.category}
            </h2>

            <p className="text-gray-500">
              Recommended Improvement
            </p>

          </div>

        </div>

        <PriorityBadge
          priority={recommendation.priority}
        />

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div>

          <h3 className="font-semibold text-blue-600">
            Action
          </h3>

          <p className="mt-1 text-gray-700">
            {recommendation.action}
          </p>

        </div>

        <div>

          <h3 className="font-semibold text-green-600">
            Expected Impact
          </h3>

          <p className="mt-1 text-gray-700">
            {recommendation.expected_impact}
          </p>

        </div>

        <div>

          <h3 className="font-semibold text-purple-600">
            Cost
          </h3>

          <p className="mt-1 text-gray-700">
            {recommendation.cost}
          </p>

        </div>

        <div>

          <h3 className="font-semibold text-orange-600">
            Difficulty
          </h3>

          <p className="mt-1 text-gray-700">
            {recommendation.implementation_difficulty}
          </p>

        </div>

      </div>

      <div className="mt-6 border-t pt-4">

        <h3 className="font-semibold text-gray-700 mb-2">
          Details
        </h3>

        <p className="text-gray-600">
          {recommendation.details}
        </p>

      </div>

    </div>
  );
}