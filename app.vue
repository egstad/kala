<template>
  <div>
    <SiteHeader />
    <NuxtPage />
  </div>
</template>
<!--
<script setup>
import { onMounted } from "vue";
import dayjs from "dayjs";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUTC from "dayjs/plugin/utc";

dayjs.extend(dayjsTimezone);
dayjs.extend(dayjsUTC);

onMounted(() => {
  update();
});

/*
 * Setup
 */
let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// let now = dayjs().tz(timezone);
// const now = () => useState("now", dayjs().tz(timezone));
const now = useState("now", dayjs().tz(timezone));
let raf;

console.log(now);

const update = () => {
  if (!process.client) return;

  // now = dayjs().tz(timezone);
  raf = window.requestAnimationFrame(update);
  // stateNow = useState("now", now);
};

const destroy = () => {
  cancelAnimationFrame(raf);
};
</script> -->
