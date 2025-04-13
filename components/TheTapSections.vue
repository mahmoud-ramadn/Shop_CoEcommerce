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
  <Tabs default-value="account" class=" w-full  md:pb-16 pb-14       md:pt-20 pt-12">
    <TabsList class="grid w-full grid-cols-3 border-b-2 p-0  md:text-lg text-sm ">
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
    <TabsContent value="Rating & Reviews">
      <all-revies/>
    </TabsContent>
    <TabsContent value="password">
     password
    </TabsContent>
    <TabsContent value="faqs">
     faqs
    </TabsContent>
  </Tabs>
</template>