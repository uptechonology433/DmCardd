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
    const [rupturesMessage, setRupturesMessage] = useState(false);

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

    const RupturesPageRequests = async () => {

        if (formValues.cardType === 'All' || formValues.cardType === 'DmCard' || formValues.cardType === 'RedeUze') {
            await api.post('/ruptures-products', {
                tipo: formValues.cardType,
                search: formValues.search
            }).then((data) => {
                setRupturesData(data.data)
                console.log("Response from API:", data);

            }).catch(() => {
                setRupturesMessage(true)
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
   
        RupturesPageRequests();
    }, []);


    const columnsRuptures: Array<Object> = [
        {
            name: 'Codigo do produto',
            selector: (row: any) => row["COD PROD"],
            sortable: true
        },
        {
            name: 'Produto',
            selector: (row: any) => row.PRODUTO,
            sortable: true
        },
        {
            name: 'Data',
            selector: (row: any) => row.dt_op,
            sortable: true
        },
        {
            name: 'Estoque',
            selector: (row: any) => row["QTD ESTQ"],
            sortable: true
        },
        {
            name: 'Qtd Cartões',
            selector: (row: any) => row["QTD ARQ"],
            sortable: true
        },
        {
            name: 'Diferença',
            selector: (row: any) => row.DIFERENÇA,
            sortable: true
        },
        {
            name: 'Descrição',
            selector: (row: any) => row.observacao,
            sortable: true
        }
    ];
    


    const refExcel: any = useRef();

    const { onDownload } = useDownloadExcel({
        currentTableRef: refExcel.current,
        filename: "Rupturas",
        sheet: "Rupturas"
    })




    return (


        <>

            <DefaultHeader sessionTheme="Rupturas" />
            <div className="container-ruptures">
                <div className="inputs-info-products">
                    <Select info={"Selecione um Tipo:"} name="cardType" onChange={handleChange}>
                        <option selected value="All">Tudo</option>
                        <option value="DmCard">Dm Card</option>
                        <option value="RedeUze">Rede Uze</option>
                    </Select>
                    <Input
                        name="searchTerm"
                        info="Código ou Nome do Produto:"
                        placeholder="Produto..."
                        onChange={handleChange}

                    />

                </div>
                <DownloadFacilitators excelClick={() => onDownload()} printClick={() => window.print()} textButton={'Pesquisar'} onClickButton={() => RupturesPageRequests()} />
                <Table
                    data={Array.isArray(rupturesData) ? rupturesData : []}
                    column={columnsRuptures}
                    typeMessage={rupturesMessage}

                />

                <div className="table-container-dowload">

                    <div className="scroll-table-dowload">
                        <table ref={refExcel}>

                            <tbody>

                                <tr>
                                    <td>Cod Produto</td>
                                    <td>Produto</td>
                                    <td>Data</td>
                                    <td>Estoque</td>
                                    <td>Qtd Cartões</td>
                                    <td>Diferença</td>
                                    <td>Descrição</td>
                                </tr>


                                {
                                    Array.isArray(rupturesData) &&
                                    rupturesData.map((data: any) =>
                                        <tr key={data.id}>
                                            <td>{data['COD PROD']}</td>
                                            <td>{data.PRODUTO}</td>
                                            <td>{data.dt_op}</td>
                                            <td>{data['QTD ESTQ']}</td>
                                            <td>{data['QTD ARQ']}</td>
                                            <td>{data.DIFERENÇA}</td>
                                            <td>{data.observacao}</td>
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

export default PageRuptures