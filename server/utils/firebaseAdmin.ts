import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export const useFirebaseAdmin = () => {
    const config = useRuntimeConfig();

    const projectId = config.firebaseAdminProjectId || process.env.FIREBASE_PROJECT_ID;
    const clientEmail = config.firebaseAdminClientEmail || process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = (config.firebaseAdminPrivateKey || process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

    if (getApps().length === 0) {
        if (projectId && clientEmail && privateKey) {
            initializeApp({
                credential: cert({
                    projectId,
                    clientEmail,
                    privateKey,
                }),
                projectId,
            });
        } else {
            // Fallback to default credentials if available
            initializeApp();
        }
    }

    return {
        adminAuth: getAuth(),
        adminDb: getFirestore(),
    };
};
