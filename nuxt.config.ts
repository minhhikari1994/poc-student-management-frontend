// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@samk-dev/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "@pinia/nuxt",
    "notivue/nuxt",
  ],
  css: [
    'notivue/notification.css', // Only needed if using built-in <Notification />
    'notivue/animations.css' // Only needed if using default animations
  ],
  notivue: {
    position: "top-right",
    limit: 3,
  },
  tailwindcss: {
    exposeConfig: true,
    editorSupport: true
  },
  colorMode: {
    classSuffix: "",
    preference:"light"
  },

  imports: {
    imports: [{
      from: "tailwind-variants",
      name: "tv"
    }, {
      from: "tailwind-variants",
      name: "VariantProps",
      type: true
    }, {
      from: "vue-sonner",
      name: "toast",
      as: "useSonner"
    }]
  },

  app: {
    head: {
      script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/pdfmake.min.js",
        defer: true
      }, {
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/vfs_fonts.min.js",
        defer: true
      }]
    }
  },
  build: {
    transpile: ["vue-sonner"]
  },
  ssr: false
})