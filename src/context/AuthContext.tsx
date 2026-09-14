import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as fbSignOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  deleteDoc
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase.ts';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  preferredNiche: string;
  preferredLanguage: string;
  channelName?: string;
  targetAudience?: string;
  toneOfVoice?: string;
  subscribersGoal?: number;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt?: string;
}

export interface FavoriteItem {
  id: string;
  userId: string;
  toolId: string;
  toolSlug: string;
  toolName: string;
  createdAt: string;
}

export interface ToolHistoryItem {
  id: string;
  userId: string;
  toolId: string;
  toolSlug: string;
  toolName: string;
  usedAt: string;
}

export interface SavedResultItem {
  id: string;
  userId: string;
  toolId: string;
  toolSlug: string;
  title: string;
  content: string;
  category: string;
  projectId?: string;
  createdAt: string;
}

export interface ProjectItem {
  id: string;
  userId: string;
  name: string;
  description: string;
  targetNiche: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GuestPromptState {
  show: boolean;
  message: string;
  actionText?: string;
  actionLink?: string;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isLoggedIn: boolean;
  favorites: FavoriteItem[];
  history: ToolHistoryItem[];
  savedResults: SavedResultItem[];
  projects: ProjectItem[];
  isAdmin: boolean;
  guestPrompt: GuestPromptState | null;
  dismissGuestPrompt: () => void;
  triggerGuestNudge: (message: string) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (e: string, p: string) => Promise<void>;
  signUpWithEmail: (name: string, e: string, p: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  toggleFavorite: (tool: { id: string; slug: string; name: string }) => Promise<boolean>;
  isFavorite: (toolId: string) => boolean;
  recordToolUsage: (tool: { id: string; slug: string; name: string }) => Promise<void>;
  clearHistory: () => Promise<void>;
  saveResult: (item: { toolId: string; toolSlug: string; title: string; content: string; category?: string; projectId?: string }) => Promise<void>;
  deleteResult: (id: string) => Promise<void>;
  createProject: (name: string, description: string, targetNiche?: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  syncLocalDataToCloud: () => Promise<void>;
}

const STORAGE_KEYS = {
  FAVORITES: 'creatorgrow_favorites_v3',
  HISTORY: 'creatorgrow_history_v3',
  SAVED_RESULTS: 'creatorgrow_saved_results_v3',
  PROJECTS: 'creatorgrow_projects_v3',
  PROFILE: 'creatorgrow_profile_v3'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestPrompt, setGuestPrompt] = useState<GuestPromptState | null>(null);

  // In-memory / local state (pre-populated from localStorage for guests)
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [history, setHistory] = useState<ToolHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedResults, setSavedResults] = useState<SavedResultItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_RESULTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const isLoggedIn = !!currentUser;
  const isAdmin = profile?.role === 'admin' || currentUser?.email === 'rock.arzoon@gmail.com';

  const dismissGuestPrompt = useCallback(() => {
    setGuestPrompt(null);
  }, []);

  const triggerGuestNudge = useCallback((message: string) => {
    setGuestPrompt({
      show: true,
      message,
      actionText: 'Sign In to Sync',
      actionLink: '/login'
    });
  }, []);

  // Save guest data to localStorage whenever it changes while not logged in
  useEffect(() => {
    if (!currentUser) {
      try {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      } catch (e) {
        console.warn('Failed to persist favorites locally', e);
      }
    }
  }, [favorites, currentUser]);

  useEffect(() => {
    if (!currentUser) {
      try {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
      } catch (e) {
        console.warn('Failed to persist history locally', e);
      }
    }
  }, [history, currentUser]);

  useEffect(() => {
    if (!currentUser) {
      try {
        localStorage.setItem(STORAGE_KEYS.SAVED_RESULTS, JSON.stringify(savedResults));
      } catch (e) {
        console.warn('Failed to persist results locally', e);
      }
    }
  }, [savedResults, currentUser]);

  useEffect(() => {
    if (!currentUser) {
      try {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      } catch (e) {
        console.warn('Failed to persist projects locally', e);
      }
    }
  }, [projects, currentUser]);

  // Merge & sync local guest data to Firestore cloud account
  const syncLocalDataToCloud = useCallback(async () => {
    if (!currentUser) return;
    const uid = currentUser.uid;

    try {
      // 1. Sync local favorites to Firestore
      const localFavsRaw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (localFavsRaw) {
        const localFavs: FavoriteItem[] = JSON.parse(localFavsRaw);
        for (const fav of localFavs) {
          const docId = `fav_${fav.toolId.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
          await setDoc(doc(db, 'users', uid, 'favorites', docId), {
            id: docId,
            userId: uid,
            toolId: fav.toolId,
            toolSlug: fav.toolSlug,
            toolName: fav.toolName,
            createdAt: fav.createdAt || new Date().toISOString()
          }, { merge: true });
        }
      }

      // 2. Sync local saved results to Firestore
      const localResultsRaw = localStorage.getItem(STORAGE_KEYS.SAVED_RESULTS);
      if (localResultsRaw) {
        const localResults: SavedResultItem[] = JSON.parse(localResultsRaw);
        for (const res of localResults) {
          const cleanDocId = res.id.startsWith('save_') ? res.id : `save_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
          await setDoc(doc(db, 'users', uid, 'savedResults', cleanDocId), {
            id: cleanDocId,
            userId: uid,
            toolId: res.toolId,
            toolSlug: res.toolSlug,
            title: res.title,
            content: res.content,
            category: res.category || 'General',
            createdAt: res.createdAt || new Date().toISOString()
          }, { merge: true });
        }
      }
    } catch (err) {
      console.warn('Background sync notice:', err);
    }
  }, [currentUser]);

  // Load Firestore cloud data when an authenticated user logs in
  const loadCloudUserData = useCallback(async (fbUser: FirebaseUser) => {
    const uid = fbUser.uid;
    const isUserAdmin = fbUser.email === 'rock.arzoon@gmail.com';

    try {
      // 1. Fetch user profile from Firestore
      const userDocRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;
        setProfile({
          ...data,
          role: isUserAdmin ? 'admin' : (data.role || 'user')
        });
      } else {
        // Create initial profile
        const initialProfile: UserProfile = {
          id: uid,
          name: fbUser.displayName || 'Creator',
          email: fbUser.email || '',
          avatarUrl: fbUser.photoURL || '',
          preferredNiche: 'Tech & YouTube Tools',
          preferredLanguage: 'English',
          channelName: '',
          targetAudience: 'YouTube Viewers & Creators',
          toneOfVoice: 'Conversational & Engaging',
          subscribersGoal: 1000,
          role: isUserAdmin ? 'admin' : 'user',
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, initialProfile);
        setProfile(initialProfile);
      }

      // 2. Fetch Favorites from Firestore
      const favsSnap = await getDocs(collection(db, 'users', uid, 'favorites'));
      const cloudFavs = favsSnap.docs.map(d => ({ id: d.id, ...d.data() } as FavoriteItem));

      // Merge with any guest favorites
      const localFavsRaw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      const localFavs: FavoriteItem[] = localFavsRaw ? JSON.parse(localFavsRaw) : [];
      const combinedFavsMap = new Map<string, FavoriteItem>();
      cloudFavs.forEach(f => combinedFavsMap.set(f.toolId, f));
      localFavs.forEach(f => {
        if (!combinedFavsMap.has(f.toolId)) {
          combinedFavsMap.set(f.toolId, { ...f, userId: uid });
        }
      });
      setFavorites(Array.from(combinedFavsMap.values()));

      // 3. Fetch History
      const histSnap = await getDocs(collection(db, 'users', uid, 'history'));
      const cloudHist = histSnap.docs
        .map(d => ({ id: d.id, ...d.data() } as ToolHistoryItem))
        .sort((a, b) => new Date(b.usedAt).getTime() - new Date(a.usedAt).getTime());
      if (cloudHist.length > 0) {
        setHistory(cloudHist.slice(0, 25));
      }

      // 4. Fetch Saved Results
      const savedSnap = await getDocs(collection(db, 'users', uid, 'savedResults'));
      const cloudSaved = savedSnap.docs
        .map(d => ({ id: d.id, ...d.data() } as SavedResultItem))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      // Merge local saved results
      const localSavedRaw = localStorage.getItem(STORAGE_KEYS.SAVED_RESULTS);
      const localSaved: SavedResultItem[] = localSavedRaw ? JSON.parse(localSavedRaw) : [];
      const savedIds = new Set(cloudSaved.map(s => s.id));
      const mergedSaved = [...cloudSaved];
      localSaved.forEach(s => {
        if (!savedIds.has(s.id)) {
          mergedSaved.push({ ...s, userId: uid });
        }
      });
      setSavedResults(mergedSaved);

      // 5. Fetch Projects
      const projSnap = await getDocs(collection(db, 'users', uid, 'projects'));
      const cloudProjects = projSnap.docs
        .map(d => ({ id: d.id, ...d.data() } as ProjectItem))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      if (cloudProjects.length > 0) {
        setProjects(cloudProjects);
      }

      // Trigger automatic background sync of any previously unsaved guest records
      setTimeout(() => {
        syncLocalDataToCloud();
      }, 500);

    } catch (error) {
      console.warn('Notice loading Firestore cloud records:', error);
    }
  }, [syncLocalDataToCloud]);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      if (fbUser) {
        setCurrentUser(fbUser);
        await loadCloudUserData(fbUser);
      } else {
        setCurrentUser(null);
        setProfile(null);
        // Load localStorage for guest mode
        try {
          const storedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
          if (storedFavs) setFavorites(JSON.parse(storedFavs));
          const storedSaved = localStorage.getItem(STORAGE_KEYS.SAVED_RESULTS);
          if (storedSaved) setSavedResults(JSON.parse(storedSaved));
          const storedHist = localStorage.getItem(STORAGE_KEYS.HISTORY);
          if (storedHist) setHistory(JSON.parse(storedHist));
          const storedProj = localStorage.getItem(STORAGE_KEYS.PROJECTS);
          if (storedProj) setProjects(JSON.parse(storedProj));
        } catch {}
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loadCloudUserData]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      throw err;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (name: string, email: string, pass: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      await updateProfile(cred.user, { displayName: name });
      const isUserAdmin = email === 'rock.arzoon@gmail.com';
      const newProfile: UserProfile = {
        id: cred.user.uid,
        name,
        email,
        avatarUrl: '',
        preferredNiche: 'Tech & YouTube Tools',
        preferredLanguage: 'English',
        channelName: '',
        targetAudience: 'YouTube Viewers & Creators',
        toneOfVoice: 'Conversational & Engaging',
        subscribersGoal: 1000,
        role: isUserAdmin ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', cred.user.uid), newProfile);
      setProfile(newProfile);
    }
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.warn(e);
    }
    setCurrentUser(null);
    setProfile(null);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!profile && !currentUser) return;

    const updated = {
      ...(profile || {
        id: currentUser?.uid || 'guest',
        name: currentUser?.displayName || 'Creator',
        email: currentUser?.email || '',
        preferredNiche: 'Tech & YouTube Tools',
        preferredLanguage: 'English',
        role: 'user' as const,
        createdAt: new Date().toISOString()
      }),
      ...data,
      updatedAt: new Date().toISOString()
    };

    setProfile(updated);

    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), updated, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
      }
    }
  };

  const isFavorite = (toolId: string) => {
    return favorites.some(f => f.toolId === toolId);
  };

  const toggleFavorite = async (tool: { id: string; slug: string; name: string }): Promise<boolean> => {
    const isCurrentlyFav = favorites.some(f => f.toolId === tool.id);

    if (isCurrentlyFav) {
      // Remove from favorites
      setFavorites(prev => prev.filter(f => f.toolId !== tool.id));

      if (currentUser) {
        const cleanDocId = `fav_${tool.id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
        try {
          await deleteDoc(doc(db, 'users', currentUser.uid, 'favorites', cleanDocId));
        } catch (err) {
          console.warn('Error removing cloud favorite:', err);
        }
      }
      return false;
    } else {
      // Add to favorites
      const cleanDocId = `fav_${tool.id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
      const newFav: FavoriteItem = {
        id: cleanDocId,
        userId: currentUser?.uid || 'guest',
        toolId: tool.id,
        toolSlug: tool.slug,
        toolName: tool.name,
        createdAt: new Date().toISOString()
      };

      setFavorites(prev => [newFav, ...prev]);

      if (currentUser) {
        try {
          await setDoc(doc(db, 'users', currentUser.uid, 'favorites', cleanDocId), newFav);
        } catch (err) {
          console.warn('Error saving cloud favorite:', err);
        }
      } else {
        // Friendly nudge for guest user
        setGuestPrompt({
          show: true,
          message: `Pinned "${tool.name}" to your browser! Sign in to sync your favorite tools across all your devices.`,
          actionText: 'Sign In to Sync',
          actionLink: '/login'
        });
      }

      return true;
    }
  };

  const recordToolUsage = async (tool: { id: string; slug: string; name: string }) => {
    const cleanDocId = `hist_${tool.id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    const item: ToolHistoryItem = {
      id: cleanDocId,
      userId: currentUser?.uid || 'guest',
      toolId: tool.id,
      toolSlug: tool.slug,
      toolName: tool.name,
      usedAt: new Date().toISOString()
    };

    setHistory(prev => [item, ...prev.filter(h => h.toolId !== tool.id)].slice(0, 25));

    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid, 'history', cleanDocId), item);
      } catch (err) {
        console.warn('Error saving tool history:', err);
      }
    }
  };

  const clearHistory = async () => {
    setHistory([]);
    if (currentUser) {
      try {
        const snap = await getDocs(collection(db, 'users', currentUser.uid, 'history'));
        await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
      } catch (err) {
        console.warn('Error clearing history:', err);
      }
    }
  };

  const saveResult = async (item: { 
    toolId: string; 
    toolSlug: string; 
    title: string; 
    content: string; 
    category?: string; 
    projectId?: string 
  }) => {
    const newDocId = `save_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const saved: SavedResultItem = {
      id: newDocId,
      userId: currentUser?.uid || 'guest',
      toolId: item.toolId,
      toolSlug: item.toolSlug,
      title: item.title,
      content: item.content,
      category: item.category || 'General',
      projectId: item.projectId || '',
      createdAt: new Date().toISOString()
    };

    setSavedResults(prev => [saved, ...prev]);

    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid, 'savedResults', newDocId), saved);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `users/${currentUser.uid}/savedResults/${newDocId}`);
      }
    } else {
      // Guest prompt
      setGuestPrompt({
        show: true,
        message: 'Saved output to your local browser! Create a free account to back up scripts and sync across devices.',
        actionText: 'Create Free Account',
        actionLink: '/signup'
      });
    }
  };

  const deleteResult = async (id: string) => {
    setSavedResults(prev => prev.filter(r => r.id !== id));
    if (currentUser) {
      try {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'savedResults', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `users/${currentUser.uid}/savedResults/${id}`);
      }
    }
  };

  const createProject = async (name: string, description: string, targetNiche: string = 'General') => {
    const newId = `proj_${Date.now()}`;
    const proj: ProjectItem = {
      id: newId,
      userId: currentUser?.uid || 'guest',
      name,
      description,
      targetNiche,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects(prev => [proj, ...prev]);

    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid, 'projects', newId), proj);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `users/${currentUser.uid}/projects/${newId}`);
      }
    } else {
      setGuestPrompt({
        show: true,
        message: 'Project created locally! Sign in to sync your multi-video campaigns to the cloud.',
        actionText: 'Sign In',
        actionLink: '/login'
      });
    }
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (currentUser) {
      try {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'projects', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `users/${currentUser.uid}/projects/${id}`);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      profile,
      loading,
      isLoggedIn,
      favorites,
      history,
      savedResults,
      projects,
      isAdmin,
      guestPrompt,
      dismissGuestPrompt,
      triggerGuestNudge,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      logout,
      updateUserProfile,
      toggleFavorite,
      isFavorite,
      recordToolUsage,
      clearHistory,
      saveResult,
      deleteResult,
      createProject,
      deleteProject,
      syncLocalDataToCloud
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
