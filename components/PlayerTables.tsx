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
import {start} from "repl";

export default function PlayerTables(props: any) {

    const dataList = props.rows.slice(props.startRange, props.endRange)


    return (
        <div>
            {props.nameOfTable} ({dataList.length})
            <Table aria-label="Example static collection table"
                   selectionMode="single"
            >

                <TableHeader>
                    {props.columns.map((column: any) =>
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody>
                    {dataList.map((row: any) =>
                        <TableRow key={dataList.key}>
                            {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
