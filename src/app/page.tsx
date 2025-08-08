
"use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { AboutMeSection } from "@/components/AboutMeSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ContactSection } from "@/components/ContactSection";
import { Separator } from "@/components/ui/separator";
import { incrementVisits } from "@/actions/stats";

export default function Home() {
  useEffect(() => {
    incrementVisits();
  }, []);

  return (
    <div className="flex flex-col space-y-24">
      <HeroSection />
      <PortfolioSection />
      <Separator />
      <AboutMeSection />
       <Separator />
      <ContactSection />
    </div>
  );
}
