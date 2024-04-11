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

    const columnsWaste: Array<Object> = [
        {
            name: 'Codigo do produto',
            selector: (row: any) => row.cod_produto,
            sortable: true
        },
        {
            name: 'Descrição do produto',
            selector: (row: any) => row.desc_produto,
            sortable: true
        },
        {
            name: 'Qtd',
            selector: (row: any) => row.qtd,
            sortable: true
        },
        {
            name: 'Data da perda',
            selector: (row: any) => row.dt_perda,
            sortable: true
        },
        {
            name: 'Descrição da Perda',
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

    // const tableRef: any = useRef();

    // const { onDownload } = useDownloadExcel({
    //     currentTableRef: tableRef.current,
    //     filename: "Usuarios VeroCard",
    //     sheet: "Usuarios VeroCard"
    // })



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
                     
                    />
                </div>
                <DownloadFacilitators excelClick={() => {}} printClick={() => window.print()} textButton={'Pesquisar'}  onClickButton={handleChange}/>

            </div>
            <Table
                data={wasteData}
                column={columnsWaste}
                titleTable="Rejeitos"
            />

           
        </>

    )

}

export default PageWaste