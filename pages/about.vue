<script lang="ts" setup>
import { useSeo } from "~/composables/useSeo";

useSeo({
  title: "About",
  description:
    "Telling more information about Samith Seu also specifying his skills and technologies he's using",
});
</script>

<template>
  <div class="w-full px-4 py-4 lg:py-0 prefer:px-0 flex items-center">
    <div class="max-w-prefer mx-auto lg:px-8 2xl:px-0">
      <!-- 2 col wrapper -->
      <div class="grid grid-cols-1 md:grid-cols-2 md:items-center">
        <!-- left side -->
        <div class="w-full col-start-1 row-start-1">
          <div>
            <img
              src="@/assets/imgs/about-pic.jpg"
              alt="Samith Seu's AI generated photo"
            />
          </div>
          <!-- social medias-->
          <!-- <div
            class="flex items-center gap-4 lg:gap-6 *:text-xl justify-center *:transition-colors *:duration-200 *:hover:text-primary lg:justify-start lg:*:text-xl *:text-zinc-400"
          >
            <NuxtLink
              title="GitHub"
              aria-label="This is Samith's GitHub"
              target="_blank"
              to="https://github.com/samithseu"
            >
              <Icon name="lucide:github" />
            </NuxtLink>
            <NuxtLink
              title="LinkedIn"
              aria-label="This is Samith's LinkedIn"
              target="_blank"
              to="https://www.linkedin.com/in/samith-seu-500193205/"
            >
              <Icon name="lucide:linkedin" />
            </NuxtLink>
            <NuxtLink
              title="Twitter/X"
              aria-label="This is Samith's Twitter/X"
              target="_blank"
              to="https://twitter.com/seumith"
            >
              <Icon name="prime:twitter" />
            </NuxtLink>
            <NuxtLink
              title="Telegram"
              aria-label="This is Samith's Telegram"
              target="_blank"
              to="https://t.me/samithseu"
            >
              <Icon name="hugeicons:telegram" />
            </NuxtLink>
            <NuxtLink
              title="Email"
              aria-label="This is Samith's Email"
              target="_blank"
              to="mailto:seusamith@gmail.com"
            >
              <Icon name="lucide:mail" />
            </NuxtLink>
          </div> -->
        </div>
        <!-- right side -->
        <div class="">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            odit eos fuga inventore! Facilis perferendis velit nesciunt
            voluptates, iusto quo eveniet eaque id eligendi qui dolorum ratione
            eum aut nulla dolorem accusamus repellendus officiis temporibus
            voluptatum voluptas dolore. Qui, numquam quaerat rem cupiditate
            pariatur error quis id illum dolor tempora libero ut, cumque et
            necessitatibus doloribus autem eaque ea quidem impedit deserunt nemo
            ab! Excepturi mollitia iure tempora facere ratione nam nostrum
            corporis enim exercitatio
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
