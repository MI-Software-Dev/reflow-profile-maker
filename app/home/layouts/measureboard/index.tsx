import { ArrowRightSquare } from "lucide-react";
import { observer } from "mobx-react";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { homeStore } from "../../store";
import { EChartsOption, SeriesOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { TemperaturePoint } from "../../schema";
import { TemperatureChart } from "../../components";

export const Measureboard: FC = observer(() => {
  const { temperaturePoints, formValues } = homeStore;

  return (
    <div className="flex size-full flex-col gap-3">
      <div>
        <label
          htmlFor="my-drawer-1"
          className="btn btn-ghost drawer-button lg:hidden"
        >
          <ArrowRightSquare />
        </label>
      </div>
      <div className="flex-1">
        <TemperatureChart
          chartTitle={formValues.line}
          dataPoints={temperaturePoints}
        />
      </div>
    </div>
  );
});
