<!-- components/NetworkToast.vue -->
<template>
  <div v-if="showToast" class="fixed bottom-4 right-4 z-50">
    <div 
      :class="{
        'bg-green-500 text-white': toastType === 'success',
        ' bg-gray-400 text-white': toastType === 'error'
      }"
      class="px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in"
    >
      <span>{{ toastMessage }}</span>
      <button 
        v-if="!isOnline"
        @click="dismissToast"
        class="ml-4 p-1 rounded-full hover:bg-white/20"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24">
	<path fill="none" stroke="#08ea63" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m2.959-3C17.619 5.87 18 6.898 18 8s-.381 2.13-1.041 3M7.04 5C6.381 5.87 6 6.898 6 8s.381 2.13 1.041 3m13.275-8C21.38 4.43 22 6.15 22 8s-.62 3.57-1.684 5M3.684 3C2.62 4.43 2 6.15 2 8s.62 3.57 1.684 5M11 10L7 21m10 0l-4-11m-4.5 7h7" color="#08ea63" />
</svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { 
  isOnline, 
  showToast, 
  toastMessage, 
  toastType, 
  dismissToast 
} = useNetworkStatus()
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