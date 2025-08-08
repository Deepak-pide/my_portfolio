
"use server";

import type { Startup } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

const STARTUPS_COLLECTION_REF = collection(db, "startups");

export async function getStartups(): Promise<Startup[]> {
    try {
        const q = query(STARTUPS_COLLECTION_REF, orderBy("appName"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Startup));
    } catch (error) {
        console.error("Error fetching startups: ", error);
        return [];
    }
}

export async function addStartup(startupData: Omit<Startup, 'id'>) {
    try {
        const docRef = await addDoc(STARTUPS_COLLECTION_REF, startupData);
        revalidatePath("/");
        revalidatePath("/admin/dashboard");
        return { success: true, startup: { id: docRef.id, ...startupData } };
    } catch (error) {
        console.error("Error adding startup: ", error);
        return { success: false, message: "Failed to add startup to Firestore." };
    }
}

export async function updateStartup(startupData: Startup) {
    if (!startupData.id) {
        return { success: false, message: "Startup ID is missing" };
    }
    const startupDocRef = doc(db, "startups", startupData.id);
    const { id, ...dataToUpdate } = startupData;

    try {
        await updateDoc(startupDocRef, dataToUpdate);
        revalidatePath("/");
        revalidatePath("/admin/dashboard");
        return { success: true, startup: startupData };
    } catch (error) {
        console.error("Error updating startup: ", error);
        return { success: false, message: "Failed to update startup in Firestore." };
    }
}

export async function deleteStartup(id: string) {
    try {
        const startupDocRef = doc(db, "startups", id);
        await deleteDoc(startupDocRef);
        revalidatePath("/");
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Error deleting startup: ", error);
        return { success: false, message: "Failed to delete startup from Firestore." };
    }
}
