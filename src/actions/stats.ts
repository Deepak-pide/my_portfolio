
"use server";

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

const VISIT_COUNT_DOC_REF = doc(db, "stats", "visits");

export async function getVisitCount(): Promise<number> {
    try {
        const docSnap = await getDoc(VISIT_COUNT_DOC_REF);
        if (docSnap.exists()) {
            return docSnap.data().count;
        }
        return 0;
    } catch (error) {
        console.error("Error fetching visit count:", error);
        return 0;
    }
}

export async function incrementVisits() {
    try {
        await setDoc(VISIT_COUNT_DOC_REF, { count: increment(1) }, { merge: true });
    } catch (error) {
        console.error("Error incrementing visit count:", error);
    }
}
