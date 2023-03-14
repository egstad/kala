import { percentageReverse } from "@/assets/scripts/mathPercentage";
import { daysToMsec } from "@/assets/scripts/mathDaysToMilliseconds";

export const getMsecDifference = (now: any) => {
  return now.endOf("year").diff(now);
};

export const getProgress = (now: any) => {
  const durationMsec = () => {
    const daysInYear = now.isLeapYear() ? 366 : 365;
    return daysToMsec(daysInYear);
  };

  return percentageReverse(getMsecDifference(now), durationMsec());
};
