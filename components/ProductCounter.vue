<!-- components/ProductCounter.vue -->
<template>
  <div class="flex items-center border rounded-lg overflow-hidden">
    <button 
      @click="decrement"
      class="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition-colors"
      :disabled="count <= 1"
    >
      -
    </button>
    <span class="px-4 py-1 bg-white">{{ count }}</span>
    <button 
      @click="increment"
      class="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition-colors"
    >
      +
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  initialQuantity: {
    type: Number,
    default: 1
  }
})

const count = ref(props.initialQuantity)
const { addToCart, updateQuantity } = useCart()

const increment = () => {
  count.value++
  updateQuantity(props.product.id, count.value)
}

const decrement = () => {
  if (count.value > 1) {
    count.value--
    updateQuantity(props.product.id, count.value)
  }
}

// Initialize count if product is already in cart
onMounted(() => {
  const { cart } = useCart()
  const cartItem = cart.value.find(item => item.id === props.product.id)
  if (cartItem) {
    count.value = cartItem.quantity
  }
})
</script>