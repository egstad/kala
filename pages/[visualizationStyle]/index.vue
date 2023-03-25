<template>
  <div class="gridzie">
    <component
      v-for="(unit, index) in storeTime.supportedTimeUnits"
      :key="unit + index"
      :is="`time-${unit}`"
      :variant="style"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

/* ----------------------------------------------------------------------------
 * Set our selected style based on route param
 * ------------------------------------------------------------------------- */
const storeUI = useUIStore();
const storeTime = useTimeStore();
const zoom = storeToRefs(storeUI).zoomSelected;
const style = useRoute().params.visualizationStyle.toLowerCase();
storeUI.updateStyle(style);
</script>

<style>
.gridzie {
  display: grid;
  grid-template-columns: repeat(v-bind(zoom), 1fr);
  grid-gap: 2px;
  padding: 2px;
}
</style>
