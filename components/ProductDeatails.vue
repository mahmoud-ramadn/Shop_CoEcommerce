<template>

  <div v-if="!pending" class="grid lg:grid-cols-2 grid-cols-1 md:gap-10 gap-5">
    <!-- Product Images -->
    <div class="flex items-start md:flex-row flex-col-reverse gap-3 h-full">
      <div class="md:basis-1/4 w-full md:h-full rounded col-span-1 flex md:flex-col justify-between flex-row md:gap-4 gap-3">
        <div 
          v-for="(img, index) in data?.images" 
          :key="index" 
          class="rounded-xl basis-1/3 border"
          :class="{ 'border-2 border-gray-950': selectedImageIndex === index }"
          @click="selectImage(index)"
        >
          <img 
            :src="img" 
            :alt="`product-image-${index}`"  
            loading="lazy"  
            class="shrink-0 w-full rounded object-cover h-full"
          >
        </div>
      </div>
      <div class="md:basis-3/4 w-full md:h-full overflow-hidden rounded-xl">
        <img 
          :src="currentImage"  
          alt="main-product-image"  
          class="shrink-0 w-full rounded md:aspect-square aspect-[3/4] object-cover h-full"
        >
      </div>
    </div>

    <!-- Product Details -->
    <div>
      <div class="border-b pb-6">
        <h1 class="font-bold md:text-5xl text-2xl">{{ data?.title }}</h1>
        <div class="flex md:py-[8px] py-[4px]">
          <Icon 
            v-for="star in fullStars" 
            :key="'full-' + star"
            name="ic:baseline-star" 
            width="18px" 
            height="18px" 
            style="color: #FFC633" 
          />
          <Icon 
            v-if="hasHalfStar"
            name="la:star-half-solid" 
            width="18px" 
            height="18px" 
            style="color: #FFC633" 
          />
          <span class="pl-4">{{ data?.rating }}</span>
        </div>
        <h1 class="md:font-bold md:text-4xl text-2xl flex items-center gap-3">
          ${{ data?.price ?? '0.00' }} 
          <span class="text-black/40 line-through">
            ${{ (data?.price ? (data.price * 0.4).toFixed(2) : '0.00') }}
          </span>
          <span class="py-1 px-4 font-medium md:text-base text-sm bg-red-100/10 rounded-full text-red-100">
            -40%
          </span>
        </h1>

        <p class="text-black/60 md:text-base text-sm mt-5">
          {{ data?.description }}
        </p>
      </div>

      <!-- Color Selection -->
      <div class="border-b py-6">
        <h4 class="text-black/60 md:text-base text-sm">Select Colors</h4>
        <div class="flex items-center gap-3 mt-5">
          <div
            v-for="(item, index) in circlesColor"
            :key="index"
            @click="selectColor(index)"
            class="size-10 rounded-full flex items-center justify-center cursor-pointer"
            :class="item.value"
          >
            <Icon
              v-if="selectedColorIndex === index"
              name="icon-park-solid:correct"
              width="13px"
              height="13px"
              style="color: #fff"
            />
          </div>
        </div>
      </div>

      <!-- Size Selection -->
      <div class="border-b py-6">
        <h4 class="text-black/60 md:text-base text-sm">Choose Size</h4>
        <div class="flex items-center flex-wrap gap-3 mt-5">
          <span
            v-for="(item, index) in circlesSizes"
            :key="index"
            @click="selectSize(index)"
            class="rounded-full md:py-3 md:px-6 py-2 px-5 cursor-pointer"
            :class="{
              'bg-black text-white': selectedSizeIndex === index,
              'text-black/60 bg-gray-100': selectedSizeIndex !== index
            }"
          >
            <span class="md:text-base tex-sm">
              {{ item.value }}
            </span>
          </span>
        </div>
      </div>

      <!-- Add to Cart -->
      <div class="flex items-center gap-3 md:gap-5 pt-6">
        <button 
            @click="handleAddToCart(data)" 
          :disabled="isAddingToCart || !data"
          class="basis-3/4 bg-black text-white rounded-full md:py-4 py-3 md:text-base tex-sm font-medium disabled:opacity-50"
        >
          <span v-if="!isAddingToCart">Add to Cart</span>
          <span v-else class="flex items-center justify-center">
            <Icon name="eos-icons:loading" class="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-if="pending" class="grid lg:grid-cols-2 grid-cols-1 md:gap-10 gap-5">
    <!-- Image Skeleton -->
    <div class="flex items-start md:flex-row flex-col-reverse gap-3 h-full">
      <div class="md:basis-1/4 w-full md:h-full rounded col-span-1 flex md:flex-col justify-between flex-row md:gap-4 gap-3">
        <div 
          v-for="i in 3" 
          :key="i" 
          class="bg-gray-200 animate-pulse rounded-xl basis-1/3 h-24 md:h-32"
        ></div>
      </div>
      <div class="md:basis-3/4 w-full md:h-full overflow-hidden rounded-xl">
        <div class="bg-gray-200 animate-pulse w-full md:aspect-square aspect-[3/4] h-full"></div>
      </div>
    </div>

    <!-- Info Skeleton -->
    <div class="space-y-6">
      <div class="border-b pb-6 space-y-4">
        <div class="bg-gray-200 animate-pulse h-12 w-3/4 rounded"></div>
        <div class="bg-gray-200 animate-pulse h-6 w-1/4 rounded"></div>
        <div class="bg-gray-200 animate-pulse h-8 w-1/3 rounded"></div>
        <div class="space-y-2">
          <div class="bg-gray-200 animate-pulse h-4 rounded"></div>
          <div class="bg-gray-200 animate-pulse h-4 w-5/6 rounded"></div>
          <div class="bg-gray-200 animate-pulse h-4 w-4/5 rounded"></div>
        </div>
      </div>

      <div class="border-b py-6 space-y-4">
        <div class="bg-gray-200 animate-pulse h-6 w-1/5 rounded"></div>
        <div class="flex gap-3">
          <div v-for="i in 3" :key="i" class="bg-gray-200 animate-pulse h-10 w-10 rounded-full"></div>
        </div>
      </div>

      <div class="border-b py-6 space-y-4">
        <div class="bg-gray-200 animate-pulse h-6 w-1/5 rounded"></div>
        <div class="flex gap-3">
          <div v-for="i in 4" :key="i" class="bg-gray-200 animate-pulse h-10 w-16 rounded-full"></div>
        </div>
      </div>

      <div class="flex items-center gap-5 pt-6">
        <div class="bg-gray-200 animate-pulse h-12 w-1/4 rounded-full"></div>
        <div class="bg-gray-200 animate-pulse h-12 w-3/4 rounded-full"></div>
      </div>
    </div>
  </div>

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

