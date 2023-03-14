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
    />

    <VisualizationsBand
      v-else-if="props.variant == 'band'"
      :progress="progress"
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
