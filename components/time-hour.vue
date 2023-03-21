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
      name="Hour"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTimeStore } from "@/stores/time";
import { useIntersectionObserver } from "vue-composable";
import { percentageReverse } from "@/assets/scripts/mathPercentage";
import { minutesToMsec } from "~~/assets/scripts/mathMinutesToSeconds";

/* ----------------------------------------------------------------------------
 * Set duration of this time unit in MSEC
 * ------------------------------------------------------------------------- */

const durationMsec = minutesToMsec(60);

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
 * Based on "now's" time, set the progress (0.0-1.0)
 * ------------------------------------------------------------------------- */
const progress = ref(0);

const updateProgress = (time) => {
  if (!observer.isIntersecting.value) return;
  const msecDifference = time.endOf("hour").diff(time);

  progress.value = percentageReverse(msecDifference, durationMsec);
};

/* ----------------------------------------------------------------------------
 * Intersection observer. If ref="el" isn't in view, we cancel 'updateProgress'
 * ------------------------------------------------------------------------- */

const observerRef = ref(null);
const observer = useIntersectionObserver(observerRef);

onBeforeUnmount(() => observer.disconnect());
</script>
