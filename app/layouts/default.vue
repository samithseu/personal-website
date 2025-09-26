<template>
  <div
    class="min-h-screen h-full grid grid-rows-[auto_1fr_auto] transition-discrete duration-300"
  >
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>
