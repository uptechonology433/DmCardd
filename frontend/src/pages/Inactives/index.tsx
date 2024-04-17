import React, { useEffect, useRef, useState } from "react";
import DefaultHeader from "../../components/layout/DefaultHeader";
import Input from "../../components/shared/Input";
import Table from "../../components/shared/Table";
import DownloadFacilitators from "../../components/layout/DownloadFacilitators";
import api from "../../connectionAPI";
import { useDownloadExcel } from "react-export-table-to-excel";


const PageInactive: React.FC = () => {
    const [inactiveData, setInactiveData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [ProductionReportMessage, setProductionReportMessage] = useState(false);


    const columnsInactives: Array<Object> = [
        {
            name: 'Codigo do produto',
            selector: (row: any) => row.cod_produto,
            sortable: true
        },
        {
            name: 'Descrição do produto',
            selector: (row: any) => row.desc_produto,
            sortable: true
        }
    ];

    useEffect(() => {
        fetchInactiveProducts();
    }, []);

    const fetchInactiveProducts = async () => {
        try {
            const response = await api.post("/inactive-products", { searchTerm });
            setInactiveData(response.data);
        } catch (error) {
            console.log(error);

        }
    };

    const handleSearch = () => {
        fetchInactiveProducts();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


    const refExcel: any = useRef();

    const { onDownload } = useDownloadExcel({
        currentTableRef: refExcel.current,
        filename: "Inativos",
        sheet: "Inativos"
    })

    return (
        <>
            <DefaultHeader sessionTheme="Inativos" />
            <div className="container-inactives">
                <div className="inputs-info-products">

                    <Input
                        name="searchTerm"
                        info="Código ou Descrição do Produto:"
                        placeholder="Produto..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <DownloadFacilitators excelClick={() => onDownload()} printClick={() => window.print()} textButton={'Pesquisar'} onClickButton={handleSearch} />
                </div>


                <Table
                    data={inactiveData}
                    column={columnsInactives}
                    typeMessage={ProductionReportMessage}
                    refExcel={refExcel}
                />

                <div className="table-container-dowload">

                    <div className="scroll-table-dowload">
                        <table ref={refExcel}>

                            <tbody>

                                <tr>
                                    <td>Cod Produto</td>
                                    <td>Desc Produto</td>

                                </tr>


                                {
                                    inactiveData.map((data: any) =>
                                        <tr key={data.id}>
                                            <td>{data.cod_produto}</td>
                                            <td>{data.desc_produto}</td>


                                        </tr>
                                    )
                                }



                            </tbody>

                        </table>

                    </div>

                </div>





            </div>

        </>
    );
};

export default PageInactive;
