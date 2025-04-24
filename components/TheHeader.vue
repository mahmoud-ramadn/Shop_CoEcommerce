<template>
  <div>
    <!-- Promo Banner with dismiss functionality -->
    <div v-if="showPromo" class="bg-black">
      <div class="container flex items-center justify-between py-2 px-4">
        <small class="flex-grow text-center text-white text-sm sm:text-base">
          Sign up and get 20% off your first order.
          <NuxtLink
            to="/signup"
            class="font-medium underline underline-offset-4 decoration-white hover:opacity-80 transition-opacity"
          >
            Sign Up Now
          </NuxtLink>
        </small>
        <button
          @click="showPromo = false"
          class="text-white hover:opacity-70 transition-opacity focus:outline-none"
          aria-label="Close promo banner"
        >
          <Icon name="ic:round-close" class="size-5" />
        </button>
      </div>
    </div>

    <!-- Main Header -->
    <header class="sticky top-0 z-50 bg-white  ">
      <div
        class="container  py-4   flex justify-between items-center border-b"
      >
        <button
          class="md:hidden p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Open menu"
          @click="toggleMobileMenu"
        >
          <Icon name="flowbite:bars-outline" class="size-6" />
        </button>

        <NuxtLink to="/" class="mx-auto md:mx-0">
          <img
            src="~/assets/images/SHOP.CO.webp"
            alt="SHOP.CO logo"
          />
        </NuxtLink>
        <nav class="hidden lg:flex items-center gap-6">
          <ul class="flex items-center gap-6">
            <li v-for="item in NavLinks" :key="item.id">
              <NuxtLink
               :to="item?.path"
                class="flex items-center gap-1 hover:text-black/50 transition-all duration-300 text-sm font-medium"
              >
                {{ item.title }}
                <Icon
                  v-if="item.img"
                  :name="item.img"
                  class="size-4 text-black font-bold"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="hidden md:block relative w-full max-w-md mx-4">
          <div class="relative">
            <Icon
              name="tabler:search"
              class="size-6 absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
            />
            <input
              type="search"
              placeholder="Search for products..."
              class="py-2.5 px-11 rounded-full focus:ring-2 focus:outline-none w-full focus:ring-black/90 bg-gray-100 text-sm"
            />
          </div>
        </div>

        <!-- Action Icons -->
        <div class="flex items-center md:gap-x-4 gap-x-3">
          <NuxtLink
            to="/cart"
            class="p-1 rounded-full  relative"
            aria-label="Shopping cart"
          >
            <Icon name="ion:cart-outline" class="size-6" />
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 animate-bounce bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </NuxtLink>
          <NuxtLink
            to="/auth"
            class="p-1 rounded-full  "
            aria-label="User account"
          >
            <Icon name="qlementine-icons:user-16" class="size-6" />
          </NuxtLink>
        </div>
      </div>

      <div class="md:hidden px-4 pb-4">
        <div class="relative">
          <Icon
            name="tabler:search"
            class="size-5 absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
          />
          <input
            type="search"
            placeholder="Search for products..."
            class="py-2.5 px-11 rounded-full   outline-none border-none  focus:ring-4 focus:ring-blue-300 max-w-[557px]  w-full   bg-gray-100 text-sm"
          />
        </div>
      </div>

      <div
        v-if="mobileMenuOpen"
        class="lg:hidden absolute w-full bg-white shadow-lg z-50"
      >
        <ul class="py-2 px-4 border-t">
          <li v-for="item in NavLinks" :key="item.id" >
            <NuxtLink
              :to="item.path"
              class="block py-3 px-2  rounded-md text-sm font-medium"
              @click="mobileMenuOpen = false"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
const showPromo = ref(true);
const mobileMenuOpen = ref(false);
const cartCount = ref(3); 
const NavLinks = [
  { id: 1, title: "onSale", img: "iconamoon:arrow-down-2-light" },
  { id: 2, title: "Category" ,path:'/Category'},
  { id: 3, title: "New Arrivals" },
  { id: 4, title: "Brands" },
];

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>
