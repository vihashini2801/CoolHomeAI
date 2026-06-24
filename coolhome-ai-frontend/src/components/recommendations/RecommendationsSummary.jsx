export default function RecommendationsSummary() {

  const analysisResult = JSON.parse(
    localStorage.getItem("analysisResult")
  );

  const current =
    analysisResult?.current_scores?.cooling || 0;

  const future =
    analysisResult?.potential_scores?.cooling || 0;

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-3">
        Improvement Potential
      </h2>

      <p className="text-gray-600">

        Implementing all recommendations can improve
        your Cooling Score from

        <span className="font-bold text-blue-600">
          {" "}
          {current}/100
          {" "}
        </span>

        to

        <span className="font-bold text-green-600">
          {future}/100
        </span>

      </p>

    </div>
  );
}