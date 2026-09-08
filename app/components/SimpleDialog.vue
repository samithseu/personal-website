<template>
  <dialog
    ref="dialogRef"
    class="fixed inset-0 m-0 p-0 max-w-none max-h-none w-full h-full bg-transparent border-0 outline-none overflow-visible backdrop:bg-transparent focus:outline-none"
    aria-modal="true"
    tabindex="-1"
    @cancel="onCancel"
    @close="onNativeClose"
  >
    <Transition name="backdrop" @after-leave="onBackdropAfterLeave">
      <div
        v-if="backdropVisible"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center px-4 prefer:px-0"
        @mousedown="onMouseDown"
        @click="onBackdropClick"
      >
        <Transition name="modal" appear>
          <div @click.stop :class="modalClasses">
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </dialog>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    modalClasses?: string;
    closeOnBackdropClick?: boolean;
    closeOnEsc?: boolean;
  }>(),
  {
    modalClasses: "",
    closeOnBackdropClick: true,
    closeOnEsc: true,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
  (e: "open"): void;
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);
const backdropVisible = ref(false);
let isMouseDownOnBackdrop = false;

function openModal() {
  if (!import.meta.client) return;

  // Lock background scroll without shifting content
  document.body.style.overflow = "hidden";

  // Native <dialog> modal in top layer
  if (dialogRef.value && !dialogRef.value.open) {
    if (typeof dialogRef.value.showModal === "function") {
      dialogRef.value.showModal();
    } else {
      dialogRef.value.setAttribute("open", "");
    }
  }

  backdropVisible.value = true;
  emit("open");
}

function startClose() {
  backdropVisible.value = false;
}

function onBackdropAfterLeave() {
  if (import.meta.client) {
    document.body.style.overflow = "";
    if (dialogRef.value && dialogRef.value.open) {
      if (typeof dialogRef.value.close === "function") {
        dialogRef.value.close();
      } else {
        dialogRef.value.removeAttribute("open");
      }
    }
  }
  emit("update:modelValue", false);
  emit("close");
}

function onCancel(event: Event) {
  // Prevent instant un-animated native dialog closure
  event.preventDefault();
  if (!props.closeOnEsc || !backdropVisible.value) return;
  startClose();
}

function onNativeClose() {
  if (backdropVisible.value) {
    startClose();
  }
}

function onMouseDown(event: MouseEvent) {
  isMouseDownOnBackdrop = event.target === event.currentTarget;
}

function onBackdropClick(event: MouseEvent) {
  if (
    props.closeOnBackdropClick &&
    event.target === event.currentTarget &&
    isMouseDownOnBackdrop
  ) {
    startClose();
  }
  isMouseDownOnBackdrop = false;
}

onMounted(() => {
  if (props.modelValue) {
    openModal();
  }
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      openModal();
    } else {
      startClose();
    }
  }
);

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = "";
    if (dialogRef.value && dialogRef.value.open) {
      if (typeof dialogRef.value.close === "function") {
        dialogRef.value.close();
      } else {
        dialogRef.value.removeAttribute("open");
      }
    }
  }
});
</script>

<style scoped>
dialog {
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  color: inherit;
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
  overflow: visible;
}

dialog::backdrop {
  background: transparent;
}

dialog:focus,
dialog:focus-visible {
  outline: none;
}

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
  transition-duration: 300ms;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}
</style>
