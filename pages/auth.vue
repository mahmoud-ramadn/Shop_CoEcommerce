<template>
  <div class="flex md:flex-row flex-col-reverse gap-y-10 min-h-screen">
    <!-- Form Section -->
    <div class="basis-1/2 flex items-center justify-center p-6">
      <LoginForm />
    </div>
    
    <!-- Image Section -->
    <div class="basis-1/2 md:min-h-screen h-64 md:h-auto bg-red-50 overflow-hidden relative">
      <img 
        src="~/assets/images/auth.webp" 
        alt="Authentication illustration" 
        class="w-full h-full object-cover" 
        loading="lazy"
      />
      <div class="absolute inset-0 bg-black/20 flex items-center justify-center md:justify-end md:items-end md:p-12">
        <div class="text-center md:text-right p-6 md:p-0">
          <h2 class="text-white text-3xl md:text-4xl font-bold mb-4">Welcome Back</h2>
          <p class="text-white/90 text-lg md:text-xl max-w-md">
            Join our community of thousands of happy users and enjoy seamless experience.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom'
})
</script>