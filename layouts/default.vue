<template>
  <div
    class="min-h-screen h-full grid grid-rows-[auto_1fr] transition-discrete duration-300"
  >
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
