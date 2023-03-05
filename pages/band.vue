<template>
  <div class="gridz">
    <Visualization title="Second" :progress="store.nextSecond" variant="band" />
    <Visualization title="Minute" :progress="store.nextMinute" variant="band" />
    <Visualization title="Hour" :progress="store.nextHour" variant="band" />
    <Visualization title="Day" :progress="store.nextDay" variant="band" />
    <Visualization title="Week" :progress="store.nextWeek" variant="band" />
    <Visualization title="Month" :progress="store.nextMonth" variant="band" />
    <Visualization title="Year" :progress="store.nextYear" variant="band" />
    <Visualization title="Decade" :progress="store.nextDecade" variant="band" />
    <Visualization
      title="Century"
      :progress="store.nextCentury"
      variant="band"
    />
    <Visualization
      title="Millennium"
      :progress="store.nextMillennium"
      variant="band"
    />
    <Visualization
      title="Decasecond"
      :progress="store.nextDecasecond"
      variant="band"
    />
    <Visualization
      title="HectoSecond"
      :progress="store.nextHectosecond"
      variant="band"
    />
    <Visualization
      title="KiloSecond"
      :progress="store.nextKilosecond"
      variant="band"
    />
    <Visualization
      title="MegaSecond"
      :progress="store.nextMegasecond"
      variant="band"
    />
    <Visualization
      title="GigaSecond"
      :progress="store.nextGigasecond"
      variant="band"
    />
    <Visualization
      title="TeraSecond"
      :progress="store.nextTerasecond"
      variant="band"
    />
  </div>
</template>

<script setup>
import { useTimeStore } from "@/stores/time";
const store = useTimeStore();
</script>

<style>
.gridz {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 0.5rem;
  padding: 0.5rem;
}
</style>
