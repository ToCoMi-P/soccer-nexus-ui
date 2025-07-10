"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { Chip } from "@heroui/chip";

interface PlayerTablesProps {
  nameOfTable: string;
  startRange: number;
  endRange: number;
  columns: any[];
  rows: any[];
}

export default function PlayerTables({ nameOfTable, startRange, endRange, columns, rows }: PlayerTablesProps) {
  const filteredRows = rows.filter((row, index) => index >= startRange && index < endRange);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm sm:text-base font-bold text-white">{nameOfTable}</h3>
        <Chip color={startRange === 0 ? "success" : "primary"} variant="flat" size="sm" className="text-xs">
          {filteredRows.length} Spieler
        </Chip>
      </div>

      <Table
        aria-label={nameOfTable}
        removeWrapper
        className="w-full"
        classNames={{
          th: "bg-gray-700 text-white text-xs sm:text-sm font-bold px-2 py-1 sm:px-3 sm:py-2",
          td: "text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2",
          tr: "hover:bg-gray-700/50 transition-colors"
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className={column.class} aria-label={column.ariaLabel}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredRows}>{(item) => <TableRow key={item.id}>{(columnKey) => <TableCell className={columnKey === "count" ? "text-center" : ""}>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
      </Table>
    </div>
  );
}
