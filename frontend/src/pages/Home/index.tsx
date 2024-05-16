import React, { useEffect, useState } from "react";
import api from "../../connectionAPI";
import Table from "../../components/shared/Table";
import DefaultHeader from "../../components/layout/DefaultHeader";
import Select from "../../components/shared/Select";
import Chart from "chart.js/auto";
import Swal from "sweetalert2";

interface GraphDataItem {
    label: string;
    value: number;
}

const PageHome: React.FC = () => {
    const [inProductionData, setInProductionData] = useState<any[]>([]);
    const [awaitingReleaseData, setAwaitingRelease] = useState<any[]>([]);
    const [awaitingShipmentData, setAwaitingShipment] = useState<any[]>([]);
    const [dispatchedData, setDispatched] = useState<any[]>([]);
    const [graphData, setGraph] = useState<GraphDataItem[]>([]);
    const [typeMessageInProduction, setTypeMessageInProduction] = useState(false);
    const [typeMessageAwaitingRelease, setTypeMessageAwaitingRelease] = useState(false);
    const [typeMessageAwaitingShipment, setTypeMessageAwaitingShipment] = useState(false);
    const [typeMessageDispatched, setTypeMessageDispatched] = useState(false);
    const [formValues, setFormValues] = useState({ Type: "dmcard" });
    const [pieChart, setPieChart] = useState<Chart<'pie' | 'doughnut', any[], string> | null>(null);

    const [rupturesData, setRupturesData] = useState([]);
    const [rupturesMessage, setRupturesMessage] = useState(false);

    useEffect(() => {
        const HomePageRequests = async () => {
            try {
                const awaitingReleaseResponse = await api.get('/awaiting-release');
                setAwaitingRelease(awaitingReleaseResponse.data[formValues.Type === "dmcard" ? 0 : 1]);

                const inProductionResponse = await api.post('/production', { tipo: formValues.Type });
                setInProductionData(inProductionResponse.data);

                const awaitingShipmentResponse = await api.get('/awaiting-shipment');
                setAwaitingShipment(awaitingShipmentResponse.data[formValues.Type === "dmcard" ? 0 : 1]);

                const dispatchedResponse = await api.get('/dispatched');
                setDispatched(dispatchedResponse.data[formValues.Type === "dmcard" ? 0 : 1]);

                const graphResponse = await api.post('/graph');
                const graphData = graphResponse.data[formValues.Type === "dmcard" ? 0 : 1][0];
                setGraph([
                    { label: 'Cartões Processados', value: graphData.processados },
                    { label: 'Cartões em Produção', value: graphData.em_producao },
                    { label: 'Rejeitos', value: graphData.rejeitos },
                    { label: 'Cartões Expedidos', value: graphData.expedidos }
                ]);
                renderDonutChart();

            } catch (error) {
                console.error(error);
            }
        };

        const renderDonutChart = () => {
            if (!pieChart && graphData.length > 0) {
                const chartData = graphData.filter(item => item.label !== "Cartões Processados");
                const labels = chartData.map(item => item.label);
                const values = chartData.map(item => item.value);

                const ctx = document.getElementById("donutChart") as HTMLCanvasElement;

                // Destruir o gráfico anterior, se existir
                if (pieChart) {
                    (pieChart as Chart<'pie' | 'doughnut', any[], string>).destroy();
                }

                const chart = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        labels: labels,
                        datasets: [{
                            data: values,
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Cores para cada fatia
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });

                setPieChart(chart);
            }
        };



        const RupturesPageRequests = async () => {
            if (formValues.Type === 'dmcard' || formValues.Type === 'redeuze') {
                try {
                    const data = await api.post('/ruptures-products', {
                        tipo: formValues.Type,
                        search: ""
                    });
                    setRupturesData(data.data);
                    console.log("Response from API:", rupturesData);
                } catch {
                    setRupturesMessage(true);
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Selecione um tipo de cartão...',
                    text: 'Selecione DmCard ou Rede Uze antes de fazer a filtragem dos dados.',
                });
            }
        };


        HomePageRequests();
        RupturesPageRequests();
    }, [formValues, graphData]);





    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const columnsAwaitingRelease: Array<Object> = [
        {
            name: 'Arquivo',
            selector: (row: any) => row.nome_arquivo_proc
        },
        {
            name: 'Entrada',
            selector: (row: any) => row.dt_processamento
        },
        {
            name: 'Qtd cartões',
            selector: (row: any) => row.total_cartoes
        },
        {
            name: 'Obs',
            selector: (row: any) => row.nome_arquivo_proc
        },
    ];

    const columnsInProduction: Array<Object> = [
        {
            name: 'Arquivo',
            selector: (row: any) => row.nome_arquivo_proc,
        },
        {
            name: 'Processado',
            selector: (row: any) => row.dt_processamento
        },
        {
            name: 'Qtd cartões',
            selector: (row: any) => row.total_cartoes,
            sortable: true
        },
        {
            name: 'Etapa',
            selector: (row: any) => row.status,
            sortable: true
        },
    ];

    const columnsAwaitingShipment: Array<Object> = [
        {
            name: 'Arquivo',
            selector: (row: any) => row.nome_arquivo_proc
        },
        {
            name: 'Entrada',
            selector: (row: any) => row.dt_processamento
        },
        {
            name: 'Qtd cartões',
            selector: (row: any) => row.total_cartoes
        },
    ];

    const columnsDispatched: Array<Object> = [
        {
            name: 'Arquivo',
            selector: (row: any) => row.nome_arquivo_proc
        },
        {
            name: 'Entrada',
            selector: (row: any) => row.dt_processamento
        },
        {
            name: 'Saida',
            selector: (row: any) => row.dt_expedicao
        },
        {
            name: 'Qtd cartões',
            selector: (row: any) => row.total_cartoes
        },
    ];

    const columnsRuptures: Array<Object> = [
        {
            name: 'Codigo',
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
            name: 'Qtd cartões',
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



    return (
        <div className="container-page-home">
            <DefaultHeader />
            <Select
                info="Some info text"
                label="Selecione o Tipo de Cartão"
                name="Type"
                value={formValues.Type}
                onChange={handleChange}
            >
                <option value="dmcard">DmCard</option>
                <option value="redeuze">Rede Uze</option>
            </Select>

            <div className="container-tablee">
                <div className="container-table-one">
                    <Table
                        data={Array.isArray(awaitingReleaseData) ? awaitingReleaseData : []}
                        column={columnsAwaitingRelease}
                        titleTable="Aguardando Liberacao"
                        typeMessage={typeMessageAwaitingRelease}
                    />

                    <Table
                        data={Array.isArray(awaitingShipmentData) ? awaitingShipmentData : []}
                        column={columnsAwaitingShipment}
                        titleTable="Aguardando Expedicao"
                        typeMessage={typeMessageAwaitingShipment}
                    />

                    <Table
                        data={Array.isArray(dispatchedData) ? dispatchedData : []}
                        column={columnsDispatched}
                        titleTable="Expedidos"
                        typeMessage={typeMessageDispatched}
                    />



                </div>
                <div className="container-table-two">



                    <Table
                        data={Array.isArray(inProductionData) ? inProductionData : []}
                        column={columnsInProduction}
                        titleTable="Em Producao"
                        typeMessage={typeMessageInProduction}
                    />

                    <Table
                        data={Array.isArray(rupturesData) ? rupturesData : []}
                        column={columnsRuptures}
                        titleTable="Rupturas"
                        typeMessage={rupturesMessage}

                    />

                </div>

            </div>


            <div className="graph">
                <div className="percentage-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Referência</th>
                                <th>QTD</th>
                                <th>Porcentagem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {graphData.length > 0 && (
                                <>
                                    <tr>
                                        <td>Cartões Processados</td>
                                        <td>{graphData[0].value}</td>
                                        <td>{(graphData[0].value / graphData[0].value) * 100}%</td>
                                    </tr>
                                    <tr>
                                        <td>Cartões em Produção</td>
                                        <td>{graphData[1].value}</td>
                                        <td>{(graphData[1].value / graphData[0].value * 100).toFixed(2)}%</td>
                                    </tr>
                                    <tr>
                                        <td>Cartões Expedidos</td>
                                        <td>{graphData[3].value}</td>
                                        <td>{(graphData[3].value / graphData[0].value * 100).toFixed(2)}%</td>
                                    </tr>
                                    <tr>
                                        <td>Rejeitos</td>
                                        <td>{graphData[2].value}</td>
                                        <td>{(graphData[2].value / graphData[0].value * 100).toFixed(2)}%</td>
                                    </tr>

                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="donut-chart-container">
                    <canvas id="donutChart" />
                </div>


            </div>
        </div>
    );
};

export default PageHome;
