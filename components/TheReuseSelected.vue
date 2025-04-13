<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  placeholder?: string
  label?: string
  items: Array<{ value: string; label: string }>
  triggerClass?: string
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  label: 'Options',
  triggerClass: 'bg-gray-100 rounded-full py-6 px-4 w-full',
  contentClass: 'bg-gray-100',
})
</script>

<template>
  <Select>
    <SelectTrigger :class="triggerClass">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent :class="contentClass">
      <SelectGroup>
        <SelectLabel>{{ label }}</SelectLabel>
        <SelectItem
          v-for="item in items"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>