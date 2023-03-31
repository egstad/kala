<template>
  <div class="canvas">
    <div class="bar" ref="line" :style="`height:${progress * 100}%`"></div>
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
  // watch: {
  //   progress(newValue, oldValue) {
  //     return this.setProgress(newValue);
  //   },
  // },
  methods: {
    setProgress(percent) {
      if (!this.inView) return;
    },
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
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-foreground);
  transition: background-color var(--color-transition);
}
</style>
