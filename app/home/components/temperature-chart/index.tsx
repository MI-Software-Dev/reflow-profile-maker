import { FC, useMemo, useState } from "react";

import EChartsReact from "echarts-for-react";
import { EChartsOption, SeriesOption } from "echarts";
import { TemperaturePoint } from "../../schema";
import { MeasureResult } from "../../schema/measure-result";
import { resultSeries } from "./result-series";

interface Props {
  dataPoints: TemperaturePoint[];
  chartTitle: string;
  result: MeasureResult;
  enableSwitchResult: boolean;
}

export const TemperatureChart: FC<Props> = ({
  chartTitle = "",
  enableSwitchResult = false,
  dataPoints,
  result,
}) => {
  const [resultSwitch, setResultSwitch] = useState({
    reflow: {
      label: "Reflow",
      value: false,
    },
    preheat: {
      label: "Preheat",
      value: false,
    },
    rampTimeRate: {
      label: "Ramp Time Rate",
      value: false,
    },
    peakTemp: {
      label: "Peak Temp",
      value: false,
    },
  });
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
    backgroundColor: "#FFF",
    grid: {
      top: 60,
      left: 100,
      right: 100,
      bottom: 100,
    },
    graphic: !enableSwitchResult
      ? { type: "group" }
      : {
          right: 10,
          top: 20,
          type: "group",
          children: Object.entries(resultSwitch).map(([key, item], index) => ({
            type: "text",
            left: index * 150, // spacing between items
            style: {
              text: item.label,
              fill: item.value ? "#1890ff" : "#333",
              font: "18px sans-serif",
              fontWeight: item.value ? "bold" : "normal",
              cursor: "pointer",
            },
            onclick: () => {
              setResultSwitch((prev) => ({
                ...prev,
                [key]: {
                  ...prev[key as keyof typeof prev],
                  value: !prev[key as keyof typeof prev].value,
                },
              }));
            },
          })),
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
    },
    series: [
      ...series,
      ...(resultSwitch.preheat.value ? resultSeriesData.preheat : []),
      ...(resultSwitch.rampTimeRate.value ? resultSeriesData.rampTimeRate : []),
      ...(resultSwitch.peakTemp.value ? resultSeriesData.peakTemp : []),
      ...(resultSwitch.reflow.value ? resultSeriesData.reflow : []),
    ],
  };
  return (
    <EChartsReact
      notMerge={true}
      lazyUpdate={false}
      option={option}
      style={{ height: "80vh", width: "100%" }}
    />
  );
};
