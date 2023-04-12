<template>
  <figure>
    <div class="orbit" ref="orbit"></div>
  </figure>
</template>

<script>
import ProgressBar from "progressbar.js";

export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      orbit: null,
    };
  },
  watch: {
    progress(newValue, oldValue) {
      return this.setProgress(newValue);
    },
  },
  mounted() {
    // add hue to window
    if (process.client) window.h = 0;

    this.orbit = new ProgressBar.Circle(this.$refs.orbit, {
      color: "var(--color-foreground)",
      strokeWidth: 50,
      trailColor: "var(--color-midground)",
      trailWidth: 50,
      step: (state, circle, attachment) => {
        // if (process.client) window.h++;
        // circle.path.setAttribute("stroke", `hsl(${window.h} 100% 50%)`);
      },
    });
  },
  methods: {
    setProgress(percent) {
      this.orbit.set(percent);
    },
  },
};
</script>

<style scoped>
figure {
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: var(--color-background);
}

.orbit {
  display: flex;
  width: 100%;
  object-fit: contain;
}
</style>
