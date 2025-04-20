export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config?.public?.apiBaseUrl,
    onRequest() {},
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
    },
  });
  return {
    provide: {
      api,
    },
  };
});
