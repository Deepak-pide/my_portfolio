
"use server";

import type { AboutMeData } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const ABOUT_ME_DOC_REF = doc(db, "portfolio", "about");

export async function getAboutMeData(): Promise<AboutMeData> {
  const docSnap = await getDoc(ABOUT_ME_DOC_REF);

  if (docSnap.exists()) {
    return docSnap.data() as AboutMeData;
  } else {
    // Return default data if document doesn't exist
    return {
        photo: "https://placehold.co/200x200.png",
        tagline: "Where circuits meet code – innovation begins.",
        skills: [
            "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python",
            "GraphQL", "REST APIs", "PostgreSQL", "MongoDB", "Docker", "Git",
            "Raspberry Pi", "Arduino", "IoT", "Embedded Systems"
        ],
        socials: {
            instagram: "#",
            github: "#",
            linkedin: "#"
        },
        extraLinks: []
    };
  }
}

export async function updateAboutMeData(data: AboutMeData) {
    try {
        await setDoc(ABOUT_ME_DOC_REF, data);
        revalidatePath("/");
        revalidatePath("/admin/dashboard");
        return { success: true, data: data };
    } catch(error) {
        console.error("Error updating about me data: ", error);
        return { success: false, message: "Failed to update data in Firestore." };
    }
}
