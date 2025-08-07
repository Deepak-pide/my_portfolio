
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { getProjects, deleteProject } from "@/actions/projects";
import type { Project, AboutMeData } from "@/lib/data";
import { ProjectForm } from "@/components/ProjectForm";
import { AboutMeForm } from "@/components/AboutMeForm";
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

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isAboutFormOpen, setIsAboutFormOpen] = useState(false);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/admin/login");
    } else {
      loadProjects();
    }
  }, [router]);

  const loadProjects = async () => {
    const fetchedProjects = await getProjects();
    setProjects(fetchedProjects);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsProjectFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsProjectFormOpen(true);
  };

  const handleDelete = async (id: string) => {
     await deleteProject(id);
     loadProjects();
  }

  const handleProjectFormSuccess = () => {
    setIsProjectFormOpen(false);
    loadProjects();
  }
  
  const handleAboutFormSuccess = () => {
    setIsAboutFormOpen(false);
  }

  const softwareProjects = projects.filter((p) => p.category === "Software");
  const hardwareProjects = projects.filter((p) => p.category === "Hardware");

  return (
    <div className="py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl">Admin Dashboard</h1>
         <Button onClick={() => setIsAboutFormOpen(true)}>Edit About Me</Button>
      </div>
      
       {isAboutFormOpen && (
        <AboutMeForm
          onSuccess={handleAboutFormSuccess}
          onCancel={() => setIsAboutFormOpen(false)}
        />
      )}

      <div className="flex justify-between items-center mb-8 mt-12">
         <h2 className="font-headline text-3xl">Projects</h2>
        <Button onClick={handleAddNew}>Add New Project</Button>
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
                  <Button variant="outline" onClick={() => handleEdit(project)}>Edit</Button>
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
                        <AlertDialogAction onClick={() => handleDelete(project.id!)}>
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
                  <Button variant="outline" onClick={() => handleEdit(project)}>Edit</Button>
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
                        <AlertDialogAction onClick={() => handleDelete(project.id!)}>
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

    