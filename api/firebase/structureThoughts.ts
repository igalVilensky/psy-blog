import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";

/**
 * Process messy input into a predefined cognitive structure.
 * 
 * @param {object} firestore - Firestore instance
 * @param {string} userId - Current user ID
 * @param {string} template - Template ID (e.g. 'mental_dump_to_clarity')
 * @param {string} content - Raw messy text from voice or typing
 * @param {string} source - Input source: 'voice' | 'text'
 * @returns {Promise<object>} - Result object
 */
export const structureThoughts = async (firestore, userId, template, content, source) => {
    if (!userId) return { success: false, message: "User ID is required" };

    try {
        // 1. Save raw input to Firestore first
        const docRef = await addDoc(collection(firestore, "users", userId, "voice_structures"), {
            userId,
            template,
            rawInput: content,
            structuredOutput: null,
            createdAt: serverTimestamp(),
            source
        });

        // 2. Send to AI for structuring
        const response = await fetch('/api/ai/structure-thoughts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                template,
                content
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("AI structuring error:", error);
            return {
                success: false,
                message: "AI processing failed",
                docId: docRef.id
            };
        }

        const result = await response.json();

        // 3. Save structured output back to Firestore
        await updateDoc(doc(firestore, "users", userId, "voice_structures", docRef.id), {
            structuredOutput: result.structured || result
        });

        return {
            success: true,
            docId: docRef.id,
            structuredData: result.structured || result
        };

    } catch (error) {
        console.error("Error in structureThoughts service:", error);
        return {
            success: false,
            message: error.message || "Failed to structure thoughts"
        };
    }
};
