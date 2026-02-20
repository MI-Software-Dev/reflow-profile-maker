import {
  SelectFormField,
  FormField,
  FileInputField,
} from "@/client/components/atoms";
import { observer } from "mobx-react";
import { File } from "lucide-react";
import { FC } from "react";
import { homeStore } from "../store";

export const ProductionInformation: FC = observer(() => {
  const { onChangeFormValue, onMeasure, formValues, onResetFormValues } =
    homeStore;
  const {
    group,
    line,
    n2,
    specs,
    specTag,
    employeeId,
    kitName,
    serieNumber,
    uploadFile,
  } = formValues;
  return (
    <div className="border-base-300 flex w-80 flex-col gap-3 border border-r p-4">
      <label className="flex w-full flex-row items-center font-bold">
        <File className="mr-2" />
        Production Information
      </label>
      <SelectFormField
        label="Group"
        name="group"
        placeholder="Select Group"
        value={group}
        options={[
          { label: "Group A", value: "A" },
          { label: "Group B", value: "B" },
        ]}
        onSelect={onChangeFormValue}
      />
      <SelectFormField
        label="Line"
        name="line"
        placeholder="Select Line"
        value={line}
        options={[
          { label: "Line 1", value: "1" },
          { label: "Line 2", value: "2" },
        ]}
        onSelect={onChangeFormValue}
      />
      <SelectFormField
        label="N2"
        name="n2"
        placeholder="Select N2"
        value={n2}
        options={[
          { label: "N2 1", value: "1" },
          { label: "N2 2", value: "2" },
        ]}
        onSelect={onChangeFormValue}
      />
      <SelectFormField
        label="Specs"
        name="specs"
        placeholder="Select Specs"
        value={specs}
        options={[
          { label: "Specs 1", value: "1" },
          { label: "Specs 2", value: "2" },
        ]}
        onSelect={onChangeFormValue}
      />
      <SelectFormField
        label="Spec tag"
        name="specTag"
        placeholder="Select Spec tag"
        value={specTag}
        options={[
          { label: "Specs 1", value: "1" },
          { label: "Specs 2", value: "2" },
        ]}
        onSelect={onChangeFormValue}
      />
      <FormField
        label="Employee ID"
        name="employeeId"
        onChange={onChangeFormValue}
        value={employeeId}
      />
      <FormField
        label="Kit name"
        name="kitName"
        onChange={onChangeFormValue}
        value={kitName}
      />
      <FormField
        label="Serie number"
        name="serieNumber"
        onChange={onChangeFormValue}
        value={serieNumber}
      />
      <FileInputField
        label="Upload File"
        name="uploadFile"
        onChange={onChangeFormValue}
        value={uploadFile}
      />
      <button className="btn btn-primary btn-sm" onClick={onMeasure}>
        Measure
      </button>
      <button
        className="btn btn-error btn-outline btn-sm"
        onClick={onResetFormValues}
      >
        Reset
      </button>
    </div>
  );
});
