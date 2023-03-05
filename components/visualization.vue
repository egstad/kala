<template>
  <div>
    <VisualizationsLine
      v-if="variant == 'line'"
      :title="title"
      :progress="progress"
      :in-view="inView"
    />

    <VisualizationsPie
      v-else-if="variant == 'pie'"
      :title="title"
      :progress="progress"
      :in-view="inView"
    />

    <VisualizationsBand
      v-else-if="variant == 'band'"
      :title="title"
      :progress="progress"
      :in-view="inView"
    />
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "line",
      required: true,
    },
    title: {
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
      observer: null,
      inView: false,
      observerOptions: {
        rootMargin: "0px",
        threshold: 0,
      },
    };
  },
  beforeMount() {
    this.observer = new IntersectionObserver(
      this.observerCallback,
      this.observerOptions
    );
  },
  beforeUnmount() {
    this.observer.unobserve(this.$el);
    this.observer.disconnect();
  },
  mounted() {
    this.observer.observe(this.$el);
  },
  methods: {
    observerCallback(entries) {
      entries.forEach(({ isIntersecting }) => {
        this.inView = isIntersecting ? true : false;
      });
    },
  },
};
</script>
