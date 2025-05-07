<template>
  <div>
    <div
      v-if="pending"
      class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="relative">
        <!-- Outer spinning circle -->
        <div
          class="absolute inset-0 animate-spin rounded-full border-4 border-purple-200"
        ></div>
        <!-- Middle spinning circle -->
        <div
          class="absolute inset-2 animate-spin rounded-full border-4 border-purple-400 animate-[spin_1.5s_linear_infinite]"
        ></div>
        <!-- Inner spinning circle -->
        <div
          class="absolute inset-4 animate-spin rounded-full border-4 border-purple-600 animate-[spin_2s_linear_infinite]"
        ></div>
        <!-- Center dot -->
        <div
          class="absolute inset-6 rounded-full bg-purple-500 animate-pulse"
        ></div>
        <!-- Loading text -->
        <div
          class="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-purple-600 font-medium animate-pulse"
        >
          Loading...
        </div>
      </div>
    </div>
    <div v-else>
      <hero />
      <lazy-parenters />
      <lazy-new-arraivel />
      <lazy-top-selling />
      <div class="px-4">
        <lazy-browse-by-dress-styl />
      </div>
      <lazy-our-happy-customers />
    </div>
  </div>
</template>

<script setup lang="ts">
const pending = ref(true);

onMounted(() => {
  // Simulate loading time for components
  setTimeout(() => {
    pending.value = false;
  }, 100);
});
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
