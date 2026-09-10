<script lang="ts" setup>
const props = defineProps<{
  headline?: string;
  title?: string;
  desc?: string;
  v?: string | number;
}>();

const pageName = computed(() => {
  if (!props.title) return "home";
  if (props.title.includes("404")) return "404";
  const parts = props.title.split("-");
  const last = parts[parts.length - 1]?.trim();
  return last ? last.toLowerCase() : "home";
});
</script>

<template>
  <div
    class="w-full h-full bg-[#09090b] text-white flex flex-col items-center justify-center px-16 py-8 relative overflow-hidden"
  >
    <!-- Code Terminal Window: Identical Aspect Ratio & Vibe to Hero Section CodeTerminal.vue -->
    <div
      class="w-auto rounded-2xl bg-[#121215] flex flex-col overflow-hidden font-mono text-xs"
      style="border: 1px solid hsl(var(--border))"
    >
      <!-- Window Header (Identical to CodeTerminal.vue) -->
      <div class="flex items-center justify-between px-6 py-4 bg-muted/20">
        <!-- Traffic dots & Active Tab -->
        <div class="flex items-center gap-5">
          <div class="flex items-center gap-2.5">
            <span class="w-4.5 h-4.5 rounded-full bg-red-500/80 inline-block" />
            <span
              class="w-4.5 h-4.5 rounded-full bg-yellow-500/80 inline-block"
            />
            <span
              class="w-4.5 h-4.5 rounded-full bg-green-500/80 inline-block"
            />
          </div>
          <div
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg bg-[#0b0b10]/70 text-[12px] text-zinc-200 font-normal"
            style="border: 1px solid hsl(var(--border)); border-bottom: none"
          >
            <!-- tabler:code icon -->
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-zinc-400"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span class="text-base">{{ pageName }}.config.ts</span>
          </div>
        </div>

        <!-- Copy Action (Identical to CodeTerminal.vue) -->
        <div
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] text-zinc-400 font-mono"
        >
          <!-- tabler:copy icon -->
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          <span class="text-base">Copy</span>
        </div>
      </div>

      <!-- Code Body (Identical syntax tokens to CodeTerminal.vue) -->
      <div
        id="code-body"
        class="px-6 py-8 leading-relaxed bg-[#0b0b10]/70 flex flex-col"
        style="
          border-top: 1px solid hsl(var(--border));
          border-bottom: 1px solid hsl(var(--border));
        "
      >
        <!-- Line 1: import { definePage } from '@samith/config' -->
        <div class="flex items-stretch text-2xl">
          <span
            style="border-right: 1px solid hsl(var(--border))"
            class="w-8 shrink-0 text-right pr-3 text-zinc-600 leading-relaxed"
            >1</span
          >
          <div class="pl-4 flex items-center leading-relaxed">
            <span class="text-purple-400 mr-1.5">import</span>
            <span class="text-zinc-300 mr-1.5">{</span>
            <span class="text-sky-400 mr-1.5">definePage</span>
            <span class="text-zinc-300 mr-1.5">}</span>
            <span class="text-purple-400 mr-1.5">from</span>
            <span class="text-amber-300">'@samith/config'</span>;
          </div>
        </div>

        <!-- Line 2: empty line -->
        <div class="flex items-stretch text-2xl">
          <span
            style="border-right: 1px solid hsl(var(--border))"
            class="w-8 shrink-0 text-right pr-3 text-zinc-600 leading-relaxed"
            >2</span
          >
          <div class="pl-4 leading-relaxed">&nbsp;</div>
        </div>

        <!-- Line 3: export default definePage({ -->
        <div class="flex items-stretch text-2xl">
          <span
            style="border-right: 1px solid hsl(var(--border))"
            class="w-8 shrink-0 text-right pr-3 text-zinc-600 leading-relaxed"
            >3</span
          >
          <div class="pl-4 flex items-center leading-relaxed">
            <span class="text-purple-400 mr-1.5">export default</span>
            <span class="text-sky-400">definePage</span>
            <span class="text-zinc-300">({</span>
          </div>
        </div>

        <!-- Line 4: title: "...", -->
        <div class="flex items-stretch text-2xl">
          <span
            style="border-right: 1px solid hsl(var(--border))"
            class="w-8 shrink-0 text-right pr-3 text-zinc-600 leading-relaxed"
            >4</span
          >
          <div class="pl-12 flex items-center leading-relaxed">
            <span class="text-emerald-400">title</span>
            <span class="text-zinc-300 mr-2">:</span>
            <span class="text-amber-300">"{{ title }}"</span>
            <span class="text-zinc-300">,</span>
          </div>
        </div>

        <!-- Line 5: content: "...", (description with word wrap) -->
        <div class="flex items-stretch text-2xl">
          <span
            style="border-right: 1px solid hsl(var(--border))"
            class="w-8 shrink-0 text-right pr-3 pt-0.5 text-zinc-600 leading-relaxed"
            >5</span
          >
          <div class="pl-12 flex items-start max-w-3xl leading-relaxed">
            <span class="text-amber-300 leading-relaxed">
              <span class="text-emerald-400 shrink-0">content</span>
              <span class="text-zinc-300 mr-2 shrink-0">:</span>
              <span>&nbsp;"{{ desc }}"</span
              ><span class="text-zinc-300">,</span>
            </span>
          </div>
        </div>

        <!-- Line 6: }) with amber cursor -->
        <div class="flex items-stretch text-2xl">
          <span
            style="border-right: 1px solid hsl(var(--border))"
            class="w-8 shrink-0 text-right pr-3 text-zinc-600 leading-relaxed"
            >6</span
          >
          <div class="pl-4 flex items-center leading-relaxed">
            <span class="text-zinc-300">})</span>
          </div>
        </div>
      </div>

      <!-- Status Bar (Identical to CodeTerminal.vue) -->
      <div
        class="flex items-center justify-between px-6 py-4 bg-zinc-900/30 text-[11px] text-zinc-400"
      >
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1.5 text-zinc-300 text-base">
            <!-- tabler:git-branch icon -->
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            <span>main</span>
          </span>
          <span class="text-zinc-700">|</span>
          <span class="inline-flex items-center gap-1.5 text-zinc-400 text-lg">
            <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            0 errors
          </span>
        </div>
        <span class="font-mono text-zinc-500 text-base">TypeScript 6.7</span>
      </div>
    </div>
  </div>
</template>
