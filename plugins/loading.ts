export default defineNuxtPlugin((nuxtApp) => {
  // Grab the loading indicator instance
  const { start, finish } = useLoadingIndicator({
    duration: 2000,
    throttle: 220,
  });
  // force start/finish on client-side
  nuxtApp.hook("page:start", () => {
    start({ force: true });
  });
  nuxtApp.hook("page:finish", () => {
    finish({ force: true });
  });
});
