import React, { useEffect, useRef, useState } from "react";
import DefaultHeader from "../../components/layout/DefaultHeader";
import Input from "../../components/shared/Input";
import Table from "../../components/shared/Table";
import DownloadFacilitators from "../../components/layout/DownloadFacilitators";
import api from "../../connectionAPI";
import { useDownloadExcel } from "react-export-table-to-excel";
import Select from "../../components/shared/Select";
import Swal from "sweetalert2";


const PageInactive: React.FC = () => {
    const [inactiveData, setInactiveData] = useState([]);
    const [inactiveMessage, setInactiveMessage] = useState(false);

    
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

    const InactivePageRequests = async () => {

        if (formValues.cardType === 'All' || formValues.cardType === 'DmCard' || formValues.cardType === 'RedeUze') {
            await api.post('/inactive-products', {
                tipo: formValues.cardType,
                search: formValues.search
            }).then((data) => {
                setInactiveData(data.data)
                console.log("Response from API:", data);

            }).catch(() => {
                setInactiveMessage(true)
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
        InactivePageRequests();
    }, []);

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
                <Select info={"Selecione um Tipo:"} name="cardType" onChange={handleChange}>
                        <option selected value="All">Tudo</option>
                        <option value="DmCard">Dm Card</option>
                        <option value="RedeUze">Rede Uze</option>
                    </Select>

                    <Input
                        name="searchTerm"
                        info="Código ou Descrição do Produto:"
                        placeholder="Produto..."
                        onChange={handleChange}
                    />
                  
                </div>
                <DownloadFacilitators excelClick={() => onDownload()} printClick={() => window.print()} textButton={'Pesquisar'}  onClickButton={() => InactivePageRequests()} />


                <Table
                      data={Array.isArray(inactiveData) ? inactiveData : []}
                    column={columnsInactives}
                    typeMessage={inactiveMessage}
                
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
