<template>
  <div class="container px-0">
    <span class=" px-4">
      <bread-cram current-page="Casual" />
  </span>
    <div class="grid lg:grid-cols-6  md:grid-cols-2 grid-cols-1 md:gap-x-5">
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
        class=" md:col-span-2 lg:col-span-2 md    border  md:h-fit h-full rounded-xl px-3"
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
        <div class=" w-full md:max-h-none overflow-y-auto">
          <!-- Clothes Type -->
          <div class="filter-section">
            <div 
              class="filter-header"
              @click="toggleSection('clothesType')"
            >
              <p class="flex justify-between items-center text-black/60 w-full">
                Category
                <Icon
                  :name="sections.clothesType.open ? 'iconamoon:arrow-up-2-bold' : 'weui:arrow-filled'"
                  width="8px"
                  height="16px"
                  style="color: #535353"
                />
              </p>
            </div>
            <div v-if="sections.clothesType.open" class="filter-content">
              <div v-for="(item,index) in  new Set(product.map((item)=>item.category))"
                :key="index"
                class="flex items-center mb-3 last:mb-0"
              >
                <input 
                  type="checkbox" 
                  :id="`clothes-${index}`"
                  v-model="sections.clothesType.selected"
                  :value="item"
                  class="mr-2"
                >
                <label :for="`clothes-${index}`">{{ item }}</label>
              </div>
            </div>
          </div>

          <!-- Price -->
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
            <the-slider 
              v-if="sections.price.open" 
              v-model="priceRange"
              @change="handlePriceChange"
              
            />
          </div>

          <!-- Colors -->
          <div class="filter-section">
            <div 
              class="filter-header"
              @click="toggleSection('colors')"
            >
              <div class="w-full flex justify-between items-center">
                <h1 class="font-bold text-xl">Colors</h1>
                <Icon
                  :name="sections.colors.open ? 'iconamoon:arrow-up-2-bold' : 'weui:arrow-filled'"
                  width="8px"
                  height="16px"
                  style="color: #535353"
                  class="cursor-pointer"
                />
              </div>
            </div>
            <div v-if="sections.colors.open" class="filter-content">
              <div class="flex items-center flex-wrap justify-between gap-2 mt-3">
                <div
                  v-for="(item, index) in circelsColor"
                  :key="index"
                  @click="selectColor(index)"
                  class="size-10 rounded-full flex items-center border justify-center cursor-pointer"
                  :class="[item.value, { 'ring-2 ring-offset-2 ring-black': selectedColorIndex === index }]"
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
          </div>

          <!-- Size -->
          <div class="filter-section">
            <div 
              class="filter-header"
              @click="toggleSection('size')"
            >
              <div class="w-full flex justify-between items-center">
                <h1 class="font-bold text-xl">Size</h1>
                <Icon
                  :name="sections.size.open ? 'iconamoon:arrow-up-2-bold' : 'weui:arrow-filled'"
                  width="8px"
                  height="16px"
                  style="color: #535353"
                  class="cursor-pointer"
                />
              </div>
            </div>
            <div v-if="sections.size.open" class="filter-content">
              <div class="flex items-center flex-wrap gap-3 mt-3">
                <span
                  v-for="(item, index) in circelslSizes"
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
          </div>

          <!-- Dress Style -->
          <div class="filter-section">
            <div 
              class="filter-header"
              @click="toggleSection('dressStyle')"
            >
              <div class="w-full flex justify-between items-center">
                <h1 class="font-bold text-xl">Dress Style</h1>
                <Icon
                  :name="sections.dressStyle.open ? 'iconamoon:arrow-up-2-bold' : 'weui:arrow-filled'"
                  width="8px"
                  height="16px"
                  style="color: #535353"
                  class="cursor-pointer"
                />
              </div>
            </div>
            <div v-if="sections.dressStyle.open" class="filter-content">
              <div 
                v-for="(item) in DressStyle"
                :key="item.id"
                class="flex items-center mb-3 last:mb-0"
              >
                <input 
                  type="checkbox" 
                  :id="`style-${item.id}`"
                  v-model="sections.dressStyle.selected"
                  :value="item.id"
                  class="mr-2"
                >
                <label :for="`style-${item.id}`">{{ item.type }}</label>
              </div>
            </div>
          </div>


        </div>

        <Button 
          @click="applyFilters"
          class="rounded-full bg-black text-white md:text-lg py-4 font-bold w-full md:mt-6 mt-5"
        >
          Apply filter
          <span v-if="activeFiltersCount > 0" class="ml-2">
            ({{ activeFiltersCount }})
          </span>
        </Button>
      </div>
      <div class="md:col-span-2 lg:col-span-4 md:mb-20 mb-12">
         <div
          class="flex  justify-around    w-full items-center md:pb-6 pb-7"
        >
          <h2 class="font-bold md:text-4xl text-2xl">Casual</h2>
          <div class="flex items-center gap-2">
            <span class="text-black/60 md:text-base text-sm shrink-0"
              >Showing {{ filteredProducts.length }} of {{ product.length }} Products :</span
            >
            <the-reuse-selected
              placeholder="sort by"
              label="Sort by"
              :items="[
                { value: 'Most popular', label: 'Most popular' },
                { value: 'Price: Low to High', label: 'Price: Low to High' },
                { value: 'Price: High to Low', label: 'Price: High to Low' },
                { value: 'Newest', label: 'Newest' },
                { value: 'Rating', label: 'Rating' },
              ]"
              trigger-class="bg-transparent shadow-none border-0 outline-none"
              v-model="sortOption"
            />
          </div>
        </div>
        <div
          class="grid grid-cols-2 md:gap-5 border-b md:pb-8 pb-6 md:px-0 px-3  overflow-hidden gap-3 md:grid-cols-3"
        >
         <nuxt-link :to="`singlProduct/${product.id}`"  :key="product.id" v-for="product in filteredProducts">
           <card-product
            
             
             :image="product.images[0]"
             :name="product.title"
             :rating="product.rating"
             :price="product.price"
             color="red"
             size="xl"
             :category="product.category"
             style=""
           />
         </nuxt-link>
        </div>
        <div class="flex justify-center w-full pt-5">
          <the-pagenation 
            :total-items="filteredProducts.length" 
            :items-per-page="9"
            v-model="currentPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const {product,pending,error}= await useProducts();

