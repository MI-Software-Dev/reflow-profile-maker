import { FC, useMemo } from "react";

import EChartsReact from "echarts-for-react";
import { EChartsOption, SeriesOption } from "echarts";
import { TemperaturePoint } from "../../schema";
import { MeasureResult } from "../../schema/measure-result";
import { resultMapper } from "./helper";

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
  const resultSeries = resultMapper(result);
  // Get legend keys (exclude "Time(s)")
  const legendKeys = useMemo(() => {
    if (!dataPoints.length) return [];

    return Object.keys(dataPoints[0]).filter((key) => key !== "Time(s)");
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
    legend: {
      data: legendKeys,
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
      //     ...resultSeries.peakTemp,
      //    ...resultSeries.preheat,
      //   ...resultSeries.rampTimeRate,
      ...resultSeries.reflow,
    ],
  };
  return (
    <EChartsReact option={option} style={{ height: "80vh", width: "100%" }} />
  );
};
