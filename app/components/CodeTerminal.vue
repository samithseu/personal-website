<script lang="ts" setup>
const copied = ref(false);

const rawCode = `import { defineDeveloper } from '@samith/config'

export default defineDeveloper({
  name: "Samith Seu",
  title: "Frontend & Interface Engineer",
  location: "Chbarmon, Cambodia",
  status: "Available for new projects",
})`;

async function copyCode() {
  try {
    await navigator.clipboard.writeText(rawCode);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy code", err);
  }
}
</script>

<template>
  <div
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
        ><code><span class="text-purple-600 dark:text-purple-400">import</span> { <span class="text-sky-600 dark:text-sky-400">defineDeveloper</span> } <span class="text-purple-600 dark:text-purple-400">from</span> <span class="text-amber-600 dark:text-amber-300">'@samith/config'</span>

<span class="text-purple-600 dark:text-purple-400">export default</span> <span class="text-sky-600 dark:text-sky-400">defineDeveloper</span>({
  <span class="text-emerald-600 dark:text-emerald-400">name</span>: <span class="text-amber-600 dark:text-amber-300">"Samith Seu"</span>,
  <span class="text-emerald-600 dark:text-emerald-400">title</span>: <span class="text-amber-600 dark:text-amber-300">"Frontend &amp; Interface Engineer"</span>,
  <span class="text-emerald-600 dark:text-emerald-400">location</span>: <span class="text-amber-600 dark:text-amber-300">"Kampong Speu, Cambodia"</span>,
  <span class="text-emerald-600 dark:text-emerald-400">status</span>: <span class="text-amber-600 dark:text-amber-300">"Wasting tokens..."</span>,
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
