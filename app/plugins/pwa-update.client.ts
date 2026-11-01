export default defineNuxtPlugin(() => {
  if (!import.meta.client || !("serviceWorker" in navigator)) {
    return;
  }

  // Track if this browsing context already had an active service worker controller upon load
  let hadController = Boolean(navigator.serviceWorker.controller);
  let isRefreshing = false;

  // Listen for the controllerchange event fired when a new Service Worker activates and claims clients
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // If the page had no controller initially, this was the first install - do not reload
    if (!hadController) {
      hadController = true;
      return;
    }

    if (isRefreshing) {
      return;
    }

    // Guard against reload loops across deployments
    const lastRefresh = sessionStorage.getItem("pwa_last_refresh");
    const now = Date.now();
    if (lastRefresh && now - Number(lastRefresh) < 10000) {
      return;
    }

    isRefreshing = true;
    sessionStorage.setItem("pwa_last_refresh", String(now));
    window.location.reload();
  });

  // Query /sw.js for updates when the user returns to the tab or focuses the window
  const checkServiceWorkerUpdate = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
      }
    } catch {
      // Ignore update errors (e.g. offline)
    }
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      checkServiceWorkerUpdate();
    }
  });

  window.addEventListener("focus", () => {
    checkServiceWorkerUpdate();
  });
});
