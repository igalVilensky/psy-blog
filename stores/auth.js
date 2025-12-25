import { defineStore } from "pinia";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getUserProfile } from "~/utils/firebase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: true,
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
  },
});
