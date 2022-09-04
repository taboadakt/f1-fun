import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { DRIVER_INFO_BY_YEAR } from "../graphql/requests/queries";
import { useQuery } from "urql";
import { GDriverInfoByYearQuery } from "../graphql/types/generated";
import { ArrayElement, SeasonPilotsRanking } from "../graphql/types";

const CONSTRUCTOR_ID = "constructors";
type Constructor = ArrayElement<SeasonPilotsRanking["constructors"]>;

const DriversByYearTable = ({ year }: { year?: string }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<SeasonPilotsRanking>[]>(
    () => [
      {
        accessorFn: (row) => row.driver.code,
        id: "code",
        cell: (info) => info.getValue(),
        header: "Code",
      },
      {
        accessorFn: (row) => row.driver.name,
        id: "name",
        cell: (info) => info.getValue(),
        header: "Name",
      },
      {
        accessorFn: (row) => row.constructors,
        id: CONSTRUCTOR_ID,
        cell: (info) =>
          `${(info.getValue() as Constructor[]).map((val) => val.name)}`,
        header: "Constructors",
        sortingFn: (rowA, rowB) => {
          const constructorsA: Constructor[] = rowA.getValue(CONSTRUCTOR_ID);
          const constructorsB: Constructor[] = rowB.getValue(CONSTRUCTOR_ID);
          if (constructorsA[0].name > constructorsB[0].name) return 1;
          if (constructorsA[0].name < constructorsB[0].name) return -1;
          return 0;
        },
      },
      {
        accessorFn: (row) => row.points,
        id: "points",
        cell: (info) => info.getValue(),
        header: "Points",
      },
      {
        accessorFn: (row) => row.wins,
        id: "wins",
        cell: (info) => info.getValue(),
        header: "Wins",
      },
      {
        accessorFn: (row) => row.driver.nationality,
        id: "nationality",
        cell: (info) => info.getValue(),
        header: "Nationality",
      },
      {
        accessorFn: (row) => row.driver.permanentNumber,
        id: "permanentNumber",
        cell: (info) => info.getValue(),
        header: "Permanent Number",
      },
    ],
    []
  );

  const [{ data, fetching, error }] = useQuery<GDriverInfoByYearQuery>({
    query: DRIVER_INFO_BY_YEAR,
    variables: { year },
  });

  const table = useReactTable({
    data: data?.seasonPilotsRanking ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  if (fetching) return <div>Loading...</div>;
  if (error || !data) return <div>Error</div>;

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className="container">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ^",
                          desc: " v",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DriversByYearTable;
