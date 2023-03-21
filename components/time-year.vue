<template>
  <div
    ref="observerRef"
    :class="['time', $options.__name.replace('time-', 'time--')]"
    :data-duration="durationMsec"
  >
    <Visualization
      :progress="progress"
      :variant="props.variant"
      class="time__content"
      name="Year"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTimeStore } from "@/stores/time";
import { useIntersectionObserver } from "vue-composable";
import { percentageReverse } from "@/assets/scripts/mathPercentage";
import { daysToMsec } from "~~/assets/scripts/mathDaysToMilliseconds";

/* ----------------------------------------------------------------------------
 * Fetch the variant prop. This decides which visualization is rendered.
 * ------------------------------------------------------------------------- */

const props = defineProps(["variant"]);

/* ----------------------------------------------------------------------------
 * Get and then watch the time ("now") from the store
 * ------------------------------------------------------------------------- */

const { now } = storeToRefs(useTimeStore());

watch(now, (time) => updateProgress(time));

/* ----------------------------------------------------------------------------
 * Set duration of this time unit in MSEC
 * ------------------------------------------------------------------------- */

const durationMsec = () => {
  const daysInYear = now.value.isLeapYear() ? 366 : 365;
  return daysToMsec(daysInYear);
};

/* ----------------------------------------------------------------------------
 * Based on "now's" time, set the progress (0.0-1.0)
 * ------------------------------------------------------------------------- */
const progress = ref(0);

const updateProgress = (time) => {
  if (!observer.isIntersecting.value) return;
  const msecDifference = time.endOf("year").diff(time);

  progress.value = percentageReverse(msecDifference, durationMsec());
};

/* ----------------------------------------------------------------------------
 * Intersection observer. If ref="el" isn't in view, we cancel 'updateProgress'
 * ------------------------------------------------------------------------- */

const observerRef = ref(null);
const observer = useIntersectionObserver(observerRef);

onBeforeUnmount(() => observer.disconnect());
</script>
