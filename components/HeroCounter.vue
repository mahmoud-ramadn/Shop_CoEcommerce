<template>
  <div class="pt-5 grid lg:grid-cols-3 grid-cols-2 items-center md:gap-5 gap-4">
    <div 
      v-for="item in counterData" 
      :key="item.id"
      :class="[
        'space-y-1',
        item.id === '2' ? 'border-l md:border-r border-black/10   text-center' : '',
        item.id === '3' ? 'md:col-span-1 col-span-2 ' : 'md:col-span-1  '
      ]"
      class="text-center px-0.5"
    >
      <h3 class="font-bold md:text-3xl text-2xl">
        <span :id="`counter-${item.id}`" class="counter-value  ">0</span> + 
      </h3>
      <p class="shrink-0 text-black/60">{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const counterData = [
  {
    id: '1',
    num: 200,
    title: 'International Brands'
  },
  {
    id: '2',
    num: 2000,
    title: 'High-Quality Products'
  },
  {
    id: '3',
    num: 30000,
    title: 'Happy Customers'
  }
];

const animateCounters = () => {
  counterData.forEach(item => {
    const counterElement = document.getElementById(`counter-${item.id}`);
    if (!counterElement) return;

    const target = item.num;
    const duration = 2000; // 2 seconds
    const stepTime = 20; // ms
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      counterElement.textContent = Math.floor(current).toLocaleString();
    }, stepTime);
  });
};

onMounted(() => {
  // Use setTimeout to ensure the animation starts after the component is mounted
  setTimeout(animateCounters, 300);
});

// Optional: Trigger animation when element comes into view (Intersection Observer)
if (typeof window !== 'undefined') {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, { threshold: 0.5 });

  onMounted(() => {
    const container = document.querySelector('.grid');
    if (container) {
      observer.observe(container);
    }
  });
}
</script>

<style scoped>
.counter-value {
  display: inline-block;
  transition: all 0.3s ease;
}

/* Optional: Add some animation to make it more appealing */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.grid > div:nth-child(1) { animation-delay: 0.1s; }
.grid > div:nth-child(2) { animation-delay: 0.2s; }
.grid > div:nth-child(3) { animation-delay: 0.3s; }
</style>