// zustand.store.ts
import { collegeType } from "@/lib/zod-schema";
import { create } from "zustand";

type DataShape = Record<string, unknown>;

interface MultiStepFormState<T extends DataShape> {
  data: Partial<T>;
  step: number;
  setData: (inc_data: Partial<T>) => void;
  setStep: (step: number) => void;
}

export const createMultiStepForm = <T extends DataShape>() =>
  create<MultiStepFormState<T>>((set) => ({
    data: {},
    step: 1,
    setData: (inc_data) =>
      set((prev) => ({
        data: {
          ...prev.data,
          ...inc_data,
        },
      })),
    setStep: (step) => set({ step }),
  }));

// Create the store ONCE
export const useCollegeForm = createMultiStepForm<collegeType>();
