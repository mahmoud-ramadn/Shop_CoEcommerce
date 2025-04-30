<template>
  <div class="w-full max-w-md mx-auto">
    <div class="mb-9 text-center md:text-left">
      <h1 class="font-bold md:text-3xl text-2xl text-gray-900">Get Started</h1>
      <p class="font-medium text-lg mt-2 text-gray-600">
        Join our platform in just a few steps
      </p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Avatar URL Input -->
      <div class="flex flex-col items-center mb-4">
        <div class="relative">
          <img 
            v-if="formData.avatar"
            :src="formData.avatar" 
            class="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            @error="handleImageError"
          />
          <div v-else class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        
        <FormInput
          v-model="formData.avatar"
          label="Avatar URL"
          type="url"
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          class="mt-2 w-full"
          :validate-on-change="true"
          @validation="updateValidation('avatar', $event)"
          :validator="
            string()
              .required('Avatar URL is required')
              .url('Must be a valid URL')
          "
        />
        <p class="mt-2 text-sm text-gray-500">
          Enter a URL for your profile picture or use: 
          <span 
            class="text-red-600 cursor-pointer hover:underline"
            @click="usePlaceholderAvatar"
          >
            this placeholder
          </span>
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <FormInput
          v-model="formData.name" 
          label="Full Name"
          type="text"
          name="name"
          placeholder="John Doe"
          :validate-on-change="true"
          @validation="updateValidation('name', $event)"
          :validator="
            string()
              .required('Required')
              .min(2, 'Too short')
          "
          autocomplete="name"
        />
        
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
          "
          autocomplete="new-password"
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
      
      <div class="grid grid-cols-2 gap-4">
        <FormInput
          v-model="formData.role" 
          label="Role"
          type="text"
          name="role"
          placeholder="customer"
          :validate-on-change="true"
          @validation="updateValidation('role', $event)"
          :validator="
            string()
              .required('Required')
          "
        />
        
        <FormInput
          v-model="formData.phone" 
          label="Phone"
          type="tel"
          name="phone"
          placeholder="+1234567890"
          :validate-on-change="true"
          @validation="updateValidation('phone', $event)"
          :validator="
            string()
              .required('Required')
              .matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number')
          "
          autocomplete="tel"
        />
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
      
      <div v-if="apiError" class="text-red-500 text-sm mt-2">{{ apiError }}</div>
      
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
  name: '',
  email: '',
  password: '',
  avatar: '',
  role: 'customer',
  phone: ''
})

const apiError = ref('')
const termsAccepted = ref(false)
const isSubmitting = ref(false)

const fieldValidations = ref({
  name: false,
  email: false,
  password: false,
  avatar: false,
  role: false,
  phone: false
})

const handleImageError = () => {
  formData.value.avatar = 'https://api.lorem.space/image/face?w=150&h=150'
}

const usePlaceholderAvatar = () => {
  formData.value.avatar = 'https://api.lorem.space/image/face?w=150&h=150'
}

const updateValidation = (fieldName: keyof typeof fieldValidations.value, isValid: boolean) => {
  fieldValidations.value[fieldName] = isValid
}

const isFormValid = computed(() => {
  return Object.values(fieldValidations.value).every(Boolean) && termsAccepted.value
})

const handleSubmit = async () => {
  if (!isFormValid.value) return

  isSubmitting.value = true
  apiError.value = ''
  
  try {
    const payload = {
      ...formData.value,
      avatar: formData.value.avatar || 'https://api.lorem.space/image/face?w=150&h=150'
    }

    const response = await $fetch("https://api.escuelajs.co/api/v1/users/", {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Registration successful:', response)
    navigateTo('/')
  } catch (error: any) {
    console.error('Registration error:', error)
    apiError.value = error.data?.message || 'Registration failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}

input, button {
  transition: box-shadow 0.2s ease;
}

input:focus, button:focus {
  @apply ring-2 ring-red-500 ring-opacity-50;
}

.error-message {
  @apply text-red-500 text-sm mt-1;
}
</style>