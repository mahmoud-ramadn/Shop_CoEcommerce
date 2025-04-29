<template>
  <div>
    <!-- Promo Banner -->
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
    <header class="sticky top-0 z-50 bg-white">
      <div class="container py-4 flex justify-between items-center border-b">
        <!-- Mobile menu button -->
        <button
          class="md:hidden p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Open menu"
          @click="toggleMobileMenu"
        >
          <Icon name="flowbite:bars-outline" class="size-6" />
        </button>

        <!-- Logo -->
        <NuxtLink to="/" class="mx-auto md:mx-0">
          <img src="~/assets/images/SHOP.CO.webp" alt="SHOP.CO logo" />
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden lg:flex items-center gap-6">
          <ul class="flex items-center gap-6">
            <li v-for="item in NavLinks" :key="item.id">
              <NuxtLink
                :to="item?.path"
                    @click="scrollToNextSection(item.section)"
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

        <!-- Desktop Search -->
        <div class="hidden md:block relative w-full max-w-md mx-4">
          <div class="relative">
            <Icon
              name="tabler:search"
              class="size-6 absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
            />
            <input
              v-model="searchQuery"
              @input="handleSearchInput"
              @focus="openSearchModal = true"
              @blur="handleSearchBlur"
              type="search"
              placeholder="Search for products..."
              class="py-2.5 px-11 rounded-full focus:ring-2 focus:outline-none w-full focus:ring-black/90 bg-gray-100 text-sm"
              aria-label="Search products"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/60"
              aria-label="Clear search"
            >
              <Icon name="ic:round-close" class="size-5" />
            </button>
            
            <!-- Search Results Dropdown -->
            <div
              v-if="openSearchModal && (searchResults.length > 0 || searchQuery)"
              class="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[500px] overflow-y-auto"
            >
              <div v-if="isSearching" class="p-4 flex justify-center">
                <Icon name="eos-icons:loading" class="size-6 animate-spin text-gray-400" />
              </div>
              
              <template v-else>
                <div v-if="searchQuery === '' && recentSearches.length > 0" class="p-2">
                  <h3 class="text-xs font-medium text-gray-500 px-2 py-1">RECENT SEARCHES</h3>
                  <ul>
                    <li
                      v-for="(search, index) in recentSearches"
                      :key="index"
                      class="px-2 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                      @mousedown.prevent="selectRecentSearch(search)"
                    >
                      <span class="flex items-center gap-2">
                        <Icon name="ic:baseline-history" class="size-4 text-gray-400" />
                        {{ search }}
                      </span>
                      <button 
                        @click.stop="removeRecentSearch(index)" 
                        aria-label="Remove recent search"
                        class="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <Icon name="ic:round-close" class="size-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </li>
                  </ul>
                </div>
                
                <!-- Search Results Section -->
                <template v-else>
                  <!-- Products Results -->
                  <div v-if="searchResults.length > 0">
                    <h3 class="text-xs font-medium text-gray-500 px-4 py-2">PRODUCTS</h3>
                    <ul>
                      <li
                        v-for="product in searchResults"
                        :key="product.id"
                        class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-t border-gray-100"
                      >
                        <NuxtLink 
                          :to="`/singlProduct/${product.id}`" 
                          class="flex items-center gap-3"
                          @click="openSearchModal = false"
                        >
                          <div class="flex-shrink-0 w-12 h-12 bg-gray-100 rounded overflow-hidden">
                            <img 
                              :src="product.images[0]" 
                              :alt="product.title"
                              class="w-full h-full object-cover"
                            >
                          </div>
                          <div class="flex-grow">
                            <h4 class="text-sm font-medium line-clamp-1">{{ product.title }}</h4>
                            <div class="flex items-center mt-1">
                              <span class="text-sm font-bold">${{ product.price }}</span>
                              <div class="flex items-center ml-2">
                                <Icon 
                                  name="ic:round-star" 
                                  class="size-4 text-yellow-400" 
                                  v-for="star in Math.round(product.rating)"
                                  :key="star"
                                />
                                <span class="text-xs text-gray-500 ml-1">{{ product.rating }}</span>
                              </div>
                            </div>
                          </div>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                  
                  <!-- No Results Found -->
                  <div v-else-if="searchQuery" class="p-4 text-center text-gray-500">
                    <Icon name="mdi:emoticon-sad-outline" class="size-6 mx-auto mb-2" />
                    <p>No results found for "{{ searchQuery }}"</p>
                    <p class="text-xs mt-1">Try different keywords</p>
                  </div>
                </template>
                
                <!-- Search Button Footer -->
                <div
                  v-if="searchQuery"
                  class="p-3 border-t border-gray-100"
                  @mousedown.prevent="performSearch"
                >
                  <button 
                    class="w-full text-left text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-between"
                  >
                    <span>Search for "{{ searchQuery }}"</span>
                    <Icon name="ic:round-arrow-forward" class="size-5" />
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Action Icons -->
        <div class="flex items-center md:gap-x-4 gap-x-3">
          <!-- Mobile Search Toggle -->
          <button
            class="md:hidden p-1 rounded-full"
            aria-label="Open search"
            @click="toggleMobileSearch"
          >
            <Icon name="tabler:search" class="size-6" />
          </button>
          
          <NuxtLink
            to="/cart"
            class="p-1 rounded-full relative"
            aria-label="Shopping cart"
          >
            <Icon name="ion:cart-outline" class="size-6" />
            <span
              v-if="cart.length > 0"
              class="absolute -top-1 -right-1 animate-bounce bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cart.length }}
            </span>
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="p-1 rounded-full"
            aria-label="User account"
          >
            <Icon name="qlementine-icons:user-16" class="size-6" />
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile Search (expanded when toggled) -->
      <div v-if="mobileSearchOpen" class="md:hidden px-4 pb-4 mt-3 ">
        <div class="relative">
          <Icon
            name="tabler:search"
            class="size-5 absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
          />
          <input
            v-model="mobileSearchQuery"
            @input="handleMobileSearchInput"
            @focus="openMobileSearchModal = true"
            @blur="handleMobileSearchBlur"
            type="search"
            placeholder="Search for products..."
            class="py-2.5 px-11 rounded-full outline-none border-none focus:ring-4 focus:ring-blue-300 w-full bg-gray-100 text-sm"
            ref="mobileSearchInput"
          />
          <button
            v-if="mobileSearchQuery"
            @click="clearMobileSearch"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/60"
            aria-label="Clear search"
          >
            <Icon name="ic:round-close" class="size-5" />
          </button>
        </div>
        
        <!-- Mobile Search Results -->
        <div
          v-if="openMobileSearchModal && (mobileSearchResults.length > 0 || mobileSearchQuery)"
          class="absolute left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 max-h-[60vh]  overflow-y-auto"
        >
          <div v-if="isMobileSearching" class="p-4 flex justify-center">
            <Icon name="eos-icons:loading" class="size-6 animate-spin text-gray-400" />
          </div>
          
          <template v-else>
            <div v-if="mobileSearchQuery === '' && recentSearches.length > 0" class="p-2">
              <h3 class="text-xs font-medium text-gray-500 px-2 py-1">RECENT SEARCHES</h3>
              <ul>
                <li
                  v-for="(search, index) in recentSearches"
                  :key="index"
                  class="px-2 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                  @mousedown.prevent="selectMobileRecentSearch(search)"
                >
                  <span class="flex items-center gap-2">
                    <Icon name="ic:baseline-history" class="size-4 text-gray-400" />
                    {{ search }}
                  </span>
                  <button 
                    @click.stop="removeRecentSearch(index)" 
                    aria-label="Remove recent search"
                    class="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Icon name="ic:round-close" class="size-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </li>
              </ul>
            </div>
            
            <!-- Mobile Search Results Section -->
            <template v-else>
              <!-- Products Results -->
              <div v-if="mobileSearchResults.length > 0">
                <h3 class="text-xs font-medium text-gray-500 px-4 py-2">PRODUCTS</h3>
                <ul>
                  <li
                    v-for="product in mobileSearchResults"
                    :key="product.id"
                    class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-t border-gray-100"
                  >
                    <NuxtLink 
                      :to="`/singlProduct/${product.id}`" 
                      class="flex items-center gap-3"
                      @click="closeMobileSearch"
                    >
                      <div class="flex-shrink-0 w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        <img 
                          :src="product.images[0]" 
                          :alt="product.title"
                          class="w-full h-full object-cover"
                        >
                      </div>
                      <div class="flex-grow">
                        <h4 class="text-sm font-medium line-clamp-1">{{ product.title }}</h4>
                        <div class="flex items-center mt-1">
                          <span class="text-sm font-bold">${{ product.price }}</span>
                          <div class="flex items-center ml-2">
                            <Icon 
                              name="ic:round-star" 
                              class="size-4 text-yellow-400" 
                              v-for="star in Math.round(product.rating)"
                              :key="star"
                            />
                            <span class="text-xs text-gray-500 ml-1">{{ product.rating }}</span>
                          </div>
                        </div>
                      </div>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              
              <!-- No Results Found -->
              <div v-else-if="mobileSearchQuery" class="p-4 text-center text-gray-500">
                <Icon name="mdi:emoticon-sad-outline" class="size-6 mx-auto mb-2" />
                <p>No results found for "{{ mobileSearchQuery }}"</p>
                <p class="text-xs mt-1">Try different keywords</p>
              </div>
            </template>
            
            <!-- Mobile Search Button Footer -->
            <div
              v-if="mobileSearchQuery"
              class="p-3 border-t border-gray-100"
              @mousedown.prevent="performMobileSearch"
            >
              <button 
                class="w-full text-left text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-between"
              >
                <span>Search for "{{ mobileSearchQuery }}"</span>
                <Icon name="ic:round-arrow-forward" class="size-5" />
              </button>
            </div>
          </template>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden absolute w-full bg-white shadow-lg z-50"
      >
        <ul class="py-2 px-4 border-t">
          <li v-for="item in NavLinks" :key="item.id">
            <NuxtLink
              :to="item.path"
              class="block py-3 px-2 rounded-md text-sm font-medium"
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
import { useDebounceFn } from '@vueuse/core';

