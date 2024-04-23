import React, { useEffect, useState } from "react";
import api from "../../connectionAPI";
import Table from "../../components/shared/Table";
import DefaultHeader from "../../components/layout/DefaultHeader";
import Select from "../../components/shared/Select";
import Chart from "chart.js/auto";
import PercentageTable from "../../components/layout/PercentageTable";



const PageHome: React.FC = () => {
    const [inProductionData, setInProductionData] = useState([]);
    const [awaitingReleaseData, setAwaitingRelease] = useState([]);
    const [awaitingShipmentData, setAwaitingShipment] = useState([]);
    const [dispatchedData, setDispatched] = useState([]);
    const [typeMessageInProduction, setTypeMessageInProduction] = useState(false);
    const [typeMessageAwaitingRelease, setTypeMessageAwaitingRelease] = useState(false);
    const [typeMessageAwaitingShipment, setTypeMessageAwaitingShipment] = useState(false);
    const [typeMessageDispatched, setTypeMessageDispatched] = useState(false);
    const [formValues, setFormValues] = useState({ Type: "dmcard" });
    const [searchTerm, setSearchTerm] = useState("");
    const [totalProduced, setTotalProduced] = useState<number>(0);
    const [totalWaste, setTotalWaste] = useState<number>(0);
    const [restantes, setRestantes] = useState<number>(0);
    const [wasteData, setWasteData] = useState<{ desc_produto: string; cod_produto: string; qtd: number; desc_perda: string; }[]>([]);


    const [producedTotal, setProducedTotal] = useState<number>(0);

    const [pieChart, setPieChart] = useState<Chart<'pie' | 'doughnut', any[], string> | null>(null);

    useEffect(() => {
        fetchWasteProducts();
    }, []);


    const fetchWasteProducts = async () => {
        try {
            const response = await api.post("/graph");
            const data = response.data[0];
            const { restantes, qtd_rejeitos, total_cartoes } = data;


            const ctx = document.getElementById("wasteChart") as HTMLCanvasElement;

            if (ctx) {
                if (pieChart) {
                    pieChart.destroy();
                }

                const chart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Total Produzidos', 'Quantidade de Rejeitos', 'Em Produção',],
                        datasets: [{
                            label: 'Quantidade',
                            data: [total_cartoes, qtd_rejeitos, restantes],
                            backgroundColor: [

                                'rgba(233, 101, 206, 0.5)', // Cor para "Total Produzido"
                                'rgba(70, 72, 45, 0.5)',
                                'rgba(72, 83, 240, 0.5)', // Cor para "Quantidade de Rejeitos"

                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Rejeitos',
                                font: {
                                    size: 18
                                }
                            },
                            legend: {
                                labels: {
                                    font: {
                                        size: 12
                                    }
                                }
                            },
                        }
                    }
                });
                setPieChart(chart);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleChange = (e: any) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }



    const columnsAwaitingRelease: Array<Object> = [

        {
            name: 'Nome do arquivo',
            selector: (row: any) => row.nome_arquivo_proc

        },
        {
            name: 'Data de entrada',
            selector: (row: any) => row.dt_processamento
        },
        {
            name: 'Qtd cartões',
            selector: (row: any) => row.total_cartoes
        }
    ];


    const columnsInProduction: Array<Object> = [

        {
            name: 'Nome do arquivo',
            selector: (row: any) => row.nome_arquivo_proc,

        },

        {
            name: 'Data Pros',
            selector: (row: any) => row.dt_processamento

        },
        {
            name: 'Quantidade de cartões',
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
            name: 'Nome do arquivo',
            selector: (row: any) => row.nome_arquivo_proc

        },

        {
            name: 'Data de entrada',
            selector: (row: any) => row.dt_processamento
        },
        {
            name: 'Qtd cartões',
            selector: (row: any) => row.total_cartoes
        },

    ];

    const columnsDispatched: Array<Object> = [

        {
            name: 'Nome do arquivo',
            selector: (row: any) => row.nome_arquivo_proc
        },
        {
            name: 'Data de entrada',
            selector: (row: any) => row.dt_processamento
        },
        {
            name: 'Data de saida',
            selector: (row: any) => row.dt_expedicao
        },
        {
            name: 'Qtd cartões',
            selector: (row: any) => row.total_cartoes
        },

    ];

    useEffect(() => {

        const HomePageRequests = async () => {


            await api.get('/awaiting-release')
                .then((data) => {
                    if (formValues.Type === "redeuze") {
                        setAwaitingRelease(data.data[1]);
                    } else {
                        setAwaitingRelease(data.data[0]);
                    }
                })
                .catch(() => {
                    setTypeMessageAwaitingRelease(true);
                });

            await api.post('/production', { tipo: formValues.Type })
                .then((data) => {
                    setInProductionData(data.data)
                }).catch(() => {
                    setTypeMessageInProduction(true)
                });

            await api.get('/awaiting-shipment')
                .then((data) => {

                    if (formValues.Type === "redeuze") {
                        setAwaitingShipment(data.data[1]);
                    } else {
                        setAwaitingShipment(data.data[0]);
                    }
                })
                .catch(() => {
                    setTypeMessageAwaitingShipment(true);
                });

            await api.get('/dispatched')
                .then((data) => {
                    if (formValues.Type === "redeuze") {
                        setDispatched(data.data[1]);
                    } else {
                        setDispatched(data.data[0]);
                    }
                })
                .catch(() => {
                    setTypeMessageDispatched(true);
                });
        }

        HomePageRequests()

    }, [formValues]);











    return (
        <div className="container-page-home">

            <DefaultHeader />

            <Select info={"Selecione o tipo de cartão:"} name="Type" onChange={handleChange}>
                <option value="dmcard">Dm Card</option>
                <option value="redeuze">Rede Uze</option>



            </Select>


            <Table
                data={Array.isArray(awaitingReleaseData) ? awaitingReleaseData : []}
                column={columnsAwaitingRelease}
                titleTable="Aguardando liberação"
                typeMessage={typeMessageAwaitingRelease}
            />


            <Table
                data={Array.isArray(inProductionData) ? inProductionData : []}
                column={columnsInProduction}
                titleTable="Em produção"
                typeMessage={typeMessageInProduction}


            />

            <Table
                data={Array.isArray(awaitingShipmentData) ? awaitingShipmentData : []}
                column={columnsAwaitingShipment}
                titleTable="Aguardando Expedição"
                typeMessage={typeMessageAwaitingShipment} />

            <Table
                data={Array.isArray(dispatchedData) ? dispatchedData : []}
                column={columnsDispatched}
                titleTable="Expedidos"
                typeMessage={typeMessageDispatched} />

            <div className="graph">
                <PercentageTable />
                <div className="chart-container">
                    <canvas id="wasteChart" width="600" height="400"></canvas>
                </div>

            </div>


        </div >
    )
}

export default PageHome;