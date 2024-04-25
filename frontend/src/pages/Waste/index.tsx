import React, { useEffect, useState, useRef } from "react";
import NavBarClient from "../../components/layout/NavBarClient";
import DefaultHeader from "../../components/layout/DefaultHeader";
import Input from "../../components/shared/Input";
import Table from "../../components/shared/Table";
import DownloadFacilitators from "../../components/layout/DownloadFacilitators";
import Icon from "../../components/shared/Icon";
import api from "../../connectionAPI";
import ModalUsers from "../../components/layout/ModalUsers";
import Swal from "sweetalert2";
import { useDownloadExcel } from "react-export-table-to-excel";
import { isValidEmail } from "../../utils/Validation";
import Select from "../../components/shared/Select";


const PageWaste: React.FC = () => {

    const [wasteData, setWasteData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [ProductionReportMessage, setProductionReportMessage] = useState(false);

    const columnsWaste: Array<Object> = [
        {
            name: 'Cod Produto',
            selector: (row: any) => row.cod_produto,
            sortable: true
        },
        {
            name: 'Desc Produto',
            selector: (row: any) => row.desc_produto,
            sortable: true
        },
        {
            name: 'Qtd',
            selector: (row: any) => row.qtd,
            sortable: true
        },
        {
            name: 'Data Perda',
            selector: (row: any) => row.dt_perda,
            sortable: true
        },
        {
            name: 'Desc Perda',
            selector: (row: any) => row.desc_perda,
            sortable: true
        }
    ];

    useEffect(() => {
        fetchWasteProducts();
    }, []);

    const fetchWasteProducts = async () => {
        try {
            const response = await api.post("/waste-products", { searchTerm });
            setWasteData(response.data);
        } catch (error) {
            console.log(error);

        }
    };

    const handleSearch = () => {
        fetchWasteProducts();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const refExcel: any = useRef();

    const { onDownload } = useDownloadExcel({
        currentTableRef: refExcel.current,
        filename: "Rejeitos",
        sheet: "Rejeitos"
    })



    return (

        <>

            <DefaultHeader sessionTheme="Rejeitos" />
            <div className="container-weste">
                <div className="inputs-info-products">

                    <Input
                        name="searchTerm"
                        info="Código ou Descrição do Produto:"
                        placeholder="Produto..."
                        value={searchTerm}
                        onChange={handleChange}
                        //onchenge= {searchrTerm}
                    />
                    <DownloadFacilitators excelClick={() => onDownload()} printClick={() => window.print()} textButton={'Pesquisar'} onClickButton={handleSearch} />
                </div>

                <Table
                    data={wasteData}
                    column={columnsWaste}
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
                                    <td>Qtd</td>
                                    <td>Data Perda</td>
                                    <td>Desc Perda</td>
                                </tr>


                                {
                                    wasteData.map((data: any) =>
                                        <tr key={data.id}>
                                            <td>{data.cod_produto}</td>
                                            <td>{data.desc_produto}</td>
                                            <td>{data.qtd}</td>
                                            <td>{data.dt_perda}</td>
                                            <td>{data.desc_perda}</td>

                                        </tr>
                                    )
                                }



                            </tbody>

                        </table>

                    </div>

                </div>




            </div>



        </>

    )

}

export default PageWaste