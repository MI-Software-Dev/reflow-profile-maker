import { FC, useMemo } from "react";
import { TemperaturePoint } from "../schema";
import EChartsReact from "echarts-for-react";
import { EChartsOption, SeriesOption } from "echarts";

interface Props {
  dataPoints: TemperaturePoint[];
  chartTitle: string;
}

export const TemperatureChart: FC<Props> = ({
  chartTitle = "",
  dataPoints,
}) => {
  const timeValue = useMemo(() => {
    return dataPoints.map((point) => point["Time(s)"]);
  }, [dataPoints]);
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
        interval: 300,
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
      // {
      //   name: "Ach(°C)",
      //   type: "line",
      //   smooth: true,
      //   data: temperaturePoints.map((p) => p["Ach(°C)"]), // or correct key
      //   areaStyle: {
      //     color: {
      //       type: "linear",
      //       x: 0,
      //       y: 0,
      //       x2: 0,
      //       y2: 1,
      //       colorStops: [
      //         { offset: 0, color: "rgba(0,123,255,0.6)" },
      //         { offset: 1, color: "rgba(0,123,255,0.05)" },
      //       ],
      //     },
      //   },
      // },
    ],
  };
  return (
    <EChartsReact option={option} style={{ height: "80vh", width: "100%" }} />
  );
};
