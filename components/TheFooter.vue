<template>
        <footer class="bg-gray-100 pt-24 px-4  relative pb-12">
            <div class=" container md:w-full  w-[96%]  bg-black  rounded-3xl flex-wrap mb-10  gap-y-8 justify-center md:py-11 md:px-16 py-8 px-6 flex lg:justify-between items-center  ">
                <h1 class="  md:basis-2/3 w-full  md:pr-32 font-bold md:text-5xl text-4xl text-white ">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
                <div class=" md:basis-1/3 w-full   space-y-6 ">
                    
                           <Input class=" bg-white  flex items-center justify-center  font-medium md:text-base text-sm  rounded-full md:py-5 w-full text-white py-4  md:placeholder:text-base pl-5   placeholder:text-sm" placeholder="Enter your email address"/> 
                           <Button class=" bg-white  flex items-center justify-center   font-medium md:text-base text-sm  rounded-full md:py-5 w-full   py-4">Subscribe to Newsletter</Button>
    
                </div>
            </div>
            
            <div class="container ">
                <div class="flex lg:flex-row flex-col border-b   border-black  md:pb-12 pb-10 justify-between md:gap-40  gap-14 ">
                    <!-- Brand Column -->
                    <div class="w-full max-w-[280px]">
                        <img src="/assets/images/SHOP.CO.webp" alt="SHOP.CO logo" class="h-8">
                        <p class="text-gray-600 mt-6 mb-8 text-sm leading-relaxed">
                            We have clothes that suit your style and which you're proud to wear. 
                            From women to men, we offer quality fashion for everyone.
                        </p>
                        <!-- <div class="flex space-x-4">
                            <a href="#" class="text-gray-500 hover:text-gray-700 transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                            <a href="#" class="text-gray-500 hover:text-gray-700 transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </a>
                            <a href="#" class="text-gray-500 hover:text-gray-700 transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div> -->
                    </div>
    
                    <!-- Navigation Columns -->
                    <div class="grid grid-cols-2 md:grid-cols-4 md:gap-28  gap-14 w-full md:w-auto">
                        <div>
                            <h4 class="font-medium text-gray-900 text-sm uppercase tracking-wider">Company</h4>
                            <ul class="mt-4 space-y-3">
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">About</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Features</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Works</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Career</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900 text-sm uppercase tracking-wider">Help</h4>
                            <ul class="mt-4 space-y-3">
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Customer Support</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Delivery Details</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Terms & Conditions</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900 text-sm uppercase tracking-wider">FAQ</h4>
                            <ul class="mt-4 space-y-3">
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Account</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Manage Deliveries</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Orders</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Payments</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900 text-sm uppercase tracking-wider">Resources</h4>
                            <ul class="mt-4 space-y-3">
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Free eBooks</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">Development Tutorial</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">How-to Blog</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">YouTube Playlist</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
    
        
    
                <!-- Bottom Row -->
                <div class="flex flex-col md:flex-row  md:mt-6  mt-4 justify-between items-center gap-4">
                    <p class="text-gray-500 text-sm">
                     Shop.co © 2000-2023, All Rights Reserved                </p>
                    <!-- <div class="flex items-center space-x-6">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span class="text-gray-600 text-sm">+1 (555) 123-4567</span>
                        </div>
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span class="text-gray-600 text-sm">support@shop.co</span>
                        </div>
                    </div> -->
                </div>
            </div>
        </footer>
</template>

<script setup lang="ts">
// You can add any necessary script logic here
</script>

<style scoped>
/* Add any custom styles here */
</style>