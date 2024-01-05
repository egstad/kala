export const useTimeStore = defineStore("time", {
  state: () => ({
    now: null,
    epochFrom: "2000-01-01T00:00:00",
    timeUnitDefault: "All",
    timeSelectedUnit: null,
    timeUnitsSupported: [
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
      "human-life-expectancy",
      "kala",
      "ke",
      "kilosecond",
      "lustre",
      "lotr-trilogy",
      "megasecond",
      "messiah",
      "microcentury",
      "millennium",
      "milliday",
      "minute",
      "moment",
      "month",
      "nanocentury",
      "scaramucci",
      "second",
      "teenage-kicks",
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
    updateTime(val) {
      this.timeSelectedUnit = val;
    },
  },
});
