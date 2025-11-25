import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  FieldPath,
  FieldValues,
  FormProps,
  FormState,
} from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  placeholder?: string;
  className?: string;
  name: FieldPath<T>;
  label: string;
  value?: string;
  error?: FieldError;
  props?: { [key: string]: any };
}

const CustomInput = <T extends FieldValues>({
  control,
  placeholder,
  className,
  label,
  name,
  error,
  value,
  props = {},
}: CustomInputProps<T>) => {
  const id = `input-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <div className="space-y-1">
          <Label className="my-4" htmlFor={id}>
            {label}
          </Label>
          <Input
            {...props}
            id={id}
            {...field}
            value={field.value ?? value}
            placeholder={placeholder}
            aria-invalid={error?.message ? true : false}
            className={cn(
              className,
              error?.message && "border-red-500 text-red-500"
            )}
          />
          {(error?.message || fieldError?.message) && (
            <p className="text-sm text-red-500">
              {error?.message || fieldError?.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default CustomInput;
