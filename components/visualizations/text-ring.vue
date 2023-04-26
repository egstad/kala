<template>
  <div class="canvas">
    <div class="wrap">
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        :style="`transform: rotate(${progress * 360}deg)`"
      >
        <path
          id="Circle"
          class="circle"
          d="
        M 50, 50
        m -50, 0
        a 50,50 0 1,0 100,0
        a 50,50 0 1,0 -100,0
        "
        />

        <text font-size="8" letter-spacing="1" class="text" dy="-5%">
          <textPath href="#Circle">{{ name }}</textPath>
        </text>
      </svg>
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
  /* width: auto;
  height: fit-content; */
  width: 100%;
  /* height: 100%; */
}

.wrap {
  transform: rotate(90deg);
  width: 100%;
  height: 100%;
}

svg {
  width: 100%;
  height: 100%;
  /* object-fit: fit; */
}

.circle {
  fill: var(--color-document);
  transition: fill var(--color-transition);
}

.text {
  fill: var(--color-foreground);
  transition: fill var(--color-transition);
}
</style>
