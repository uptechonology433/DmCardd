import React from "react";
import DataTable from "react-data-table-component";

interface ITable {
    data: Array<Object>;
    column: Array<Object>;
    titleTable?: string;
    typeMessage?: boolean;
    refExcel?: any;
    // Add any other custom props here
    sortActive?: boolean;
}

const Table: React.FC<ITable> = ({ data, column, titleTable, typeMessage, refExcel, sortActive }) => {
    return (
        <div className="container-table" ref={refExcel}>
            <h2>{titleTable}</h2>
            <DataTable
                columns={column}
                data={data}
                striped
                responsive
                noDataComponent={typeMessage ? 'Erro ao carregar os dados...' : 'Nada a trazer...'}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
                // Ensure that sortActive is not passed to the DataTable unless it's a recognized prop of DataTable
            />
        </div>
    );
}

export default Table;
