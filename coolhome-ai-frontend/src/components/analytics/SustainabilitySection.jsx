import { Leaf } from "lucide-react";
import FactorBreakdown from "./FactorBreakdown";

export default function SustainabilitySection({
  score,
  factors
}) {
  return (
    <div
      className="
      bg-gradient-to-r
      from-green-500
      to-emerald-600
      text-white
      rounded-3xl
      shadow-xl
      p-6
      "
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="uppercase text-sm opacity-90">
            Sustainability Score
          </p>

          <h2 className="text-5xl font-bold mt-2">
            {score}/100
          </h2>
        </div>

        <Leaf size={60} />
      </div>

      <div className="mt-6 bg-white/20 rounded-2xl p-4">
        <FactorBreakdown
          factors={factors}
          color="bg-white"
          textColor="text-white"
        />
      </div>
    </div>
  );
}