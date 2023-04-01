<template>
  <div class="test-page">
    <NuxtLink to="/">home</NuxtLink>
    <P5 class="p5" />
  </div>
</template>

<script setup>
import gsap from "gsap";

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
.test-page {
  width: 100%;
  height: 100dvh;
}

.p5 {
  height: 100%;
}
</style>
