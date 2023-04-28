<template>
  <div>
    <VisualizationsLine
      v-if="props.variant == 'line'"
      :progress="progress"
      :name="name"
    />

    <VisualizationsPie
      v-else-if="props.variant == 'pie'"
      :progress="progress"
      :name="name"
    />

    <VisualizationsBand
      v-else-if="props.variant == 'band'"
      :progress="progress"
      :name="name"
    />

    <VisualizationsZoom
      v-else-if="props.variant == 'zoom'"
      :progress="progress"
      :name="name"
    />

    <VisualizationsTextRing
      v-else-if="props.variant == 'text-ring'"
      :progress="progress"
      :name="name"
    />

    <VisualizationsTextCounter
      v-else-if="props.variant == 'text-counter'"
      :progress="progress"
      :name="name"
    />

    <VisualizationsRose
      v-else-if="props.variant == 'rose'"
      :progress="progress"
      :name="name"
    />

    <VisualizationsCardioid
      v-else-if="props.variant == 'cardioid'"
      :progress="progress"
      :name="name"
    />

    <VisualizationsNoise
      v-else-if="props.variant == 'noise'"
      :progress="progress"
      :name="name"
    />

    <VisualizationsVideo
      v-else-if="props.variant == 'video'"
      :progress="progress"
      :name="name"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});
</script>
