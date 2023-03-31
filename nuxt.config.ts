// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@/assets/styles/vars.css",
    "@/assets/styles/reset.css",
    "@/assets/styles/time.css",
  ],
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
  imports: {
    dirs: ["stores"],
  },
  components: {
    global: true,
    dirs: ["~/components"],
  },
  build: {
    transpile: [
      // "mixitup",
      // "three",
      // "three/examples/jsm/controls/OrbitControls",
      // "three/examples/jsm/lights/LightProbeGenerator",
    ],
  },
});
