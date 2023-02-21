<template>
  <div>
    <div class="progress">
      <p class="label">Second</p>
      <div
        class="current"
        :style="{ width: `${progressToNextSecond * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Minute</p>
      <div
        class="current"
        :style="{ width: `${progressToNextMinute * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Hour</p>
      <div
        class="current"
        :style="{ width: `${progressToNextHour * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Day</p>
      <div
        class="current"
        :style="{ width: `${progressToNextDay * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Week</p>
      <div
        class="current"
        :style="{ width: `${progressToNextWeek * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Month</p>
      <div
        class="current"
        :style="{ width: `${progressToNextMonth * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Year</p>
      <div
        class="current"
        :style="{ width: `${progressToNextYear * 100}%` }"
      ></div>
    </div>

    <button @click="update()">Start!</button>
    <button @click="destroy()">Stop!</button>
  </div>
</template>

<script>
import dayjs from "dayjs";
import dayjsWeekOfYear from "dayjs/plugin/weekOfYear";
import dayjsIsLeapYear from "dayjs/plugin/isLeapYear";
import dayjsDayOfYear from "dayjs/plugin/dayOfYear";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUTC from "dayjs/plugin/utc";

dayjs.extend(dayjsRelativeTime);
dayjs.extend(dayjsIsLeapYear);
dayjs.extend(dayjsWeekOfYear);
dayjs.extend(dayjsDayOfYear);
dayjs.extend(dayjsTimezone);
dayjs.extend(dayjsUTC);

export default {
  data() {
    return {
      raf: null,
      timezone: null,
      now: null,
      decade: null,
      dateTo: null,
      dayInMS: 86400000,
      daysThisYear: null,
      endOfDay: null,
      endOfMonth: null,
    };
  },
  created() {
    this.setup();
  },
  beforeUnmount() {
    this.destroy();
  },
  computed: {
    dateFrom: {
      get() {
        return this.now.format("YYYY-MM-DDThh:mm");
      },
      set(val) {
        console.log(val);
        this.fromDate = val;
      },
    },
    millisecondsToEndOfSecond() {
      return this.now.endOf("second").diff(this.now, "milliseconds");
    },
    millisecondsToEndOfMinute() {
      return this.now.endOf("minute").diff(this.now, "milliseconds");
    },
    millisecondsToEndOfHour() {
      return this.now.endOf("hour").diff(this.now, "milliseconds");
    },
    millisecondsToEndOfDay() {
      return this.now.endOf("day").diff(this.now, "milliseconds");
    },
    millisecondsToEndOfWeek() {
      return this.now.endOf("week").diff(this.now, "SSS");
    },
    millisecondsToEndOfMonth() {
      return this.now.endOf("month").diff(this.now, "milliseconds");
    },
    millisecondsToEndOfYear() {
      return this.now.endOf("year").diff(this.now, "milliseconds");
    },
    progressToNextSecond() {
      return 1 - this.millisecondsToEndOfSecond / 1000;
    },
    progressToNextMinute() {
      return 1 - this.millisecondsToEndOfMinute / (this.dayInMS / 24 / 60);
    },
    progressToNextHour() {
      return 1 - this.millisecondsToEndOfHour / (this.dayInMS / 24);
    },
    progressToNextDay() {
      return 1 - this.millisecondsToEndOfDay / this.dayInMS;
    },
    progressToNextWeek() {
      return 1 - this.millisecondsToEndOfWeek / (this.dayInMS * 6);
    },
    progressToNextMonth() {
      return (
        1 -
        this.millisecondsToEndOfMonth / (this.now.daysInMonth() * this.dayInMS)
      );
    },
    progressToNextYear() {
      return (
        1 - this.millisecondsToEndOfYear / (this.daysInYear * this.dayInMS)
      );
    },
  },
  methods: {
    setup() {
      this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.now = dayjs().tz(this.timezone);
      this.endOfDay = dayjs("2023-02-20T00:00").tz(this.timezone);
      this.daysInYear = this.now.isLeapYear() ? 366 : 365;
      //2017-06-01T08:30
      this.update();
    },
    update() {
      this.now = dayjs().tz(this.timezone);
      // this.decade = this.now.to(dayjs("2029-12-12"));

      if (process.client) {
        this.raf = window.requestAnimationFrame(this.update);
      }
    },
    destroy() {
      cancelAnimationFrame(this.raf);
    },
    percentageToZero(currentMs, maxMs) {
      return Math.abs(currentMs / maxMs);
    },
  },
};
</script>

<style lang="css">
:root {
  --height: 10em;
}

.progress {
  background: gray;
  width: 100%;
  height: var(--height);
  display: block;
  position: relative;
}
.current {
  background: black;
  height: var(--height);
  display: block;
}

.label {
  line-height: 0;
  font-size: calc(var(--height) * 0.5);
  font-family: sans-serif;
  padding: 0;
  color: white;
  mix-blend-mode: exclusion;
  position: absolute;
  top: 0;
  left: 0.5em;
}
</style>
