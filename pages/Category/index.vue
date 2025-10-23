<template>
  <div class="container px-0">
    <span class="px-4">
      <bread-cram current-page="Casual" />
    </span>
    <div class="grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 md:gap-x-5">
      <!-- Mobile filter toggle button -->
      <div class="md:hidden flex justify-end px-4 mb-4 col-span-full">
        <button 
          @click="toggleFilterPanel"
          class="flex items-center gap-2 px-4 py-2 border rounded-lg"
        >
          <Icon name="lets-icons:filter" class="size-5" />
          <span>Filters</span>
          <span v-if="activeFiltersCount > 0" class="bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ activeFiltersCount }}
          </span>
        </button>
      </div>

      <!-- Filter panel -->
      <div 
        class="md:col-span-2 lg:col-span-2 md border md:h-fit h-full rounded-xl px-3"
        :class="{
          'hidden md:block': !filterPanelVisible,
          'fixed inset-0 z-50 bg-white overflow-y-auto md:static md:z-auto md:overflow-y-visible': filterPanelVisible
        }"
      >
        <!-- Panel header with close button for mobile -->
        <div class="w-full flex justify-between items-center border-b mb:pb-6 pb-4">
          <h1 class="font-bold text-xl">Filters</h1>
          <div class="flex items-center gap-4">
            <button 
              v-if="hasFiltersApplied" 
              @click="resetFilters"
              class="text-sm text-gray-500 hover:text-black"
            >
              Reset
            </button>
            <Icon
              v-if="filterPanelVisible"
              name="material-symbols:close"
              class="size-6 cursor-pointer md:hidden"
              @click="toggleFilterPanel"
            />
            <Icon
              v-else
              name="lets-icons:filter"
              class="size-6 cursor-pointer hidden md:block"
              style="color: #535353"
            />
          </div>
        </div>

        <!-- Filter sections -->
        <div class="w-full md:max-h-none overflow-y-auto">
          <!-- Search -->
          <div class="filter-section mb-4">
            <div class="filter-header">
              <h1 class="font-bold text-xl mb-3">Search</h1>
            </div>
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              @keyup.enter="applyFilters"
            />
          </div>

          <!-- Category -->
          <div class="filter-section">
            <div 
              class="filter-header"
              @click="toggleSection('category')"
            >
              <p class="flex justify-between items-center text-black/60 w-full">
                Category
                <Icon
                  :name="sections.category.open ? 'iconamoon:arrow-up-2-bold' : 'weui:arrow-filled'"
                  width="8px"
                  height="16px"
                  style="color: #535353"
                />
              </p>
            </div>
            <div v-if="sections.category.open" class="filter-content">
              <div 
                v-for="category in categories"
                :key="category.slug"
                class="flex items-center mb-3 last:mb-0"
              >
                <input 
                  type="radio" 
                  :id="`category-${category.slug}`"
                  v-model="selectedCategory"
                  :value="category.slug"
                  class="mr-2"
                  name="category"
                >
                <label :for="`category-${category.slug}`" class="capitalize cursor-pointer">
                  {{ category.name }}
                </label>
              </div>
              <div class="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="category-all"
                  v-model="selectedCategory"
                  value=""
                  class="mr-2"
                  name="category"
                >
                <label for="category-all" class="cursor-pointer">All Categories</label>
              </div>
            </div>
          </div>

          <!-- Price Range -->
          <div class="filter-section">
            <div 
              class="filter-header"
              @click="toggleSection('price')"
            >
              <div class="w-full flex justify-between items-center">
                <h1 class="font-bold text-xl">Price</h1>
                <Icon
                  :name="sections.price.open ? 'iconamoon:arrow-up-2-bold' : 'weui:arrow-filled'"
                  width="8px"
                  height="16px"
                  style="color: #535353"
                  class="cursor-pointer"
                />
              </div>
            </div>
            <div v-if="sections.price.open" class="filter-content">
              <div class="space-y-3 mt-3">
                <div class="flex gap-2 items-center">
                  <input 
                    v-model.number="priceMin"
                    type="number"
                    placeholder="Min"
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    min="0"
                  />
                  <span>-</span>
                  <input 
                    v-model.number="priceMax"
                    type="number"
                    placeholder="Max"
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Sort By -->
          <div class="filter-section">
            <div 
              class="filter-header"
              @click="toggleSection('sort')"
            >
              <div class="w-full flex justify-between items-center">
                <h1 class="font-bold text-xl">Sort By</h1>
                <Icon
                  :name="sections.sort.open ? 'iconamoon:arrow-up-2-bold' : 'weui:arrow-filled'"
                  width="8px"
                  height="16px"
                  style="color: #535353"
                  class="cursor-pointer"
                />
              </div>
            </div>
            <div v-if="sections.sort.open" class="filter-content">
              <div 
                v-for="option in sortOptions"
                :key="option.value"
                class="flex items-center mb-3 last:mb-0"
              >
                <input 
                  type="radio" 
                  :id="`sort-${option.value}`"
                  v-model="sortBy"
                  :value="option.value"
                  class="mr-2"
                  name="sort"
                >
                <label :for="`sort-${option.value}`" class="cursor-pointer">
                  {{ option.label }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="applyFilters"
          :disabled="isLoading"
          class="rounded-full bg-black text-white md:text-lg py-4 font-bold w-full md:mt-6 mt-5 disabled:opacity-50"
        >
          <span v-if="isLoading" class="flex items-center justify-center gap-2">
            <Icon name="eos-icons:loading" class="animate-spin" />
            Loading...
          </span>
          <span v-else>
            Apply Filters
            <span v-if="activeFiltersCount > 0" class="ml-2">
              ({{ activeFiltersCount }})
            </span>
          </span>
        </button>
      </div>

      <!-- Products Grid -->
      <div class="md:col-span-2 lg:col-span-4 md:mb-20 mb-12">
        <div class="flex justify-between w-full items-center md:pb-6 pb-7 px-4 md:px-0">
          <h2 class="font-bold md:text-4xl text-2xl">
            {{ selectedCategory ? getCategoryName(selectedCategory) : 'All Products' }}
          </h2>
          <div class="flex items-center gap-2">
            <span class="text-black/60 md:text-base text-sm shrink-0">
              {{ totalProducts }} Products
            </span>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="grid grid-cols-2 md:gap-5 md:px-0 px-3 gap-3 md:grid-cols-3">
          <div v-for="n in itemsPerPage" :key="n" class="animate-pulse">
            <div class="bg-gray-200 aspect-square rounded-lg mb-3"></div>
            <div class="bg-gray-200 h-4 rounded mb-2"></div>
            <div class="bg-gray-200 h-4 rounded w-2/3 mb-2"></div>
            <div class="bg-gray-200 h-4 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-else-if="products.length > 0" class="grid grid-cols-2 md:gap-5 border-b md:pb-8 pb-6 md:px-0 px-3 overflow-hidden gap-3 md:grid-cols-3">
          <nuxt-link 
            :to="`/singlProduct/${product.id}`" 
            :key="product.id" 
            v-for="product in products"
          >
            <card-product
              :image="product.thumbnail"
              :name="product.title"
              :rating="product.rating"
              :price="product.price"
              :category="product.category"
            />
          </nuxt-link>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <Icon name="mdi:package-variant-closed" class="size-16 mx-auto text-gray-300 mb-4" />
          <h3 class="text-xl font-semibold mb-2">No products found</h3>
          <p class="text-gray-500 mb-4">Try adjusting your filters</p>
          <Button @click="resetFilters" class="rounded-full">
            Reset Filters
          </Button>
        </div>

        <!-- Pagination Component -->
        <div v-if="!isLoading && products.length > 0 && totalProducts > itemsPerPage" class="flex justify-center w-full pt-5">
          <Pagination 
            v-slot="{ page }" 
            :items-per-page="itemsPerPage" 
            :total="totalProducts" 
            :sibling-count="1" 
            show-edges 
            :default-page="currentPage"
            @update:page="handlePageChange"
            class="w-fit p-0"
          >
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
              <PaginationFirst />
              <PaginationPrev />
              
              <template v-for="(item, index) in items">
                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                  <Button class="w-9 h-9 p-0" :variant="item.value === page ? 'default' : 'outline'">
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
              </template>
              
              <PaginationNext />
              <PaginationLast />
            </PaginationList>
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '../components/ui/pagination';

// State
const isLoading = ref(false);
const filterPanelVisible = ref(false);
const products = ref([]);
const totalProducts = ref(0);
const categories = ref([]);

// Filter states
const searchQuery = ref('');
const selectedCategory = ref('');
const priceMin = ref<number | null>(null);
const priceMax = ref<number | null>(null);
const sortBy = ref('');
const currentPage = ref(1);
const itemsPerPage = 9;

// Section toggles
const sections = reactive({
  category: { open: true },
  price: { open: true },
  sort: { open: true },
});

// Sort options
const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'title-asc', label: 'Name: A-Z' },
  { value: 'title-desc', label: 'Name: Z-A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-asc', label: 'Rating: Low to High' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
];

