<template>
  <div>
    <div class="gridzie" ref="timeUnits">
      <component
        v-for="(unit, index) in storeTime.supportedTimeUnits"
        :key="unit + index"
        :is="`time-${unit}`"
        :variant="storeUI.styleDefault"
      />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

const storeTime = useTimeStore();
const storeUI = useUIStore();
storeUI.updateStyle("Home");

const zoom = storeToRefs(storeUI).zoomSelected;
</script>

<style scoped>
.gridzie {
  display: grid;
  grid-template-columns: repeat(v-bind(zoom), 1fr);
  grid-gap: 2px;
  padding: 2px;
}
</style>
