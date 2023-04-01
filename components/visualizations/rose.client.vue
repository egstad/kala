<template>
  <div class="p5">
    <div class="p5__content" :id="p5CanvasID"></div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { ref, onMounted, watch, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { loadP5 } from "@/assets/scripts/utilLoadFile";
import { useLibraryStore } from "@/stores/libraries";
const p5Canvas = ref();
const p5Instance = ref(null);
const { p5HasLoaded } = storeToRefs(useLibraryStore());
const p5CanvasID = uuidv4();

loadP5();

const p5Init = () => {
  let sketch = function (p) {
    let x = 100;
    let y = 100;

    p.setup = function () {
      const renderer = p.createCanvas(200, 200);
      renderer.parent(p5CanvasID);
    };

    p.draw = function () {
      p.background(50);
      p.fill(255);
      p.rect(x, y, 50, 50);
    };
  };

  p5Instance.value = new window.p5(sketch);
};

watch(p5HasLoaded, (time) => {
  if (p5HasLoaded.value && !p5Instance.value) p5Init();
});

onMounted(() => {
  if (p5HasLoaded.value && !p5Instance.value) p5Init();
});

onUnmounted(() => p5Instance.value.remove());
</script>

<style scoped>
.p5 {
  display: flex;
  width: 100%;
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
