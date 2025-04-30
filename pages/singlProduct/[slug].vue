<template>
  <div class="container">
    <!-- <pre>{{ data?.category }}</pre> -->
    <bread-cram :category="data?.category" current-page="shope" :product="data?.title" />
    <lazy-product-deatails />
    <lazy-the-tap-sections/>
    <you-might-alsolike/>


  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = Number(route.params.slug)
const { data, pending } = await useSingleProduct(id as number)

</script>

<style scoped></style>
