/**
 * This script sets the 'superAdmin' custom claim for a specific user.
 * 
 * Usage:
 * 1. Set the following environment variables:
 *    - FIREBASE_PROJECT_ID
 *    - FIREBASE_CLIENT_EMAIL
 *    - FIREBASE_PRIVATE_KEY
 * 2. Run with Node.js:
 *    node scripts/setAdmin.js <user-uid>
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import process from 'process';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
    console.error('Error: Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables.');
    process.exit(1);
}

initializeApp({
    credential: cert({
        projectId,
        clientEmail,
        privateKey,
    }),
});

const uid = process.argv[2];

if (!uid) {
    console.error('Usage: node scripts/setAdmin.js <user-uid>');
    process.exit(1);
}

getAuth()
    .setCustomUserClaims(uid, { superAdmin: true })
    .then(() => {
        console.log(`Successfully set superAdmin claim for user: ${uid}`);
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error setting custom claims:', error);
        process.exit(1);
    });
