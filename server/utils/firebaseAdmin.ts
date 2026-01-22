import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export const useFirebaseAdmin = () => {
    const config = useRuntimeConfig();

    const projectId = config.firebaseAdminProjectId;
    const clientEmail = config.firebaseAdminClientEmail;
    const privateKey = (config.firebaseAdminPrivateKey || '').replace(/\\n/g, '\n');

    if (getApps().length === 0) {
        if (projectId && clientEmail && privateKey) {
            try {
                initializeApp({
                    credential: cert({
                        projectId,
                        clientEmail,
                        privateKey,
                    }),
                    projectId,
                });
            } catch (error) {
                console.error('Firebase Admin initialization error:', error);
                throw error;
            }
        } else {
            console.warn('Firebase Admin secrets missing in runtimeConfig. Attempting default initialization...');
            try {
                initializeApp();
            } catch (error) {
                console.error('Default Firebase Admin initialization failed:', error);
                throw error;
            }
        }
    }

    return {
        adminAuth: getAuth(),
        adminDb: getFirestore(),
    };
};
