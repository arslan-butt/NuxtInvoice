// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  vite: {
    resolve: {
      alias: {
        "@stores": "./stores",
        "@types": "./types",
        "@components": "./components",
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  plugins: ["~/plugins/vuetify/index.ts"],
});
