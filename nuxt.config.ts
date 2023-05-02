// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // app: {
  //   head: {
  //     script: [
  //       {
  //         src: "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js",
  //         async: true,
  //       },
  //     ],
  //   },
  // },
  css: [
    "@/assets/styles/vars.css",
    "@/assets/styles/reset.css",
    "@/assets/styles/time.css",
  ],
  app: {
    head: {
      title: "Kala",
    },
  },
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
