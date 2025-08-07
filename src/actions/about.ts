
"use server";

import type { AboutMeData } from "@/lib/data";
import { revalidatePath } from "next/cache";

// In a real application, you would use a database like Firestore.
// For this example, we'll use an in-memory object.
let aboutMeData: AboutMeData = {
    photo: "https://placehold.co/200x200.png",
    tagline: "Where circuits meet code – innovation begins.",
    skills: [
        "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python",
        "GraphQL", "REST APIs", "PostgreSQL", "MongoDB", "Docker", "Git",
        "Raspberry Pi", "Arduino", "IoT", "Embedded Systems"
    ]
};

export async function getAboutMeData(): Promise<AboutMeData> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return aboutMeData;
}

export async function updateAboutMeData(data: AboutMeData) {
    aboutMeData = { ...data };
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true, data: aboutMeData };
}

    