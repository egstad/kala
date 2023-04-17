<template>
  <figure
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
import { getVariable } from "@/assets/scripts/utilGetVariable";
import uid from "easy-uid";
const raf = ref();
const p5El = ref();
const p5Id = uid();
const p5Canvas = ref();
const p5Instance = ref(null);
const { p5HasLoaded } = storeToRefs(useLibraryStore());
const observer = new IntersectionObserver(observerCallback);
const progress = defineProps(["progress"]);
const inView = ref(false);
const storeUI = useUIStore();
const zen = storeToRefs(storeUI).zenMode;
const nuxtApp = useNuxtApp();

loadP5();

/* ----------------------------------------------------------------------------
 * P5.js stuff
 * ------------------------------------------------------------------------- */

function countDigits(number) {
  return number.toString().length;
}

const sketch = function (p) {
  const getNormalizedPosition = () => {
    const parent = p5El.value.parentNode.parentNode.parentNode;
    const me = Number(p5El.value.parentNode.parentNode.dataset.duration);
    const els = parent.querySelectorAll(".time");
    const dataset = [];

    for (var i = 0; i < els.length; i++) {
      var duration = els[i].getAttribute("data-duration");
      dataset.push(Number(duration));
    }

    const min = Math.min(...dataset);
    const max = Math.max(...dataset);

    function evaluatePosition(min, max, value) {
      if (value <= min) {
        return 0.0;
      } else if (value >= max) {
        return 1.0;
      } else {
        return parseFloat((value - min) / (max - min)).toFixed(4);
      }
    }

    return evaluatePosition(min, max, me);
  };

  const getDimensions = () => {
    return p5El?.value?.getBoundingClientRect();
  };

  const myDuration = Number(p5El.value.parentNode.parentNode.dataset.duration);
  const myDigits = countDigits(myDuration) - 1;
  const duration = myDuration * 0.01;
  const numOfLines = myDigits * (myDigits * 2);
  // const numOfLines = Math.min(Math.max(parseInt(duration), 5), 250);
  let width = getDimensions().width;
  let height = getDimensions().height;
  let r = width * 0.5;
  let prog = progress.progress;
  let factor = duration;
  let background = getVariable("--color-background");
  let foreground = getVariable("--color-foreground");

  p.setup = () => {
    p.createCanvas(width, height);
    p.noLoop();
  };

  p.draw = () => {
    width = getDimensions().width;
    height = getDimensions().height;
    p.resizeCanvas(width, height);
    r = width * 0.5;
    prog = progress.progress * 360;
    // p.background(background);

    // p.background(0);
    factor += 0.00024;

    p.translate(p.width / 2, p.height / 2);
    p.stroke(foreground);
    p.strokeWeight(1);
    p.noFill();
    p.ellipse(0, 0, r * 2);

    for (let i = 0; i < numOfLines; i++) {
      const a = getVector(i, numOfLines, r);
      const b = getVector(i * factor, numOfLines, r);
      p.line(a.x, a.y, b.x, b.y);
    }

    p.noLoop();
  };

  p.windowResized = () => {
    p.resizeCanvas(getDimensions().width, getDimensions().height);
  };

  const getVector = (index, total, radius) => {
    const angle = p.map(index % total, 0, total, 0, p.TWO_PI);
    const v = window.p5.Vector.fromAngle(angle + p.PI);
    v.mult(radius);
    return v;
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
  // p5Instance.value.remove();
  observer.disconnect();
  window.cancelAnimationFrame(raf.value);
});
</script>

<style scoped>
/* figure {
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: var(--color-background);
  transition: background-color var(--color-transition);
} */

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
