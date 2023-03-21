<template>
  <div class="gridzie">
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

<style scoped>
.gridzie {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 0.5rem;
  padding: 0.5rem;
}
</style>
