<template>
  <div class="canvas">
    <div
      class="bar progress"
      ref="line"
      :style="`width:${progress * 100}%`"
    ></div>
    <div class="bar timeline"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    progress: {
      type: Number,
      require: true,
    },
    inView: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      line: null,
    };
  },
};
</script>

<style scoped>
.canvas {
  height: 100%;
  width: 100%;
  background-color: var(--color-background);
  transition: background-color var(--color-transition);
  position: relative;
}

.bar {
  position: absolute;
  top: 50%;
  height: calc(var(--unit) * 0.25);
  transform: translate3d(0, calc(var(--unit) * -0.125), 0);
  left: 0;
}

.progress {
  width: 100%;
  background-color: var(--color-foreground);
  transition: background-color var(--color-transition);
  z-index: 1;
}

.timeline {
  width: 100%;
  background-color: var(--color-document);
  transition: background-color var(--color-transition);
  z-index: 0;
}
</style>
