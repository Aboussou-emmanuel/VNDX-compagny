import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import type { UserWithRole, UserRole } from '../types';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
// firebaseConfig not needed

const auth = getAuth();

interface AuthContextType {
  user: UserWithRole | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  setAdminRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function loadUserRole(firebaseUser: User): Promise<UserWithRole> {
  try {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const snap = await getDoc(userRef);
    let role: UserRole = 'user';
    if (!snap.exists()) {
      role = (firebaseUser.email === 'Companyvndx@gmail.com') ? 'admin' : 'user';
      await setDoc(userRef, {
        email: firebaseUser.email,
        role,
        createdAt: serverTimestamp()
      });
    } else {
      const data = snap.data();
      role = data?.role as UserRole || 'user';
    }
    return { ...firebaseUser, role } as UserWithRole;
  } catch (error) {
    console.error('Role load error:', error);
    return { ...firebaseUser, role: 'user' } as UserWithRole;
  }
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userWithRole = await loadUserRole(firebaseUser);
        setUser(userWithRole);
        setRole(userWithRole.role ?? 'user');
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const setAdminRole = async () => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { 
      role: 'admin' as UserRole,
      updatedAt: serverTimestamp()
    }, { merge: true });
    const newUserWithRole = await loadUserRole(user);
    setUser(newUserWithRole);
    setRole('admin');
  };

  const signOut = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signIn, signOut, setAdminRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

