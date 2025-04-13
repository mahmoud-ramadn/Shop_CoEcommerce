<template>
  <div class="bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
    <div class="container flex   md:flex-row flex-col items-center">
      <div class="w-full text-start py-4 md:space-y-8 space-y-6 md:pr-10 z-10">
        <h1 class="font-extrabold md:text-6xl text-4xl leading-tight animate-fadeInUp">
          FIND CLOTHES THAT <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">MATCH</span> YOUR STYLE
        </h1>
        
        <p class="md:text-lg text-black/60 text-sm max-w-2xl animate-fadeInUp delay-100">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>
        
        <Button 
          class="bg-black hover:bg-black/80 transition-all  text-center duration-300 text-white w-full md:w-fit font-medium rounded-full py-4 px-16 shadow-lg hover:shadow-xl "
        
        >
          <span class="flex items-center justify-center gap-2">
            Shop Now 
          </span>
        </Button>
        
        <hero-counter />
      </div>
      <div class="relative shrink-0 md:w-[50%] w-full h-full">
        <img 
          src="/assets/images/hero.webp" 
          alt="Fashionable clothes matching your style" 
          class="object-cover   shrink-0 "
          loading="eager"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const hoverButton = ref(false);
</script>

<style scoped>
.animate-fadeInUp {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

.animate-scaleIn {
  opacity: 0;
  transform: scale(0.95);
  animation: scaleIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Gradient text animation */
.bg-gradient-to-r {
  background-size: 200% auto;
  animation: gradientText 3s ease infinite;
}

@keyframes gradientText {
  0% { background-position: 0% center; }
  50% { background-position: 100% center; }
  100% { background-position: 0% center; }
}
</style>