<script lang="ts" setup>
const { allContacts } = useContacts();

useSeo({
  title: "Certificates",
  description:
    "Proof of learning! View my verified certificates and credentials.",
});

const { data: certs, error } = await useAsyncData(
  "certificates",
  fetchingCertificates
);
</script>

<template>
  <div class="w-full h-fit px-4 py-4 prefer:px-0">
    <div
      class="max-w-prefer mx-auto my-4 lg:my-12 xl:my-14 space-y-10 lg:space-y-12 xl:space-y-14 2xl:space-y-16"
    >
      <div class="space-y-4 md:space-y-6 lg:space-y-8">
        <!-- project title & subtitle -->
        <div class="space-y-2 lg:space-y-3">
          <LazySimpleBadge class="md:mx-0">
            <span>Qualifications</span>
          </LazySimpleBadge>
          <h2
            style="view-transition-name: title"
            class="capitalize text-center md:text-left text-3xl font-bold"
          >
            Certificates
          </h2>
          <p class="text-zinc-400 text-pretty text-center md:text-left">
            A collection of
            <span class="text-primary">{{ certs?.length }}</span> certificates
            and qualifications I've earned throughout my career.
          </p>
          <p
            v-if="error"
            class="text-red-500 text-pretty text-center md:text-left"
          >
            {{ error?.message ?? "Cannot fetch all certificates!" }}
          </p>
        </div>
        <ul
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:items-start gap-6 lg:gap-8"
        >
          <LazyCertCard
            v-for="c in certs"
            :key="c.id"
            :image-url="`/certs/${c.url}`"
            :date="c.issue_date"
            :title="c.title"
            :org="c.org"
          />
        </ul>
      </div>
      <!-- Have a project in mind? -->
      <LazyAskingEnd hydrate-never>
        <h2 class="text-2xl font-bold text-primary text-center">
          Need a skilled developer? 😁
        </h2>
        <p class="text-zinc-300 text-center">
          Let's talk how we work together to bring your ideas to life!
        </p>
        <ul class="flex flex-wrap justify-center items-center gap-4">
          <li v-for="c in allContacts" :key="c.name">
            <NuxtLink
              :aria-label="c.name"
              :title="c.name"
              :to="c.link"
              class="grid place-items-center border border-primary/20 aspect-square w-8 hover:*:text-primary"
              external
            >
              <Icon
                :name="c.iconName"
                class="transition-all duration-200 text-xl"
              />
            </NuxtLink>
          </li>
        </ul>
      </LazyAskingEnd>
    </div>
  </div>
</template>
