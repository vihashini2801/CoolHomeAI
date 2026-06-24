import DashboardHeader from "../components/dashboard/DashboardHeader";
import RoomImageCard from "../components/dashboard/RoomImageCard";
import RoomSummaryCard from "../components/dashboard/RoomSummaryCard";
import QuickStats from "../components/dashboard/QuickStats";

import CoolingScoreCard from "../components/dashboard/CoolingScoreCard";
import SustainabilityScoreCard from "../components/dashboard/SustainabilityScoreCard";
import EnergySavingCard from "../components/dashboard/EnergySavingCard";
import TemperatureReductionCard from "../components/dashboard/TemperatureReductionCard";

export default function DashboardPage() {
  const analysisResult = JSON.parse(
    localStorage.getItem("analysisResult")
  );

  const uploadedImage =
    localStorage.getItem("uploadedImage");

  if (
    !analysisResult ||
    analysisResult.status === "error"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-lg">
          <h2 className="text-3xl font-bold text-red-600">
            Analysis Failed
          </h2>

          <p className="mt-4 text-gray-600">
            {analysisResult?.message ||
              "No analysis data available"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            <RoomImageCard image={uploadedImage} />

            <QuickStats
              data={analysisResult.room_features}
            />

            <RoomSummaryCard
              summary={
                analysisResult.summary ||
                "No summary available"
              }
            />

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            <CoolingScoreCard
              score={
                analysisResult.current_scores?.cooling || 0
              }
              potential={
                analysisResult.potential_scores?.cooling || 0
              }
            />

            <SustainabilityScoreCard
              score={
                analysisResult.current_scores?.sustainability || 0
              }
            />

            <EnergySavingCard
              score={
                analysisResult.current_scores?.energy_efficiency || 0
              }
            />

            <TemperatureReductionCard
              current={
                analysisResult.room_features?.current_temperature || 0
              }
              future={
                (analysisResult.room_features?.current_temperature || 0) - 4
              }
            />

          </div>

        </div>

      </div>
    </div>
  );
}