"use client";
import { FC, useRef } from "react";

interface FormFieldProps {
  label?: string;
  name: string;
  onChange?: (name: string, value: File) => void;
  value?: File;
  error?: string;
}

export const FileInputField: FC<FormFieldProps> = ({
  label,
  name,
  onChange,
  value,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(name, file == null ? new File([], "") : file);
    e.target.value = ""; // Reset the input value to allow re-uploading the same file if needed
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="label text-xs font-medium">
          {label}
        </label>
      )}

      <button
        type="button"
        className="btn btn-sm btn-outline"
        onClick={handleClick}
      >
        {value && value.name.length > 0 && value.size > 0
          ? value.name
          : "Select File"}
      </button>

      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        className="hidden"
        accept=".csv,.tmr"
        onChange={handleChange}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};
