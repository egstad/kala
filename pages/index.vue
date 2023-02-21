<template>
  <div>
    <div class="clock">{{ now.format("hh:mm:ss") }}</div>
    <button @click="update()">Start!</button>
    <button @click="destroy()">Stop!</button>

    <!-- Fractions of a second -->
    <!-- <TimeUnit title="Jiffy (0.01s)" :progress="nextJiffy" /> -->
    <!-- <TimeUnit title="Blink (0.25s)" :progress="nextBlink" /> -->

    <!-- A second or more -->
    <TimeUnit title="Second" :progress="nextSecond" />
    <TimeUnit title="Helek (3.3s)" :progress="nextHelek" />
    <TimeUnit title="Decasecond (10s)" :progress="nextDecasecond" />

    <!-- A minute or more -->
    <TimeUnit title="Minute" :progress="nextMinute" />
    <TimeUnit title="Milliday (86.4s)" :progress="nextMilliday" />
    <TimeUnit title="Moment (90s)" :progress="nextMoment" />
    <TimeUnit title="Hectosecond (100s)" :progress="nextHectosecond" />
    <TimeUnit title="Kilosecond (16.6m)" :progress="nextKilosecond" />

    <!-- A hour or more -->
    <TimeUnit title="Hour" :progress="nextHour" />

    <!-- A day or more -->
    <TimeUnit title="Day" :progress="nextDay" />
    <TimeUnit title="Week" :progress="nextWeek" />
    <TimeUnit title="Megasecond" :progress="nextMegasecond" />
    <TimeUnit title="Month" :progress="nextMonth" />

    <!-- A year or more -->
    <TimeUnit title="Year" :progress="nextYear" />
    <TimeUnit title="Decade" :progress="nextDecade" />
    <TimeUnit title="Gigasecond (31.7y)" :progress="nextGigasecond" />
    <TimeUnit title="Century (100y)" :progress="nextCentury" />
    <TimeUnit title="Millennium (1000y)" :progress="nextMillennium" />
    <TimeUnit title="Terasecond (31,700y)" :progress="nextTerasecond" />
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
      unixEpoch: "2000-01-01",
      now: null,
      decade: null,
      dateTo: null,
      dayInMS: 86400000,
      daysThisYear: null,
      endOfDay: null,
      endOfMonth: null,
      durationSecond: 1000,
      durationDecasecond: null,
      durationHectosecond: null,
      durationKilosecond: null,
      durationMegasecond: null,
      durationGigasecond: null,
      durationTerasecond: null,
      durationPetasecond: null,
      durationExasecond: null,
      durationZettasecond: null,
      durationYottasecond: null,
      durationRonnasecond: null,
      durationQuettasecond: null,
      durationDecade: null,
      durationCentury: null,
      durationMillennium: null,
      durationBlink: null,
      durationHelek: null,
      durationMoment: null,
      durationNanocentury: null,
      durationMilliday: null,
      durationJiffy: null,
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
    nextSecond() {
      const msLeft = this.now.endOf("second").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.durationSecond);
    },
    nextMinute() {
      const msLeft = this.now.endOf("minute").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.dayInMS / 24 / 60);
    },
    nextHour() {
      const msLeft = this.now.endOf("hour").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.dayInMS / 24);
    },
    nextDay() {
      const msLeft = this.now.endOf("day").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.dayInMS);
    },
    nextWeek() {
      const msLeft = this.now.endOf("week").diff(this.now);
      return this.percentage(msLeft, this.dayInMS * 7);
    },
    nextMonth() {
      const msLeft = this.now.endOf("month").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.now.daysInMonth() * this.dayInMS);
    },
    nextYear() {
      const msLeft = this.now.endOf("year").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.daysInYear * this.dayInMS);
    },
    nextDecasecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationDecasecond;
      return 1 - this.percentage(msLeft, this.durationDecasecond);
    },
    nextHectosecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationHectosecond;
      return 1 - this.percentage(msLeft, this.durationHectosecond);
    },
    nextKilosecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationKilosecond;
      return 1 - this.percentage(msLeft, this.durationKilosecond);
    },
    nextMegasecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationMegasecond;
      return 1 - this.percentage(msLeft, this.durationMegasecond);
    },
    nextGigasecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationGigasecond;
      return 1 - this.percentage(msLeft, this.durationGigasecond);
    },
    nextTerasecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationTerasecond;
      return 1 - this.percentage(msLeft, this.durationTerasecond);
    },
    nextDecade() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationDecade;
      return 1 - this.percentage(msLeft, this.durationDecade);
    },
    nextCentury() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationCentury;
      return 1 - this.percentage(msLeft, this.durationCentury);
    },
    nextMillennium() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationMillennium;
      return 1 - this.percentage(msLeft, this.durationMillennium);
    },
    nextJiffy() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationJiffy;
      return 1 - this.percentage(msLeft, this.durationJiffy);
    },
    nextBlink() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationBlink;
      return 1 - this.percentage(msLeft, this.durationBlink);
    },
    nextHelek() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationHelek;
      return 1 - this.percentage(msLeft, this.durationHelek);
    },
    nextMilliday() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationMilliday;
      return 1 - this.percentage(msLeft, this.durationMilliday);
    },
    nextMoment() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationMoment;
      return 1 - this.percentage(msLeft, this.durationMoment);
    },
  },
  methods: {
    setup() {
      this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.now = dayjs().tz(this.timezone);
      this.endOfDay = dayjs("2023-02-20T00:00").tz(this.timezone);
      this.daysInYear = this.now.isLeapYear() ? 366 : 365;

      // common units
      this.durationDecade = 315532800 * this.durationSecond;
      this.durationCentury = 3155695200 * this.durationSecond;
      this.durationMillennium = 31536000000 * this.durationSecond;

      // funny units
      this.durationJiffy = this.seconds(0.01);
      this.durationBlink = this.seconds(0.25);
      this.durationHelek = this.seconds(3.333);
      this.durationNanocentury = this.seconds(3.156);
      this.durationMilliday = this.seconds(86.4);
      this.durationMoment = this.seconds(90);
      this.durationKe = this.seconds(900);

      // second variations
      this.durationDecasecond = this.seconds(10);
      this.durationHectosecond = this.seconds(100);
      this.durationKilosecond = this.seconds(1000);
      this.durationMegasecond = this.seconds(1000000);
      this.durationGigasecond = this.seconds(1000000000);
      this.durationTerasecond = this.seconds(1000000000000);
      this.durationPetasecond = this.seconds(1000000000000000);
      this.durationExasecond = this.seconds(1000000000000000000);
      this.durationZettasecond = this.seconds(1000000000000000000000);
      this.durationYottasecond = this.seconds(1000000000000000000000000);
      this.durationRonnasecond = this.seconds(1000000000000000000000000000);
      this.durationQuettasecond = this.seconds(1000000000000000000000000000000);

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
    percentage(msCurrent, msDuration) {
      return 1 - msCurrent / msDuration;
    },
    seconds(val) {
      return val * this.durationSecond;
    },
  },
};
</script>

<style lang="css">
:root {
  --height: 2em;
}
</style>
