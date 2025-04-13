<template>
    <div class=" md:p-8 p-6 w-fit  rounded-3xl border">
       <Icon v-for="star in 5" 
          :key="'full-' + star"
          name="ic:baseline-star" 
          width="18px" 
          height="18px" 
          style="color: #FFC633" 
        /> 
        <h3 class=" md:font-bold md:text-lg  font-medium    ">Sarah M. <span class=" px-1"><Icon name="material-symbols:verified" width="20px" height="20px"  style="color: #01AB31" class="" /></span></h3> 
        <p class=" text-black/60  md:text-base text-sm">"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”</p>
         
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>