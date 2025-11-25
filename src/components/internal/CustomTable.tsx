"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CustomPagination from "./CustomPagination";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
const CustomTable = <T,>({
  columns,
  data,
  totalPages,
  currentPage,
}: {
  columns: ColumnDef<T>[];
  data: T[];
  totalPages: number;
  currentPage: number;
}) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: totalPages,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    manualPagination: true,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const navigateToNextPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  console.log(selectedRows);
  return (
    <div>
      {selectedRows.length > 0 && (
        <div className="flex items-center justify-between bg-muted p-2 rounded">
          <span className="text-sm">{selectedRows.length} row(s) selected</span>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {currentPage} out of {totalPages} pages
        </div>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={navigateToNextPage}
        />
      </div>
    </div>
  );
};

export default CustomTable;
