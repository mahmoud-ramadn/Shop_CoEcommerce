<template>
  <div class="bg-black py-8 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black/0 to-black z-10 pointer-events-none"></div>
    <ClientOnly>
      <Vue3Marquee
        :duration="20"
        :clone="true"
        :loop="0"
        :pause-on-hover="true"
        class="vue3-marquee"
      >
        <div 
          v-for="(item, index) in marqueeData" 
          :key="item.id"
          class="px-8 flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <img 
            :src="item.img" 
            :alt="`Partner logo ${index + 1}`" 
            class="max-h-12 object-contain grayscale hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          >
        </div>
      </Vue3Marquee>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import one from '@/assets/images/partenrs/one.png';
import two from '@/assets/images/partenrs/two.png';
import three from '@/assets/images/partenrs/three.png';
import four from '@/assets/images/partenrs/four.png';
import five from '@/assets/images/partenrs/five.png';

// Filter out any undefined items from the array
const marqueeData = [
  { id: '1', img: one },
  { id: '2', img: two },
  { id: '3', img: three },
  { id: '4', img: four },
  { id: '5', img: five }
].filter(Boolean);
</script>

<style scoped>
.vue3-marquee {
  @apply w-full flex items-center;
}

/* Gradient fade effect for the edges */
.vue3-marquee::before {
  content: '';
  @apply absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none;
}

.vue3-marquee::after {
  content: '';
  @apply absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none;
}

/* Animation for the marquee items */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.vue3-marquee > div:hover {
  animation: float 1.5s ease-in-out infinite;
}
</style>