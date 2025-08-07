
"use client";

import { useState, useCallback, useTransition } from "react";
import Image from "next/image";
import { generateAboutMe } from "@/ai/flows/generate-about-me";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "./ui/badge";
import { skills } from "@/lib/data";

const visitorRoles = [
  { value: "potential client", label: "Potential Client" },
  { value: "recruiter", label: "Recruiter" },
  { value: "fellow developer", label: "Fellow Developer" },
  { value: "design enthusiast", label: "Design Enthusiast" },
];

export function AboutMeSection() {
  const [aboutMeContent, setAboutMeContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = useCallback((role: string) => {
    startTransition(async () => {
      const result = await generateAboutMe({ visitorRole: role });
      setAboutMeContent(result.aboutMeContent);
    });
  }, []);

  return (
    <section id="about" className="py-16">
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
            <h2 className="font-headline text-4xl md:text-5xl mb-6 text-center md:text-left">About Me</h2>
            <Card>
              <CardHeader className="flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <CardTitle className="font-headline text-2xl tracking-wide">
                  Who are you?
                </CardTitle>
                <Select onValueChange={handleRoleChange} defaultValue={visitorRoles[0].value}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {visitorRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="pt-4">
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
                      {aboutMeContent || "Select a role above to see a personalized introduction. I am a versatile developer with a passion for creating beautiful and functional web applications that bridge the gap between hardware and software."}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
