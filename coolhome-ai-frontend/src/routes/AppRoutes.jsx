import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import UploadPage from "../pages/UploadPage";
import LoadingPage from "../pages/LoadingPage";
import DashboardPage from "../pages/DashboardPage";
import RecommendationsPage from "../pages/RecommendationsPage";
import AnalyticsPage from "../pages/AnalyticsPage";




export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/recommendations"  element={<RecommendationsPage />} />
        <Route  path="/analytics" element={<AnalyticsPage />} />
        
        
        
      </Routes>
    </BrowserRouter>
  );
}