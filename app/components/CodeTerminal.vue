<script lang="ts" setup>
const copied = ref(false);

const STATUS_DISPLAY_DURATION_MS = 4000; // Duration each status stays visible on screen
const CHAR_TYPE_SPEED_MS = 65; // Character typing speed (with natural variation)
const CHAR_DELETE_SPEED_MS = 35; // Character deletion speed
const WORD_STEP_SPEED_MS = 200; // Word-by-word step speed for reduced motion
const PAUSE_BEFORE_NEXT_MS = 350; // Brief pause before typing next status

const statuses = [
  "Wasting tokens",
  "Copying from Stack Overflow",
  "Centering a div",
  "Prompting until it builds",
  "Blaming the cache",
  "Debugging in production",
  "Waiting for npm install",
  "Converting coffee into bugs",
  "It worked on my machine",
  "git push --force and praying",
];

const currentIndex = ref(0);
const displayText = ref(statuses[0]);

let timer: ReturnType<typeof setTimeout> | null = null;

const rawCode = computed(
  () => `import { defineDeveloper } from '@samith/config'

export default defineDeveloper({
  name: "Samith Seu",
  title: "Frontend & Interface Engineer",
  location: "Kampong Speu, Cambodia",
  status: "${displayText.value}",
})`,
);

async function copyCode() {
  try {
    await navigator.clipboard.writeText(rawCode.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy code", err);
  }
}

const terminalRoot = ref<HTMLElement | null>(null);

let isDeleting = false;
let charIndex = statuses[0]!.length;
let wordIndex = statuses[0]!.split(/\s+/).length;
let isRunning = false;
let isVisible = true;
let isPageActive = true;
let observer: IntersectionObserver | null = null;

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function runCycle() {
  if (!isRunning || !isVisible || !isPageActive) return;

  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isReduced = media.matches;
  const currentPhrase = statuses[currentIndex.value];

  if (isReduced) {
    const words = currentPhrase!.split(/\s+/);
    if (!isDeleting) {
      if (wordIndex < words.length) {
        wordIndex++;
        displayText.value = words.slice(0, wordIndex).join(" ");
        timer = setTimeout(runCycle, WORD_STEP_SPEED_MS);
      } else {
        isDeleting = true;
        timer = setTimeout(runCycle, STATUS_DISPLAY_DURATION_MS);
      }
    } else {
      if (wordIndex > 0) {
        wordIndex--;
        displayText.value = words.slice(0, wordIndex).join(" ");
        timer = setTimeout(runCycle, WORD_STEP_SPEED_MS);
      } else {
        isDeleting = false;
        currentIndex.value = (currentIndex.value + 1) % statuses.length;
        wordIndex = 0;
        timer = setTimeout(runCycle, PAUSE_BEFORE_NEXT_MS);
      }
    }
  } else {
    if (!isDeleting) {
      if (charIndex < currentPhrase!.length) {
        charIndex++;
        displayText.value = currentPhrase!.slice(0, charIndex);
        const typingDelay =
          CHAR_TYPE_SPEED_MS + (Math.floor(Math.random() * 30) - 15);
        timer = setTimeout(runCycle, Math.max(30, typingDelay));
      } else {
        isDeleting = true;
        timer = setTimeout(runCycle, STATUS_DISPLAY_DURATION_MS);
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
        displayText.value = currentPhrase!.slice(0, charIndex);
        timer = setTimeout(runCycle, CHAR_DELETE_SPEED_MS);
      } else {
        isDeleting = false;
        currentIndex.value = (currentIndex.value + 1) % statuses.length;
        charIndex = 0;
        timer = setTimeout(runCycle, PAUSE_BEFORE_NEXT_MS);
      }
    }
  }
}

function startLoop() {
  if (isRunning) return;
  isRunning = true;
  clearTimer();
  timer = setTimeout(() => {
    isDeleting = true;
    runCycle();
  }, STATUS_DISPLAY_DURATION_MS);
}

function stopLoop() {
  isRunning = false;
  clearTimer();
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopLoop();
  } else if (isVisible && isPageActive) {
    startLoop();
  }
}

onMounted(() => {
  document.addEventListener("visibilitychange", handleVisibilityChange);

  if (terminalRoot.value && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && isPageActive && !document.hidden) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(terminalRoot.value);
  } else {
    startLoop();
  }
});

