"use client";

import { useState, useCallback, useTransition } from "react";
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          <h2 className="font-headline text-4xl md:text-5xl">About Me</h2>
          <div className="mt-6">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-headline text-2xl tracking-wide">
                  Who are you?
                </CardTitle>
                <Select onValueChange={handleRoleChange} defaultValue={visitorRoles[0].value}>
                  <SelectTrigger className="w-[200px]">
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
                <div className="text-muted-foreground space-y-4 min-h-[120px]">
                  {isPending ? (
                    <>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </>
                  ) : (
                    <p className="leading-relaxed">
                      {aboutMeContent || "Select a role above to see a personalized introduction. I am a versatile developer with a passion for creating beautiful and functional web applications."}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="lg:col-span-1">
          <h3 className="font-headline text-3xl md:text-4xl">My Skills</h3>
           <div className="mt-6 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="default" className="text-sm px-3 py-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  {skill}
                </Badge>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