const toggleFilterPanel = () => {
  filterPanelVisible.value = !filterPanelVisible.value;
};

const toggleSection = (section: keyof typeof sections) => {
  sections[section].open = !sections[section].open;
};

// Get category name from slug
const getCategoryName = (slug: string) => {
  const category = categories.value.find(cat => cat.slug === slug);
  return category ? category.name : slug;
};

// Count active filters
const activeFiltersCount = computed(() => {
  let count = 0;
  if (searchQuery.value) count++;
  if (selectedCategory.value) count++;
  if (priceMin.value !== null || priceMax.value !== null) count++;
  if (sortBy.value) count++;
  return count;
});

const hasFiltersApplied = computed(() => activeFiltersCount.value > 0);

// Fetch categories on mount
const fetchCategories = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    categories.value = data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Build API URL with filters
const buildApiUrl = () => {
  let url = 'https://dummyjson.com/products';
  const params = new URLSearchParams();

  // Calculate skip for pagination
  const skip = (currentPage.value - 1) * itemsPerPage;
  params.append('limit', itemsPerPage.toString());
  params.append('skip', skip.toString());

  // Category filter
  if (selectedCategory.value) {
    url = `https://dummyjson.com/products/category/${selectedCategory.value}`;
  }

  // Search filter
  if (searchQuery.value) {
    url = 'https://dummyjson.com/products/search';
    params.append('q', searchQuery.value);
  }

  // Sort filter
  if (sortBy.value) {
    const [field, order] = sortBy.value.split('-');
    params.append('sortBy', field);
    params.append('order', order);
  }

  return `${url}?${params.toString()}`;
};

