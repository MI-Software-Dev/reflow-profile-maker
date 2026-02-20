import { ReflowTimeChannelResult } from "@/app/home/schema";
import { SeriesOption } from "echarts";

export const reflowSeries = (
  result: ReflowTimeChannelResult,
): SeriesOption[] => {
  return Object.entries(result).map(([channel, result]) => {
    return {
      name: channel,
      type: "line",
      areaStyle: {
        opacity: 0.2,
      },
      markLine: {
        symbol: "none",
        data: [
          {
            xAxis: result.timeStartIdx,
            label: {
              show: true,
              position: "end", // 👈 ไปอยู่ด้านบนของเส้นแนวตั้ง
              formatter: `${result.timeStart.toFixed(2)} S`,
            },
          },
          {
            xAxis: result.timeEndIdx,
            label: {
              show: true,
              position: "end",
              formatter: `${result.timeEnd.toFixed(2)} S`,
            },
          },
        ],
      },
      markArea: {
        data: [
          [
            {
              xAxis: result.timeStartIdx,
              yAxis: 180,
              label: {
                show: true,
                formatter: () => {
                  return `${result.diff.toFixed(2)} S`;
                },
              },
            },
            {
              xAxis: result.timeEndIdx,
              yAxis: 250,
            },
          ],
        ],
      },
    };
  });
};
