<script setup>

defineProps({
  year: Number,
  followers: Number,
})

</script>

<template>
  <h4 v-if="loaded" class="text-lg w-full md:text-2xl">
    Contributing on GitHub since {{ years[years.length-1].year }}
    <span v-if="contributions.expert.followers"> - {{ localNumber(contributions.expert.followers) }} Followers</span>
  </h4>
</template>
