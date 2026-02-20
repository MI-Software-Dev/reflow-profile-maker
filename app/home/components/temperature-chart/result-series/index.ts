import { MeasureResult } from "@/app/home/schema";
import { reflowSeries } from "./reflow";
import { peakTempSeries } from "./peak-temp";
import { preheatSeries } from "./preheat";
import { rampTimeRateSeries } from "./ramp-time-rate";

export const resultSeries = (result: MeasureResult) => {
  return {
    reflow: result.reflow ? reflowSeries(result.reflow) : [],
    peakTemp: result.peakTemp ? peakTempSeries(result.peakTemp) : [],
    preheat: result.preheat ? preheatSeries(result.preheat) : [],
    rampTimeRate: result.rampTimeRate
      ? rampTimeRateSeries(result.rampTimeRate)
      : [],
  };
};
