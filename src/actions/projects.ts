

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
        longDescription: "The AI Portfolio Generator is a cutting-edge web application built with Next.js and Firebase. It leverages generative AI to dynamically create and customize portfolio content based on visitor profiles, ensuring a personalized experience for potential employers, clients, or collaborators. The project features a clean, responsive design using Tailwind CSS and ShadCN UI components.",
        image: "https://placehold.co/600x400.png",
        extraPhotos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
        tags: ["Next.js", "Genkit", "Tailwind CSS", "Firebase"],
        liveUrl: "#",
        aiHint: "AI portfolio"
    },
    {
        id: "2",
        category: "Software",
        title: "E-Commerce Analytics Dashboard",
        description: "A comprehensive dashboard for visualizing sales data and customer behavior for an online store.",
        longDescription: "This project provides a powerful analytics dashboard for e-commerce businesses. Built with React and D3.js, it offers interactive charts and graphs to visualize key metrics like sales trends, customer demographics, and product performance. The backend is powered by Node.js and Express, providing a robust API for data processing.",
        image: "https://placehold.co/600x400.png",
        extraPhotos: [],
        tags: ["React", "D3.js", "Node.js", "Express"],
        liveUrl: "#",
        aiHint: "analytics dashboard"
    },
    {
        id: "3",
        category: "Software",
        title: "Task Management App",
        description: "A cross-platform application for managing tasks and improving productivity.",
        longDescription: "A feature-rich task management application developed with Flutter and Dart, available on both iOS and Android. It includes features like task prioritization, deadlines, reminders, and collaboration tools. Firebase is used for real-time data synchronization and user authentication, ensuring a seamless experience across devices.",
        image: "https://placehold.co/600x400.png",
        extraPhotos: [],
        tags: ["Flutter", "Firebase", "Dart"],
        liveUrl: "#",
        aiHint: "task management"
    },
    {
        id: "4",
        category: "Hardware",
        title: "IoT Smart Home Hub",
        description: "A central hub to control and monitor various smart devices in a home environment.",
        longDescription: "The IoT Smart Home Hub is a custom-built solution using a Raspberry Pi that allows users to control lighting, temperature, and security cameras from a single interface. It uses the MQTT protocol for reliable communication between devices and Node-RED for creating complex automation flows. The project demonstrates a strong understanding of IoT principles and hardware integration.",
        image: "https://placehold.co/600x400.png",
        extraPhotos: [],
        tags: ["Raspberry Pi", "Python", "MQTT", "Node-RED"],
        liveUrl: "#",
        aiHint: "smart home"
    },
    {
        id: "5",
        category: "Hardware",
        title: "Automated Plant Watering System",
        description: "A system that automatically waters plants based on soil moisture levels, with remote monitoring.",
        longDescription: "This project combines hardware and software to create an intelligent plant watering system. An Arduino microcontroller reads data from soil moisture sensors and controls a water pump accordingly. The system can be monitored and controlled remotely via the Blynk IoT platform, providing real-time data and manual override capabilities.",
        image: "https://placehold.co/600x400.png",
        extraPhotos: [],
        tags: ["Arduino", "C++", "Sensors", "Blynk"],
        liveUrl: "#",
        aiHint: "plant watering"
    },
    {
        id: "6",
        category: "Hardware",
        title: "Portable Weather Station",
        description: "A compact, battery-powered weather station that measures temperature, humidity, and pressure.",
        longDescription: "A portable weather station built around the ESP32 microcontroller, perfect for outdoor enthusiasts and hobbyists. It uses various sensors to collect environmental data and displays it on a small OLED screen. The device is programmed with Micropython, making it easy to extend and customize. Its low power consumption allows for long-term operation on a single battery charge.",
        image: "https://placehold.co/600x400.png",
        extraPhotos: [],
        tags: ["ESP32", "Micropython", "Sensors"],
        liveUrl: "#",
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
