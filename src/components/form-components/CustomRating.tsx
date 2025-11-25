"use client";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  rating: number;
};

const CustomRating = () => {
  const form = useForm<FormValues>({ defaultValues: { rating: 0 } });
  return (
    <Controller
      name="rating"
      control={form.control}
      render={({ field }) => {
        const stars = Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              i < (field.value ?? 0) ? "text-yellow-400" : "text-gray-400",
              "cursor-pointer"
            )}
            onClick={() => {
              field.onChange(i + 1);
              console.log(i + 1);
            }}
          />
        ));
        return <div className="flex gap-2 items-center">{stars}</div>;
      }}
    />
  );
};

export default CustomRating;
