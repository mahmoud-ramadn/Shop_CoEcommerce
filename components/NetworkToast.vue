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
      <button 
        v-if="!isOnline"
        @click="dismissToast"
        class="ml-4 p-1 rounded-full hover:bg-white/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
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