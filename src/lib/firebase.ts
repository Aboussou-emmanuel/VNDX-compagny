import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Mock if no config
// Removed conflicting import, use local config

let app, auth, db;
if (firebaseConfig.apiKey) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.warn('Firebase config missing - mock mode');
  app = null;
  auth = {
    currentUser: null,
    signInWithEmailAndPassword: (email: string, pass: string) => Promise.resolve({ user: { email, uid: `mock-${Date.now()}` } } as any),
    signOut: (_auth: any) => Promise.resolve(),
    onAuthStateChanged: (cb: (user: any) => void) => cb(null)
  } as any;
  db = {
    collection: () => ({
      where: () => ({
        orderBy: () => ({
          limit: () => ({ get: () => Promise.resolve({ docs: [] }) })
        })
      })
    }),
    doc: (path: string) => ({
      id: path.split('/')[1],
      get: () => Promise.resolve({
        exists: () => false,
        data: () => ({})
      }),
      set: (data: any) => Promise.resolve(),
    }),
    getDoc: (ref: any) => ref.get(),
    setDoc: (ref: any, data: any, options: any) => ref.set(data)

  } as any;

}

export { auth, db };
export default app;
