<template>
  <div class="grid">
    <component :is="`time-${time}`" :variant="style" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import gsap from "gsap";
import { setMetaTags } from "@/assets/scripts/utilMetaTags";
import { formatPageTitle } from "@/assets/scripts/utilFormatText";

/* ----------------------------------------------------------------------------
 * Set our selected style based on route param
 * ------------------------------------------------------------------------- */
const storeUI = useUIStore();
const storeTime = useTimeStore();
const style = useRoute().params.visualizationStyle.toLowerCase();
const time = useRoute().params.time.toLowerCase();
storeUI.updateStyle(style);
storeTime.updateTime(time);

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

const pageTitle = `Kala - ${formatPageTitle(time)} as ${formatPageTitle(
  style
)} `;

useHead({
  title: pageTitle,
});
useServerSeoMeta(
  setMetaTags({
    title: pageTitle,
  })
);
</script>

<style scoped>
.grid {
  overflow: hidden;
}

.grid,
:deep(.time) {
  display: flex;
  width: 100vw;
  height: 100%;
}

:deep(.time__content) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
