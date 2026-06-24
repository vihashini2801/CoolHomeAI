import LoadingHeader from "../components/loading/LoadingHeader";
import AnalysisAnimation from "../components/loading/AnalysisAnimation";
import ProgressSteps from "../components/loading/ProgressSteps";
import SustainabilityFact from "../components/loading/SustainabilityFact";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="max-w-4xl w-full px-6">
        <LoadingHeader />
        <AnalysisAnimation />
        <ProgressSteps />
        <SustainabilityFact />
      </div>
    </div>
  );
}