import RecommendationsHeader from "../components/recommendations/RecommendationsHeader";
import RecommendationsSummary from "../components/recommendations/RecommendationsSummary";
import RecommendationCard from "../components/recommendations/RecommendationCard";

export default function RecommendationsPage() {

  const analysisResult = JSON.parse(
    localStorage.getItem("analysisResult")
  );

  const recommendations =
    analysisResult?.recommendations || [];

  return (
    <div className="bg-slate-50 min-h-screen">

      <RecommendationsHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <RecommendationsSummary />

        <div className="mt-8 mb-6">

          <h2 className="text-xl font-bold text-gray-800">

            {recommendations.length}
            {" "}
            Recommendations Found

          </h2>

          <p className="text-gray-500 mt-1">
            Personalized AI suggestions for improving
            cooling, sustainability and energy efficiency.
          </p>

        </div>

        <div className="space-y-6">

          {recommendations.length > 0 ? (

            recommendations.map((item, index) => (

              <RecommendationCard
                key={index}
                recommendation={item}
                rank={index + 1}
              />

            ))

          ) : (

            <div className="
              bg-white
              rounded-2xl
              shadow
              p-8
              text-center
            ">

              <h2 className="text-xl font-bold">
                No Recommendations Available
              </h2>

              <p className="text-gray-500 mt-2">
                Analyze a room image first to generate
                personalized cooling recommendations.
              </p>

            </div>

          )}

        </div>

        

      </div>

    </div>
  );
}