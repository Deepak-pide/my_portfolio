
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/actions/projects";
import type { Project } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "./ui/skeleton";


export function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
      setLoading(false);
    }
    loadProjects();
  }, []);

  const hardwareProjects = projects.filter((p) => p.category === "Hardware");
  const softwareProjects = projects.filter((p) => p.category === "Software");

  if (loading) {
    return (
      <section id="portfolio" className="py-16">
        <div className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl">My Work</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            A selection of my projects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[...Array(3)].map((_, i) => (
             <Card key={i}>
              <CardHeader>
                <Skeleton className="h-[225px] w-full rounded-lg" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-1/2" />
              </CardContent>
               <CardFooter className="flex justify-between">
                 <Skeleton className="h-10 w-28" />
                 <Skeleton className="h-10 w-20" />
               </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-16">
      <div className="text-center">
        <h2 className="font-headline text-4xl md:text-5xl">My Work</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          A selection of my projects.
        </p>
      </div>

      {/* Mobile View with Toggle */}
      <div className="mt-8 md:hidden">
        <Tabs defaultValue="software" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
          </TabsList>
          <TabsContent value="software">
            <div className="grid grid-cols-1 gap-8 mt-8">
              {softwareProjects.map((project, index) => (
                <Card
                  key={index}
                  className="flex flex-col overflow-hidden group"
                >
                  <CardHeader>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        data-ai-hint={project.aiHint}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardTitle className="font-headline text-2xl tracking-wide">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {project.description}
                    </CardDescription>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={project.liveUrl} target="_blank">
                        Visit <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link href={project.githubUrl} target="_blank">
                        More Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="hardware">
            <div className="grid grid-cols-1 gap-8 mt-8">
              {hardwareProjects.map((project, index) => (
                <Card
                  key={index}
                  className="flex flex-col overflow-hidden group"
                >
                  <CardHeader>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        data-ai-hint={project.aiHint}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardTitle className="font-headline text-2xl tracking-wide">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {project.description}
                    </CardDescription>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={project.liveUrl} target="_blank">
                        Visit <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link href={project.githubUrl} target="_blank">
                        More Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop View */}
      <div className="mt-12 space-y-16 hidden md:block">
        <div>
          <h3 className="font-headline text-3xl md:text-4xl mb-8 text-center">
            Software
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareProjects.map((project, index) => (
              <Card
                key={index}
                className="flex flex-col overflow-hidden group"
              >
                <CardHeader>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      data-ai-hint={project.aiHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="font-headline text-2xl tracking-wide">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {project.description}
                  </CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={project.liveUrl} target="_blank">
                      Visit <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href={project.githubUrl} target="_blank">
                      More Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-headline text-3xl md:text-4xl mb-8 text-center">
            Hardware
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hardwareProjects.map((project, index) => (
              <Card
                key={index}
                className="flex flex-col overflow-hidden group"
              >
                <CardHeader>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      data-ai-hint={project.aiHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="font-headline text-2xl tracking-wide">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {project.description}
                  </CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={project.liveUrl} target="_blank">
                      Visit <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href={project.githubUrl} target="_blank">
                      More Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
