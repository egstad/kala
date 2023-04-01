import { defineNuxtPlugin } from "#app";
//@ts-ignore
import p5vue from "p5vue";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      p5vue,
    },
  };
});

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(p5vue);
// });
