<script lang="ts" setup>
import { useSeo } from "~/composables/useSeo";

useSeo({
  title: "About",
  description:
    "Telling more information about Samith Seu also specifying his skills and technologies he's using",
});

const showBackdrop = ref<boolean>(false);
const showModal = ref<boolean>(false);

async function open() {
  showBackdrop.value = true;
  await nextTick();
  showModal.value = true;
}

function close() {
  showModal.value = false;
}

function onModalAfterLeave() {
  showBackdrop.value = false;
}
</script>

<template>
  <div class="w-full px-4 py-4 lg:py-0 prefer:px-0 flex items-center">
    <div
      class="max-w-prefer mx-auto lg:px-8 2xl:px-0 w-full flex justify-center"
    >
      <button
        @click="open"
        class="px-4 py-2 border rounded-lg cursor-pointer border-zinc-50/20 text-white transition-colors duration-200 hover:bg-zinc-50/20 hover:border-transparent"
        role="button"
        aria-label="Opening modal"
      >
        Open Modal
      </button>

      <Teleport to="#teleports">
        <Transition name="backdrop">
          <div
            v-if="showBackdrop"
            class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center px-4 prefer:px-0"
            @click="close"
          >
            <Transition
              @after-leave="onModalAfterLeave"
              name="modal"
              appear
              mode="out-in"
            >
              <div
                v-if="showModal"
                @click.stop
                class="max-w-lg p-4 border border-zinc-50/20 rounded-lg"
              >
                <h4 class="text-2xl mb-4 font-bold text-white text-center">
                  Custom Dialog
                </h4>
                <p class="text-zinc-400 text-pretty">
                  THis is the custom
                  <code class="font-mono text-primary">Dialog</code>
                  component which I created manually using Vue 3 Composition
                  API. So I'm really excited about it because I'll use it later
                  in this website.
                </p>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  @apply transition-all duration-300;
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
  @apply opacity-0 scale-95 -translate-y-1/2;
}
</style>
