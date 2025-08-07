
"use server";

import type { Project } from "@/lib/data";
import { revalidatePath } from "next/cache";

// In a real application, you would use a database like Firestore.
// For this example, we'll use an in-memory array.
let projects: Project[] = [
    {
        id: "1",
        category: "Software",
        title: "AI Portfolio Generator",
        description: "A portfolio website that uses generative AI to tailor content to visitors.",
        image: "https://placehold.co/600x400.png",
        tags: ["Next.js", "Genkit", "Tailwind CSS", "Firebase"],
        liveUrl: "#",
        githubUrl: "#",
        aiHint: "AI portfolio"
    },
    {
        id: "2",
        category: "Software",
        title: "E-Commerce Analytics Dashboard",
        description: "A comprehensive dashboard for visualizing sales data and customer behavior for an online store.",
        image: "https://placehold.co/600x400.png",
        tags: ["React", "D3.js", "Node.js", "Express"],
        liveUrl: "#",
        githubUrl: "#",
        aiHint: "analytics dashboard"
    },
    {
        id: "3",
        category: "Software",
        title: "Task Management App",
        description: "A cross-platform application for managing tasks and improving productivity.",
        image: "https://placehold.co/600x400.png",
        tags: ["Flutter", "Firebase", "Dart"],
        liveUrl: "#",
        githubUrl: "#",
        aiHint: "task management"
    },
    {
        id: "4",
        category: "Hardware",
        title: "IoT Smart Home Hub",
        description: "A central hub to control and monitor various smart devices in a home environment.",
        image: "https://placehold.co/600x400.png",
        tags: ["Raspberry Pi", "Python", "MQTT", "Node-RED"],
        liveUrl: "#",
        githubUrl: "#",
        aiHint: "smart home"
    },
    {
        id: "5",
        category: "Hardware",
        title: "Automated Plant Watering System",
        description: "A system that automatically waters plants based on soil moisture levels, with remote monitoring.",
        image: "https://placehold.co/600x400.png",
        tags: ["Arduino", "C++", "Sensors", "Blynk"],
        liveUrl: "#",
        githubUrl: "#",
        aiHint: "plant watering"
    },
    {
        id: "6",
        category: "Hardware",
        title: "Portable Weather Station",
        description: "A compact, battery-powered weather station that measures temperature, humidity, and pressure.",
        image: "https://placehold.co/600x400.png",
        tags: ["ESP32", "Micropython", "Sensors"],
        liveUrl: "#",
        githubUrl: "#",
        aiHint: "weather station"
    },
];

export async function getProjects(): Promise<Project[]> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return projects;
}

export async function addProject(projectData: Omit<Project, 'id'>) {
    const newProject: Project = {
        id: Date.now().toString(),
        ...projectData,
    };
    projects.push(newProject);
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, project: newProject };
}


export async function updateProject(projectData: Project) {
    const index = projects.findIndex(p => p.id === projectData.id);
    if (index === -1) {
        return { success: false, message: "Project not found" };
    }
    projects[index] = projectData;
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, project: projects[index] };
}

export async function deleteProject(id: string) {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
        return { success: false, message: "Project not found" };
    }
    projects.splice(index, 1);
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true };
}
