"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CourseWithAffiliation } from "@/data/course/course";

import { ColumnDef } from "@tanstack/react-table";
import { Trash, Trash2 } from "lucide-react";

const columns: ColumnDef<CourseWithAffiliation>[] = [
  {
    id: "select",

    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  { accessorKey: "name", header: "Course Name" },
  {
    id: "affiliation",
    accessorKey: "affiliation.name",
    header: "Affiliation",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button variant={"destructive"} size={"icon"}>
          <Trash2 className="size-4" />
        </Button>
      );
    },
  },
];

export default columns;
