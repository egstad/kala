<template>
  <div class="zoom">
    <div class="zoom__frame" :style="`transform: scale(${progress})`"></div>
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
.zoom {
  background-color: var(--color-midground);
  transition: background-color var(--color-transition);
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 1;
  width: 100%;
  height: 100%;
}

.zoom__frame {
  background-color: var(--color-document);
  transition: background-color var(--color-transition);
  flex: 1 1;
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
