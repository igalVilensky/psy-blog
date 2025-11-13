// middleware/locale.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const supported = ["ru", "en"];
  const lang = Array.isArray(to.params.lang)
    ? to.params.lang[0]
    : to.params.lang;

  // If the first route segment looks like a language code but isn’t supported,
  // redirect to Russian version with the same path.
  if (lang && !supported.includes(lang)) {
    return navigateTo("/ru" + to.fullPath.replace(/^\/[^/]+/, ""));
  }

  // If there's no language segment at all, redirect to default /ru
  if (!lang) {
    // return navigateTo("/ru" + to.fullPath);
  }
});
