<template>
  <div class="flex items-center">
    <Icon 
      v-for="star in fullStars" 
      :key="'full-' + star"
      name="ic:baseline-star" 
      class="text-yellow-400"
      width="18"
      height="18"
    />
    <Icon 
      v-if="hasHalfStar"
      name="la:star-half-solid" 
      class="text-yellow-400"
      width="18"
      height="18"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rating: { type: Number, default: 0 }
});

const fullStars = computed(() => Math.floor(props.rating));
const hasHalfStar = computed(() => props.rating % 1 >= 0.5);
</script>