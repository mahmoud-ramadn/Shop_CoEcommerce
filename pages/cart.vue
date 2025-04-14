<template>
    <div class=" container">
  <bread-cram current-page="cart" />
  <h1 class=" font-bold md:text-5xl text-4xl ">Your cart</h1>
  <div class=" md:mt-6 mt-5 grid lg:grid-cols-5  md:grid-cols-2 grid-cols-1 gap-5">
    <div class="lg:col-span-3  md:col-span-2  border  rounded-xl md:px-6 px-5 md:py-6 py-5  md:space-y-6 space-y-4">
        <div v-for="product in 3" :key="product + 1" class=" flex  items-start md:gap-x-4 gap-x-3  border-b md:pb-6 pb-4">
            <img src="@/assets/images/clothes/image 2.png" alt="itme_cart"  class=" md:size-32 size-24 rounded-2xl shrink-0">
            <div class=" w-full ">
                                <Icon name="heroicons:trash-solid"   style="color: #FF3333" class=" size-5 cursor-pointer  float-end" />

                <h1 class=" font-bold md:text-lg ">Gradient Graphic T-shirt</h1>
                <p class=" md:text-base text-sm  py-1">Size: <span class=" text-black/60">Large</span></p>
                <p class=" md:text-base text-sm">Color: <span class=" text-black/60">White</span></p>
                <div class=" flex justify-between items-center">
                    <P class=" font-bold md:text-2xl text-xl  md:pt-4  pt-3">$145</P>
                    <div class="   bg-gray-100 flex items-center  gap-x-5 rounded-full md:px-5 px-3  md:py-3 py-2"> <Icon name="pepicons-pop:minus" class=" md:size-6  text-black size-5 cursor-pointer "  @click="()=>count--"  /><span class=" md:text-base text-sm">{{ count }}</span> <Icon name="pepicons-pop:plus" class=" md:size-6  cursor-pointer size-5 "  @click="()=>count++"  /></div>

                </div>
            </div>
        </div>

    </div>
    <div class=" lg:col-span-2   md:col-span-2 h-fit  border  rounded-xl md:px-6 px-5 md:py-6 py-5">
        <h2 class=" font-bold  md:text-2xl  text-xl">Order Summary</h2>
        <div class="  space-y-5">
            <p class=" flex  justify-between items-center   md:text-xl  text-base text-black/60 ">Subtotal <span class=" font-bold md:text-xl  text-sm text-black ">$565</span></p>
            <p class=" flex  justify-between items-center   md:text-xl  text-base text-black/60 ">Discount (-20%) <span class=" font-bold md:text-xl  text-sm  text-red-100 ">-$113</span></p>
            <p class=" flex  justify-between items-center   md:text-xl  text-base text-black/60 ">Delivery Fee <span class=" font-bold md:text-xl  text-sm text-black ">$15</span></p>
        </div>
        <p class=" flex  justify-between items-center   md:text-xl  text-base pt-5 ">Total<span class=" font-bold md:text-2xl text-xl   text-black ">$467</span></p>
        <div class=" w-full flex items-center gap-x-3 relative md:my-6 my-4">
            <img src="/assets/images/clothes/sale.png" alt="sale" class=" absolute  left-3  top-1/2  -translate-y-1/2">
            <Input class="  bg-gray-100  w-full  flex items-center justify-center   md:text-base text-sm  focus:ring-4 outline-none  focus:ring-blue-300  rounded-full md:py-4   pl-11  text-white py-3 " placeholder="Add promo code"/>
            <Button class="  bg-black  flex items-center justify-center shrink-0  font-medium md:text-base text-sm  rounded-full  md:py-4  py-3 md:px-9  text-white h-full px-6">Apply</Button>
        </div>
        <Button class=" bg-black  flex items-center justify-center  font-medium md:text-base text-sm  rounded-full md:py-5 w-full text-white py-4"> <span>Go to Checkout </span><span  class=" pl-3"><Icon name="maki:arrow" width="15px" height="15px"  style="color: #FFFFFF" /></span></Button>
    </div>

  </div>
</div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'cart',
  description: 'Review and manage items in your shopping cart. Proceed to checkout or continue shopping.',
  ogTitle: 'Your Shopping Cart | Store Name',
  ogDescription: 'Review and manage items in your shopping cart at Store Name',
  ogUrl: 'cart',
  ogType: 'website',
  robots: 'noindex' // For user-specific carts
})
const count=ref(1)

</script>

<style scoped>

</style>