import { percentage } from "@/assets/scripts/mathPercentage";
import { secToMsec } from "@/assets/scripts/mathSecondsToMilliseconds";

// 1. update this! remember to keep in in milliseconds!
const durationMsec = secToMsec(0.25);

const isClientSide: boolean = typeof window !== "undefined";
const store = isClientSide ? window?.__NUXT__?.pinia.time : null;
const epoch = isClientSide ? store.epochFrom || "2000-01-01T00:00:00" : null;

// 2. this is where you determine the difference between "now" and "then"
export const getMsecDifference = (now: any) => {
  return now.diff(epoch) % durationMsec;
};

// 3. to get a 0.0 - 1.0 val of this time unit, simply call this func
export const getProgress = (now: object) => {
  return percentage(getMsecDifference(now), durationMsec);
};
