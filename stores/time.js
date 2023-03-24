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
    epochFrom: "2000-01-01T00:00:00",
    selectedStyle: "text-ring",
    selectedTimeUnit: null,
    supportedStyles: ["band", "line", "pie", "zoom", "text-ring"],
    supportedTimeUnits: [
      "blink",
      "century",
      "day",
      "decade",
      "decasecond",
      "fortnight",
      "ghurry",
      "gigasecond",
      "hectosecond",
      "helek",
      "hour",
      "ke",
      "kilosecond",
      "lustre",
      "megasecond",
      "microcentury",
      "millennium",
      "milliday",
      "minute",
      "moment",
      "month",
      "nanocentury",
      "scaramucci",
      "second",
      "terasecond",
      "week",
      "year",
    ],
  }),
  actions: {
    update(val) {
      this.now = val;
    },
    updateEpoch(val) {
      this.epochFrom = val;
    },
    updateStyle(val) {
      this.selectedStyle = val;
    },
  },
});

const update = () => {
  if (!process.client) return;
  useTimeStore().update(dayjs().tz(timezone));
  raf = window.requestAnimationFrame(update);
};

const destroy = () => cancelAnimationFrame(raf);

update();
