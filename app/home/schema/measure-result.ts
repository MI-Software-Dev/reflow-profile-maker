import { PeakTempChannelResult } from "./peak-temp-result";
import { PreheatTimeResult } from "./preheat-time-result";
import { RampTimeRateChannelResult } from "./ramp-time-rate-result";
import { ReflowTimeChannelResult } from "./reflow-time-result";

export type MeasureResult = {
  preheat?: PreheatTimeResult;
  reflow?: ReflowTimeChannelResult;
  rampTimeRate?: RampTimeRateChannelResult;
  peakTemp?: PeakTempChannelResult;
};
