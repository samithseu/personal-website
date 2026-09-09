let activeFilteringTransitions = 0;
const isCardTransitioning = ref(false);

/**
 * Safely executes a state change wrapped in View Transition for card filtering,
 * isolating animations strictly to cards while freezing root, subtitles, and headers.
 * Exposes `isCardTransitioning` so individual card items only bind `viewTransitionName`
 * during active filtering, preventing GPU snapshot explosion during cross-page navigation.
 */
export function useCardTransition() {
  function applyCardTransition(updateFn: () => void) {
    if (
      import.meta.client &&
      "startViewTransition" in document &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    ) {
      activeFilteringTransitions++;
      isCardTransitioning.value = true;
      document.documentElement.classList.add("filtering-cards");

      try {
        const transition = document.startViewTransition(async () => {
          updateFn();
          await nextTick();
        });

        transition.finished
          .catch(() => {})
          .finally(() => {
            activeFilteringTransitions--;
            if (activeFilteringTransitions <= 0) {
              activeFilteringTransitions = 0;
              isCardTransitioning.value = false;
              document.documentElement.classList.remove("filtering-cards");
            }
          });
      } catch {
        activeFilteringTransitions--;
        if (activeFilteringTransitions <= 0) {
          activeFilteringTransitions = 0;
          isCardTransitioning.value = false;
          document.documentElement.classList.remove("filtering-cards");
        }
        updateFn();
      }
    } else {
      updateFn();
    }
  }

  return {
    applyCardTransition,
    isCardTransitioning,
  };
}
