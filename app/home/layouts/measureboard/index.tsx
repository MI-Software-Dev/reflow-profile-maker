import { ArrowRightSquare } from "lucide-react";
import { observer } from "mobx-react";
import { FC } from "react";
import { homeStore } from "../../store";
import { TemperatureChart } from "../../components";

export const Measureboard: FC = observer(() => {
  const { temperaturePoints, formValues, measureReflow } = homeStore;

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
          result={{
            peakTemp: undefined,
            preheat: undefined,
            rampTimeRate: undefined,
            reflow: measureReflow(),
          }}
        />
      </div>
    </div>
  );
});
