export const useFirestore = () => {
  if (!process.client) return null;

  // Your existing firestore initialization
  const { $firestore } = useNuxtApp();
  return $firestore;
};
