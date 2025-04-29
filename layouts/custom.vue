<template>
  <div class="flex md:flex-row flex-col-reverse gap-y-10 min-h-svh ">

     <NuxtLink to="/" class="absolute top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 12h3v8h6v-6h4v6h6v-8h3L12 2z"/></svg>
        Back to
        <span class="text-lg font-semibold">Home</span>
     </NuxtLink>

    <div class="basis-1/2 flex items-center justify-center p-6">
            <slot />

    </div>
    
    <div class="basis-1/2 md:min-h-svh h-64 md:h-auto bg-red-50 overflow-hidden relative">
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