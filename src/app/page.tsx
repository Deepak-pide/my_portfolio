import { HeroSection } from "@/components/HeroSection";
import { AboutMeSection } from "@/components/AboutMeSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ContactSection } from "@/components/ContactSection";
import { Separator } from "@/components/ui/separator";

export default function Home() {
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
