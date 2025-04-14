<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
</script>

<template>
  <Tabs default-value="Rating & Reviews" class="w-full md:pb-16 pb-14 md:pt-20 pt-12">
    <!-- SEO Meta (invisible but helps search engines) -->
    <div class="sr-only">
      <h1>Premium Casual Wear Product Details</h1>
      <p>Explore our high-quality clothing collection with detailed specifications, customer reviews, and frequently asked questions.</p>
    </div>

    <TabsList class="grid w-full grid-cols-3 border-b-2 p-0 md:text-lg text-sm">
      <TabsTrigger value="Product Details">
        Product Details
      </TabsTrigger>
      <TabsTrigger value="Rating & Reviews">
        Rating & Reviews
      </TabsTrigger>
      <TabsTrigger value="FAQs">
        FAQs
      </TabsTrigger>
    </TabsList>

    <!-- Product Details Tab -->
    <TabsContent value="Product Details" class="pt-6">
      <section>
        <h2 class="text-2xl font-bold mb-4">Product Specifications</h2>
        <ul class="space-y-3">
          <li class="flex border-b pb-2">
            <span class="font-medium w-1/3">Material</span>
            <span>100% Premium Cotton</span>
          </li>
          <li class="flex border-b pb-2">
            <span class="font-medium w-1/3">Fit</span>
            <span>Regular Fit</span>
          </li>
          <li class="flex border-b pb-2">
            <span class="font-medium w-1/3">Care Instructions</span>
            <span>Machine wash cold, tumble dry low</span>
          </li>
          <li class="flex border-b pb-2">
            <span class="font-medium w-1/3">Origin</span>
            <span>Ethically sourced materials</span>
          </li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">Description</h2>
        <p class="text-gray-700 leading-relaxed">
          Our premium casual wear combines comfort and style for everyday wear. The fabric is 
          specially treated for softness and durability, with reinforced stitching at stress 
          points for long-lasting quality. The classic design features subtle modern touches 
          that make it versatile for various occasions.
        </p>
      </section>
    </TabsContent>

    <!-- Rating & Reviews Tab -->
    <TabsContent value="Rating & Reviews" class="pt-6">
      <all-revies/>
    </TabsContent>

    <!-- FAQs Tab -->
    <TabsContent value="FAQs" class="pt-6">
      <section>
        <h2 class="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="font-bold text-lg">What sizes are available?</h3>
            <p class="mt-2 text-gray-700">
              We offer sizes from XS to XXL. Please refer to our detailed size chart for accurate measurements.
            </p>
          </div>
          
          <div>
            <h3 class="font-bold text-lg">How long does shipping take?</h3>
            <p class="mt-2 text-gray-700">
              Standard shipping takes 3-5 business days. Express options are available at checkout.
            </p>
          </div>
          
          <div>
            <h3 class="font-bold text-lg">What is your return policy?</h3>
            <p class="mt-2 text-gray-700">
              We offer 30-day returns on unworn items with original tags. See our returns page for details.
            </p>
          </div>
          
          <div>
            <h3 class="font-bold text-lg">How do I care for this product?</h3>
            <p class="mt-2 text-gray-700">
              Machine wash cold with similar colors, tumble dry low. Avoid bleach to maintain color vibrancy.
            </p>
          </div>
        </div>

        <div class="mt-8">
          <h3 class="font-bold text-lg">Still have questions?</h3>
          <Button variant="outline" class="mt-3">
            Contact Customer Support
          </Button>
        </div>
      </section>
    </TabsContent>
  </Tabs>
</template>