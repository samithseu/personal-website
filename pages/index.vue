<script lang="ts" setup>
// FOR SEO
const desc =
  "First page of the website which telling brief information about Samith Seu.";
const ttl = "%s - Home";
useSeoMeta({
  titleTemplate: ttl,
  ogTitle: ttl,
  twitterTitle: ttl,
  description: desc,
  ogDescription: desc,
  twitterDescription: desc,
});
defineOgImageComponent("EachPage", {
  headline: "personal website",
  title: ttl,
  desc: desc,
});
</script>

<template>
  <div>
    <h2 class="text-center">This is home page!</h2>
    <p>
      molestias cupiditate repellendus. Eos beatae nam cumque! Iusto quisquam
      quam maiores provident facilis tenetur adipisci molestias impedit. Animi,
      debitis. Nisi quia deserunt, aliquam, unde quam rerum fugit vel quaerat
      nesciunt corporis sapiente! Nemo quos earum voluptate eligendi ullam ab
      qui alias atque! Ullam nihil quod odio veniam magni molestiae ipsa
      dignissimos, architecto, optio amet consectetur beatae itaque, nulla
      obcaecati pariatur magnam fugiat provident cum. Similique illo itaque rem
      minima distinctio asperiores dolorem sint harum eveniet quam praesentium
      quibusdam quas, quis doloribus? Expedita nesciunt qui ipsam quae
      necessitatibus porro excepturi facilis officia nulla magni adipisci,
      beatae similique eaque consequuntur exercitationem natus. Eius possimus
      mollitia veritatis ab sapiente, esse ipsa exercitationem quidem recusandae
      nesciunt quisquam! Placeat magnam aliquam aperiam, officia quod ex
      corporis molestias quia facere. Cumque debitis non dignissimos? Molestiae
      pariatur consequatur, adipisci aut aperiam autem aliquam ipsam tempore
      error, totam fugiat iusto ullam officia nisi iste quo quod mollitia odio
      ducimus similique rerum corrupti! A, ex unde. Veritatis nobis repellat
      error inventore repellendus!
    </p>
  </div>
</template>
