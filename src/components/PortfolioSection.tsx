
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/actions/projects";
import type { Project } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "./ui/skeleton";

function ProjectCard({ project, onCardClick }: { project: Project, onCardClick: (project: Project) => void }) {
    return (
        <Card className="flex flex-col overflow-hidden group">
            <CardHeader className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg cursor-pointer" onClick={() => onCardClick(project)}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        data-ai-hint={project.aiHint}
                    />
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-6" onClick={() => onCardClick(project)}>
                <CardTitle className="font-headline text-2xl tracking-wide cursor-pointer">
                    {project.title}
                </CardTitle>
                <CardDescription className="mt-2 cursor-pointer">
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
            <CardFooter className="p-6 pt-0">
                <Button variant="outline" asChild>
                    <Link href={project.liveUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
                        Visit <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
      setLoading(false);
    }
    loadProjects();
  }, []);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  }

  const handleDialogClose = () => {
    setSelectedProject(null);
  }

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
              <CardContent className="space-y-2 p-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-1/2" />
              </CardContent>
               <CardFooter className="flex justify-between p-6 pt-0">
                 <Skeleton className="h-10 w-28" />
               </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-16">
        <Tabs defaultValue="software" className="w-full">
            <div className="sticky top-16 z-40 bg-background pt-8 pb-4">
                 <div className="text-center">
                    <h2 className="font-headline text-4xl md:text-5xl">My Work</h2>
                    <p className="mt-2 text-lg text-muted-foreground">
                    A selection of my projects.
                    </p>
                </div>
                <TabsList className="grid w-full grid-cols-2 mt-8 max-w-md mx-auto">
                    <TabsTrigger value="software">Software</TabsTrigger>
                    <TabsTrigger value="hardware">Hardware</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="software">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {softwareProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} onCardClick={handleCardClick} />
                ))}
                </div>
            </TabsContent>
            <TabsContent value="hardware">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {hardwareProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} onCardClick={handleCardClick} />
                ))}
                </div>
            </TabsContent>
        </Tabs>

       {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-4xl tracking-wide">{selectedProject.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-6">
               {selectedProject.extraPhotos && selectedProject.extraPhotos.length > 0 && (
                 <Carousel className="w-full">
                    <CarouselContent>
                    {[selectedProject.image, ...selectedProject.extraPhotos].map((photo, index) => (
                        <CarouselItem key={index}>
                           <div className="relative aspect-video">
                             <Image src={photo} alt={`${selectedProject.title} photo ${index + 1}`} fill className="object-cover rounded-lg" />
                           </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
               )}
              <DialogDescription className="text-base text-foreground">
                {selectedProject.longDescription}
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      )}

    </section>
  );
}
