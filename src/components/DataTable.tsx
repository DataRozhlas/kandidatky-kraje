import * as React from "react"

import {
  ColumnDef,
  // SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  // PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  years: string[]
}


export function DataTable<TData, TValue>({
  columns,
  data,
  years,
}: DataTableProps<TData, TValue>) {
  //  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState({
    JMENO: false,
    TITULPRED: false,
    TITULZA: false,
    POHLAVI: false,
    ROK: years.length > 1,
    STATOBCAN: false,
    MANDAT: false,
    ESTRANA: false,
    NPN: false,
    VNC: false,
  })
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: 20, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    // onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: "PORCISLO",
          desc: false,
        }
      ],
    },
    state: {
      //   sorting,
      columnVisibility,
      pagination,
    }
  })

  React.useEffect(() => {
    if (years.length > 1) {
      setColumnVisibility((prev) => {
        return { ...prev, ROK: true }
      })
    }
    if (years.length < 2) {
      setColumnVisibility((prev) => {
        return { ...prev, ROK: false }
      })
    }
  }, [years])

  return (
    <div>
      <Pagination className="pb-1">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); table.previousPage() }} className={!table.getCanPreviousPage() ? "invisible" : ""} />
          </PaginationItem>
          {/* <PaginationItem>
        <PaginationLink href="#">1</PaginationLink>
      </PaginationItem> */}
          {/* <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem> */}
          <PaginationItem className="text-xs">
            {`Stránka ${pagination.pageIndex + 1} ${table.getPageCount() > 0 ? `z ${table.getPageCount()}` : ""}`}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={(e) => { e.preventDefault(); table.nextPage() }} className={!table.getCanNextPage() ? "invisible" : ""} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Žádná data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
