<template>
  <h1 class="font-bold flex items-center gap-3" :class="sizeClass">
    ${{ formattedPrice }}
    <span class="text-black/40 line-through">${{ formattedOriginalPrice }}</span>
    <span v-if="discount" class="py-1 px-4 font-medium text-sm bg-red-100/10 rounded-full text-red-100">
      -{{ discount }}%
    </span>
  </h1>
</template>

<script setup lang="ts">
const props = defineProps({
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  sizeClass: { type: String, default: 'text-4xl' }
});

const formattedPrice = computed(() => props.price.toFixed(2));
const formattedOriginalPrice = computed(() => 
  (props.price * (1 + props.discount / 100)).toFixed(2)
);
</script>