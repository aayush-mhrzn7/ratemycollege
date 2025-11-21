import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl } from "@/components/ui/form";

interface SelectMultipleProps {
  placeholder?: string;
  allOptions: {
    label: string;
    value: string;
  }[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
}

export function SelectMultiple({
  placeholder,
  allOptions,
  selectedOptions,
  setSelectedOptions,
}: SelectMultipleProps) {
  const handleSelect = (optionValue: string) => {
    const isSelected = selectedOptions.includes(optionValue);
    const newSelectedOptions = isSelected
      ? selectedOptions.filter((value) => value !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
  };
  const handleRemove = (
    optionValue: string,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const newSelectedOptions = selectedOptions.filter(
      (value) => value !== optionValue
    );
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="w-full">
        <FormControl>
          <div className="w-full border border-gray-200 dark:border-gray-800 hover:text-accent-foreground inline-flex items-center justify-start rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-2">
            {selectedOptions?.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {allOptions
                  .filter((option) => selectedOptions.includes(option.value))
                  .map((option) => (
                    <Badge key={option.value}>
                      <X
                        className="peer hover:cursor-pointer"
                        size="14"
                        onClick={(e) => handleRemove(option.value, e)}
                      />
                      <span className="peer-hover:opacity-50">
                        {option.label}
                      </span>
                    </Badge>
                  ))}
              </div>
            ) : (
              <span className="justify-start text-black/50 dark:text-white/50 font-normal">
                {placeholder}
              </span>
            )}
          </div>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width]"
        align="start"
      >
        <Command>
          <CommandInput placeholder={"Search..."} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {allOptions.map((option) => {
                const isSelected = selectedOptions.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-gray-950 dark:border-gray-50",
                        isSelected
                          ? "bg-gray-950 text-gray-50 dark:bg-gray-50 dark:text-gray-950"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedOptions.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedOptions([])}
                    className="justify-center text-center"
                  >
                    Clear selection
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
