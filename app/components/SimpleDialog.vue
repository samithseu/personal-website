<template>
  <dialog
    ref="dialogRef"
    class="simple-dialog"
    aria-modal="true"
    @mousedown="onMouseDown"
    @click="onBackdropClick"
    @cancel="onCancel"
    @close="onNativeClose"
    @transitionend="onTransitionEnd"
  >
    <div
      ref="contentRef"
      class="dialog-content"
      :class="modalClasses"
      @click.stop
    >
      <slot :close="closeModal" />
    </div>
  </dialog>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    modalClasses?: string;
    closeOnBackdropClick?: boolean;
    closeOnEsc?: boolean;
    lockScroll?: boolean;
    restoreFocus?: boolean;
  }>(),
  {
    modalClasses: "",
    closeOnBackdropClick: true,
    closeOnEsc: true,
    lockScroll: true,
    restoreFocus: true,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "open"): void;
  (e: "close"): void;
  (e: "opened"): void;
  (e: "closed"): void;
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);

let activeModalCount = 0;
let originalBodyOverflow = "";

let previouslyFocusedElement: HTMLElement | null = null;
let isMouseDownOnBackdrop = false;
let isLocallyLocked = false;

function lockBodyScroll() {
  if (!import.meta.client || isLocallyLocked) return;
  if (activeModalCount === 0) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  activeModalCount++;
  isLocallyLocked = true;
}

function restoreBodyScroll() {
  if (!import.meta.client || !isLocallyLocked) return;
  activeModalCount = Math.max(0, activeModalCount - 1);
  if (activeModalCount === 0) {
    document.body.style.overflow = originalBodyOverflow || "";
  }
  isLocallyLocked = false;
}

function openModal() {
  if (!import.meta.client || !dialogRef.value) return;
  if (dialogRef.value.open) return;

  if (props.restoreFocus && typeof document !== "undefined") {
    previouslyFocusedElement = document.activeElement as HTMLElement | null;
  }

  if (props.lockScroll) {
    lockBodyScroll();
  }

  if (typeof dialogRef.value.showModal === "function") {
    dialogRef.value.showModal();
  } else {
    dialogRef.value.setAttribute("open", "");
  }

  emit("open");
}

function closeModal() {
  if (!import.meta.client || !dialogRef.value) return;
  if (!dialogRef.value.open) return;

  if (typeof dialogRef.value.close === "function") {
    dialogRef.value.close();
  } else {
    dialogRef.value.removeAttribute("open");
  }

  emit("update:modelValue", false);
}

function onNativeClose() {
  if (props.lockScroll) {
    restoreBodyScroll();
  }

  emit("update:modelValue", false);
  emit("close");

  if (props.restoreFocus && previouslyFocusedElement) {
    if (
      typeof previouslyFocusedElement.focus === "function" &&
      document.contains(previouslyFocusedElement)
    ) {
      previouslyFocusedElement.focus();
    }
    previouslyFocusedElement = null;
  }
}

function onCancel(event: Event) {
  if (!props.closeOnEsc) {
    event.preventDefault();
    return;
  }
  // Prevent instant un-animated native close; drive via closeModal for smooth CSS transition
  event.preventDefault();
  closeModal();
}

function onMouseDown(event: MouseEvent) {
  isMouseDownOnBackdrop = event.target === dialogRef.value;
}

function onBackdropClick(event: MouseEvent) {
  if (!props.closeOnBackdropClick) return;
  if (isMouseDownOnBackdrop && event.target === dialogRef.value) {
    closeModal();
  }
  isMouseDownOnBackdrop = false;
}

function onTransitionEnd(event: TransitionEvent) {
  if (event.target !== dialogRef.value) return;
  if (event.propertyName === "opacity") {
    if (dialogRef.value?.open) {
      emit("opened");
    } else {
      emit("closed");
    }
  }
}

onMounted(async () => {
  if (props.modelValue) {
    await nextTick();
    openModal();
  }
});

watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      await nextTick();
      openModal();
    } else {
      closeModal();
    }
  }
);

onBeforeUnmount(() => {
  if (props.lockScroll) {
    restoreBodyScroll();
  }
  if (dialogRef.value && dialogRef.value.open) {
    if (typeof dialogRef.value.close === "function") {
      dialogRef.value.close();
    } else {
      dialogRef.value.removeAttribute("open");
    }
  }
});

onDeactivated(() => {
  if (props.lockScroll) {
    restoreBodyScroll();
  }
  if (dialogRef.value && dialogRef.value.open) {
    closeModal();
  }
});

defineExpose({
  open: openModal,
  close: closeModal,
  dialog: dialogRef,
  content: contentRef,
});
</script>

<style scoped>
/* Dialog Base & Positioning (Top-layer container) */
dialog.simple-dialog {
  position: fixed;
  inset: 0;
  margin: 0;
  padding: 1rem;
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
  background: transparent;
  border: none;
  outline: none;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  display: none;
  align-items: center;
  justify-content: center;

  /* Entry/Exit Transitions */
  opacity: 0;
  transition:
    opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    overlay 0.22s cubic-bezier(0.16, 1, 0.3, 1) allow-discrete,
    display 0.22s cubic-bezier(0.16, 1, 0.3, 1) allow-discrete;
}

@media (min-width: 640px) {
  dialog.simple-dialog {
    padding: 1.5rem;
  }
}

dialog.simple-dialog:focus,
dialog.simple-dialog:focus-visible {
  outline: none;
}

dialog.simple-dialog[open] {
  display: flex;
  opacity: 1;
}

@starting-style {
  dialog.simple-dialog[open] {
    opacity: 0;
  }
}

/* Modal Content Card Animation */
dialog.simple-dialog > .dialog-content {
  transform: scale(0.95) translateY(-8px);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

dialog.simple-dialog[open] > .dialog-content {
  transform: scale(1) translateY(0);
}

@starting-style {
  dialog.simple-dialog[open] > .dialog-content {
    transform: scale(0.95) translateY(-8px);
  }
}

/* Native ::backdrop */
dialog.simple-dialog::backdrop {
  background-color: rgb(0 0 0 / 0);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  transition:
    display 0.22s cubic-bezier(0.16, 1, 0.3, 1) allow-discrete,
    overlay 0.22s cubic-bezier(0.16, 1, 0.3, 1) allow-discrete,
    background-color 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    backdrop-filter 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    -webkit-backdrop-filter 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

dialog.simple-dialog[open]::backdrop {
  background-color: rgb(0 0 0 / 0.8);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

@starting-style {
  dialog.simple-dialog[open]::backdrop {
    background-color: rgb(0 0 0 / 0);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
  }
}

/* Accessibility: respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  dialog.simple-dialog,
  dialog.simple-dialog::backdrop,
  dialog.simple-dialog > .dialog-content {
    transition-duration: 0.01ms !important;
    transform: none !important;
  }
}
</style>
