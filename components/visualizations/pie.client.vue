<template>
  <figure :class="{ 'zen-mode': zen }">
    <div class="orbit" ref="orbitEl"></div>
  </figure>
</template>

<script setup>
import ProgressBar from "progressbar.js";
import { storeToRefs } from "pinia";
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";

const storeUI = useUIStore();
const progress = defineProps(["progress"]);
const zen = storeToRefs(storeUI).zenMode;

const orbit = ref(null);
const orbitEl = ref(null);

onMounted(() => {
  nextTick(() => {
    orbit.value = new ProgressBar.Circle(orbitEl.value, {
      color: "var(--color-foreground)",
      strokeWidth: 50,
      trailColor: "var(--color-midground)",
      trailWidth: 50,
    });
  });
});

onUnmounted(() => {
  orbit.value.destroy();
});

watch(progress, (newVal) => {
  return setProgress(newVal);
});

const setProgress = (percent) => {
  orbit.value.set(percent.progress);
};
</script>

<style scoped>
figure {
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: var(--color-background);
  transition: background-color var(--color-transition);
}

.zen-mode figure {
  background-color: var(--color-document);
  transition: background-color var(--color-transition);
  transition-delay: 0.5s;
}

.orbit {
  display: flex;
  width: 100%;
  object-fit: contain;
}
</style>
