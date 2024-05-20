"use client";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Pagination
} from "@nextui-org/react";
import {ListOfPlayers} from "@/enums/ListOfPlayers";
import {start} from "repl";

export default function PlayerTables({nameOfTable, startRange, endRange, columns, rows}) {

    const dataList = rows.slice(startRange, endRange)


    return (
        <div>
            {nameOfTable} ({dataList.length})
            <Table aria-label="Example static collection table"
                   selectionMode="single"
            >

                <TableHeader>
                    {columns.map((column) =>
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody>
                    {dataList.map((row) =>
                        <TableRow key={dataList.key}>
                            {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
