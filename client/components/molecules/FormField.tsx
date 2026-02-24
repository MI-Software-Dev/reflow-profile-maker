import { FC } from "react";

interface FormFieldProps {
  label?: string;
  name: string;
  onChange?: (name: string, value: string) => void;
  value?: string;
  error?: string;
  type?: string;
}

export const FormField: FC<FormFieldProps> = ({
  label,
  name,
  onChange,
  value,
  error,
  type = "text",
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="label text-xs font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange?.(name, e.target.value)}
        className={`input input-xs w-full ${error ? "input-error" : ""} outline-0`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};
