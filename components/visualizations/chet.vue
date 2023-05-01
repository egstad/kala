<template>
  <div class="canvas">
    <div>
      <img class="noise" src="@/assets/images/noise.gif" />
      <img
        class="image"
        :src="`/images/chet/chet-${Math.floor(progress * 100)}.jpg`"
      />
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

.noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.05;
  z-index: 1;
  transform: scale(1.2);
  pointer-events: none;
}

.image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
}
</style>
