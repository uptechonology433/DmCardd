import React, { useRef, useState } from "react";
import DefaultHeader from "../../components/layout/DefaultHeader";
import DownloadFacilitators from "../../components/layout/DownloadFacilitators";
import Input from "../../components/shared/Input";
import Select from "../../components/shared/Select";
import { useNavigate } from "react-router-dom";
import { useDownloadExcel } from "react-export-table-to-excel";
import Swal from "sweetalert2";
import api from "../../connectionAPI";
import Table from "../../components/shared/Table";

const PageCardsIssued: React.FC = () => {

  const [cardsIssuedReportData, setCardsIssuedReportData] = useState([]);

  const [cardsIssuedReportMessage, setCardsIssuedReportMessage] = useState(false);

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({

    fileName: "",

    InitialProcessingDate: "",

    FinalProcessingDate: "",

    InitialShippingDate: "",

    FinalShippingDate: "",

    cardType: ""

  });

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const columnsCardsIssuedReport: Array<Object> = [
    {
      name: 'Nome do arquivo',
      selector: (row: any) => row.nome_arquivo_proc
    },
    {
      name: 'Titular',
      selector: (row: any) => row.titular
    },
    {
      name: 'N° Cartão',
      selector: (row: any) => row.nr_cartao
    },
    {
      name: 'Cod Cartão',
      selector: (row: any) => row.codigo_cartao
    },
    {
      name: 'Cod Conta',
      selector: (row: any) => row.codigo_conta
    },
    {
      name: 'Status',
      selector: (row: any) => row.desc_status
    },
    {
      name: 'Tipo Envio',
      selector: (row: any) => row.tipo_envio
    },
    {
      name: 'Data Pross',
      selector: (row: any) => row.dt_op
    },
    {
      name: 'Data Expedido',
      selector: (row: any) => row.dt_expedicao
    },
    {
      name: 'Rastreio',
      selector: (row: any) => row.rastreio
    },
  ];

  const CardsIssuedReportRequests = async () => {
    if (formValues.cardType === 'DmCard' || formValues.cardType === 'RedeUze') {
      if (formValues.InitialProcessingDate < formValues.FinalProcessingDate
        || formValues.InitialShippingDate < formValues.FinalShippingDate
        || formValues.fileName) {
        await api.post('/cardsissued-report', {
          arquivo: formValues.fileName,
          tipo: formValues.cardType,
          dataInicial: formValues.InitialProcessingDate,
          dataFinal: formValues.FinalProcessingDate,
          expedicaoInicial: formValues.InitialShippingDate,
          expedicaoFinal: formValues.FinalShippingDate
        }).then((data) => {
          setCardsIssuedReportData(data.data)
          console.log("Response from API:", data);

        }).catch(() => {
          setCardsIssuedReportMessage(true)
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Datas incorretas...',
          text: 'A data inicial não pode ser maior que a final.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Selecione um tipo de cartão...',
        text: 'Selecione DmCard ou Rede Uze antes de fazer a filtragem dos dados.',
      });
    }
  }

  const refExcel: any = useRef();
  const { onDownload } = useDownloadExcel({
    currentTableRef: refExcel.current,
    filename: "Cartões Emitidos",
    sheet: "Cartões Emitidos"
  })
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];


  return (
    <>
      <DefaultHeader sessionTheme="Cartões emitidos" />

      <div className="container-production-report">
        <div className="container-inputs">
          <div className="inputs">
            <Input name="fileName" placeholder='Arquivo...' info="Arquivo:" onChange={handleChange} />
            <Select info={"Selecione um Tipo:"} name="cardType" onChange={handleChange}>
              <option selected>Selecione um Tipo...</option>
              <option value="DmCard">Dm Card</option>
              <option value="RedeUze">Rede Uze</option>
            </Select>
          </div>


          <div className="inputs">
            <Input
              name="fileName"
              placeholder="Titular..."
              info="Titular:"

            />
            <Input
              name="codigoConta"
              placeholder="Código Conta..."
              info="Código Conta"
            />
          </div>

          <div className="inputs">
            <Select info={"Descrição Status:"} name="cardType" onChange>
              <option selected>Descrição Status...</option>
              <option value="EmProdução">Em Produção</option>
              <option value="Expedido">Expedido</option>
            </Select>
            <Select info={"Tipo de Envio:"} name="cardType" onChange>
              <option value="CFC" selected>Cliente-Flash Courier</option>
            </Select>
          </div>

          <div className="inputs">
            <Input type="date" name="InitialProcessingDate" info="Data de processamento inicial:" onChange={handleChange} />
            <Input type="date" name="FinalProcessingDate" info="Data de processamento final:" onChange={handleChange} />
          </div>
          <div className="inputs">
            <Input type="date" name="InitialShippingDate" info="Data de expedição inicial:" onChange={handleChange} />
            <Input type="date" name="FinalShippingDate" info="Data de expedição final:" onChange={handleChange} />
          </div>

          <div className="inputs">
            <Input
              name="Código Cartão:"
              placeholder="Código Cartão..."
              info="Código Cartão:"
            />
          </div>
        </div>

        {
                    Array.isArray(cardsIssuedReportData) && cardsIssuedReportData.length >= 1 &&

                    < Table
                        column={columnsCardsIssuedReport}
                        data={cardsIssuedReportData}
                        typeMessage={cardsIssuedReportMessage}
                        refExcel={refExcel}
                    />

                }

                <div className="table-container-dowload">

                    <div className="scroll-table-dowload">
                        <table ref={refExcel}>

                            <tbody>

                                <tr>
                                    <td>Código do produto</td>
                                    <td>Descrição do produto</td>
                                    <td>Data de processamento</td>
                                    <td>Data de expedição</td>
                                    <td>Total de cartões</td>
                                    <td>Status</td>
                                    <td>Rastreio</td>
                                </tr>

                            </tbody>
                            {
                                    cardsIssuedReportData.map((data: any) =>
                                        <tr key={data.id}>
                                            <td>{data.cod_produto}</td>
                                            <td>{data.desc_produto}</td>
                                            <td>{data.dt_processamento}</td>
                                            <td>{data.dt_expedicao}</td>
                                            <td>{data.total_cartoes}</td>
                                            <td>{data.status}</td>
                                            <td>{data.rastreio}</td>
                                        </tr>
                                        
                                    )
                                }

                        </table>

                    </div>

                </div>
                

                <DownloadFacilitators excelClick={() => onDownload()} textButton="Pesquisar" onClickButton={() => CardsIssuedReportRequests()} csvData={cardsIssuedReportData} />
      </div>
    </>
  );
};
export default PageCardsIssued;