<script setup lang="ts">
const route = useRoute()
const id = Number(route.params.slug)
const { triggerToast, showToast, toastMessage, toastType } = useToast()
const { addToCart } = useAddToCart()
const isAddingToCart = ref(false)

const { data, pending } = await useSingleProduct(id as number)

const selectedImageIndex = ref(0)
const currentImage = computed(() => data.value?.images?.[selectedImageIndex.value])

const selectImage = (index: number) => {
  selectedImageIndex.value = index
}

watch(() => data.value, (newData) => {
  if (newData?.images?.length) {
    selectedImageIndex.value = 0
  }
})

const selectedColorIndex = ref<number | null>(0)
const selectedSizeIndex = ref<number | null>(2)

const circlesColor = ref([
  { value: "bg-[#4F4631]" },
  { value: "bg-[#314F4A]" },
  { value: "bg-[#314F4A]" },
])

const circlesSizes = ref([
  { value: "Small" },
  { value: "Medium" },
  { value: "Large" },
  { value: "X-Large" },
])

const selectColor = (index: number) => {
  selectedColorIndex.value = index
}

const selectSize = (index: number) => {
  selectedSizeIndex.value = index
}

const selectedColor = computed(() => {
  return selectedColorIndex.value !== null
    ? circlesColor.value[selectedColorIndex.value].value
    : null
})

const fullStars = computed(() => Math.floor(data.value?.rating || 0))
const hasHalfStar = computed(() => (data.value?.rating || 0) % 1 >= 0.5)

const handleAddToCart = (product: TProduct | any) => {
  addToCart(product)
  triggerToast(`${product.title} added to cart!`, 'success')
}
</script>

<style>
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
  animation: fadeInUp 0.3s ease-out forwards;
}
</style>