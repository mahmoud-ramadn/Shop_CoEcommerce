<template>
  <div
    id="newArrivals"
    class="container py-16 flex flex-col items-center border-b"
  >
    <ui-title title="NEW ARRIVALS" />

    <ClientOnly>
      <div v-if="error" class="text-center py-8">
        <p class="text-red-500">
          Failed to load products. Please try again later.
        </p>
        <button @click="retryLoading" class="mt-4 text-blue-500 underline">
          Retry
        </button>
      </div>

      <div v-if="pending" class="container px-0 pt-14 pb-8">
        <swiper-container :breakpoints="breakpoints" class="w-full">
          <swiper-slide v-for="n in skeletonCount" :key="`skeleton-${n}`">
            <div class="animate-pulse">
              <div class="bg-gray-200 h-64 rounded-lg"></div>
              <div class="mt-3 space-y-2">
                <div class="bg-gray-200 h-4 rounded"></div>
                <div class="bg-gray-200 h-4 rounded w-3/4"></div>
                <div class="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>

      <template v-else>
        <swiper-container
          ref="swiperEl"
          v-bind="swiperOptions"
          :breakpoints="breakpoints"
          class="container px-0 pt-14 pb-8"
        >
          <swiper-slide v-for="product in visibleProducts" :key="product.id">
            <NuxtLink :to="`/singlProduct/${product.id}`" class="block">
              <card-product
                :image="product.thumbnail"
                :name="product.title"
                :rating="product.rating"
                :price="product.price || '120'"
              />
            </NuxtLink>
          </swiper-slide>
        </swiper-container>

        <div v-if="!visibleProducts.length" class="text-center py-8">
          <p>No products available at the moment.</p>
        </div>
      </template>
    </ClientOnly>

    <div class="flex gap-4 mt-4" v-if="!pending && !error && product.length">
      <button
        v-if="hasMoreItems && visibleProducts.length > initialItemCount"
        type="button"
        @click="resetItems"
        class="rounded-full border text-sm font-medium shadow-sm py-2 px-6"
      >
        Show Less
      </button>

      <button
        type="button"
        @click="loadMoreItems"
        class="rounded-full border text-sm font-medium shadow-sm py-2 px-6"
        :disabled="!hasMoreItems"
      >
        {{ hasMoreItems ? "View More" : "All Products Loaded" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const initialItemCount = 4;
const itemsPerLoad = 4;
const skeletonCount = 4;

const swiperEl = ref(null);
const { product, pending, error, refresh } = await useProducts();
const visibleProducts = ref(product.slice(0, initialItemCount) || []);
const totalProducts = computed(() => product.length || 0);
const hasMoreItems = computed(
  () => visibleProducts.value.length < totalProducts.value
);

const retryLoading = async () => {
  await refresh();
};

const loadMoreItems = () => {
  if (!hasMoreItems.value) return;

  const currentLength = visibleProducts.value.length;
  const newItems =
    product.slice(currentLength, currentLength + itemsPerLoad) || [];
  visibleProducts.value = [...visibleProducts.value, ...newItems];

  updateSwiper();
};

const resetItems = () => {
  visibleProducts.value = product?.slice(0, initialItemCount) || [];
  updateSwiper();
};

const updateSwiper = () => {
  nextTick(() => {
    if (swiperEl.value?.swiper) {
      swiperEl.value.swiper.update();
      swiperEl.value.swiper.slideTo(visibleProducts.value.length - 4);
    }
  });
};

const breakpoints = {
  0: { slidesPerView: 2, spaceBetween: 10, centeredSlides: true },
  320: { slidesPerView: 2, spaceBetween: 15 },
  540: { slidesPerView: 2, spaceBetween: 10 },
  640: { slidesPerView: 3, spaceBetween: 15 },
  768: { slidesPerView: 2.5, spaceBetween: 15 },
  1280: { slidesPerView: 4, spaceBetween: 20 },
};

const swiperOptions = {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: false, // Changed to false for better pagination control
  grabCursor: true,
  centeredSlides: false,
  slideToClickedSlide: true,
};
</script>
