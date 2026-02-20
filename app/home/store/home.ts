import { makeAutoObservable, runInAction } from "mobx";
import { FormValues, TemperaturePoint } from "../schema";
import Swal from "sweetalert2";
import { ReadMemoryTempCsvUseCase } from "../use-cases";

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
  temperaturePoints: TemperaturePoint[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  onChangeFormValue = <K extends keyof FormValues>(
    name: string,
    value: FormValues[K],
  ) => {
    this.formValues = {
      ...this.formValues,
      [name]: value,
    };
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
    reader.onload = () => {
      runInAction(() => {
        const fileContent = reader.result;
        if (fileContent && typeof fileContent === "string") {
          if (file.name.endsWith(".csv")) {
            this.temperaturePoints = ReadMemoryTempCsvUseCase(fileContent);
          }
        }
      });
    };
  };
}

export const homeStore = new HomeStore();
