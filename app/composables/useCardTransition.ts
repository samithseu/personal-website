let activeFilteringTransitions = 0;

/**
 * Safely executes a state change wrapped in View Transition for card filtering,
 * isolating animations to cards only while freezing root, subtitles, and headers.
 */
export function useCardTransition() {
  function applyCardTransition(updateFn: () => void) {
    if (
      import.meta.client &&
      "startViewTransition" in document &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    ) {
      activeFilteringTransitions++;
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
              document.documentElement.classList.remove("filtering-cards");
            }
          });
      } catch {
        activeFilteringTransitions--;
        if (activeFilteringTransitions <= 0) {
          activeFilteringTransitions = 0;
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
  };
}
