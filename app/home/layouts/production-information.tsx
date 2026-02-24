import { observer } from "mobx-react";
import { File } from "lucide-react";
import { FC } from "react";
import { homeStore } from "../store";
import {
  SelectFormField,
  FormField,
  FileInputField,
} from "@/client/components/molecules";

export const ProductionInformation: FC = observer(() => {
  const {
    onChangeFormValue,
    onMeasure,
    formValues,
    onResetFormValues,
    staticForm,
  } = homeStore;
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
        options={staticForm.group.map((item) => {
          return {
            label: `Group ${item}`,
            value: item,
          };
        })}
        onSelect={onChangeFormValue}
      />
      <SelectFormField
        label="Line"
        name="line"
        placeholder="Select Line"
        value={line}
        options={staticForm.line.map((item) => {
          return {
            label: item,
            value: item,
          };
        })}
        onSelect={onChangeFormValue}
      />
      <SelectFormField
        label="N2"
        name="n2"
        placeholder="Select N2"
        value={n2}
        options={staticForm.n2.map((item) => {
          return {
            label: item,
            value: item,
          };
        })}
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
