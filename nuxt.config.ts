export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Noto+Kufi+Arabic:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-swiper",
    "shadcn-nuxt",
    "@nuxtjs/svg-sprite",
    "@nuxt/icon",
  ],
  svgSprite: {
    input: " ~/assets/sprite/svg",
  },

  tailwindcss: {
    // Disable the built-in PostCSS config
    exposeConfig: false,
    configPath: "tailwind.config.js",
  },

  compatibilityDate: "2025-04-08",
});