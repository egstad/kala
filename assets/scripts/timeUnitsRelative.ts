import { daysToMsec } from "@/assets/scripts/mathDaysToMilliseconds";
import dayjs from "dayjs";

export function setDurationOfRelativeTimeUnits(unitsFixed: object, now: any) {
  return {
    month: (() => {
      return daysToMsec(now.daysInMonth());
    })(),

    year: (() => {
      const daysInYear = now.isLeapYear() ? 366 : 365;
      return daysToMsec(daysInYear);
    })(),

    decade: (() => {
      const start = Math.floor(now.year() * 0.1) * 10;
      const end = Math.ceil(now.year() * 0.1) * 10;

      const decadeBeginning = dayjs(`${start}-01-01`);
      const decadeEnd = dayjs(`${end}-01-01`);
      return decadeEnd.diff(decadeBeginning);
    })(),

    century: (() => {
      const start = Math.floor(now.year() * 0.1) * 100;
      const end = Math.ceil(now.year() * 0.1) * 100;

      const centuryBeginning = dayjs(`${start}-01-01`);
      const centuryEnd = dayjs(`${end}-01-01`);
      return centuryEnd.diff(centuryBeginning);
    })(),

    millennium: (() => {
      const start = Math.floor(now.year() * 0.1) * 1000;
      const end = Math.ceil(now.year() * 0.1) * 1000;

      const millenniumBeginning = dayjs(`${start}-01-01`);
      const millenniumEnd = dayjs(`${end}-01-01`);
      return millenniumEnd.diff(millenniumBeginning);
    })(),
  };
}
