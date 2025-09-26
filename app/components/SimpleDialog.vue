<template>
  <Teleport to="#teleports">
    <Transition name="backdrop" @after-leave="onBackdropAfterLeave">
      <div
        v-if="backdropVisible"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center px-4 prefer:px-0"
        @click="startClose"
      >
        <Transition name="modal" appear>
          <div @click.stop :class="modalClasses">
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
  modalClasses?: String;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

// Two internal states for step-by-step exit animation
const backdropVisible = ref(false);

// Sync open: when modelValue becomes true, show both
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      backdropVisible.value = true;
    } else {
      backdropVisible.value = false;
    }
  },
  { immediate: true }
);

// User initiates close sequence
function startClose() {
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
  transition-property: all;
  transition-duration: 300ms;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition-property: all;
  transition-duration: 500ms;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-50%);
}
</style>
