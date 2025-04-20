<template>
  <div class="w-fit ">
    <div class="bg-gray-100 rounded-3xl overflow-hidden mb-4  aspect-square">
      <img 
        :src="image" 
        :alt="name" 
        class="w-full h-full object-cover"
        loading="lazy"
      >
    </div>
    <h3 class="text-xl font-bold mb-2 line-clamp-1 ">{{ name }}</h3>
    <div class="flex items-center gap-1 mb-2">
      <div class="flex">
        <Icon 
          v-for="star in fullStars" 
          :key="'full-' + star"
          name="ic:baseline-star" 
          width="18px" 
          height="18px" 
          style="color: #FFC633" 
        />
        <Icon 
          v-if="hasHalfStar"
          name="la:star-half-solid" 
          width="18px" 
          height="18px" 
          style="color: #FFC633" 
        />
      </div>
      <span class="text-sm text-gray-600">{{ displayRating }}/5</span>
    </div>
    <h3 class="font-bold text-2xl">{{ formattedPrice }}</h3>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: [Number, String],
    default: 0,
    validator: (value: number | string) => {
      const num = typeof value === 'string' ? parseFloat(value) : value;
      return num >= 0 && num <= 5;
    }
  },
  price: {
    type: [Number, String],
    required: true,
    validator: (value: number | string) => {
      const num = typeof value === 'string' ? parseFloat(value) : value;
      return num >= 0;
    }
  },
  currency: {
    type: String,
    default: '$'
  }
});

const numericRating = computed(() => {
  return typeof props.rating === 'string' ? parseFloat(props.rating) : props.rating;
});

const numericPrice = computed(() => {
  return typeof props.price === 'string' ? parseFloat(props.price) : props.price;
});

const fullStars = computed(() => Math.floor(numericRating.value));
const hasHalfStar = computed(() => numericRating.value % 1 >= 0.5);
const displayRating = computed(() => numericRating.value.toFixed(1));
const formattedPrice = computed(() => `${props.currency}${numericPrice.value.toFixed(2)}`);
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1/1;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>