<template>
    <div class=" flex  flex-col  items-center">
<div class=" w-full flex justify-between items-center">
    <h1 class=" font-bold md:text-2xl text-xl ">All Reviews <span class=" font-normal text-black/60 md:text-base text-sm">(24)</span></h1>

    <div class=" flex items-center gap-5 md:py-8 py-6  ">
        <span class=" bg-gray-100 flex items-center  p-3  cursor-pointer justify-center rounded-full">
            <Icon name="lets-icons:filter"  class=" md:size-6 size-5   text-black " />
        </span>
        <span class=" md:block hidden ">
            <the-select-menu  />
        </span>
        <button class=" rounded-full bg-black md:text-base text-sm text-white  md:px-7 px-4 py-3 w-fit shrink-0">Write a Review</button>
    </div>
</div>
<div class=" w-full   grid md:grid-cols-2  md:gap-5  gap-4 grid-cols-1">
    <div v-for="reviw in 6" :key="'full'+ reviw " class="  md:py-7  md:px-8 p-6 rounded-2xl border bg-white">
         <Icon v-for="star in 5" 
          :key="'full-' + star"
          name="ic:baseline-star" 
          width="18px" 
          height="18px" 
          style="color: #FFC633" 
        /> 
        <h3 class=" md:font-bold md:text-lg  font-medium     ">Sarah M. <span class=" px-1"><Icon name="material-symbols:verified" width="20px" height="20px"  style="color: #01AB31" class="" /></span></h3> 
     <p class=" md:text-base text-sm md:mt-3 mt-2 text-black/60">"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."</p>
     <p class=" font-medium md:text-base text-sm  md:mt-6 mt-4 text-black/60">Posted on August 16, 2023</p>
    </div>
  

</div>

 <button class="rounded-full md:mt-8 mt-5 border md:text-base text-sm font-medium shadow-sm py-4 md:px-10  px-8 md:w-fit ">
Load More Reviews
</button>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>