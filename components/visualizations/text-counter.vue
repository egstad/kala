<template>
  <div class="canvas">
    <div class="wrap">
      <!-- <p class="progress">{{ (progress * 100).toFixed(1) }}&percnt;</p> -->
      <p class="progress">{{ convertToLeadingZero(progress) }}%</p>
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
    convertToLeadingZero(floatingNumber) {
      const num = floatingNumber * 100;

      return num.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        minimumFractionDigits: 2,
      });
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress {
  font-size: 3vw;
}
</style>
