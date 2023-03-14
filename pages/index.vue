<template>
  <div class="gridzie">
    <TimeSecond variant="line" />
    <TimeMinute variant="line" />
    <TimeHour variant="line" />
    <TimeDay variant="line" />
    <TimeWeek variant="line" />
    <TimeMonth variant="line" />
    <TimeYear variant="line" />
    <TimeDecade variant="line" />
    <TimeCentury variant="line" />
    <TimeMillennium variant="line" />

    <TimeDecasecond variant="line" />
    <TimeHectosecond variant="line" />
    <TimeKilosecond variant="line" />
    <TimeMegasecond variant="line" />
    <TimeGigasecond variant="line" />
    <TimeTerasecond variant="line" />

    <TimeBlink variant="line" />
    <TimeHelek variant="line" />
    <TimeNanocentury variant="line" />
    <TimeMicrocentury variant="line" />
    <TimeScaramucci variant="line" />
    <TimeGhurry variant="line" />
    <TimeMilliday variant="line" />
    <TimeMoment variant="line" />
    <TimeKe variant="line" />
    <TimeLustre variant="line" />
    <TimeFortnight variant="line" />
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
