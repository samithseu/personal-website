<script lang="ts" setup>
const { allContacts } = useContacts();
const desc =
  "Welcome to my digital space. Explore my work, read the blog, and learn about my journey as a developer.";
useSeo({
  title: "Home",
  description: desc,
});

defineOgImage("EachPage.takumi", {
  headline: "personal website",
  title: "Samith Seu - Home",
  desc: desc,
});

const emailCopied = ref(false);
async function copyEmail() {
  try {
    await navigator.clipboard.writeText("contact@samith.dev");
    emailCopied.value = true;
    setTimeout(() => {
      emailCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy email", err);
  }
}
</script>

<template>
  <div
    class="w-full h-full px-4 py-8 sm:py-12 md:py-16 lg:py-0 prefer:px-0 lg:flex lg:items-center min-h-[calc(100vh-10rem)]"
  >
    <div class="max-w-prefer mx-auto w-full">
      <div
        class="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 sm:gap-10 lg:gap-10"
      >
        <!-- left side (compact & refined, centered when stacked in 2 rows) -->
        <div
          class="space-y-5 sm:space-y-6 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl mx-auto lg:max-w-none w-full"
        >
          <!-- Monospace Code Tag Pill -->
          <div>
            <div
              class="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-3.5 py-1 text-xs font-mono text-muted-foreground backdrop-blur-sm shadow-xs transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              <span class="text-foreground/40 font-semibold" aria-hidden="true"
                >&lt;</span
              >
              <span class="text-foreground font-medium"
                >Frontend &amp; Interface Engineer</span
              >
              <span class="text-foreground/40 font-semibold" aria-hidden="true"
                >/&gt;</span
              >
            </div>
          </div>

          <!-- Headline & Bio Typography -->
          <div class="space-y-3 w-full">
            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]"
            >
              I'm
              <span class="underline decoration-border underline-offset-8"
                >Samith</span
              >,
              <span class="block text-muted-foreground font-semibold mt-1"
                >Web Developer</span
              >
            </h1>
            <p
              class="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1 sm:pt-2 max-w-lg mx-auto lg:mx-0"
            >
              I build websites with modern technologies, specializing in
              crafting responsive and user-friendly interfaces for web
              applications.
            </p>
          </div>

          <!-- CTA actions -->
          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 w-full"
          >
            <NuxtLink
              aria-label="This will go to projects page"
              title="Projects"
              to="/projects"
              class="inline-flex items-center gap-2 h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors shadow-xs"
            >
              <span class="capitalize">my works</span>
              <Icon name="tabler:arrow-right" class="text-base" />
            </NuxtLink>

            <NuxtLink
              aria-label="This will go to about page"
              title="About"
              to="/about"
              class="inline-flex items-center gap-2 h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm font-medium border border-border/60 hover:bg-muted/50 hover:text-foreground text-foreground rounded-md transition-colors capitalize"
            >
              about me
            </NuxtLink>

            <!-- Quick-Copy Email Pill Button -->
            <button
              type="button"
              @click="copyEmail"
              title="Click to copy email address"
              aria-label="Copy email address"
              class="inline-flex items-center gap-1.5 h-9 sm:h-10 px-3 text-xs font-mono text-muted-foreground hover:text-foreground border border-border/40 hover:border-border rounded-md bg-background/50 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <Icon
                :name="emailCopied ? 'tabler:check' : 'tabler:copy'"
                class="size-3.5 mr-0.5"
              />
              <span>{{ emailCopied ? "copied!" : "contact@samith.dev" }}</span>
            </button>
          </div>

          <!-- Social media links -->
          <div
            class="flex items-center justify-center lg:justify-start gap-4 pt-2 w-full"
          >
            <NuxtLink
              v-for="contact in allContacts"
              :key="contact.name"
              :to="contact.link"
              :title="contact.name"
              :aria-label="`This is Samith's ${contact.name}`"
              external
              class="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon :name="contact.iconName" class="text-xl" />
            </NuxtLink>
          </div>
        </div>

        <!-- right side: CodeTerminal (wider & prominent, centered when stacked in 2 rows) -->
        <div
          class="w-full lg:col-span-6 flex justify-center lg:justify-end max-w-xl mx-auto lg:max-w-none"
        >
          <LazyCodeTerminal />
        </div>
      </div>
    </div>
  </div>
</template>
