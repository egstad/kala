<template>
  <div class="progress">
    <ClientOnly>
      <p class="label">{{ title }}: {{ progress }}%</p>
    </ClientOnly>
    <div class="line" ref="line"></div>
  </div>
</template>

<script>
import ProgressBar from "progressbar.js";

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
  watch: {
    progress(newValue, oldValue) {
      return this.setProgress(newValue);
    },
  },
  mounted() {
    this.line = new ProgressBar.Line(this.$refs.line, {
      color: "rgba(0,0,0,1)",
      strokeWidth: 1,
      trailColor: "rgba(0,0,0,0.1)",
      trailWidth: 1,
      svgStyle: { width: "100%", height: "100%" },
    });
  },
  methods: {
    setProgress(percent) {
      if (!this.inView) return;
      this.line.set(percent);
    },
  },
};
</script>

<style scoped>
.progress {
  margin-top: 64px;
}

.label {
  font-family: monospace;
  font-size: 12px;
  line-height: 1;
}

.line {
  height: 100vh;
}
</style>
