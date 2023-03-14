import { percentageReverse } from "@/assets/scripts/mathPercentage";
import { secToMsec } from "@/assets/scripts/mathSecondsToMilliseconds";

// 1. update this! remember to keep in in milliseconds!
const durationMsec = secToMsec(60);

// 2. this is where you determine the difference between "now" and "then"
export const getMsecDifference = (now: any) => {
  return now.endOf("minute").diff(now);
};

// 3. to get a 0.0 - 1.0 val of this time unit, simply call this func
export const getProgress = (now: object) => {
  return percentageReverse(getMsecDifference(now), durationMsec);
};