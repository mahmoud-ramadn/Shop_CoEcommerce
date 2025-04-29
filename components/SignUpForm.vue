<template>
  <div class="w-full max-w-md mx-auto">
    <div class="mb-9 text-center md:text-left">
      <h1 class="font-bold md:text-3xl text-2xl text-gray-900">Get Started</h1>
      <p class="font-medium text-lg mt-2 text-gray-600">
        Join our platform in just a few steps
      </p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="grid grid-cols-2 gap-4">
        <FormInput
          v-model="formData.firstName" 
          label="First Name"
          type="text"
          name="firstName"
          placeholder="John"
          :validate-on-change="true"
          @validation="updateValidation('firstName', $event)"
          :validator="
            string()
              .required('Required')
              .min(2, 'Too short')
          "
          autocomplete="given-name"
        />
        
        <FormInput
          v-model="formData.lastName" 
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Doe"
          :validate-on-change="true"
          @validation="updateValidation('lastName', $event)"
          :validator="
            string()
              .required('Required')
              .min(2, 'Too short')
          "
          autocomplete="family-name"
        />
      </div>
      
      <FormInput
        v-model="formData.email" 
        label="Email"
        type="email"
        name="email"
        placeholder="your@email.com"
        :validate-on-change="true"
        @validation="updateValidation('email', $event)"
        :validator="
          string()
            .required('Required')
            .email('Invalid email')
        "
        autocomplete="email"
      />
      
      <div>
        <FormInput
          v-model="formData.password" 
          label="Password"
          type="password"
          name="password"
          placeholder="At least 8 characters"
          :validate-on-change="true"
          @validation="updateValidation('password', $event)"
          :validator="
            string()
              .required('Required')
              .min(8, 'Min 8 characters')
              .max(40, 'Max 40 characters')
              .matches(/[a-z]/, 'Needs lowercase')
              .matches(/[A-Z]/, 'Needs uppercase')
              .matches(/[0-9]/, 'Needs number')
              .matches(/[!@#$%^&*]/, 'Needs special char')
          "
          autocomplete="new-password"
        />
        <div class="mt-2 text-xs text-gray-500">
          Use 8+ characters with uppercase, lowercase, number, and special character
        </div>
      </div>
      
      <div class="flex items-start mt-4">
        <div class="flex items-center h-5">
          <input
            id="terms"
            v-model="termsAccepted"
            type="checkbox"
            class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            required
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="terms" class="text-gray-600">
            I agree to the <a href="/terms" class="text-red-600 hover:text-red-500 font-medium">Terms</a> and <a href="/privacy" class="text-red-600 hover:text-red-500 font-medium">Privacy Policy</a>
          </label>
        </div>
      </div>
      
      <button
        type="submit"
        :disabled="isSubmitting || !isFormValid"
        class="bg-red-600 text-white rounded-lg mt-6 py-3.5 w-full font-bold hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
      >
        <span v-if="!isSubmitting">Create Account</span>
        <LoadingSpinner v-else />
      </button>
      
      <div class="relative mt-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Or sign up with</span>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3 mt-6">
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="github" />
      </div>
    </form>
    
    <p class="mt-8 text-center text-sm text-gray-600">
      Already have an account?
      <NuxtLink
        to="/login"
        class="font-medium text-red-600 hover:text-red-500"
      >
        Log in
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { string } from 'yup'
import { ref, computed } from 'vue'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

const termsAccepted = ref(false)
const isSubmitting = ref(false)

const fieldValidations = ref({
  firstName: false,
  lastName: false,
  email: false,
  password: false
})

const updateValidation = (fieldName: keyof typeof fieldValidations.value, isValid: boolean) => {
  fieldValidations.value[fieldName] = isValid
}

const isFormValid = computed(() => {
  return Object.values(fieldValidations.value).every(Boolean) && termsAccepted.value
})

const handleSubmit = async () => {
  if (!isFormValid.value) return

  isSubmitting.value = true
  
  try {
    
    navigateTo('/')
  } catch (error) {
    console.error('Signup error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}

/* Smooth focus transitions for form elements */
input, button {
  transition: box-shadow 0.2s ease;
}

/* Better focus states */
input:focus, button:focus {
  @apply ring-2 ring-red-500 ring-opacity-50;
}
</style>