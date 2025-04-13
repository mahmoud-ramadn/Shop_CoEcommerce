<template>
  <div class="grid lg:grid-cols-2 grid-cols-1 md:gap-10 gap-5">
    <!-- product images -->
    <div  class="  flex items-start   md:flex-row flex-col-reverse gap-3 h-full">
        <div class="  md:basis-1/4  w-full   md:h-full  rounded col-span-1  flex md:flex-col justify-between flex-row  md:gap-4   gap-3  ">
           <div class=" rounded  basis-1/3 ">
            <img src="@/assets/images/clothes/image 3.png" alt="produc_img" class=" shrink-0 w-full rounded  object-cover h-full ">

           </div>
           <div class=" rounded  basis-1/3   ">
                        <img src="@/assets/images/clothes/image 3.png" alt="produc_img" class=" shrink-0 w-full rounded  object-cover h-full ">

           </div>
           <div class=" rounded  basis-1/3     ">

                        <img src="@/assets/images/clothes/image 3.png" alt="produc_img" class=" shrink-0 w-full rounded  object-cover h-full ">

           </div>
        </div>
        <div class="   md:basis-3/4 w-full  md:h-full   overflow-hidden rounded ">
            <img src="@/assets/images/clothes/image 3.png" alt="produc_img" class=" shrink-0 w-full rounded md:aspect-square  aspect-[3/4] object-cover h-full ">
        </div>


    </div>
    <!-- product info -->
    <div>
      <div class="border-b pb-6">
        <h1 class="font-bold md:text-5xl text-2xl">One Life Graphic T-shirt</h1>
        <div class="flex md:py-[8px] py-[4px]">
          <Icon
            v-for="star in fullStars"
            :key="'full-' + star"
            name="ic:baseline-star"
            width="18px"
            height="18px"
            style="color: #ffc633"
          />
          <Icon
            v-if="hasHalfStar"
            name="la:star-half-solid"
            width="18px"
            height="18px"
            style="color: #ffc633"
          />
          <span class="pl-4">4.5/5</span>
        </div>
        <h1 class="md:font-bold md:text-4xl text-2xl flex items-center gap-3">
          $260 <span class="text-black/40 line-through">$300</span>
          <span
            class="py-1 px-4 font-medium md:text-base text-sm bg-red-100/10 rounded-full text-red-100"
            >-40%</span
          >
        </h1>

        <p class="text-black/60 md:text-base text-sm mt-5">
          This graphic t-shirt which is perfect for any occasion. Crafted from a
          soft and breathable fabric, it offers superior comfort and style.
        </p>
      </div>
      <div class="border-b py-6">
        <h4 class="text-black/60 md:text-base text-sm">Select Colors</h4>
        <div class="flex items-center gap-3 mt-5">
          <div
            v-for="(item, index) in circelsColor"
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
      <div class="border-b py-6">
        <h4 class="text-black/60 md:text-base text-sm">Choose Size</h4>
        <div class="flex items-center  flex-wrap gap-3 mt-5">
          <span
            v-for="(item, index) in circelslSizes"
            :key="index"
            @click="selectSize(index)"
            class="rounded-full  md:py-3 md:px-6 py-2 px-5 cursor-pointer"
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
      <div class=" flex items-center gap-3 md:gap-5 pt-6" >
          <div class="  basis-1/4 bg-gray-100 flex items-center justify-evenly  rounded-full md:py-4 py-3"> <Icon name="pepicons-pop:minus" class=" md:size-6  text-black size-5 cursor-pointer "  @click="()=>count--"  /><span class=" md:text-base text-sm">{{ count }}</span> <Icon name="pepicons-pop:plus" class=" md:size-6  cursor-pointer size-5 "  @click="()=>count++"  /></div>
          <Button class=" basis-3/4 bg-black text-white  rounded-full md:py-4 py-3 md:text-base tex-sm font-medium ">Add to Cart</Button>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const selectedColorIndex = ref<number | null>(0);
const selectedSizeIndex = ref<number | null>(2);
const count=ref(1)

const circelsColor = ref([
  { value: "bg-[#4F4631]" },
  { value: "bg-[#314F4A]" },
  { value: "bg-[#314F4A]" },
]);

const circelslSizes = ref([
  { value: "Small" },
  { value: "Medium" },
  { value: "Large" },
  { value: "X-Large" },
]);

const selectColor = (index: number) => {
  selectedColorIndex.value = index;
};

const selectSize = (index: number) => {
  selectedSizeIndex.value = index;
};

const selectedColor = computed(() => {
  return selectedColorIndex.value !== null
    ? circelsColor.value[selectedColorIndex.value].value
    : null;
});

const fullStars = computed(() => Math.floor(3));
const hasHalfStar = computed(() => 0.5 % 1 >= 0.5);
</script>

<style scoped></style>