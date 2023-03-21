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
      name="Century"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTimeStore } from "@/stores/time";
import { useIntersectionObserver } from "vue-composable";
import { percentage } from "@/assets/scripts/mathPercentage";
import dayjs from "dayjs";

/* ----------------------------------------------------------------------------
 * Set duration of this time unit in MSEC
 * ------------------------------------------------------------------------- */
const getDuration = () => {
  const start = Math.floor(dayjs().year() * 0.01) * 100;
  const end = Math.ceil(dayjs().year() * 0.01) * 100;
  const centuryBeginning = dayjs(`${start}-01-01`);
  const centuryEnd = dayjs(`${end}-01-01`);
  return centuryEnd.diff(centuryBeginning);
};

const durationMsec = ref(getDuration());

/* ----------------------------------------------------------------------------
 * Fetch the variant prop. This decides which visualization is rendered.
 * ------------------------------------------------------------------------- */

const props = defineProps(["variant"]);

/* ----------------------------------------------------------------------------
 * Get and then watch the time from the store
 * ------------------------------------------------------------------------- */

const { now } = storeToRefs(useTimeStore());
const { epochFrom } = storeToRefs(useTimeStore());

watch(now, (time) => updateProgress(time));

/* ----------------------------------------------------------------------------
 * Based on "now's" time, set the progress (0.0-1.0)
 * ------------------------------------------------------------------------- */
const progress = ref(0);

const updateProgress = (time) => {
  if (!observer.isIntersecting.value) return;

  const msecDifference = time.diff(epochFrom.value) % durationMsec.value;
  progress.value = percentage(msecDifference, durationMsec.value);
};

/* ----------------------------------------------------------------------------
 * Intersection observer. If ref="el" isn't in view, we cancel 'updateProgress'
 * ------------------------------------------------------------------------- */

const observerRef = ref(null);
const observer = useIntersectionObserver(observerRef);

onBeforeUnmount(() => observer.disconnect());
</script>
