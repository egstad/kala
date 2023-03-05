import { setDurationOfFixedTimeUnits } from "@/assets/scripts/timeUnitsFixed";
import { setDurationOfRelativeTimeUnits } from "@/assets/scripts/timeUnitsRelative";

export function getTimeUnits(now: any) {
  const unitsFixed = setDurationOfFixedTimeUnits();
  const unitsRelative = setDurationOfRelativeTimeUnits(unitsFixed, now);

  return { ...unitsFixed, ...unitsRelative };
}
