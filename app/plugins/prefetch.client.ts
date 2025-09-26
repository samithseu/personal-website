export default defineNuxtPlugin((nuxtApp) => {
  const projectsPrefetch = useAsyncData(
    "projects",
    () => $fetch("/api/projects"),
    { lazy: true }
  );
  const certificatesPrefetch = useAsyncData(
    "certificates",
    () => fetchingCertificates(),
    { lazy: true }
  );
  // wait until the Nuxt app is fully mounted in the browser, then .execute()
  nuxtApp.hook("app:mounted", () => {
    // kick off both prefetch requests in parallel
    projectsPrefetch.execute().catch((err) => {
      console.warn("[prefetch] /api/projects failed:", err);
    });
    certificatesPrefetch.execute().catch((err) => {
      console.warn("[prefetch] fetching certificates failed:", err);
    });
  });
});
