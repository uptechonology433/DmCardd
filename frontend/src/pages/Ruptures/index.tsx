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


const PageRuptures: React.FC = () => {

    const [rupturesData, setRupturesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const columnsRuptures: Array<Object> = [
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

    // useEffect(() => {
    //     fetchRupturesProducts();
    // }, []);

    // const fetchRupturesProducts = async () => {
    //     try {
    //         const response = await api.post("/ruptures-products", { searchTerm });
    //         setRupturesData(response.data);
    //     } catch (error) {
    //         console.log(error);
          
    //     }
    // };

    // const handleSearch = () => {
    //     fetchRupturesProducts();
    // };

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

            <DefaultHeader sessionTheme="Rupturas" />
            <div className="container-ruptures">
                <div className="inputs-info-products">
                    <Input
                        name="searchTerm"
                        info="Código ou Descrição do Produto:"
                        placeholder="Produto..."
                        value={""}
                      
                    />
                </div>
                <DownloadFacilitators excelClick={() => {}} printClick={() => window.print()} textButton={'Pesquisar'} onClickButton={""} />

            </div>
            <Table
                data={rupturesData}
                column={columnsRuptures}
                titleTable="Rupturas"
            />


           

        </>

    )
    
}

export default PageRuptures