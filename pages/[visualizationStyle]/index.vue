<template>
  <div class="gridzie">
    <component
      v-for="(unit, index) in storeTime.supportedTimeUnits"
      :key="unit + index"
      :is="`time-${unit}`"
      :variant="style"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import gsap from "gsap";

/* ----------------------------------------------------------------------------
 * Set our selected style based on route param
 * ------------------------------------------------------------------------- */
const storeUI = useUIStore();
const storeTime = useTimeStore();
const zoom = storeToRefs(storeUI).zoomSelected;
const style = useRoute().params.visualizationStyle.toLowerCase();
storeUI.updateStyle(style);

definePageMeta({
  pageTransition: {
    mode: "out-in",
    onBeforeEnter: (el) => {
      gsap.set(el.children, {
        opacity: 0,
        y: "20px",
      });
    },
    onEnter: (el, done) => {
      gsap.to(el.children, {
        opacity: 1,
        y: "0",
        ease: "power3.out",
        onComplete: function () {
          console.log(el);
          gsap.set(this.targets(), { clearProps: "all" });
          done();
        },
        delay: 0.5,
        duration: 2,
        stagger: {
          amount: 0.75,
        },
      });
    },
    onLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        y: "20px",
        onComplete: done,
      });
    },
  },
});
</script>

<style>
.gridzie {
  display: grid;
  grid-template-columns: repeat(v-bind(zoom), 1fr);
  grid-gap: 2px;
  padding: 2px;
}
</style>
