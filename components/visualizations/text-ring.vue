<template>
  <div class="ring">
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      :style="`transform: rotate(${progress * 360}deg)`"
    >
      <path
        id="Circle"
        fill="none"
        d="
        M 50, 50
        m -50, 0
        a 50,50 0 1,0 100,0
        a 50,50 0 1,0 -100,0
        "
      />

      <text font-size="16" letter-spacing="1">
        <textPath href="#Circle">{{ name }}</textPath>
        <!-- <textPath href="#Circle">
          {{ name }} • {{ (progress.toFixed(4) * 100).toFixed(2) }}%
        </textPath> -->
      </text>
    </svg>
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
.ring {
  padding: 3%;
  transform: rotate(90deg);
}
</style>
