
"use server";

import type { Startup } from "@/lib/data";
import { revalidatePath } from "next/cache";

// In a real application, you would use a database like Firestore.
// For this example, we'll use an in-memory array.
let startups: Startup[] = [
    {
        id: "1",
        logo: "https://placehold.co/100x100.png",
        appName: "Innovate AI",
        description: "A platform for developers to collaborate on AI projects and share resources.",
        link: "#",
        aiHint: "AI logo"
    },
    {
        id: "2",
        logo: "https://placehold.co/100x100.png",
        appName: "CircuitHub",
        description: "An online community and marketplace for hardware enthusiasts and creators.",
        link: "#",
        aiHint: "circuit logo"
    },
];

export async function getStartups(): Promise<Startup[]> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return startups;
}

export async function addStartup(startupData: Omit<Startup, 'id'>) {
    const newStartup: Startup = {
        id: Date.now().toString(),
        ...startupData,
    };
    startups.push(newStartup);
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true, startup: newStartup };
}

export async function updateStartup(startupData: Startup) {
    const index = startups.findIndex(p => p.id === startupData.id);
    if (index === -1) {
        return { success: false, message: "Startup not found" };
    }
    startups[index] = startupData;
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true, startup: startups[index] };
}

export async function deleteStartup(id: string) {
    const index = startups.findIndex(p => p.id === id);
    if (index === -1) {
        return { success: false, message: "Startup not found" };
    }
    startups.splice(index, 1);
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true };
}
