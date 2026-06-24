import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import ImpactSection from "../components/landing/ImpactSection";
import CTASection from "../components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <ImpactSection />

      <CTASection />

      <Footer />

    </div>
  );
}