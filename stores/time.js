import { getTimeUnits } from "@/assets/scripts/timeUnits";
import { percentage, percentageReverse } from "@/assets/scripts/mathPercentage";
import dayjs from "dayjs";
import dayjsIsLeapYear from "dayjs/plugin/isLeapYear";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUTC from "dayjs/plugin/utc";
dayjs.extend(dayjsTimezone);
dayjs.extend(dayjsIsLeapYear);
dayjs.extend(dayjsUTC);

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let now = dayjs().tz(timezone);
let raf;

export const useTimeStore = defineStore("time", {
  state: () => ({
    now,
    duration: getTimeUnits(now),
    epochFrom: "2000-01-01T00:00:00",
  }),
  getters: {
    // nextSecond: (state) => {
    //   return percentageReverse(
    //     state.now.endOf("second").diff(state.now),
    //     state.duration.second
    //   );
    // },
    // nextMinute: (state) => {
    //   return percentageReverse(
    //     state.now.endOf("minute").diff(state.now),
    //     state.duration.minute
    //   );
    // },
    // nextHour: (state) => {
    //   return percentageReverse(
    //     state.now.endOf("hour").diff(state.now),
    //     state.duration.hour
    //   );
    // },
    // nextDay: (state) => {
    //   return percentageReverse(
    //     state.now.endOf("day").diff(state.now),
    //     state.duration.day
    //   );
    // },
    // nextWeek: (state) => {
    //   return percentageReverse(
    //     state.now.endOf("week").diff(state.now),
    //     state.duration.week
    //   );
    // },
    // nextMonth: (state) => {
    //   return percentageReverse(
    //     state.now.endOf("month").diff(state.now),
    //     state.duration.day * state.now.daysInMonth()
    //   );
    // },
    // nextYear: (state) => {
    //   return percentageReverse(
    //     state.now.endOf("year").diff(state.now),
    //     state.duration.year
    //   );
    // },
    // nextDecasecond: (state) => {
    //   return percentage(
    //     state.now.diff(state.epochFrom) % state.duration.decasecond,
    //     state.duration.decasecond
    //   );
    // },
    nextHectosecond: (state) => {
      return percentage(
        state.now.diff(state.epochFrom) % state.duration.hectosecond,
        state.duration.hectosecond
      );
    },
    nextKilosecond: (state) => {
      return percentage(
        state.now.diff(state.epochFrom) % state.duration.kilosecond,
        state.duration.kilosecond
      );
    },
    nextMegasecond: (state) => {
      return percentage(
        state.now.diff(state.epochFrom) % state.duration.megasecond,
        state.duration.megasecond
      );
    },
    nextGigasecond: (state) => {
      return percentage(
        state.now.diff(state.epochFrom) % state.duration.gigasecond,
        state.duration.gigasecond
      );
    },
    nextTerasecond: (state) => {
      return percentage(
        state.now.diff(state.epochFrom) % state.duration.terasecond,
        state.duration.terasecond
      );
    },
    // nextDecade: (state) => {
    //   return percentage(
    //     state.now.diff(state.epochFrom) % state.duration.decade,
    //     state.duration.decade
    //   );
    // },
    nextCentury: (state) => {
      return percentage(
        state.now.diff(state.epochFrom) % state.duration.century,
        state.duration.century
      );
    },
    nextMillennium: (state) => {
      return percentage(
        state.now.diff(state.epochFrom) % state.duration.millennium,
        state.duration.millennium
      );
    },
  },
  actions: {
    update(val) {
      this.now = val;
    },
  },
});

const update = () => {
  if (!process.client) return;
  useTimeStore().update(dayjs().tz(timezone));
  raf = window.requestAnimationFrame(update);
};

const destroy = () => {
  cancelAnimationFrame(raf);
};

update();
