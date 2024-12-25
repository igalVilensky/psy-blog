import { getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = getAuth();
  const user = auth.currentUser; // Get the currently logged-in user

  if (!user) {
    // If no user is logged in, redirect them to the login page
    return navigateTo("/login");
  }
});
