// stores/auth.js
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
      const auth = getAuth();

      return new Promise((resolve) => {
        onAuthStateChanged(
          auth,
          async (currentUser) => {
            if (currentUser) {
              try {
                const userProfile = await getUserProfile(currentUser.uid);
                this.user = {
                  ...userProfile,
                  uid: currentUser.uid, // Add the uid to the user object
                };
              } catch (err) {
                this.error = "Failed to load user profile";
                console.error(err);
              }
            } else {
              this.user = null;
            }
            this.loading = false;
            resolve(); // Resolve the promise after the auth state is set
          },
          (error) => {
            this.error = "Error initializing authentication";
            this.loading = false;
            console.error(error);
            resolve(); // Ensure the promise resolves even if there's an error
          }
        );
      });
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
        this.user.profile = userProfile; // Attach profile after login
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
