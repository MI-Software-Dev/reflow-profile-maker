import { mixed, object, string, InferType } from "yup";

export const formSchema = object({
  group: string().required("Group is required"),
  line: string().required("Line is required"),
  n2: string().required("N2 is required"),
  specs: string().required("Specs is required"),
  specTag: string().required("Spec tag is required"),
  employeeId: string().required("Employee ID is required"),
  kitName: string().required("Kit name is required"),
  serieNumber: string().required("Serie number is required"),
  uploadFile: mixed<File>().required("File is required"),
});

export type FormValues = InferType<typeof formSchema>;
export type FormErrors = Partial<FormValues>;
