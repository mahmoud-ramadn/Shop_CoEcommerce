<template>
    <div class=" grid lg:grid-cols-2 grid-cols-1 gap-y-10">
        <div class=" md:min-h-screen  bg-yellow-100">
            <img src="/assets/images/auth.webp" alt="auth" class=" w-full  h-full shrink-0 object-cover">
        </div>
        <div class=" flex items-center  h-full  justify-center">
            <div>
                <h1 class=" font-bold md:text-3xl text-lg ">Welcome back</h1>
                <p class=" font-medium text-lg  text-black/60 ">Welcome back! Please enter your details.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
 
 definePageMeta({
    layout:'custom'
 })
</script>

<style scoped>

</style>