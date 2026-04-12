import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: ['@nuxt-themes/docus'],
  modules: [
    '@nuxt/icon',
    '@nuxthq/studio'
  ],
  css: ['~/assets/css/main.css']
})
