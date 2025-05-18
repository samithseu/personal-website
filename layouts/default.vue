<template>
  <div class="h-fit grid grid-rows-[auto_1fr]">
    <Header />
    <NuxtPage>
      <template #default="{ Component }">
        <main>
          <component :is="Component" />
        </main>
      </template>
    </NuxtPage>
  </div>
</template>
