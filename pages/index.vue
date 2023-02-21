<template>
  <div>
    <h1>Index</h1>
    <hr />
    <div class="clock">{{ now.format("hh:mm:ss:SSS") }}</div>

    <h2>Minute</h2>
    <table>
      <tr>
        <td>til end of minute (ms)</td>
        <td>{{ now.endOf("minute").diff(now, "milliseconds") }}</td>
      </tr>
      <tr>
        <td>minute progress (%)</td>
        <td>
          {{
            1 -
            now.endOf("minute").diff(now, "milliseconds") / (dayInMS / 24 / 60)
          }}
        </td>
      </tr>
    </table>

    <h2>Hour</h2>
    <table>
      <tr>
        <td>til end of hour (ms)</td>
        <td>{{ now.endOf("hour").diff(now, "milliseconds") }}</td>
      </tr>
      <tr>
        <td>hourly progress (%)</td>
        <td>
          {{ 1 - now.endOf("hour").diff(now, "milliseconds") / (dayInMS / 24) }}
        </td>
      </tr>
    </table>

    <h2>Day</h2>
    <table>
      <tr>
        <td>til end of day (ms)</td>
        <td>{{ now.endOf("day").diff(now, "milliseconds") }}</td>
      </tr>
      <tr>
        <td>daily progress (%)</td>
        <td>
          {{ 1 - now.endOf("day").diff(now, "milliseconds") / dayInMS }}
        </td>
      </tr>
    </table>

    <h2>Month</h2>
    <table>
      <tr>
        <td>til end of month (days)</td>
        <td>{{ now.endOf("month").diff(now, "days") }}</td>
      </tr>
      <tr>
        <td>til end of month (ms)</td>
        <td>{{ now.endOf("month").diff(now, "milliseconds") }}</td>
      </tr>
      <tr>
        <td>monthly progress (%)</td>
        <td>
          {{
            1 -
            now.endOf("month").diff(now, "milliseconds") /
              (now.daysInMonth() * dayInMS)
          }}
        </td>
      </tr>
    </table>

    <hr />

    <h2>Year</h2>
    <table>
      <tr>
        <td>til end of year (days)</td>
        <td>{{ daysInYear - now.dayOfYear() }}</td>
      </tr>
      <tr>
        <td>til end of year (ms)</td>
        <td>
          {{ now.endOf("year").diff(now, "milliseconds") }}
        </td>
      </tr>
      <tr>
        <td>yearly progress (%)</td>
        <td>
          {{
            1 -
            now.endOf("year").diff(now, "milliseconds") / (daysInYear * dayInMS)
          }}
        </td>
      </tr>
    </table>

    <table style="display: none">
      <tr>
        <td>now</td>
        <td>
          <DateTimePicker v-model="dateFrom" />
        </td>
        <td>{{ dateFrom }}</td>
      </tr>
      <tr>
        <td>then</td>
        <td>
          <DateTimePicker :currentValue="dateTo" />
        </td>
        <td>{{ dateTo }}</td>
      </tr>
      <tr>
        <td>difference</td>
        <td>{{ now.diff(dateTo, "seconds") }}</td>
      </tr>
    </table>
    <hr />

    <ClientOnly fallback-tag="span" fallback="Loading...">
      <table style="display: none">
        <thead>
          <tr>
            <td>Property</td>
            <td>Currently</td>
            <td>Until next (in ms)</td>
          </tr>
        </thead>
        <tr>
          <td>timezone</td>
          <td>{{ timezone }}</td>
          <td></td>
        </tr>

        <tr>
          <td>now</td>
          <td>{{ now }}</td>
          <td></td>
        </tr>

        <tr>
          <td>now (in ms)</td>
          <td>{{ now.valueOf() }}</td>
          <td></td>
        </tr>

        <tr>
          <td>clock</td>
          <td>{{ now.format("hh:mm:ss::SSS a") }}</td>
          <td></td>
        </tr>

        <tr>
          <td>year</td>
          <td>{{ now.format("YYYY") }}</td>
          <td>{{ now.diff("2024-01-01", "SSS") }}</td>
          <td>
            {{ percentageToZero(now.diff("2024-01-01", "SSS"), 9999) }}
          </td>
        </tr>

        <tr>
          <td>month</td>
          <td>{{ now.format("MM") }}</td>
          <td>{{ now.diff(now.endOf("month"), "SSS") }}</td>
          <td>
            <!-- now(18)/28 = 0.64285714  -->
            <!-- {{ percentageToZero(now.valueOf(), now.endOf("month").valueOf()) }} -->
            {{ now.endOf("month").valueOf() - now }}
          </td>
        </tr>

        <!-- <tr>
          <td>week</td>
          <td>{{ now.week() }}</td>
          <td>{{ now.diff(now.endOf("week"), "SSS") }}</td>
          <td>
            {{
              percentageToZero(now.diff(now.endOf("week"), "SSS"), 604800000)
            }}
          </td>
        </tr> -->

        <tr>
          <td>day</td>
          <td>{{ now.format("DD") }}</td>
          <td>{{ now.diff(now.endOf("day"), "SSS") }}</td>
          <td>
            {{ percentageToZero(now.diff(now.endOf("day"), "SSS"), 86400000) }}
          </td>
        </tr>

        <tr>
          <td>hour</td>
          <td>{{ now.format("hh") }}</td>
          <td>{{ now.diff(now.endOf("hour"), "SSS") }}</td>
          <td>
            {{ percentageToZero(now.diff(now.endOf("hour"), "SSS"), 3600000) }}
          </td>
        </tr>

        <tr>
          <td>minute</td>
          <td>{{ now.format("mm") }}</td>
          <td>{{ now.diff(now.endOf("minute"), "SSS") }}</td>
          <td>
            {{ percentageToZero(now.diff(now.endOf("minute"), "SSS"), 60000) }}
          </td>
        </tr>

        <tr>
          <td>second</td>
          <td>{{ now.format("ss") }}</td>
          <td>{{ now.diff(now.endOf("second"), "SSS") }}</td>
          <td>
            {{ percentageToZero(now.diff(now.endOf("second"), "SSS"), 1000) }}
          </td>
        </tr>
      </table>

      <button @click="update()">Start!</button>
      <button @click="destroy()">Stop!</button>
    </ClientOnly>
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

<style lang="css" scoped>
tr,
td {
  border: 1px solid black;
  padding: 0.25em 0.5em;
  font-family: monospace;
}

thead {
  background: #000;
  color: white;
}

.clock {
  position: fixed;
  top: 0;
  right: 0;
  background: black;
  color: white;
  font-family: monospace;
}
</style>
