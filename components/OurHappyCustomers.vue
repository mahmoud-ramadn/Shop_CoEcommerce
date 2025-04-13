<template>
  <div class="md:mt-20 mt-12 "> 
    <div class="container flex justify-between items-center">
      <ui-title title="OUR HAPPY CUSTOMERS" class="text-start" /> 
      <div class="gap-x-4 flex items-center">
        <button @click="swiper.prev()" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Icon name="line-md:arrow-right" class="size-6 -rotate-180 text-gray-700" />
        </button>
        <button @click="swiper.next()" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Icon name="line-md:arrow-right" class="size-6 text-gray-700" />
        </button>
      </div>
    </div>
    
    <div class="md:pt-10 pt-6 md:pb-20 relative pb-12">
      <ClientOnly >
        <swiper-container 
        ref="containerRef"
          v-bind="swiperOptions"
          :breakpoints="breakpoints"
          class="pt-14 pb-8 px-4     "
        >
          <swiper-slide
            v-for="(card) in CardsText"
            :key="card.id"
          >
            <customer-card 
              :title="card.title"
              :description="card.des"
              :image="card.img"
              :bg-color="card.color"
            />
          </swiper-slide>
        </swiper-container>
         <div class="absolute inset-y-0 left-0  w-[15%] bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
          <div class="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
        
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
  const containerRef = ref(null)
const swiper = useSwiper(containerRef)

import tshirtImage  from  '../assets/images/clothes/image 7.png'

const CardsText = [
  {
    id: '1',
    title: "Homerun's Guide to Hiring Process",
    des: 'Helps save you from the chaos of an unstructured hiring process.',
    img: tshirtImage,
    color: 'bg-[#07A2BB]'
  },
  {
    id: '2',
    title: "Streamlined Recruitment Solutions",
    des: 'Making hiring efficient and effective for teams of all sizes.',
    img: tshirtImage,
    color: 'bg-[#E7D472]'
  },
  {
    id: '3',
    title: "Talent Acquisition Made Simple",
    des: 'Reducing hiring time while improving candidate quality.',
    img: tshirtImage,
    color: 'bg-[#EDCBCC]'
  },
  {
    id: '4',
    title: "Modern Hiring Practices",
    des: 'Stay ahead with our innovative recruitment strategies.',
    img: tshirtImage,
    color: 'bg-[#07A2BB]'
  },
  {
    id: '5',
    title: "Modern Hiring Practices",
    des: 'Stay ahead with our innovative recruitment strategies.',
    img: tshirtImage,
    color: 'bg-[#07A2BB]'
  },
  
];

const breakpoints = {
  0: {
    slidesPerView: 1.1,
    spaceBetween: 10
  },
  320: {
    slidesPerView: 1.1,
    spaceBetween: 15
  },
  640: {
    slidesPerView: 2,
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
    slidesPerView: 2.5,
    spaceBetween: 20,


  },
  1700: {
    slidesPerView: 4,
    spaceBetween: 20,


  }
};

const swiperOptions = {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  loop: true,
  grabCursor: true,
  slideToClickedSlide: true,
  navigation: false
};
</script>

<style scoped>
.swiper-slide:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
</style>