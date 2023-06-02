// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME,
      baseURL: process.env.NUXT_PUBLIC_BASE_URL_API,
      baseIMG: process.env.NUXT_PUBLIC_BASE_IMG
    }
  },
  css: [
    '@/assets/scss/main.scss',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@use "@/assets/scss/main.scss" as *;',
        }
      }
    }
  }
})
