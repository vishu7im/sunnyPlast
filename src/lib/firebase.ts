import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";

let app: App;

let db: Firestore | null = null;

function initFirebase(): App {
  if (getApps().length > 0) return getApps()[0];
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
  return app;
}

export function isFirebaseConfigured(): boolean {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
}

export function getDb(): Firestore {
  if (db) return db;
  initFirebase();
  db = getFirestore();
  db.settings({ ignoreUndefinedProperties: true });
  return db;
}

export function getBucket(): ReturnType<Storage["bucket"]> {
  initFirebase();
  return getStorage().bucket();
}
