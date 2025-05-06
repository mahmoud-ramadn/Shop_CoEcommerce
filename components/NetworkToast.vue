<!-- components/NetworkToast.vue -->
<template>
  <div v-if="showToast" class="fixed bottom-4 right-4 z-50">
    <div 
      :class="{
        'bg-green-500 text-white': toastType === 'success',
        'bg-red-500 text-white': toastType === 'error'
      }"
      class="px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in"
    >
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { showToast, toastMessage, toastType } = useNetworkStatus()
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>