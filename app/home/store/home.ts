import { makeAutoObservable, runInAction } from "mobx";
import { FormErrors, FormValues, TemperaturePoint } from "../schema";
import {
  ReadMemoryTempCsvUseCase,
  ReadMemoryTempTmrUseCase,
} from "../use-cases";
import Swal from "sweetalert2";
import { TemperatureMeasurement } from "../helper";

class HomeStore {
  formValues: FormValues = {
    employeeId: "",
    group: "",
    kitName: "",
    line: "",
    n2: "",
    serieNumber: "",
    specs: "",
    specTag: "",
    uploadFile: new File([], ""),
  };
  formErrors: FormErrors = {};
  temperaturePoints: TemperaturePoint[] = [];
  measurement = new TemperatureMeasurement();
  constructor() {
    makeAutoObservable(this);
  }

  measureReflow = () => {
    return this.measurement.measureReflow(this.temperaturePoints, {
      maxTime: 40,
      minTemp: 200,
      minTime: 10,
    });
  };

  onChangeFormValue = <K extends keyof FormValues>(
    name: string,
    value: FormValues[K],
  ) => {
    this.formValues = {
      ...this.formValues,
      [name]: value,
    };
    this.formErrors[name as K] = value;
  };

  onResetFormValues = () => {
    this.formValues = {
      employeeId: "",
      group: "",
      kitName: "",
      line: "",
      n2: "",
      serieNumber: "",
      specs: "",
      specTag: "",
      uploadFile: new File([], ""),
    };
    this.temperaturePoints = [];
  };

  onMeasure = () => {
    this.parseMemoryTemp();
  };

  parseMemoryTemp = () => {
    const file = this.formValues.uploadFile;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async () => {
      try {
        runInAction(() => {
          const fileContent = reader.result;
          if (fileContent && typeof fileContent === "string") {
            if (file.name.endsWith(".csv")) {
              this.temperaturePoints = ReadMemoryTempCsvUseCase(fileContent);
            } else if (file.name.endsWith(".tmr")) {
              this.temperaturePoints = ReadMemoryTempTmrUseCase(fileContent);
            }
          }
        });
      } catch (e: unknown) {
        await Swal.fire({
          title: "Temperature File Error",
          text: e instanceof Error ? e.message : `${e}`,
        });
      }
    };
  };
}

export const homeStore = new HomeStore();
