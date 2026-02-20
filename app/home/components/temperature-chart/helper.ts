import { SeriesOption } from "echarts";
import { MeasureResult } from "../../schema/measure-result";

export const resultMapper = (result: MeasureResult) => {
  const peakTempSeries: SeriesOption[] = result.peakTemp
    ? Object.entries(result.peakTemp).map(([channel, result]) => {
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
      })
    : [];
  const preheatSeries: SeriesOption[] = result.preheat
    ? Object.entries(result.preheat).map(([channel, result]) => {
        return {
          name: channel,
          smooth: true,
        };
      })
    : [];
  const rampTimeRateSeries: SeriesOption[] = result.rampTimeRate
    ? Object.entries(result.rampTimeRate).map(([channel, result]) => {
        return {
          name: channel,
          smooth: true,
        };
      })
    : [];
  const reflowSeries: SeriesOption[] = result.reflow
    ? Object.entries(result.reflow).map(([channel, result]) => {
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
      })
    : [];
  return {
    peakTemp: peakTempSeries,
    preheat: preheatSeries,
    rampTimeRate: rampTimeRateSeries,
    reflow: reflowSeries,
  };
};
