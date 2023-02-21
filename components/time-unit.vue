<template>
  <div class="progress">
    <p class="label">{{ title }}: {{ progress.toFixed(3) }}%</p>
    <div class="current" :style="{ width: `${progress * 100}%` }"></div>
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
  },
};
</script>

<style lang="css">
:root {
  --height: 2em;
}

.progress {
  background: pink;
  width: 100%;
  height: var(--height);
  display: block;
  position: relative;
}
.current {
  background: black;
  height: var(--height);
  display: block;
  transition: all 10ms linear;
}

.label {
  line-height: 0;
  font-size: calc(var(--height) * 0.5);
  font-family: "BradfordMono_8-3-Regular";
  padding: 0;
  color: white;
  mix-blend-mode: exclusion;
  position: absolute;
  top: 0;
  left: 0.5em;
}
</style>
