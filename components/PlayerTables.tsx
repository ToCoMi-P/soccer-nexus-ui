"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,      // ✅ HIER!
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PlayerTablesProps {
  nameOfTable: string;
  startRange: number;
  endRange: number;
  columns: any[];
  rows: any[];
}

export default function PlayerTables({ 
  nameOfTable, 
  startRange, 
  endRange, 
  columns, 
  rows 
}: PlayerTablesProps) {
  const filteredRows = rows.filter((row: any, index: number) => 
    index >= startRange && index < endRange
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm sm:text-base font-bold text-foreground">
          {nameOfTable}
        </h3>
        <Badge 
          variant={startRange === 0 ? "default" : "secondary"} 
          className="text-xs"
        >
          {filteredRows.length} Spieler
        </Badge>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>  {/* ✅ TableRow für Header */}
            {columns.map((column) => (
              <TableHead 
                key={column.key} 
                className={column.class}
                aria-label={column.ariaLabel}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((item: any) => (
            <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
              {columns.map((column) => (
                <TableCell 
                  key={column.key}
                  className={column.key === "count" ? "text-center" : ""}
                >
                  {item[column.key]}  {/* ✅ Direkt item[column.key] */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
