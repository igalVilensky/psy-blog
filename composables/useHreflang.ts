// composables/useHreflang.ts
export const useHreflang = (path: string) => {
  const config = useRuntimeConfig();

  useHead({
    link: [
      {
        rel: "alternate",
        hreflang: "ru",
        href: `${config.public.siteUrl}/ru${path}`,
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: `${config.public.siteUrl}/en${path}`,
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: `${config.public.siteUrl}/ru${path}`,
      },
    ],
  });
};
