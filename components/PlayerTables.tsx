import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue
} from "@nextui-org/react";

export default function PlayerTables(props: any) {

    const dataList = props.rows.slice(props.startRange, props.endRange)


    return (
        <div className="space-y-2">
            <div>{props.nameOfTable} ({dataList.length})</div>
        
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
