export default defineNuxtPlugin((nuxtApp) => {
  // Grab the loading indicator instance
  const { start, finish } = useLoadingIndicator({
    duration: 2000,
    throttle: 100,
  });
  // force start/finish on client-side
  nuxtApp.hook("page:loading:start", () => {
    start({ force: true });
  });
  nuxtApp.hook("page:loading:end", () => {
    finish({ force: true });
  });
});
