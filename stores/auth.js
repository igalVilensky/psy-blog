import { defineStore } from "pinia";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import { getUserProfile } from "~/utils/firebase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: true,
    googleLoading: false,
  }),

  actions: {
    async initAuth() {
      this.loading = true;
      const auth = getAuth();

      return new Promise((resolve) => {
        onAuthStateChanged(
          auth,
          async (currentUser) => {
            if (currentUser) {
              try {
                // Get the latest token result, including custom claims
                const idTokenResult = await currentUser.getIdTokenResult();
                const userProfile = await getUserProfile(currentUser.uid);

                this.user = {
                  ...userProfile,
                  uid: currentUser.uid,
                  onboardingCompleted: userProfile.onboardingCompleted || false,
                  superAdmin: !!idTokenResult.claims.superAdmin,
                  isCoach: userProfile.role === "coach" || !!idTokenResult.claims.coach,
                  token: idTokenResult.token,
                };
              } catch (err) {
                this.error = "Failed to load user profile";
                console.error(err);
              }
            } else {
              this.user = null;
            }
            this.loading = false;
            resolve();
          },
          (error) => {
            this.error = "Error initializing authentication";
            this.loading = false;
            console.error(error);
            resolve();
          }
        );
      });
    },

    async refreshIdToken() {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const idTokenResult = await currentUser.getIdTokenResult(true); // Force refresh
        if (this.user) {
          this.user.superAdmin = !!idTokenResult.claims.superAdmin;
          this.user.token = idTokenResult.token;
        }
        return idTokenResult;
      }
      return null;
    },

    async fetchUserProfile(userId) {
      try {
        const { getUserProfile } = await import("~/utils/firebase.js");
        return await getUserProfile(userId);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
      }
    },

    async login(email, password) {
      const auth = getAuth();

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        };

        const userProfile = await this.fetchUserProfile(
          userCredential.user.uid
        );
        this.user.profile = userProfile;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    async logout() {
      const auth = getAuth();

      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        console.error("Logout failed:", error);
        throw error;
      }
    },
    async loginWithGoogle() {
      this.googleLoading = true;
      const auth = getAuth();
      const db = getFirestore();

      try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        // Check if user document exists
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // Create new user profile
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "",
            photoURL: user.photoURL || null,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            provider: "google",
            roles: ["user"],
            onboardingCompleted: false,
          });
        } else {
          // Update existing user
          await updateDoc(userRef, {
            lastLogin: serverTimestamp(),
            // photoURL: user.photoURL // Optional: update photo if needed
          });
        }

        // Refresh local user state
        const idTokenResult = await user.getIdTokenResult();
        const userProfile = await this.fetchUserProfile(user.uid);

        this.user = {
          ...userProfile,
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          onboardingCompleted: userProfile?.onboardingCompleted || false,
          superAdmin: !!idTokenResult.claims.superAdmin,
          isCoach: userProfile?.role === "coach" || !!idTokenResult.claims.coach,
          token: idTokenResult.token,
        };

        return { success: true };
      } catch (error) {
        console.error("Google Sign-In Error:", error);
        let errorMessage = "Ошибка при входе через Google.";

        if (error.code === 'auth/popup-closed-by-user') {
          errorMessage = "Вход отменен пользователем.";
        } else if (error.code === 'auth/popup-blocked') {
          errorMessage = "Всплывающее окно заблокировано. Пожалуйста, разрешите всплывающие окна.";
        } else if (error.code === 'auth/account-exists-with-different-credential') {
          errorMessage = "Этот email уже зарегистрирован другим способом. Пожалуйста, войдите через email/пароль.";
        }

        throw new Error(errorMessage);
      } finally {
        this.googleLoading = false;
      }
    },
  },
});
