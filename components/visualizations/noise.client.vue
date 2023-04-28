<template>
  <figure
    class="canvas"
    :id="p5Id"
    ref="p5El"
    style="height: 100%; width: 100%"
    :class="{ 'zen-mode': zen }"
  >
    <div class="p5__content" ref="p5Canvas"></div>
  </figure>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, toRaw, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { loadP5 } from "@/assets/scripts/utilLoadFile";
import { useLibraryStore } from "@/stores/libraries";
import uid from "easy-uid";
import { getVariable } from "@/assets/scripts/utilGetVariable";

const raf = ref();
const p5El = ref();
const p5Id = uid();
const p5Canvas = ref();
const p5Instance = ref(null);
const { p5HasLoaded } = storeToRefs(useLibraryStore());
const observer = new IntersectionObserver(observerCallback);
const inView = ref(false);
const nuxtApp = useNuxtApp();
const storeUI = useUIStore();
const zen = storeToRefs(storeUI).zenMode;
const progress = defineProps(["progress"]);

loadP5();

/* ----------------------------------------------------------------------------
 * P5.js stuff
 * ------------------------------------------------------------------------- */

const foreground = getVariable("--color-foreground");

function calcSeed() {
  const duration = Number(p5El.value.parentNode.parentNode.dataset.duration);

  return duration * 0.01;
}

const sketch = function (p) {
  p.setup = () => {
    p.createCanvas(getDimensions().width, getDimensions().height);
    p.noLoop();
  };

  p.draw = () => {
    p.resizeCanvas(getDimensions().width, getDimensions().height);
    p.noFill();
    p.stroke(foreground);
    p.beginShape();

    for (var x = 0; x < p.width; x++) {
      var nx = p.map(
        x + p.frameCount,
        calcSeed() * 0.001,
        p.width / calcSeed(),
        0,
        1
      );
      var y = p.height * p.noise(nx);
      p.vertex(x, y);
    }
    p.endShape();
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

    nextTick(() => {
      p5Instance.value = new window.p5(sketch, p5Id);
      p5Canvas.value.appendChild(canvas._rawValue.canvas);
      observer.observe(p5Canvas.value);
    });

    nuxtApp.$listen("ui:zoom", () => {
      p5Instance.value.windowResized();
    });
  });
};

/* ----------------------------------------------------------------------------
 * Intersection observer
 * ------------------------------------------------------------------------- */

function observerCallback(entries, observer) {
  if (entries[0].isIntersecting) {
    inView.value = true;
    raf.value = requestAnimationFrame(rafCallback);
  } else {
    inView.value = false;
    window.cancelAnimationFrame(raf.value);
  }
}

watch(progress, (newVal) => {
  if (newVal && inView.value) {
    rafCallback();
  }
});

/* ----------------------------------------------------------------------------
 * Raf callback
 * ------------------------------------------------------------------------- */

const rafCallback = () => {
  p5Instance.value.redraw();

  // raf.value = requestAnimationFrame(rafCallback);
};

/* ----------------------------------------------------------------------------
 * Hooks
 * ------------------------------------------------------------------------- */

watch(p5HasLoaded, () => p5Init());

onMounted(() => p5Init());

onUnmounted(() => {
  p5Instance.value.remove();
  observer.disconnect();
  window.cancelAnimationFrame(raf.value);
});
</script>

<style scoped>
figure {
  width: auto;
  height: fit-content;
  background-color: var(--color-background);
  transition: background-color var(--color-transition);
}

figure.zen-mode {
  background-color: var(--color-document);
  transition: background-color var(--color-transition);
  transition-delay: 0.5s;
}

.p5__content :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
}

/* .orbit {
  display: flex;
  width: 100%;
  object-fit: contain;
} */
</style>