// Fetch products with filters
const fetchProducts = async () => {
  isLoading.value = true;
  
  try {
    const apiUrl = buildApiUrl();
    console.log('Fetching from:', apiUrl); // Debug log
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    let filteredProducts = data.products || [];
    
    // Apply client-side price filter (API doesn't support price range)
    if (priceMin.value !== null || priceMax.value !== null) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.price;
        const minCheck = priceMin.value === null || price >= priceMin.value;
        const maxCheck = priceMax.value === null || price <= priceMax.value;
        return minCheck && maxCheck;
      });
    }
    
    products.value = filteredProducts;
    totalProducts.value = data.total || filteredProducts.length;
    
  } catch (error) {
    console.error('Error fetching products:', error);
    products.value = [];
    totalProducts.value = 0;
  } finally {
    isLoading.value = false;
  }
};

// Apply filters
const applyFilters = async () => {
  currentPage.value = 1; // Reset to first page
  await fetchProducts();
  
  // Close filter panel on mobile after applying
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    filterPanelVisible.value = false;
  }
};

// Handle page change
const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await fetchProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Reset all filters
const resetFilters = async () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  priceMin.value = null;
  priceMax.value = null;
  sortBy.value = '';
  currentPage.value = 1;
  
  await fetchProducts();
};

// Watch for filter changes
watch([selectedCategory, sortBy], () => {
  applyFilters();
});

// Initial data fetch
onMounted(async () => {
  await fetchCategories();
  await fetchProducts();
});
</script>

<style scoped>
@media (max-width: 767px) {
  .filter-panel {
    transition: transform 0.3s ease;
  }
  
  .filter-panel-enter-active, .filter-panel-leave-active {
    transition: transform 0.3s ease;
  }
  
  .filter-panel-enter-from, .filter-panel-leave-to {
    transform: translateX(-100%);
  }
}

.filter-section {
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.filter-section:last-child {
  border-bottom: none;
}

.filter-header {
  cursor: pointer;
  padding-bottom: 0.5rem;
}

.filter-content {
  padding-top: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>