import { percentageReverse } from "@/assets/scripts/mathPercentage";
import { secToMsec } from "@/assets/scripts/mathSecondsToMilliseconds";

export const duration = secToMsec(60);

export const getMsecDifference = (now: any) => {
  return now.endOf("minute").diff(now);
};

export const getProgress = (now: any) => {
  return percentageReverse(getMsecDifference(now), duration);
};
