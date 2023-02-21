<template>
  <div>
    <div class="clock">{{ this.now.format("hh:mm:ss") }}</div>
    <div class="progress">
      <p class="label">Second: {{ progressToNextSecond.toFixed(3) }}</p>
      <div
        class="current"
        :style="{ width: `${progressToNextSecond * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">
        Decasecond (10s): {{ progressToNextDecasecond.toFixed(3) }}
      </p>
      <div
        class="current"
        :style="{ width: `${progressToNextDecasecond * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Minute: {{ progressToNextMinute.toFixed(3) }}</p>
      <div
        class="current"
        :style="{ width: `${progressToNextMinute * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">
        Hectosecond (100s): {{ progressToNextHectosecond.toFixed(3) }}
      </p>
      <div
        class="current"
        :style="{ width: `${progressToNextHectosecond * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">
        Kilosecond (16.6m): {{ progressToNextKilosecond.toFixed(3) }}
      </p>
      <div
        class="current"
        :style="{ width: `${progressToNextKilosecond * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Hour: {{ progressToNextHour.toFixed(3) }}</p>
      <div
        class="current"
        :style="{ width: `${progressToNextHour * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Day: {{ progressToNextDay.toFixed(3) }}</p>
      <div
        class="current"
        :style="{ width: `${progressToNextDay * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Week: {{ progressToNextWeek.toFixed(3) }}</p>
      <div
        class="current"
        :style="{ width: `${progressToNextWeek * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">
        Megasecond (11.57days): {{ progressToNextMegasecond.toFixed(3) }}
      </p>
      <div
        class="current"
        :style="{ width: `${progressToNextMegasecond * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Month: {{ progressToNextMonth.toFixed(3) }}</p>
      <div
        class="current"
        :style="{ width: `${progressToNextMonth * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">Year: {{ progressToNextYear.toFixed(3) }}</p>
      <div
        class="current"
        :style="{ width: `${progressToNextYear * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">
        Decade (10 years): {{ progressToNextDecade.toFixed(3) }}
      </p>
      <div
        class="current"
        :style="{ width: `${progressToNextDecade * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">
        Gigasecond (31.7 years): {{ progressToNextGigasecond.toFixed(3) }}
      </p>
      <div
        class="current"
        :style="{ width: `${progressToNextGigasecond * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">
        Century (100 years): {{ progressToNextCentury.toFixed(3) }}
      </p>
      <div
        class="current"
        :style="{ width: `${progressToNextCentury * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">
        Millenium (1000 years): {{ progressToNextMillennium.toFixed(3) }}
      </p>
      <div
        class="current"
        :style="{ width: `${progressToNextMillennium * 100}%` }"
      ></div>
    </div>

    <div class="progress">
      <p class="label">
        Terasecond (31,700 years): {{ progressToNextTerasecond.toFixed(3) }}
      </p>
      <div
        class="current"
        :style="{ width: `${progressToNextTerasecond * 100}%` }"
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
      //
      durationDecade: null,
      durationCentury: null,
      durationMillennium: null,
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
    progressToNextSecond() {
      const msLeft = this.now.endOf("second").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.durationSecond);
    },
    progressToNextMinute() {
      const msLeft = this.now.endOf("minute").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.dayInMS / 24 / 60);
    },
    progressToNextHour() {
      const msLeft = this.now.endOf("hour").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.dayInMS / 24);
    },
    progressToNextDay() {
      const msLeft = this.now.endOf("day").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.dayInMS);
    },
    progressToNextWeek() {
      const msLeft = this.now.endOf("week").diff(this.now);
      return this.percentage(msLeft, this.dayInMS * 7);
    },
    progressToNextMonth() {
      const msLeft = this.now.endOf("month").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.now.daysInMonth() * this.dayInMS);
    },
    progressToNextYear() {
      const msLeft = this.now.endOf("year").diff(this.now, "milliseconds");
      return this.percentage(msLeft, this.daysInYear * this.dayInMS);
    },
    progressToNextDecasecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationDecasecond;
      return 1 - this.percentage(msLeft, this.durationDecasecond);
    },
    progressToNextHectosecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationHectosecond;
      return 1 - this.percentage(msLeft, this.durationHectosecond);
    },
    progressToNextKilosecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationKilosecond;
      return 1 - this.percentage(msLeft, this.durationKilosecond);
    },
    progressToNextMegasecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationMegasecond;
      return 1 - this.percentage(msLeft, this.durationMegasecond);
    },
    progressToNextGigasecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationGigasecond;
      return 1 - this.percentage(msLeft, this.durationGigasecond);
    },
    progressToNextTerasecond() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationTerasecond;
      return 1 - this.percentage(msLeft, this.durationTerasecond);
    },
    progressToNextDecade() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationDecade;
      return 1 - this.percentage(msLeft, this.durationDecade);
    },
    progressToNextCentury() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationCentury;
      return 1 - this.percentage(msLeft, this.durationCentury);
    },
    progressToNextMillennium() {
      const msLeft = this.now.diff(this.unixEpoch) % this.durationMillennium;
      return 1 - this.percentage(msLeft, this.durationMillennium);
    },
  },
  methods: {
    setup() {
      this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.now = dayjs().tz(this.timezone);
      this.endOfDay = dayjs("2023-02-20T00:00").tz(this.timezone);
      this.daysInYear = this.now.isLeapYear() ? 366 : 365;
      this.durationDecade = 315532800 * this.durationSecond;
      this.durationCentury = 3155695200 * this.durationSecond;
      this.durationMillennium = 31536000000 * this.durationSecond;
      this.durationDecasecond = this.seconds(10);
      this.durationHectosecond = this.seconds(100);
      this.durationKilosecond = this.seconds(1000);
      this.durationMegasecond = this.seconds(1000000);
      this.durationGigasecond = this.seconds(1000000000);
      this.durationTerasecond = this.seconds(1000000000000);
      // got to here..
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
  --height: 10em;
}

.progress {
  background: pink;
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
  font-family: "BradfordMono_8-3-Regular";
  padding: 0;
  color: white;
  mix-blend-mode: exclusion;
  position: absolute;
  top: 0;
  left: 0.5em;
}
</style>
