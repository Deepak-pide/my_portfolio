
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { getProjects, deleteProject } from "@/actions/projects";
import { getStartups, deleteStartup } from "@/actions/startups";
import type { Project, Startup } from "@/lib/data";
import { ProjectForm } from "@/components/ProjectForm";
import { AboutMeForm } from "@/components/AboutMeForm";
import { StartupForm } from "@/components/StartupForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingStartup, setEditingStartup] = useState<Startup | null>(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isStartupFormOpen, setIsStartupFormOpen] = useState(false);
  const [isAboutFormOpen, setIsAboutFormOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Use onAuthStateChanged for robust auth state management
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          sessionStorage.setItem("isAdmin", "true");
          setIsAdmin(true);
          loadProjects();
          loadStartups();
        } else {
          sessionStorage.removeItem("isAdmin");
          setIsAdmin(false);
          router.push("/admin/login");
        }
      });
      return () => unsubscribe();
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("isAdmin");
    router.push("/admin/login");
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
  };

  const loadProjects = async () => {
    const fetchedProjects = await getProjects();
    setProjects(fetchedProjects);
  };
  
  const loadStartups = async () => {
    const fetchedStartups = await getStartups();
    setStartups(fetchedStartups);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsProjectFormOpen(true);
  };
  
  const handleEditStartup = (startup: Startup) => {
    setEditingStartup(startup);
    setIsStartupFormOpen(true);
  };

  const handleAddNewProject = () => {
    setEditingProject(null);
    setIsProjectFormOpen(true);
  };

  const handleAddNewStartup = () => {
    setEditingStartup(null);
    setIsStartupFormOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
     await deleteProject(id);
     loadProjects();
  }
  
  const handleDeleteStartup = async (id: string) => {
     await deleteStartup(id);
     loadStartups();
  }

  const handleProjectFormSuccess = () => {
    setIsProjectFormOpen(false);
    loadProjects();
  }
  
  const handleStartupFormSuccess = () => {
    setIsStartupFormOpen(false);
    loadStartups();
  }
  
  const handleAboutFormSuccess = () => {
    setIsAboutFormOpen(false);
  }

  const softwareProjects = projects.filter((p) => p.category === "Software");
  const hardwareProjects = projects.filter((p) => p.category === "Hardware");
  
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <div className="py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl">Admin Dashboard</h1>
         <div className="flex gap-4">
            <Button onClick={() => setIsAboutFormOpen(true)}>Edit About Me</Button>
            <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
         </div>
      </div>
      
       {isAboutFormOpen && (
        <AboutMeForm
          onSuccess={handleAboutFormSuccess}
          onCancel={() => setIsAboutFormOpen(false)}
        />
      )}

      {/* STARTUPS SECTION */}
      <div className="flex justify-between items-center mb-8 mt-12">
         <h2 className="font-headline text-3xl">Startups</h2>
        <Button onClick={handleAddNewStartup}>Add New Startup</Button>
      </div>

      {isStartupFormOpen && (
        <StartupForm
          startup={editingStartup}
          onSuccess={handleStartupFormSuccess}
          onCancel={() => setIsStartupFormOpen(false)}
        />
      )}

      <div className="space-y-12">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map((startup) => (
              <Card key={startup.id}>
                <CardHeader>
                  <CardTitle>{startup.appName}</CardTitle>
                  <CardDescription>{startup.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => handleEditStartup(startup)}>Edit</Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the startup.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteStartup(startup.id!)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* PROJECTS SECTION */}
      <div className="flex justify-between items-center mb-8 mt-12">
         <h2 className="font-headline text-3xl">Projects</h2>
        <Button onClick={handleAddNewProject}>Add New Project</Button>
      </div>

      {isProjectFormOpen && (
        <ProjectForm
          project={editingProject}
          onSuccess={handleProjectFormSuccess}
          onCancel={() => setIsProjectFormOpen(false)}
        />
      )}

      <div className="space-y-12">
        <section>
          <h3 className="text-2xl font-headline mb-4">Software Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => handleEditProject(project)}>Edit</Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the project.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteProject(project.id!)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-headline mb-4">Hardware Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardwareProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => handleEditProject(project)}>Edit</Button>
                   <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the project.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteProject(project.id!)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
