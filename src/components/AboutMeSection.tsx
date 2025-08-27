

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "./ui/badge";
import { getAboutMeData } from "@/actions/about";
import type { AboutMeData, Startup } from "@/lib/data";
import { getStartups } from "@/actions/startups";
import { StartupCard } from "./StartupCard";
import { Separator } from "./ui/separator";

export function AboutMeSection() {
  const [data, setData] = useState<AboutMeData | null>(null);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [aboutData, startupsData] = await Promise.all([
          getAboutMeData(),
          getStartups(),
      ]);
      setData(aboutData);
      setStartups(startupsData);
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!loading && startups.length > 0 && scrollerRef.current) {
        const scrollerInner = scrollerRef.current.querySelector('.animate-scroll');
        if (scrollerInner) {
            const scrollWidth = scrollerInner.scrollWidth / 2;
            scrollerRef.current.style.setProperty('--scroll-width', `${scrollWidth}px`);
        }
    }
  }, [loading, startups]);

  const duplicatedStartups = startups.length > 0 ? [...startups, ...startups] : [];

  if (loading || !data) {
    return (
      <section id="about" className="py-12 md:py-16">
        <div className="text-center md:text-left">
          <h2 className="font-headline text-4xl md:text-5xl mb-6">About Me</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <Skeleton className="w-48 h-48 rounded-full" />
            <Skeleton className="h-8 w-48 mt-4" />
            <Skeleton className="h-6 w-64 mt-2" />
            <div className="mt-6 w-full">
              <Skeleton className="h-8 w-32 mb-4 mx-auto" />
              <div className="flex flex-wrap gap-2 justify-center">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="space-y-16 md:space-y-24 py-12 md:py-16">
      <div>
         <div className="sticky top-16 z-30 bg-background py-4 mb-6">
            <div className="text-center md:text-left">
                <h2 className="font-headline text-4xl md:text-5xl">About Me</h2>
            </div>
         </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1 flex flex-col items-center text-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/10 shadow-lg">
                    <Image 
                        src={data.photo} 
                        alt="DEEPAK GUPTA" 
                        fill
                        className="object-cover"
                        data-ai-hint="person portrait"
                    />
                </div>
                <h3 className="font-headline text-3xl mt-4">DEEPAK GUPTA</h3>
                <p className="text-muted-foreground mt-2 italic">
                {data.tagline}
                </p>
                <div className="mt-6 w-full">
                    <h3 className="font-headline text-2xl mb-4">My Skills</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {data.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                            {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
            <div className="md:col-span-2">
                
                <div className="text-muted-foreground space-y-4 min-h-[150px]">
                </div>
            </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
         <div className="sticky top-16 z-30 bg-background py-4 mb-12">
            <div className="text-center">
                <h2 className="font-headline text-4xl md:text-5xl">Startups</h2>
            </div>
         </div>
         {/* Mobile Infinite Scroller */}
        <div ref={scrollerRef} className="sm:hidden group relative w-full overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex w-max animate-scroll">
                {duplicatedStartups.map((startup, index) => (
                    <div key={index} className="w-[80vw] max-w-xs p-4">
                        <StartupCard startup={startup} />
                    </div>
                ))}
            </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-8">
            {startups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
            ))}
        </div>
      </div>
    </section>
  );
}
