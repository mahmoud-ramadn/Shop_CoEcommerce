<template>
  <NuxtLayout>
    <NuxtLoadingIndicator 
      class="bg-gradient-to-t from-purple-400 to-purple-950" 
      :height="5" 
      width="100%"
    />
    <NuxtPage />
    <NetworkToast />
  </NuxtLayout>
</template>