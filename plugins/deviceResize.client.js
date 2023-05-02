// import windowDimensions from "~/plugins/device/WindowDimensions";
// import windowBreakpoints from "~/plugins/device/WindowBreakpoints";
import { useUIStore } from "@/stores/ui";

const deviceResize = {
  init() {
    this.resizeHandler = this.throttleResize.bind(this);
    this.timeout = false;
    this.delay = 50;

    this.setSize();
    window.addEventListener("resize", this.resizeHandler);
  },
  throttleResize() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.setSize();
    }, this.delay);
  },
  setSize() {
    useUIStore().updateDevice({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      docHeight: document.body.scrollHeight,
      docWidth: document.body.scrollWidth,
    });
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      deviceResize,
    },
  };
});

// export default deviceResize;
