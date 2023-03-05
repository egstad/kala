import { secToMsec } from "@/assets/scripts/mathSecondsToMilliseconds";

export function setDurationOfFixedTimeUnits() {
  return {
    second: secToMsec(1),
    minute: secToMsec(60),
    hour: secToMsec(3600),
    day: secToMsec(86400),
    week: secToMsec(604800),

    // seconds
    decasecond: secToMsec(10),
    hectosecond: secToMsec(100),
    kilosecond: secToMsec(1000),
    megasecond: secToMsec(1000000),
    gigasecond: secToMsec(1000000000),
    terasecond: secToMsec(1000000000000),
    // calculating msecs isn't efficient at this scale.
    // petasecond: secToMsec(1000000000000000),
    // exasecond: secToMsec(1000000000000000000),
    // zettasecond: secToMsec(1000000000000000000000),
    // yottasecond: secToMsec(1000000000000000000000000),
    // ronnasecond: secToMsec(1000000000000000000000000000),
    // quettasecond: secToMsec(1000000000000000000000000000000),

    // interesting units
    jiffy: secToMsec(0.01),
    blink: secToMsec(0.25),
    helek: secToMsec(3.333),
    nanocentury: secToMsec(3.156),
    milliday: secToMsec(86.4),
    moment: secToMsec(90),
    ke: secToMsec(900),
  };
}
