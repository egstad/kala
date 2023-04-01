<template>
  <div class="canvas" :id="p5Id" ref="p5El" style="height: 100%; width: 100%">
    <div class="p5__content" ref="p5Canvas"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, toRaw, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { loadP5 } from "@/assets/scripts/utilLoadFile";
import { useLibraryStore } from "@/stores/libraries";
import uid from "easy-uid";
const raf = ref();
const p5El = ref();
const p5Id = uid();
const p5Canvas = ref();
const p5Instance = ref(null);
const { p5HasLoaded } = storeToRefs(useLibraryStore());
const observer = new IntersectionObserver(observerCallback);
const nuxt = useNuxtApp();

loadP5();

/* ----------------------------------------------------------------------------
 * P5.js stuff
 * ------------------------------------------------------------------------- */

const sketch = function (p) {
  p.setup = () => {
    p.createCanvas(getDimensions().width, getDimensions().height);
    p.noLoop();
  };

  p.draw = () => {
    p.resizeCanvas(getDimensions().width, getDimensions().height);
    p.background(50);
    p.rectMode(p.CENTER);
    p.fill(255);
    p.textSize(32);
    p.text(p.frameCount, 10, 30);
  };

  p.windowResized = () => {
    p.resizeCanvas(getDimensions().width, getDimensions().height);
  };

  const getDimensions = () => {
    return p5El.value.getBoundingClientRect();
  };
};

const p5Init = () => {
  // p5 not ready? bye.
  if (!p5HasLoaded.value) return;
  // instance exists already? bye.
  if (p5Instance.value) return;

  // i'm experiencing an issue upon routing to a new page.
  // on load, the p5 canvas appears right where it should be
  // after route, it no longer renders as a child of the
  // correct div... it's very strange. on refresh. it works
  // correctly again...
  // this next piece of code moves it from wherever it is
  // into the correct space.
  // it also for whatever reason insists on using an id
  // instead of a vue reference.
  nextTick(() => {
    const canvas = toRaw(p5Instance);

    p5Instance.value = new window.p5(sketch, p5Id);
    p5Canvas.value.appendChild(canvas._rawValue.canvas);
    observer.observe(p5Canvas.value);

    // nuxt.$listen("ui:zoom", () => {
    //   p5Instance.value.windowResized();
    // });
  });
};

/* ----------------------------------------------------------------------------
 * Intersection observer
 * ------------------------------------------------------------------------- */

function observerCallback(entries, observer) {
  if (entries[0].isIntersecting) {
    raf.value = requestAnimationFrame(rafCallback);
  } else {
    window.cancelAnimationFrame(raf.value);
  }
}

/* ----------------------------------------------------------------------------
 * Raf callback
 * ------------------------------------------------------------------------- */

const rafCallback = () => {
  p5Instance.value.redraw();

  raf.value = requestAnimationFrame(rafCallback);
};

/* ----------------------------------------------------------------------------
 * Hooks
 * ------------------------------------------------------------------------- */

watch(p5HasLoaded, () => p5Init());

onMounted(() => p5Init());

onUnmounted(() => {
  // p5Instance.value.remove();
  observer.disconnect();
  window.cancelAnimationFrame(raf.value);
});
</script>

<style scoped>
.p5__content {
  width: 100%;
  height: 100%;
}

.p5__content {
  background: blue;
}

.p5__content :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
}
</style>
