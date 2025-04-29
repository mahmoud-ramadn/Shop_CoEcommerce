<!-- components/ToastContainer.vue -->
<script setup lang="ts">
const { showToast, toastMessage, toastType } = useToast()
</script>

<template>
  <div v-if="showToast" class="fixed bottom-4 right-4 z-50">
    <div 
      class="flex items-center p-4 rounded-lg shadow-lg animate-fade-in-up"
      :class="{
        'bg-green-100 text-green-800': toastType === 'success',
        'bg-red-100 text-red-800': toastType === 'error'
      }"
    >
      <Icon 
        :name="toastType === 'success' ? 'heroicons:check-circle' : 'heroicons:exclamation-circle'" 
        class="w-6 h-6 mr-2" 
      />
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<style scoped>
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
.animate-fade-in-up {
  animation: fadeInUp 0.2s ease-out forwards;
}
</style>