<template>
  <div class="gridz">
    <Visualization title="Second" :progress="store.nextSecond" variant="pie" />
    <Visualization title="Minute" :progress="store.nextMinute" variant="pie" />
    <Visualization title="Hour" :progress="store.nextHour" variant="pie" />
    <Visualization title="Day" :progress="store.nextDay" variant="pie" />
    <Visualization title="Week" :progress="store.nextWeek" variant="pie" />
    <Visualization title="Month" :progress="store.nextMonth" variant="pie" />
    <Visualization title="Year" :progress="store.nextYear" variant="pie" />
    <Visualization title="Decade" :progress="store.nextDecade" variant="pie" />
    <Visualization
      title="Century"
      :progress="store.nextCentury"
      variant="pie"
    />
    <Visualization
      title="Millennium"
      :progress="store.nextMillennium"
      variant="pie"
    />

    <!--  -->
    <Visualization
      title="Decasecond"
      :progress="store.nextDecasecond"
      variant="pie"
    />
    <Visualization
      title="HectoSecond"
      :progress="store.nextHectosecond"
      variant="pie"
    />
    <Visualization
      title="KiloSecond"
      :progress="store.nextKilosecond"
      variant="pie"
    />
    <Visualization
      title="MegaSecond"
      :progress="store.nextMegasecond"
      variant="pie"
    />
    <Visualization
      title="GigaSecond"
      :progress="store.nextGigasecond"
      variant="pie"
    />
    <Visualization
      title="TeraSecond"
      :progress="store.nextTerasecond"
      variant="pie"
    />
  </div>
</template>

<script setup>
import { useTimeStore } from "@/stores/time";
const store = useTimeStore();
</script>

<style scoped>
.gridz {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 0.5rem;
  padding: 0.5rem;
}
</style>
