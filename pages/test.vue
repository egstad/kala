<template>
  <div ref="grid" class="grid">
    <DateTimePicker :value="store.epochFrom" @input="onInput($event)" />
    <DateTimePicker :value="store.now.format('YYYY-MM-DDTHH:mm:ss')" disabled />

    <div class="spacer"></div>

    <TimeBlink variant="line" />
    <TimeSecond variant="line" />
    <TimeDecasecond variant="line" />
    <TimeDay variant="line" />
    <TimeFortnight variant="line" />
    <TimeDecade variant="line" />
    <TimeCentury variant="line" />
    <TimeGhurry variant="line" />
    <TimeGigasecond variant="line" />
    <TimeHectosecond variant="line" />
    <TimeHelek variant="line" />
    <TimeHour variant="line" />
    <TimeKe variant="line" />
    <TimeKilosecond variant="line" />
    <TimeLustre variant="line" />
    <TimeMegasecond variant="line" />
    <TimeMillennium variant="line" />
    <TimeMilliday variant="line" />
    <TimeMinute variant="line" />
    <TimeMoment variant="line" />
    <TimeMonth variant="line" />
    <TimeNanocentury variant="line" />
    <TimeScaramucci variant="line" />
    <TimeTerasecond variant="line" />
    <TimeWeek variant="line" />
    <TimeYear variant="line" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import shuffle from "shufflejs";

const grid = ref(null);

onMounted(() => {
  console.log();

  const shuffleInstance = new shuffle(grid.value, {
    itemSelector: ".time",
    sizer: ".spacer",
  });

  nextTick(() => {
    shuffleInstance.sort(() => element.dataset.duration);
  });
});

const store = useTimeStore();

const onInput = (event) => {
  store.updateEpoch(event.target.value);
};
</script>

<style>
.spacer {
  width: 100vw;
}
</style>
