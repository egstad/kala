<template>
  <div class="canvas">
    <div class="wrap">
      <p class="progress">{{ (progress * 100).toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      require: true,
    },
    progress: {
      type: Number,
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
  mounted() {},
};
</script>

<style lang="css" scoped>
.canvas {
  padding: var(--unit);

  background-color: var(--color-background);
  width: 100%;
  height: 100%;
}

.wrap {
  width: 100%;
  height: 100%;
}

.progress {
  font-size: 5dvw;
}
</style>
