<script setup lang="ts">
import { Slider } from '@/components/ui/slider'
import { ref, watch } from 'vue'

const modelValue = ref([30, 70])
const minDistance = 10

watch(modelValue, (newValue, oldValue) => {
  if (newValue[1] < newValue[0]) {
    modelValue.value = [newValue[1], newValue[0]]
  }
  
  if (Math.abs(newValue[1] - newValue[0]) < minDistance) {
    if (newValue[0] !== oldValue[0]) {
      modelValue.value = [newValue[0], newValue[0] + minDistance]
    } else {
      modelValue.value = [newValue[1] - minDistance, newValue[1]]
    }
  }
}, { deep: true })
</script>

<template>
  <div class="flex flex-col gap-4 w-full md:py-6 py-5">
    <div class="relative w-full">
      <Slider
        v-model="modelValue"
        :max="100"
        :step="1"
        class="relative z-10"
      />
      <div class="absolute top-1/2 -translate-y-1/2 h-2 w-full rounded-full bg-gray-200 z-0 overflow-hidden">
        <div 
          class="absolute h-full bg-gray-300"
          :style="{
            left: 0,
            width: `${modelValue[0]}%`
          }"
        />
        <div 
          class="absolute h-full bg-black"
          :style="{
            left: `${modelValue[0]}%`,
            width: `${modelValue[1] - modelValue[0]}%`
          }"
        />
        <div 
          class="absolute h-full bg-gray-300"
          :style="{
            left: `${modelValue[1]}%`,
            width: `${100 - modelValue[1]}%`
          }"
        />
      </div>
    </div>
    <div class="flex justify-between text-base font-medium text-gray-700">
      <span>${{ modelValue[0] }}</span>
      <span>${{ modelValue[1] }}</span>
    </div>
  </div>
</template>

<style scoped>
/* Custom handle styling for both thumbs */
:deep(.slider-thumb) {
  @apply h-5 w-5 border-2 border-white shadow-lg;
  background-color: black;
}

/* Active state for better interaction feedback */
:deep(.slider-thumb[data-active]) {
  @apply scale-110;
}

/* Track styling */
:deep(.slider-track) {
  @apply h-2;
  background-color: transparent;
}

/* Range styling */
:deep(.slider-range) {
  background-color: transparent;
}
</style>