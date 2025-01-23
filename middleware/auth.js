import { getAuth, signOut } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = getAuth();
  const user = auth.currentUser; // Get the currently logged-in user

  if (!user) {
    // If no user is logged in, redirect them to the login page
    return navigateTo("/login");
  }

  // if (user && !user.emailVerified && to.path !== "/verify-email") {
  //   await signOut(auth);
  //   return navigateTo("/verify-email");
  // }

  // If the user is logged in and their email is verified, allow access to the route
});
