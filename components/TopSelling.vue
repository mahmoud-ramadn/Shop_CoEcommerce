<template>
  <div class="container py-16 flex flex-col items-center ">
    <ui-title title="TOP SELLING"/>
          <ClientOnly>
        <swiper-container 
          v-bind="swiperOptions"
          :breakpoints="breakpoints"
          class=" container px-0  pt-14  pb-8"
        >
          <swiper-slide
            v-for="(slide, idx) in CardsText.length"
            :key="idx"
          >
          <card-product 
              :image="tshirtImage"
              name="T-SHIRT WITH TAPE DETAILS"
              rating="3.5"
              price="120"
            /> 
          </swiper-slide>
        </swiper-container>
      </ClientOnly>

    <button class="rounded-full border md:text-base text-sm font-medium shadow-sm py-4 px-20 md:w-fit w-full mx-auto">
      View All
    </button>
  </div>
</template>

<script setup lang="ts">
import tshirtImage from '@/assets/images/clothes/image 7.png';

const CardsText=[
    {
    id:'1',
    title:"Homerun's Guide to Hiring Process",
    des:'Helps save you from the chaos of an unstructured hiring process.',
    img:tshirtImage,
    color:'bg-[#07A2BB]'
    },
    {
    id:'2',
    title:"Homerun's Guide to Hiring Process",
        des:'Helps save you from the chaos of an unstructured hiring process.',

    img:tshirtImage,
    color:'bg-[#E7D472]'
    },
    {
    id:'3',
    title:"Homerun's Guide to Hiring Process",
        des:'Helps save you from the chaos of an unstructured hiring process.',

    img:tshirtImage,
    color:'bg-[#EDCBCC]'
    },
     {
    id:'4',
    title:"Homerun's Guide to Hiring Process",
        des:'Helps save you from the chaos of an unstructured hiring process.',

    img:tshirtImage,
    color:'bg-[#07A2BB]'
    },
]

const breakpoints = {
  0: {
    slidesPerView: 1.1,
    spaceBetween: 10
  },
  320: {
    slidesPerView: 1.2,
    spaceBetween: 10
  }
  ,
  540: {
    slidesPerView: 1.5,
    spaceBetween: 10
  },
  640: {
    slidesPerView: 2.5,
    spaceBetween: 15
  },
  768: {
    slidesPerView: 2.5,
    spaceBetween: 15
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 20
  }
}

const swiperOptions = {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  loop: true,
  grabCursor: true,
  centeredSlides: false,
  slideToClickedSlide: true
}



</script>