
"use server";

import type { Project } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

const PROJECTS_COLLECTION_REF = collection(db, "projects");

export async function getProjects(): Promise<Project[]> {
    try {
        const q = query(PROJECTS_COLLECTION_REF, orderBy("title"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (error) {
        console.error("Error fetching projects: ", error);
        return [];
    }
}

export async function addProject(projectData: Omit<Project, 'id'>) {
    try {
        const docRef = await addDoc(PROJECTS_COLLECTION_REF, projectData);
        revalidatePath("/");
        revalidatePath("/admin/dashboard");
        return { success: true, project: { id: docRef.id, ...projectData } };
    } catch (error) {
        console.error("Error adding project: ", error);
        return { success: false, message: "Failed to add project to Firestore." };
    }
}

export async function updateProject(projectData: Project) {
    if (!projectData.id) {
        return { success: false, message: "Project ID is missing" };
    }
    const projectDocRef = doc(db, "projects", projectData.id);
    const { id, ...dataToUpdate } = projectData;

    try {
        await updateDoc(projectDocRef, dataToUpdate);
        revalidatePath("/");
        revalidatePath("/admin/dashboard");
        return { success: true, project: projectData };
    } catch (error) {
        console.error("Error updating project: ", error);
        return { success: false, message: "Failed to update project in Firestore." };
    }
}

export async function deleteProject(id: string) {
    try {
        const projectDocRef = doc(db, "projects", id);
        await deleteDoc(projectDocRef);
        revalidatePath("/");
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Error deleting project: ", error);
        return { success: false, message: "Failed to delete project from Firestore." };
    }
}
