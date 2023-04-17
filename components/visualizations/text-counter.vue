<template>
  <div class="canvas">
    <div class="wrap">
      <p class="progress">{{ (progress * 100).toFixed(1) }}&percnt;</p>
      <!-- <p class="progress">
        {{ String((progress * 100).toFixed(2)).padStart(2, "0") }}
      </p> -->
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
  methods: {
    leadingZero(num, totalLength) {
      return String(num).padStart(totalLength, "0");
    },
  },
};
</script>

<style lang="css" scoped>
figure {
  width: auto;
  height: fit-content;
  background-color: var(--color-background);
  transition: background-color var(--color-transition);
}

figure.zen-mode {
  background-color: var(--color-document);
  transition: background-color var(--color-transition);
  transition-delay: 0.5s;
}

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
