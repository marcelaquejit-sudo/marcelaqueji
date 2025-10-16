import React from "react";
import AnalyticsBoot from "./components/AnalyticsBoot";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import HeroKinetic from "./components/HeroKinetic";
import Services3DPanel from "./components/Services3DPanel";
import ExperienceYearsSection from "./components/ExperienceYearsSection";
import AboutMeSection from "./components/AboutMeSection";
import CasesShowcase from "./components/CasesShowcase";
import CtaSection from "./components/CtaSection";
import FeedbackFloatingSection from "./components/FeedbackFloatingSection";

export default function App() {
  return (
    <main className="bg-white overflow-hidden pt-20">
      <AnalyticsBoot />
      <SiteHeader />
      <HeroKinetic />
      <Services3DPanel />
      <ExperienceYearsSection />
       <AboutMeSection />
      <CasesShowcase />
      <CtaSection />
      <FeedbackFloatingSection />
      <SiteFooter />
    </main>
  );
}
