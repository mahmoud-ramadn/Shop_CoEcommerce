<template>
  <div class="container bg-gray-100 md:py-16cl  pb-6 pt-10 rounded-3xl md:px-16   ">
    <ui-title title="BROWSE BY DRESS STYLE" />
    <nuxt-link  to="Category" class="mt-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      <div
        v-for="(item, index) in sectionData"
        :key="index"
        class="bg-white flex justify-end overflow-hidden rounded-2xl relative md:h-[289px] h-[190px]"
        :class="`${item.clo}  col-span-1 `"
      >
      <h1 class=" absolute md:left-9 left-6   z-40 top-4  md:font-bold  font-medium md:text-4xl text-2xl  md:top-6">{{ item.title }}</h1>
        <img :src="item.img" alt="pic" class="h-full  w-full shrink-0 object-cover hover:scale-105 duration-300 delay-100 transition-all" />
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import one from "@/assets/images/DRESS STYEL/image 11.webp";
import two from "@/assets/images/DRESS STYEL/image 12.webp";
import three from "@/assets/images/DRESS STYEL/image 13.webp";
import four from "@/assets/images/DRESS STYEL/image 14.webp";

const sectionData = [
  {
    id: "1",
    img: one,
    title: "Casual",
    clo: "lg:col-span-1",
  },
  {
    id: "2",
    img: two,
    title: "Formal",
    clo: "lg:col-span-2",
  },
  {
    id: "3",
    img: three,
    title: "Party",
    clo: "lg:col-span-2",
  },
  {
    id: "4",
    img: four,
    title: "Gym",
    clo: "lg:col-span-1",
  },
];
</script>

<style scoped></style>