function scrollToNextSection(sectionName: string) {
  const nextSection = document.getElementById(sectionName);
  if (nextSection) {
    window.scrollTo({
      top: nextSection.offsetTop,
      behavior: "smooth",
    });
  }
}


const { cart } = useAddToCart();
const showPromo = ref(true);
const mobileMenuOpen = ref(false);
const mobileSearchOpen = ref(false);
const mobileSearchInput = ref<HTMLInputElement | null>(null);

const NavLinks = [
  { id: 1, title: "onSale", img: "iconamoon:arrow-down-2-light" },
  { id: 2, title: "Category", path: '/Category' , },
  { id: 3, title: "New Arrivals" ,section:"newArrivals"},
  { id: 4, title: "TOP SELLING" ,section:"topSelling"},
];

// Desktop search
const searchQuery = ref('');
const openSearchModal = ref(false);
const recentSearches = ref<string[]>([]);
const lastQuery = ref('');
const minQueryLength = 3;

// Mobile search
const mobileSearchQuery = ref('');
const openMobileSearchModal = ref(false);
const lastMobileQuery = ref('');

const { searchResults, isSearching } = useSearchProduct(searchQuery);
const { searchResults: mobileSearchResults, isSearching: isMobileSearching } = useSearchProduct(mobileSearchQuery);

