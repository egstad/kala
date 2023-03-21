<template>
  <div>
    <component :is="timeUnitComponent" variant="line" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

const unit = useRoute().params.timeUnit.toLowerCase();
const { supportedTimeUnits } = storeToRefs(useTimeStore());
const isSupported = () => supportedTimeUnits.value.includes(unit);

if (!isSupported()) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const unitCapitalized = unit.charAt(0).toUpperCase() + unit.slice(1);

const timeUnitComponent = resolveComponent(`time-${unit}`);
</script>
