<template>
  <div>
    <div class="gridzie" ref="timeUnits">
      <component
        v-for="(unit, index) in storeTime.timeUnitsSupported"
        :key="unit + index"
        :is="`time-${unit}`"
        :variant="storeUI.styleDefault"
      />
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { storeToRefs } from "pinia";

const storeTime = useTimeStore();
const storeUI = useUIStore();
storeUI.updateStyle(storeUI.styleDefault);
storeTime.updateTime(storeTime.timeUnitDefault);

const zoom = storeToRefs(storeUI).zoomSelected;

definePageMeta({
  pageTransition: {
    mode: "out-in",
    onBeforeEnter: (el) => {
      gsap.set(el, {
        opacity: 0,
        y: "10px",
      });
    },
    onEnter: (el, done) => {
      gsap.to(el, {
        opacity: 1,
        y: "0",
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        onComplete: done,
      });
    },
    onLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        y: "10px",
        onComplete: done,
      });
    },
  },
});
</script>

<style scoped>
.gridzie {
  display: grid;
  grid-template-columns: repeat(v-bind(zoom), 1fr);
  /* grid-gap: 2px; */
  /* padding: 2px; */
}
</style>
