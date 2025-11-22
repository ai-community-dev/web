import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let firestoreInstance: Firestore | null = null;

// Lazy initialize Firebase Admin SDK
function initializeFirebaseAdmin() {
    if (!getApps().length) {
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
            ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
            : null;

        if (serviceAccount) {
            initializeApp({
                credential: cert(serviceAccount),
            });
        } else {
            console.warn('Firebase service account not configured. Firestore features will be disabled.');
            return null;
        }
    }
    return getFirestore();
}

// Lazy getter for Firestore instance
export function getDb(): Firestore | null {
    if (!firestoreInstance) {
        try {
            const instance = initializeFirebaseAdmin();
            if (!instance) {
                console.warn('Firestore not available - FIREBASE_SERVICE_ACCOUNT not configured');
                return null;
            }
            firestoreInstance = instance;
        } catch (error) {
            console.warn('Failed to initialize Firestore:', error);
            return null;
        }
    }
    return firestoreInstance;
}

export const COMMUNITIES_COLLECTION = 'communities';
export const EVENTS_COLLECTION = 'events';
export const METADATA_COLLECTION = 'metadata';

