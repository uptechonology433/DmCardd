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
    const [wasteMessage, setWasteMessage] = useState(false);


    const [formValues, setFormValues] = useState({
        cardType: "All",
        search: ""

    });

    const handleChange = (e: any) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const WastePageRequests = async () => {

        if (formValues.cardType === 'All' || formValues.cardType === 'DmCard' || formValues.cardType === 'RedeUze') {
            await api.post('/waste-products', {
                tipo: formValues.cardType,
                search: formValues.search
            }).then((data) => {
                setWasteData(data.data)
                console.log("Response from API:", data);

            }).catch(() => {
                setWasteMessage(true)
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Selecione um tipo de cartão...',
                text: 'Selecione DmCard ou Rede Uze antes de fazer a filtragem dos dados.',
            });
        }

    }

    useEffect(() => {
        // Chamada à função quando o componente é montado
        WastePageRequests();
    }, []);





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







    const refExcel: any = useRef();

    const { onDownload } = useDownloadExcel({
        currentTableRef: refExcel.current,
        filename: "Rejeitos",
        sheet: "Rejeitos"
    })



    return (

        <>


            <div className="container-weste">
                <DefaultHeader sessionTheme="Rejeitos" />
                <div className="inputs-info-products">
                    <Select info={"Selecione um Tipo:"} name="cardType" onChange={handleChange}>
                        <option selected value="All">Tudo</option>
                        <option value="DmCard">Dm Card</option>
                        <option value="RedeUze">Rede Uze</option>
                    </Select>

                    <Input
                        name="search"
                        info="Código ou Descrição do Produto:"
                        placeholder="Produto..."
                        onChange={handleChange}


                    />

                </div>
                <DownloadFacilitators excelClick={() => onDownload()} printClick={() => window.print()} textButton={'Pesquisar'} onClickButton={() => WastePageRequests()} />
                <Table
                    data={Array.isArray(wasteData) ? wasteData : []}
                    column={columnsWaste}
                    typeMessage={wasteMessage}


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