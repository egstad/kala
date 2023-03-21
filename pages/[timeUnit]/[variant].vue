<template>
  <div>
    <component :is="timeUnitComponent" :variant="variant" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

const unit = useRoute().params.timeUnit.toLowerCase();
const variant = useRoute().params.variant.toLowerCase();
const { supportedTimeUnits } = storeToRefs(useTimeStore());
const isSupportedUnit = () => supportedTimeUnits.value.includes(unit);

if (!isSupportedUnit()) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const timeUnitComponent = resolveComponent(`time-${unit}`);
</script>
