<template>
  <div class="p5">
    <div class="p5__content" ref="p5Canvas"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { loadP5 } from "@/assets/scripts/utilLoadFile";
import { useLibraryStore } from "@/stores/libraries";
const p5Canvas = ref();
const p5Instance = ref(null);
const { p5HasLoaded } = storeToRefs(useLibraryStore());

loadP5();

const p5Init = () => {
  let sketch = function (p) {
    const rect = p5Canvas.value.getBoundingClientRect();
    let x = rect.width * 0.5;
    let y = rect.height * 0.5;

    p.setup = function () {
      p.createCanvas(rect.width, rect.height);
    };

    p.draw = function () {
      p.background(50);
      p.rectMode(p.CENTER);
      p.fill(255);
      p.rotate(p.frameCount);
      p.rect(x, y, 50, 50);
    };
  };

  nextTick(() => {
    p5Instance.value = new window.p5(sketch, p5Canvas.value);
  });
  // p5Instance.value.style.visibility = "visible";
};

watch(p5HasLoaded, (time) => {
  nextTick(() => {
    if (p5HasLoaded.value && !p5Instance.value) p5Init();
  });
});

onMounted(() => {
  nextTick(() => {
    if (p5HasLoaded.value && !p5Instance.value) p5Init();
  });
});

onUnmounted(() => p5Instance.value.remove());
</script>

<style>
.p5 {
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100%;
}

.p5__content {
  width: 100%;
  height: 100%;
}

.p5__content {
  background: blue;
}
</style>
