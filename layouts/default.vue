<script lang="ts" setup>
const { isChanging, lock, unlock } = useScrollLock();
</script>

<template>
  <div class="h-screen grid grid-rows-[auto_1fr]">
    <Header />
    <NuxtPage :transition="{ onBeforeLeave: lock, onAfterEnter: unlock }">
      <template #default="{ Component }">
        <main
          class="overflow-y-auto transition-[overflow]"
          :class="{
            '!overflow-y-hidden': isChanging,
            'hide-scrollbar': isChanging,
          }"
        >
          <component :is="Component" />
        </main>
      </template>
    </NuxtPage>
  </div>
</template>
