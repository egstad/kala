<template>
  <div ref="observerRef">
    <ClientOnly>
      <Visualization
        :progress="progress"
        :variant="props.variant"
        name="Month"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTimeStore } from "@/stores/time";
import { useIntersectionObserver } from "vue-composable";
import { getProgress } from "@/assets/scripts/time/month";

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
  progress.value = getProgress(time);
};

/* ----------------------------------------------------------------------------
 * Intersection observer. If ref="el" isn't in view, we cancel 'updateProgress'
 * ------------------------------------------------------------------------- */

const observerRef = ref(null);
const observer = useIntersectionObserver(observerRef);

onBeforeUnmount(() => {
  observer.disconnect();
});
</script>
