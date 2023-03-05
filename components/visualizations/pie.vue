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
    inView: {
      type: Boolean,
      require: true,
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
    console.log(this.inView);
    // add hue to window
    if (process.client) window.h = 0;

    this.orbit = new ProgressBar.Circle(this.$refs.orbit, {
      color: "rgba(0,0,0,1)",
      strokeWidth: 50,
      trailColor: "rgba(0,0,0,0.1)",
      trailWidth: 50,
      step: (state, circle, attachment) => {
        // if (process.client) window.h++;
        // circle.path.setAttribute("stroke", `hsl(${window.h} 100% 50%)`);
      },
    });
  },
  methods: {
    setProgress(percent) {
      if (!this.inView) return;
      this.orbit.set(percent);
    },
  },
};
</script>
