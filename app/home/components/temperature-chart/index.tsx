import { FC, useMemo } from "react";

import EChartsReact from "echarts-for-react";
import { EChartsOption, SeriesOption } from "echarts";
import { TemperaturePoint } from "../../schema";
import { MeasureResult } from "../../schema/measure-result";
import { resultSeries } from "./result-series";

interface Props {
  dataPoints: TemperaturePoint[];
  chartTitle: string;
  result: MeasureResult;
}

export const TemperatureChart: FC<Props> = ({
  chartTitle = "",
  dataPoints,
  result,
}) => {
  const timeValue = useMemo(() => {
    return dataPoints.map((point) => point["Time(s)"]);
  }, [dataPoints]);
  const resultSeriesData = resultSeries(result);
  // Get legend keys (exclude "Time(s)")
  const legendKeys = useMemo(() => {
    if (!dataPoints.length) return [];
    const keys = Object.keys(dataPoints[0]).filter((key) => key !== "Time(s)");
    return [...keys];
  }, [dataPoints]);
  // Build series dynamically
  const series: SeriesOption[] = useMemo(() => {
    return legendKeys.map((key) => ({
      name: key,
      type: "line",
      data: dataPoints.map((point) => point[key as keyof TemperaturePoint]),
    }));
  }, [legendKeys, dataPoints]);
  const option: EChartsOption = {
    grid: {
      top: 60,
      left: 100,
      right: 100,
      bottom: 100,
    },
    graphic: {
      elements: [
        {
          type: "text",
          right: 20,
          top: 20,
          style: {
            text: "Reflow",
            fill: "#333",
            font: "14px sans-serif",
          },
          
          onclick: () => {
            console.log("Reflow Click");
          },
        },
      ],
    },
    legend: {
      data: [...legendKeys, "reflow", "preheat"],
    },
    title: {
      text: chartTitle,
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: timeValue,
      name: "Time(s)",
      nameTextStyle: {
        fontSize: "16",
        fontWeight: "bold",
      },
      axisLabel: {
        interval: 50,
      },
    },
    yAxis: {
      type: "value",
      interval: 10,
      max: 300,
      name: "Temperature(°C)",
      nameTextStyle: {
        fontSize: "16",
        fontWeight: "bold",
      },
      axisLabel: {},
    },
    series: [
      ...series,
      //    ...resultSeries.preheat,
      //   ...resultSeries.rampTimeRate,
      ...resultSeriesData.peakTemp,
      ...resultSeriesData.reflow,
    ],
  };
  return (
    <EChartsReact option={option} style={{ height: "80vh", width: "100%" }} />
  );
};
