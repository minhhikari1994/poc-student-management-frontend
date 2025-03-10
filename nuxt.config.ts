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
    "@vite-pwa/nuxt"
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
    preference: "light"
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
  ssr: false,
  pwa: {
    registerType: "autoUpdate",
    devOptions: {
      enabled: true
    },
    manifest: {
      name: "PoC Quản lý Giáo lý",
      short_name: "QLGL PoC",
      description: "Ứng dụng quản lý học sinh Giáo Lý - Thiếu nhi Tam Hà - PoC",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      "icons": [
        {
          "src": "pwa-64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "maskable-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
    },
    client: {
      installPrompt: true
    }
  }
})