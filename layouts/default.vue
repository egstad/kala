<template>
  <main ref="content" class="content">
    <div class="content__wrap">
      <slot />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const content = ref(null);

onMounted(() => animate());

const animate = () => {
  gsap.to(content.value, {
    opacity: 1,
    duration: 0.5,
  });

  gsap.fromTo(
    content.value.children,
    {
      opacity: 0,
      y: "10px",
    },
    {
      opacity: 1,
      y: "0",
      ease: "power3.out",
      onComplete: function () {
        gsap.set(this.targets(), { clearProps: "all" });
      },
      delay: 0.5,
      duration: 3,
      stagger: {
        amount: 0.75,
      },
    }
  );
};
</script>

<style scoped>
.content {
  opacity: 0;
}

.content__wrap {
  width: 100vw;
}
</style>
