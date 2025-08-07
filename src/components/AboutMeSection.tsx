
"use client";

import { useState, useCallback, useTransition, useEffect } from "react";
import Image from "next/image";
import { generateAboutMe } from "@/ai/flows/generate-about-me";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "./ui/badge";
import { skills } from "@/lib/data";

const defaultIntro = "I am a versatile developer with a passion for creating beautiful and functional web applications that bridge the gap between hardware and software. My expertise in both domains allows me to build seamless, end-to-end solutions, from the electronic components to the user interface. I thrive on challenges and am always eager to learn new technologies to push the boundaries of what's possible.";

export function AboutMeSection() {
  const [aboutMeContent, setAboutMeContent] = useState(defaultIntro);
  const [isPending, startTransition] = useTransition();

  return (
    <section id="about" className="py-16">
      <div className="text-center md:text-left">
        <h2 className="font-headline text-4xl md:text-5xl mb-6">About Me</h2>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1 flex flex-col items-center text-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/10 shadow-lg">
                <Image 
                    src="https://placehold.co/200x200.png" 
                    alt="DEEPAK GUPTA" 
                    fill
                    className="object-cover"
                    data-ai-hint="person portrait"
                />
            </div>
            <h3 className="font-headline text-3xl mt-4">DEEPAK GUPTA</h3>
            <p className="text-muted-foreground mt-2 italic">
             "Where circuits meet code – innovation begins."
            </p>
            <div className="mt-6 w-full">
                <h3 className="font-headline text-2xl mb-4">My Skills</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                    {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                        {skill}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
        <div className="md:col-span-2">
            
            <div className="text-muted-foreground space-y-4 min-h-[150px]">
              {isPending ? (
                <>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </>
              ) : (
                <p className="leading-relaxed">
                  {aboutMeContent}
                </p>
              )}
            </div>
        </div>
      </div>
    </section>
  );
}
