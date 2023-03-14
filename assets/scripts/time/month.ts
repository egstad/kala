import { percentageReverse } from "@/assets/scripts/mathPercentage";
import { daysToMsec } from "@/assets/scripts/mathDaysToMilliseconds";

export const getMsecDifference = (now: any) => {
  return now.endOf("month").diff(now);
};

export const getProgress = (now: any) => {
  const durationMsec = daysToMsec(now.daysInMonth());
  return percentageReverse(getMsecDifference(now), durationMsec);
};
