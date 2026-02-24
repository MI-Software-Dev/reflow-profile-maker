import { FC } from "react";

interface SelectFormFieldProps {
  label?: string;
  name: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  onSelect?: (name: string, value: string) => void;
  value?: string;
  error?: string;
}

export const SelectFormField: FC<SelectFormFieldProps> = ({
  label,
  name,
  onSelect,
  placeholder,
  options,
  value,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="label text-xs font-medium">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={(e) => onSelect?.(name, e.target.value)}
        className={`select select-xs w-full ${error ? "select-error" : ""} outline-0`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};
