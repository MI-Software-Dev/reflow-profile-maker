import { PeakTempChannelResult } from "@/app/home/schema";
import { SeriesOption } from "echarts";

export const peakTempSeries = (result: PeakTempChannelResult):SeriesOption[] => {
  return Object.entries(result).map(([channel, result]) => {
    return {
      name: channel,
      smooth: true,
      type: "scatter",
      symbolSize: 20,
      data: [[result.time, result.value]],
      label: {
        show: true,
        position: "top",
        formatter: () => {
          return `${result.value}°C - ${result.time}s`;
        },
      },
    };
  });
};
