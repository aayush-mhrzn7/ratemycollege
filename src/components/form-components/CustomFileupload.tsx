import React from "react";
import CustomDropzone from "../internal/Fileupload";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface CustomFileUploadProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  isMulti: boolean;
  label?: string;
  error?: FieldError; // Make optional
}

const CustomFileupload = <T extends FieldValues>({
  name,
  isMulti,
  label,
  control,
  error,
}: CustomFileUploadProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <div>
          <Label className="my-3" htmlFor={`file-${name}`}>
            {label ?? "File upload"}
          </Label>
          <CustomDropzone
            isMulti={isMulti}
            id={`file-${name}`}
            value={field.value}
            onChange={field.onChange}
            error={error?.message ? true : false}
            className={cn(
              (error?.message || fieldError?.message) &&
                "bg-red-100 border-red-500 rounded-2xl text-red-500"
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

export default CustomFileupload;
