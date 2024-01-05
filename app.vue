<template>
  <div>
    <SiteHeader />
    <NuxtLayout class="site-content">
      <NuxtPage />
    </NuxtLayout>
    <SiteFooter />
  </div>
</template>

<script setup>
// import deviceResize from "@/plugins/deviceResize.client";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import dayjsIsLeapYear from "dayjs/plugin/isLeapYear";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUTC from "dayjs/plugin/utc";
dayjs.extend(dayjsTimezone);
dayjs.extend(dayjsIsLeapYear);
dayjs.extend(dayjsUTC);

const nuxtApp = useNuxtApp();
const storeUI = useUIStore();

onMounted(() => {
  if (!process.client) return;
  nuxtApp.$deviceResize.init();
  checkForInteraction();
});

/* ----------------------------------------------------------------------------
 * Let's keep an eye on the time, shall we?
 * ------------------------------------------------------------------------- */

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const timeStore = useTimeStore();
let raf = ref(null);

const timeNowUpdate = () => {
  if (!process.client) return;
  timeStore.update(dayjs().tz(timezone));
  raf.value = window.requestAnimationFrame(timeNowUpdate);
};

const timeNowDestroy = () => cancelAnimationFrame(raf.value);

timeNowUpdate();

function checkForInteraction() {
  const interactions = ["click", "mouseover", "touch", "focus"];

  interactions.forEach((eventName) => {
    window.addEventListener(
      eventName,
      () => {
        storeUI.userHasInteracted(true);
      },
      {
        once: true,
      }
    );
  });
}
</script>