// Load recent searches from localStorage
onMounted(() => {
  const savedSearches = localStorage.getItem('recentSearches');
  if (savedSearches) {
    recentSearches.value = JSON.parse(savedSearches);
  }
});

// Desktop search functions
const executeSearch = async () => {
  const query = searchQuery.value.trim();
  
  if (query === lastQuery.value) return;
  if (query.length < minQueryLength && query.length > 0) return;
  
  lastQuery.value = query;
  
  if (query) {
    openSearchModal.value = true;
  } else {
    openSearchModal.value = false;
  }
};

const handleSearchInput = useDebounceFn(executeSearch, 800, { trailing: true, leading: false });

const handleSearchBlur = () => {
  setTimeout(() => {
    openSearchModal.value = false;
  }, 200);
};

const clearSearch = () => {
  searchQuery.value = '';
  lastQuery.value = '';
  openSearchModal.value = false;
};

// Mobile search functions
const toggleMobileSearch = () => {
  mobileSearchOpen.value = !mobileSearchOpen.value;
  if (mobileSearchOpen.value) {
    nextTick(() => {
      mobileSearchInput.value?.focus();
    });
  } else {
    openMobileSearchModal.value = false;
  }
};

const closeMobileSearch = () => {
  mobileSearchOpen.value = false;
  openMobileSearchModal.value = false;
};

const executeMobileSearch = async () => {
  const query = mobileSearchQuery.value.trim();
  
  if (query === lastMobileQuery.value) return;
  if (query.length < minQueryLength && query.length > 0) return;
  
  lastMobileQuery.value = query;
  
  if (query) {
    openMobileSearchModal.value = true;
  } else {
    openMobileSearchModal.value = false;
  }
};

const handleMobileSearchInput = useDebounceFn(executeMobileSearch, 800, { trailing: true, leading: false });

const handleMobileSearchBlur = () => {
  setTimeout(() => {
    if (!mobileSearchQuery.value) {
      openMobileSearchModal.value = false;
    }
  }, 200);
};

const clearMobileSearch = () => {
  mobileSearchQuery.value = '';
  lastMobileQuery.value = '';
  openMobileSearchModal.value = false;
};

// Common functions
const performSearch = () => {
  const query = searchQuery.value.trim();
  if (query === '') return;
  
  addToRecentSearches(query);
  navigateTo(`/search?q=${encodeURIComponent(query)}`);
  openSearchModal.value = false;
};

const performMobileSearch = () => {
  const query = mobileSearchQuery.value.trim();
  if (query === '') return;
  
  addToRecentSearches(query);
  navigateTo(`/search?q=${encodeURIComponent(query)}`);
  closeMobileSearch();
};

const addToRecentSearches = (query: string) => {
  if (!recentSearches.value.includes(query)) {
    recentSearches.value.unshift(query);
    if (recentSearches.value.length > 5) {
      recentSearches.value.pop();
    }
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value));
  }
};

const selectRecentSearch = (search: string) => {
  searchQuery.value = search;
  openSearchModal.value = true;
  lastQuery.value = '';
  executeSearch();
};

const selectMobileRecentSearch = (search: string) => {
  mobileSearchQuery.value = search;
  openMobileSearchModal.value = true;
  lastMobileQuery.value = '';
  executeMobileSearch();
};

const removeRecentSearch = (index: number) => {
  recentSearches.value.splice(index, 1);
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value));
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    mobileSearchOpen.value = false;
  }
};
</script>