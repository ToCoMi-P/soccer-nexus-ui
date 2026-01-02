"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlayerApplies } from "@/lib/Types/PlayerApplies";

interface PlayerTablesProps {
  nameOfTable: string
  startRange: number
  endRange: number
  columns: ColumnConfig[]
  rows: PlayerApplies[]
}


export interface ColumnConfig {
  key: keyof PlayerApplies;  // ← keyof macht Keys type-safe!
  label: string;
  class?: string;
  ariaLabel?: string;
}

export default function PlayerTables({ 
  nameOfTable, 
  startRange, 
  endRange, 
  rows,
  columns
}: PlayerTablesProps) {
  const filteredRows = rows.filter((row: unknown, index: number) => 
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
          <TableRow>
            {columns.map((column) => (
              <TableHead 
                key={column.key} 
                className={`bg-muted/50 text-foreground text-xs sm:text-sm font-bold px-2 py-2 sm:px-3 sm:py-3 ${column.class}`}
                aria-label={column.ariaLabel}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((item: PlayerApplies) => (
            <TableRow key={item.id} className="hover:bg-muted/80 transition-colors border-b border-border/50">
              {columns.map((column) => (
                <TableCell 
                  key={column.key}
                  className={`text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-3 ${column.key === "count" ? "text-center font-mono" : "text-left"} leading-tight break-words whitespace-pre-line`}
                >
                  {column.key === "instant" && item[column.key] 
                    ? item[column.key].replace(/ /, '\n') 
                    : item[column.key]
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
