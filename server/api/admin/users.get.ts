import { useFirebaseAdmin } from '~/server/utils/firebaseAdmin';

export default defineEventHandler(async (event) => {
    // 1. Verify Authentication & superAdmin claim
    const idToken = getHeader(event, 'Authorization')?.replace('Bearer ', '');

    if (!idToken) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized: No token provided',
        });
    }

    const { adminAuth, adminDb } = useFirebaseAdmin();

    try {
        const decodedToken = await adminAuth.verifyIdToken(idToken);

        if (!decodedToken.superAdmin) {
            throw createError({
                statusCode: 403,
                statusMessage: 'Forbidden: SuperAdmin access required',
            });
        }

        // 2. Fetch Users from Firestore
        console.log('Fetching users from Firestore...');
        const usersSnapshot = await adminDb.collection('users').get();
        console.log(`Found ${usersSnapshot.size} documents in 'users' collection`);

        const users = usersSnapshot.docs.map((doc: any) => {
            const data = doc.data();

            // Robust date conversion for Firestore Timestamps
            let createdAtIso = null;
            if (data.createdAt) {
                if (typeof data.createdAt.toDate === 'function') {
                    createdAtIso = data.createdAt.toDate().toISOString();
                } else if (data.createdAt instanceof Date) {
                    createdAtIso = data.createdAt.toISOString();
                } else if (typeof data.createdAt === 'string') {
                    createdAtIso = new Date(data.createdAt).toISOString();
                } else if (data.createdAt._seconds) {
                    // Handle raw timestamp objects if toDate is missing
                    createdAtIso = new Date(data.createdAt._seconds * 1000).toISOString();
                }
            } else if (data.timestamp) {
                // Fallback to timestamp field if createdAt is missing
                if (typeof data.timestamp.toDate === 'function') {
                    createdAtIso = data.timestamp.toDate().toISOString();
                } else if (data.timestamp._seconds) {
                    createdAtIso = new Date(data.timestamp._seconds * 1000).toISOString();
                }
            }

            return {
                id: doc.id,
                email: data.email || 'N/A',
                role: data.role || (doc.id === decodedToken.uid ? 'superAdmin' : 'user'),
                createdAt: createdAtIso,
                // Include other useful metadata but avoid heavy objects
                displayName: data.displayName || data.name || '',
            };
        });

        // Sort by registration date descending
        users.sort((a: any, b: any) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        });

        return {
            success: true,
            count: users.length,
            users,
        };

    } catch (error: any) {
        console.error('Admin API Error:', error);
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal Server Error',
        });
    }
});
