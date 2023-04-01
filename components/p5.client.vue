<template>
  <div class="p5">
    <div class="p5__content" ref="p5Canvas"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import p5 from "p5";
const p5Canvas = ref();
const p5Instance = ref(null);

onMounted(() => {
  // p5Canvas ref isn't available until next tick for some reason...
  nextTick(() => {
    p5Instance.value = new p5((p) => {
      p.setup = () => {
        setCanvasDimensions();

        p.textSize(30);
        p.textAlign(p.CENTER);
      };

      p.draw = () => {
        p.background(200);

        p.rectMode(p.CENTER);
        p.translate(p.width / 2, p.height / 2);
        p.translate(p5.Vector.fromAngle(p.millis() / 1000, p.width / 4));
        p.rect(0, 0, p.width / 12, p.width / 12);
      };

      p.windowResized = () => {
        setCanvasDimensions();
      };

      const setCanvasDimensions = () => {
        const rect = p5Canvas.value.getBoundingClientRect();
        p.resizeCanvas(rect.width, rect.height);
      };
    }, p5Canvas.value);
  });
});

onUnmounted(() => p5Instance.value.remove());
</script>

<style scoped>
.p5 {
  background-color: red;
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