onActivated(() => {
  isPageActive = true;
  if (isVisible && !document.hidden) {
    startLoop();
  }
});

onDeactivated(() => {
  isPageActive = false;
  stopLoop();
});

onBeforeUnmount(() => {
  stopLoop();
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<template>
  <div
    ref="terminalRoot"
    class="w-full rounded-xl border border-border/80 bg-card/90 backdrop-blur-md shadow-2xl overflow-hidden font-mono text-xs transition-all duration-300 hover:border-border"
  >
    <!-- Window Header -->
    <div
      class="flex items-center justify-between px-3.5 py-2.5 border-b border-border/50 bg-muted/20"
    >
      <!-- Traffic dots & Active Tab -->
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1.5" aria-hidden="true">
          <span class="size-3 rounded-full bg-red-500/80 inline-block"></span>
          <span
            class="size-3 rounded-full bg-yellow-500/80 inline-block"
          ></span>
          <span class="size-3 rounded-full bg-green-500/80 inline-block"></span>
        </div>
        <div
          class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-t-md bg-card border-t border-x border-border/60 text-[11px] text-foreground font-medium"
        >
          <Icon name="tabler:code" class="size-3.5 text-muted-foreground" />
          <span>samith.config.ts</span>
        </div>
      </div>

      <!-- Copy Action -->
      <button
        type="button"
        @click="copyCode"
        aria-label="Copy code snippet"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
      >
        <Icon
          :name="copied ? 'tabler:check' : 'tabler:copy'"
          :class="copied && 'text-green-500'"
          class="size-3.5"
        />
        <span>{{ copied ? "Copied!" : "Copy" }}</span>
      </button>
    </div>

    <!-- Code Body -->
    <div
      class="p-4 sm:p-6 overflow-x-auto leading-relaxed text-[12px] sm:text-[13px] bg-card/50"
    >
      <div class="grid grid-cols-[auto_1fr] gap-x-4">
        <!-- Line numbers -->
        <div
          class="select-none text-muted-foreground/40 text-right pr-2 border-r border-border/40 font-mono"
          aria-hidden="true"
        >
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
        </div>

        <!-- Code lines with syntax tokens -->
        <pre
          class="overflow-x-auto whitespace-pre font-mono space-y-0.5"
        ><code><span class="text-purple-600 dark:text-purple-400">import</span> { <span class="text-sky-600 dark:text-sky-400">defineDeveloper</span> } <span class="text-purple-600 dark:text-purple-400">from</span> <span class="text-amber-600 dark:text-amber-300">'@samith/config'</span>;

<span class="text-purple-600 dark:text-purple-400">export default</span> <span class="text-sky-600 dark:text-sky-400">defineDeveloper</span>({
  <span class="text-emerald-600 dark:text-emerald-400">name</span>: <span class="text-amber-600 dark:text-amber-300">"Samith Seu"</span>,
  <span class="text-emerald-600 dark:text-emerald-400">title</span>: <span class="text-amber-600 dark:text-amber-300">"Frontend &amp; Interface Engineer"</span>,
  <span class="text-emerald-600 dark:text-emerald-400">location</span>: <span class="text-amber-600 dark:text-amber-300">"Kampong Speu, Cambodia"</span>,
  <span class="text-emerald-600 dark:text-emerald-400">status</span>: <span class="text-amber-600 dark:text-amber-300">"<span>{{ displayText }}</span><span class="inline-block w-0.5 h-[1.15em] ml-0.5 align-middle bg-amber-500/60 dark:bg-amber-300/60 rounded-xs animate-cursor-blink" aria-hidden="true" />"</span>,
})</code></pre>
      </div>
    </div>

    <!-- Status Bar -->
    <div
      class="flex items-center justify-between px-3.5 py-1.5 border-t border-border/50 bg-muted/20 text-[11px] text-muted-foreground select-none"
    >
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1">
          <Icon name="tabler:git-branch" class="size-3" />
          main
        </span>
        <span class="text-border" aria-hidden="true">|</span>
        <span class="inline-flex items-center gap-1">
          <span
            class="size-1.5 rounded-full bg-emerald-500 inline-block"
          ></span>
          0 errors
        </span>
      </div>
      <div class="font-mono">TypeScript 6.7</div>
    </div>
  </div>
</template>
