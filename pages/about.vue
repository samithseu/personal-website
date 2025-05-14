<script lang="ts" setup>
import { useSeo } from "~/composables/useSeo";

useSeo({
  title: "About",
  description:
    "Telling more information about Samith Seu also specifying his skills and technologies he's using",
});

const open = ref<boolean>(false);
const dataDialog = ref<"opening" | "closing">("closing");

const handleAnimationEnd = () => {
  if (open.value === true && dataDialog.value === "opening") {
    open.value = false;
  }
};
</script>

<template>
  <div class="w-full px-4 py-4 lg:py-0 prefer:px-0 flex items-center">
    <div
      class="max-w-prefer mx-auto lg:px-8 2xl:px-0 w-full flex justify-center"
    >
      <button
        @click="open = true"
        class="px-4 py-2 border rounded-lg cursor-pointer border-zinc-50/20 text-white transition-colors duration-200 hover:bg-zinc-50/20 hover:border-transparent"
        role="button"
        aria-label="Opening modal"
      >
        Open Modal
      </button>
      <!-- TODO: Create a proper dialog/modal component -->
      <Teleport to="#teleports">
        <Transition name="backdrop">
          <div
            v-if="open"
            @click.self="open = false"
            class="w-screen h-screen bg-zinc-950/40 fixed inset-0 z-50 flex items-center justify-center top-0 left-0 backdrop-blur-md backdrop-brightness-50"
          >
            <div
              :data-state="dataDialog"
              :class="dataDialog === 'closing' ? 'open' : 'close'"
              @animationend="handleAnimationEnd"
            >
              <h1 class="text-center text-3xl">Hello from Modal!</h1>
            </div>
            <Icon
              @click="dataDialog = 'opening'"
              name="ic:baseline-cancel"
              class="absolute top-4 right-6 text-2xl cursor-pointer text-zinc-50"
            />
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  @apply transition-all duration-500;
}

.backdrop-enter-from,
.backdrop-leave-to {
  @apply opacity-0;
}

.modal-enter-active,
.modal-leave-active {
  @apply transition-all duration-500;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0 translate-x-full;
}

.open {
  @apply transition duration-200 animate-[goIn_200ms_ease-out];
}
.close {
  @apply transition duration-200 animate-[goOut_200ms_ease-out];
}

@keyframes goIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes goOut {
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
