"use client";
import { Search, X } from "lucide-react";
import { FC, useState, useCallback } from "react";

interface SearchFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export const SearchField: FC<SearchFieldProps> = ({
  placeholder = "Search...",
  value: controlledValue,
  onChange,
  onSearch,
  onClear,
  disabled = false,
  className = "",
  size = "sm",
}) => {
  const [internalValue, setInternalValue] = useState("");

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleInputChange = useCallback(
    (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlledValue, onChange],
  );

  const handleClear = useCallback(() => {
    const clearedValue = "";
    if (controlledValue === undefined) {
      setInternalValue(clearedValue);
    }
    onChange?.(clearedValue);
    onClear?.();
  }, [controlledValue, onChange, onClear]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(value);
      }
    },
    [onSearch, value],
  );

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search
          className={`text-base-content/60 absolute top-1/2 left-3 -translate-y-1/2 ${
            size === "xs"
              ? "h-3 w-3"
              : size === "sm"
                ? "h-4 w-4"
                : size === "md"
                  ? "h-5 w-5"
                  : "h-6 w-6"
          }`}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`input input-${size} w-full pr-10 pl-10 ${
            disabled ? "input-disabled" : ""
          } outline-0`}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className={`text-base-content/60 hover:text-base-content absolute top-1/2 right-3 -translate-y-1/2 transition-colors ${
              size === "xs"
                ? "h-3 w-3"
                : size === "sm"
                  ? "h-4 w-4"
                  : size === "md"
                    ? "h-5 w-5"
                    : "h-6 w-6"
            }`}
            aria-label="Clear search"
          >
            <X className="h-full w-full" />
          </button>
        )}
      </div>
    </div>
  );
};
