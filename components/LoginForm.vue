<template>
  <div class="w-full max-w-md">
    <div class="mb-9 text-center md:text-left">
      <h1 class="font-bold md:text-3xl text-2xl text-gray-900">Welcome back</h1>
      <p class="font-medium text-lg mt-2 text-gray-600">
        Welcome back! Please enter your details.
      </p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <FormInput
        v-model="formData.fullName" 
        label="Full Name"
        type="text"
        name="fullName"
        :intial-value="''"
        :validate-on-change="true"
        @validation="updateValidation('fullName', $event)"
        :validator="
          string()
            .required('Full Name is required')
            .min(5, 'Minimum of 5 characters.')
        "
      />
      
      <FormInput
        v-model="formData.email" 
        label="Email"
        type="email"
        name="email"
        :intial-value="''"
        :validate-on-change="true"
        @validation="updateValidation('email', $event)"
        :validator="
          string()
            .required('Email is required')
            .email('Email is invalid')
        "
      />
      
      <FormInput
        v-model="formData.password" 
        label="Password"
        type="password"
        name="password"
        :intial-value="''"
        :validate-on-change="true"
        @validation="updateValidation('password', $event)"
        :validator="
          string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters')
            .matches(
              /^(?=.*[a-z])/,
              'Must contain at least one lowercase letter'
            )
            .matches(
              /^(?=.*[A-Z])/,
              'Must contain at least one uppercase letter'
            )
            .matches(
              /^(?=.*[0-9])/,
              'Must contain at least one number'
            )
        "
      />
      
      <div class="flex items-center justify-between mt-4">
        <label class="flex items-center">
          <input
            v-model="rememberMe"
            type="checkbox"
            class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <NuxtLink
          to="/forgot-password"
          class="text-sm font-medium text-red-600 hover:text-red-500"
        >
          Forgot password?
        </NuxtLink>
      </div>
      
      <button
        type="submit"
        :disabled="isSubmitting || !isFormValid"
        class="bg-red-600 text-white rounded-xl mt-6 py-3.5 w-full font-bold hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <span v-if="!isSubmitting">Sign in</span>
        <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </form>
    
    <p class="mt-6 text-center text-sm text-gray-600">
      Don't have an account?
      <NuxtLink
        to="/signup"
        class="font-medium text-red-600 hover:text-red-500"
      >
        Sign up
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { string } from 'yup'
import { ref, computed } from 'vue'

const formData = ref({
  fullName: '',
  email: '',
  password: ''
})

const rememberMe = ref(false)
const isSubmitting = ref(false)

// Track validation state for each field
const fieldValidations = ref({
  fullName: false,
  email: false,
  password: false
})

// Update validation state when child component emits
const updateValidation = (fieldName: keyof typeof fieldValidations.value, isValid: boolean) => {
  fieldValidations.value[fieldName] = isValid
}

const isFormValid = computed(() => {
  return Object.values(fieldValidations.value).every(Boolean)
})

const handleSubmit = async () => {
  if (!isFormValid.value) {
    console.log('Form is invalid - preventing submission')
    return
  }

  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted:', {
      ...formData.value,
      rememberMe: rememberMe.value
    })
    
    await navigateTo('/')
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>