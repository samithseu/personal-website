export const useScrollLock = () => {
  const isChanging = ref<boolean>(false);
  const lock = () => (isChanging.value = true);
  const unlock = () => (isChanging.value = false);

  return { isChanging, lock, unlock };
};
