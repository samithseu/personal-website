<script lang="ts" setup>
const allLinks = ref<Array<{ name: string; path: string }>>([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Certificates", path: "/certificates" },
  { name: "Blogs", path: "/blogs" },
]);
// for navlink modal
const open = ref<boolean>(false);

// set the body pointer-events to none when the modal value changes to open
watch(open, () => {
  document.body.style.pointerEvents = open.value ? "none" : "auto";
  document.body.style.overflowY = open.value ? "hidden" : "auto";
});

const handleClickOutside = (e: any) => {
  if (open.value && e.target.id !== "teleports") {
    open.value = false;
  }
};
</script>

<template>
  <header
    class="bg-dark/70 w-full border-b border-zinc-50/10 py-4 px-4 prefer:px-0 sticky top-0 left-0 z-50 backdrop-blur-sm h-fit"
  >
    <nav class="max-w-prefer mx-auto flex items-center justify-between">
      <!-- logo -->
      <NuxtLink
        to="/"
        class="text-xl font-semibold uppercase flex items-center gap-1 transition duration-200 hover:text-primary"
      >
        <Icon name="ic:round-code" class="text-primary text-3xl" />
        samithseu
      </NuxtLink>

      <!-- nav links -->
      <ul class="hidden md:flex items-center gap-6 *:capitalize *:font-medium">
        <li v-for="link in allLinks" :key="link.name">
          <NuxtLink
            class="transition-colors duration-200 hover:text-primary"
            active-class="text-primary"
            :to="link.path"
            >{{ link.name }}
          </NuxtLink>
        </li>
      </ul>

      <!-- resume button -->
      <div class="flex items-center gap-2">
        <NuxtLink
          class="grid size-7 md:size-8 border border-zinc-50/20 place-items-center rounded-full transition-colors duration-200 hover:bg-zinc-50/20 hover:border-transparent"
          to="https://resume.samith.info"
          target="_blank"
        >
          <Icon name="ic:baseline-attach-file" class="" />
        </NuxtLink>

        <!-- burger menu trigger button -->
        <button
          @click="open = true"
          class="md:hidden size-7 md:size-8 border border-zinc-50/20 grid place-items-center rounded-full transition-colors duration-200 hover:bg-zinc-50/20 hover:border-transparent cursor-pointer"
        >
          <Icon name="ic:round-menu" class="text-xl" />
        </button>
      </div>

      <Teleport to="#teleports">
        <Transition name="element">
          <!-- make clicking outside below element to close the modal -->
          <div
            v-if="open"
            @click="handleClickOutside"
            class="overflow-hidden w-full h-max z-50 bg-dark/70 backdrop-blur-sm fixed bottom-0 left-0 py-4 px-6 border border-zinc-50/20 rounded-2xl rounded-bl-none rounded-br-none border-b-0 !pointer-events-auto"
          >
            <ul
              class="flex flex-col items-center gap-4 *:capitalize *:font-medium *:text-xl"
            >
              <li v-for="link in allLinks" :key="link.name" class="w-full">
                <NuxtLink
                  class="transition-colors duration-200 hover:text-primary block w-full text-center"
                  active-class="text-primary"
                  :to="link.path"
                  >{{ link.name }}
                </NuxtLink>
              </li>
            </ul>

            <Icon
              @click="open = false"
              name="ic:baseline-cancel"
              class="absolute top-4 right-6 text-2xl cursor-pointer text-zinc-50"
            />
          </div>
        </Transition>
      </Teleport>
    </nav>
  </header>
</template>

<style scoped>
.element-enter-active,
.element-leave-active {
  @apply transition-all duration-500;
}

.element-enter-from,
.element-leave-to {
  @apply opacity-0 translate-y-full;
}
</style>
