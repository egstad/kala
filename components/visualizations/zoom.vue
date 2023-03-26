<template>
  <div class="zoom">
    <div class="zoom__frame" :style="`transform: scale(${progress})`">
      {{ progress }}
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
.zoom {
  background: gray;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 1;
  aspect-ratio: 1 / 1;
}

.zoom__frame {
  background: black;
  flex: 1 1;
  display: flex;
  aspect-ratio: 1 / 1;
}
</style>
