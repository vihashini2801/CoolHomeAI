import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import CoolingScoreSection from "../components/analytics/CoolingScoreSection";
import SustainabilitySection from "../components/analytics/SustainabilitySection";
import EnergySavingSection from "../components/analytics/EnergySavingSection";
import PotentialImprovement from "../components/analytics/PotentialImprovement";

export default function AnalyticsPage() {

  const analysisResult = JSON.parse(
    localStorage.getItem("analysisResult")
  );

  if (
    !analysisResult ||
    analysisResult.status === "error"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            No Analytics Available
          </h2>

          <p className="text-gray-600">
            Please analyze a room first.
          </p>
        </div>
      </div>
    );
  }

  const cooling =
    analysisResult.current_scores?.cooling || 0;

  const sustainability =
    analysisResult.current_scores?.sustainability || 0;

  const energy =
    analysisResult.current_scores?.energy_efficiency || 0;

  const potentialCooling =
    analysisResult.potential_scores?.cooling || 0;

  const potentialSustainability =
    analysisResult.potential_scores?.sustainability || 0;

  const potentialEnergy =
    analysisResult.potential_scores?.energy_efficiency || 0;

  return (
    <div className="bg-slate-100 min-h-screen">

      <AnalyticsHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* SCORE OVERVIEW */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">
            <p className="text-gray-500 text-sm">
              Cooling Score
            </p>

            <h2 className="text-5xl font-bold text-blue-600 mt-2">
              {cooling}
            </h2>

            <p className="text-gray-400 mt-1">
              Current Performance
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600">
            <p className="text-gray-500 text-sm">
              Sustainability Score
            </p>

            <h2 className="text-5xl font-bold text-green-600 mt-2">
              {sustainability}
            </h2>

            <p className="text-gray-400 mt-1">
              Current Performance
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <p className="text-gray-500 text-sm">
              Energy Efficiency
            </p>

            <h2 className="text-5xl font-bold text-orange-500 mt-2">
              {energy}
            </h2>

            <p className="text-gray-400 mt-1">
              Current Performance
            </p>
          </div>

        </div>

        {/* PERFORMANCE OVERVIEW */}

        <div
          className="
            bg-gradient-to-r
            from-blue-600
            via-cyan-500
            to-green-500
            text-white
            rounded-3xl
            shadow-xl
            p-8
            mb-8
          "
        >
          <h2 className="text-3xl font-bold mb-3">
            Room Performance Overview
          </h2>

          <p className="text-lg opacity-90">
            Based on AI analysis, your room has
            opportunities to improve cooling efficiency,
            sustainability, and energy savings. Applying
            the recommended improvements can
            significantly increase comfort while reducing
            heat buildup and energy consumption.
          </p>
        </div>

        {/* ANALYTICS CARDS */}

        <div className="space-y-8">

          <CoolingScoreSection
            score={cooling}
            factors={[
              {
                name: "Current Cooling",
                value: cooling
              },
              {
                name: "Potential Cooling",
                value: potentialCooling
              },
              {
                name: "Improvement",
                value:
                  analysisResult.improvements?.cooling || 0
              }
            ]}
          />

          <SustainabilitySection
            score={sustainability}
            factors={[
              {
                name: "Current Sustainability",
                value: sustainability
              },
              {
                name: "Potential Sustainability",
                value: potentialSustainability
              },
              {
                name: "Improvement",
                value:
                  analysisResult.improvements
                    ?.sustainability || 0
              }
            ]}
          />

          <EnergySavingSection
            score={energy}
            factors={[
              {
                name: "Current Energy",
                value: energy
              },
              {
                name: "Potential Energy",
                value: potentialEnergy
              },
              {
                name: "Improvement",
                value:
                  analysisResult.improvements
                    ?.energy_efficiency || 0
              }
            ]}
          />

        </div>

        {/* IMPROVEMENT SUMMARY */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-blue-50 rounded-2xl p-6">
            <p className="text-gray-600">
              Current Cooling
            </p>

            <h2 className="text-4xl font-bold text-blue-600">
              {cooling}
            </h2>
          </div>

          <div className="bg-green-50 rounded-2xl p-6">
            <p className="text-gray-600">
              Potential Cooling
            </p>

            <h2 className="text-4xl font-bold text-green-600">
              {potentialCooling}
            </h2>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6">
            <p className="text-gray-600">
              Improvement Gain
            </p>

            <h2 className="text-4xl font-bold text-orange-500">
              +
              {(potentialCooling - cooling)}
            </h2>
          </div>

        </div>

        {/* CHART */}

        <div className="mt-8">
          <PotentialImprovement
            current={cooling}
            future={potentialCooling}
          />
        </div>

      </div>

    </div>
  );
}