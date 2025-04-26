<template>
  <div class="mt-3">
    <label class="font-medium" :class="labelClass">{{ props.label }}</label>
    <input
      @blur="handleBlur"
      @input="updateValue"
      :type="props.type"
      :name="props.name"
      :value="modelValue"
      :class="inputClass"
      class="outline-none mt-3 border rounded-md block w-full h-[45px] text-sm text-zinc-600 pl-4"
    >
    <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { StringSchema } from 'yup'

interface Props {
  label: string
  type: 'text' | 'email' | 'password'
  name: string
  modelValue?: string
  intialValue?: string | null
  validator?: StringSchema<string> | undefined
  validateOnChange?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  validator: undefined,
  intialValue: null,
  validateOnChange: false,
  modelValue: ''
})

const emit = defineEmits(['update:modelValue', 'validation'])

const labelClass = ref('text-zinc-600')
const inputClass = ref('border-zinc-300')
const vaildateOnchange = toRef(props, 'validateOnChange')

const { value, errorMessage, validate } = useField(
  props.name,
  props.validator,
  {
    initialValue: props.intialValue || props.modelValue,
    validateOnValueUpdate: vaildateOnchange.value
  }
)

// Update both internal and external values
function updateValue(e: Event) {
  const target = e.target as HTMLInputElement
  value.value = target.value
  emit('update:modelValue', target.value)
  handelInput()
}

async function handleBlur() {
  if (vaildateOnchange.value) {
    const { valid } = await validate()
    updateStyles(valid)
    emit('validation', valid)
  }
  await validate()
}

async function handelInput() {
  if (!vaildateOnchange.value) {
    const { valid } = await validate()
    updateStyles(valid)
    emit('validation', valid)
  }
  await validate()
}

function updateStyles(valid: boolean) {
  labelClass.value = valid ? 'text-green-700' : 'text-red-500'
  inputClass.value = valid ? 'border-green-700' : 'border-red-500'
}
</script>