const filterPanelVisible = ref(false);
const toggleFilterPanel = () => {
  filterPanelVisible.value = !filterPanelVisible.value;
};

const sections = reactive({
  clothesType: {
    open: true,
    selected: [] as number[]
  },
  price: {
    open: true,
    min: 0,
    max: 500
  },
  colors: {
    open: true,
    selected: null as number | null
  },
  size: {
    open: true,
    selected: null as number | null
  },
  dressStyle: {
    open: true,
    selected: [] as number[]
  }
});

const priceRange = ref([0, 500]);
const selectedColorIndex = ref<number | null>(null);
const selectedSizeIndex = ref<number | null>(null);
const sortOption = ref('Most popular');
const currentPage = ref(1);

// Toggle section
const toggleSection = (section: keyof typeof sections) => {
  sections[section].open = !sections[section].open;
};


const filteredProducts = ref([...product]);

const clothesType = [
  { id: 1, type: "T-shirts" },
  { id: 2, type: "Shorts" },
  { id: 3, type: "Shirts" },
  { id: 4, type: "Hoodie" },
  { id: 5, type: "Jeans" },
];

const DressStyle = [
  { id: 1, type: "Casual" },
  { id: 2, type: "Formal" },
  { id: 3, type: "Party" },
  { id: 4, type: "Gym" },
];

const circelsColor = ref([
  { value: "bg-[#4F4631]" },
  { value: "bg-[#314F4A]" },
  { value: "bg-[#7D06F5]" },
  { value: "bg-[#F506A4]" },
  { value: "bg-[#FFFFFF]" },
  { value: "bg-[#000000]" },
  { value: "bg-[#F50606]" },
  { value: "bg-[#06CAF5]" },
  { value: "bg-[#00C12B]" },
]);

const circelslSizes = ref([
  { value: "Small" },
  { value: "X-Small" },
  { value: "Medium" },
  { value: "Large" },
  { value: "X-Large" },
]);

const selectColor = (index: number) => {
  selectedColorIndex.value = selectedColorIndex.value === index ? null : index;
  sections.colors.selected = selectedColorIndex.value;
};

const selectSize = (index: number) => {
  selectedSizeIndex.value = selectedSizeIndex.value === index ? null : index;
  sections.size.selected = selectedSizeIndex.value;
};

const handlePriceChange = (values: number[]) => {
  priceRange.value = values;
  sections.price.min = values[0];
  sections.price.max = values[1];
};

// Count active filters
const activeFiltersCount = computed(() => {
  let count = 0;
  if (sections.clothesType.selected.length > 0) count++;
  if (sections.price.min > 0 || sections.price.max < 500) count++;
  if (sections.colors.selected !== null) count++;
  if (sections.size.selected !== null) count++;
  if (sections.dressStyle.selected.length > 0) count++;
  return count;
});

const hasFiltersApplied = computed(() => activeFiltersCount.value > 0);

// Apply filters
const applyFilters = () => {
  filteredProducts.value = product.filter(product => {
    // Category filter
    if (sections.clothesType.selected.length > 0 && 
        !sections.clothesType.selected.includes(product?.category)) {
      return false;
    }
    
    // Price filter
    if (product.price < sections.price.min || product.price > sections.price.max) {
      return false;
    }
    
    // // Color filter
    // if (sections.colors.selected !== null && 
    //     product.color !== circelsColor.value[sections.colors.selected].value.replace('bg-[', '').replace(']', '')) {
    //   return false;
    // }
    
    // // Size filter
    // if (sections.size.selected !== null && 
    //     product.size !== circelslSizes.value[sections.size.selected].value) {
    //   return false;
    // }
    
    // // Style filter
    // if (sections.dressStyle.selected.length > 0 && 
    //     !sections.dressStyle.selected.includes(product.style)) {
    //   return false;
    // }
    
    return true;
  });

  // Apply sorting
  applySorting();

  // Close filter panel on mobile after applying
  if (window.innerWidth < 768) {
    filterPanelVisible.value = false;
  }
};

// Apply sorting
const applySorting = () => {
  switch(sortOption.value) {
    case 'Price: Low to High':
      filteredProducts.value.sort((a, b) => a.price - b.price);
      break;
    case 'Price: High to Low':
      filteredProducts.value.sort((a, b) => b.price - a.price);
      break;
    case 'Rating':
      filteredProducts.value.sort((a, b) => b.rating - a.rating);
      break;
    // Add more sorting options as needed
    default:
      // Default sorting (Most popular or whatever you prefer)
      break;
  }
};

// Reset all filters
const resetFilters = () => {
  sections.clothesType.selected = [];
  sections.price.min = 0;
  sections.price.max = 500;
  priceRange.value = [0, 500];
  sections.colors.selected = null;
  selectedColorIndex.value = null;
  sections.size.selected = null;
  selectedSizeIndex.value = null;
  sections.dressStyle.selected = [];
  sortOption.value = 'Most popular';
  
  filteredProducts.value = [...product];
};

// Watch for sort option changes
watch(sortOption, () => {
  applySorting();
});
</script>

<style scoped>


/* Mobile styles */
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
</style>











