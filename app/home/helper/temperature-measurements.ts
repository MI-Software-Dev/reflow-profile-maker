import {
  ChannelName,
  ReflowTimeChannelResult,
  ReflowTimeSpec,
  TemperaturePoint,
} from "@/app/home/schema";

export class TemperatureMeasurement {
  measureReflow = (
    dataPoint: TemperaturePoint[],
    spec: ReflowTimeSpec,
  ): ReflowTimeChannelResult => {
    const channelMeasure = (
      channelDataPoint: number[],
      timeDataPoint: number[],
    ): ReflowTimeChannelResult["Ach(°C)"] => {
      const reflowStartTempIdx = channelDataPoint.findIndex(
        (item) => Math.floor(item) === spec.minTemp,
      );
      const reflowEndTempIdx = channelDataPoint.findLastIndex(
        (item) => Math.floor(item) >= spec.minTemp,
      );
      if (reflowEndTempIdx && reflowEndTempIdx) {
        const reflowStartTime = timeDataPoint[reflowStartTempIdx];
        const reflowEndTime = timeDataPoint[reflowEndTempIdx];
        const diff = reflowEndTime - reflowStartTime;
        return {
          timeEndIdx: reflowEndTempIdx,
          timeStartIdx: reflowStartTempIdx,
          timeEnd: reflowEndTime,
          timeStart:reflowStartTime,
          pass: spec.minTemp <= diff && diff <= spec.maxTime,
          diff,
        };
      } else {
        return {
          timeEnd: 0,
          timeStart:0,
          timeEndIdx: 0,
          pass: false,
          timeStartIdx: 0,
          diff: 0,
        };
      }
    };
    const channels =
      dataPoint.length > 0
        ? (Object.entries(dataPoint[0])
            .map(([k, v]) => k)
            .filter((item) => item != "Time(s)") as ChannelName[])
        : [];
    const times = dataPoint.map((item) => item["Time(s)"]);
    return Object.fromEntries(
      channels.map((channel) => [
        channel,
        channelMeasure(
          dataPoint.map((item) => item[channel]),
          times,
        ),
      ]),
    );
  };

  measurePeakTemp = (dataPoint: TemperaturePoint[]) => {};

  measurePreheatTime = (dataPoint: TemperaturePoint[]) => {};

  measureRampTimeRate = (dataPoint: TemperaturePoint[]) => {};
}
