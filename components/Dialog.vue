<template>
  <Teleport to="#teleports">
    <Transition name="backdrop" @after-leave="onBackdropAfterLeave">
      <div
        v-if="backdropVisible"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center px-4 prefer:px-0"
        @click="startClose"
      >
        <Transition name="modal" appear @after-leave="onModalAfterLeave">
          <div v-if="modalVisible" @click.stop :class="modalClasses">
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: boolean;
  // make the modalClasses as string with default values
  modalClasses?: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

// Two internal states for step-by-step exit animation
const backdropVisible = ref(false);
const modalVisible = ref(false);

// Sync open: when modelValue becomes true, show both
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      backdropVisible.value = true;
      // wait next tick to ensure backdrop rendered
      modalVisible.value = true;
    } else {
      // start exit by hiding modal first
      modalVisible.value = false;
    }
  },
  { immediate: true }
);

// User initiates close sequence
function startClose() {
  modalVisible.value = false;
}

// After modal inner leave, hide backdrop
function onModalAfterLeave() {
  backdropVisible.value = false;
}

// After backdrop leave, fully update parent
function onBackdropAfterLeave() {
  emit("update:modelValue", false);
}
</script>

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
