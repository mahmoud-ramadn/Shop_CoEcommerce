<script lang="ts" setup>
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
interface Props {
 currentPage:string;
 category?:string;
 product?:string
}

const props = defineProps<Props>()

</script>

<template>
  <Breadcrumb class=" mt-6 mb-9">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/" class="  text-black/60">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
          <BreadcrumbItem>
        <BreadcrumbLink class="  text-black/60">
          {{ props.currentPage }}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage class="text-black/60">{{props.category }}</BreadcrumbPage>
      </BreadcrumbItem>
            <BreadcrumbSeparator v-if="props.category" />
      <BreadcrumbItem>
        <BreadcrumbPage>{{ props.product }}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>