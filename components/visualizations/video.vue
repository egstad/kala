<template>
  <div class="canvas">
    <video
      src="https://ia801201.us.archive.org/4/items/theexiles/theexilesreel1.mp4"
      ref="video"
      muted
      preload
    ></video>
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
    inView: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      videoLength: null,
      videoIsReady: false,
    };
  },
  watch: {
    progress(newValue, oldValue) {
      if (!this.videoIsReady) return;
      return this.updatePlayback(newValue.toFixed(2));
    },
  },
  mounted() {
    this.$refs.video.playbackRate = 0.1;
    this.$refs.video.addEventListener("loadeddata", this.onLoadedData);
  },
  beforeUnmount() {
    this.$refs.video.removeEventListener("loadeddata", this.onLoadedData);
    this.videoIsReady = false;
  },
  methods: {
    onLoadedData(ev) {
      this.videoLength = ev.target.duration;
      this.videoIsReady = true;
    },
    updatePlayback(val) {
      this.$refs.video.currentTime = val * this.videoLength;
      // this.$refs.video.play();
    },
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

video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
