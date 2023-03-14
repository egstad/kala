<template>
  <figure>
    <div class="blinker"></div>
  </figure>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      state: false,
    };
  },
  watch: {
    progress(newValue, oldValue) {
      this.state = newValue;
      return;
    },
  },
};
</script>

<style lang="css">
.blinker {
  border-radius: 100vw;
  width: 100%;
  height: 100%;
  animation: blink 10ms infinite;
}

@keyframes blink {
  0% {
    background-color: rgba(0, 0, 0, 1);
  }
  49% {
    background-color: rgba(0, 0, 0, 1);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.1);
  }
  99% {
    background-color: rgba(0, 0, 0, 0.1);
  }
  100% {
    background-color: rgba(0, 0, 0, 1);
  }
}
</style>
