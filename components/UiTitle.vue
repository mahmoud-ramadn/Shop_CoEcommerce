<template>
  <h1 class="  font-extrabold text-center md:text-5xl text-3xl ">
    {{ title }}
  </h1>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>