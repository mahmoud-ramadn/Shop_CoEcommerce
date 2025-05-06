<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
</template>

<style>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>