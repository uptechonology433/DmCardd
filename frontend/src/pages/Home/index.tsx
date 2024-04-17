import React, { useEffect, useState } from "react";
import api from "../../connectionAPI";
import Table from "../../components/shared/Table";
import DefaultHeader from "../../components/layout/DefaultHeader";
import Select from "../../components/shared/Select";
import Chart from "chart.js/auto";



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

    const [wasteData, setWasteData] = useState<{ desc_produto: string; cod_produto: string; qtd: number; desc_perda: string; }[]>([]);
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [pieChart, setPieChart] = useState<Chart<'pie', number[], string> | null>(null);


    const fetchWasteProducts = async () => {
        try {
            const response = await api.post<{ desc_produto: string; cod_produto: string; qtd: number; desc_perda: string; }[]>("/waste-products", { searchTerm });
            setWasteData(response.data);
            setLoading(false);
    
            // Processar os dados para contar a quantidade de cada tipo de perda
            const lossQuantities: Record<string, number> = {};
            response.data.forEach((item) => {
                if (lossQuantities[item.desc_perda]) {
                    lossQuantities[item.desc_perda] += item.qtd;
                } else {
                    lossQuantities[item.desc_perda] = item.qtd;
                }
            });

            // Criar os dados necessários para o gráfico de pizza
            const labels = Object.keys(lossQuantities);
            const data = Object.values(lossQuantities);


            // Criar o gráfico de pizza usando Chart.js

            const ctx = document.getElementById("wasteChart") as HTMLCanvasElement;

            if (ctx) {
                const chart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels.map((label, index) => `${label}: ${data[index]}`), // Adiciona a quantidade aos rótulos
                        datasets: [{
                            label: 'Quantidade de Perdas',
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 200, 0.5)',
                                'rgba(72, 83, 240, 0.5)',
                                'rgba(241, 135, 29, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)'
                                // Adicione mais cores se houver mais tipos de perda
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

    useEffect(() => {
        fetchWasteProducts();
    }, [searchTerm]);

    const handleChange = (e: any) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const columnsAwaitingRelease: Array<Object> = [
        {
            name: 'Codigo do produto',
            selector: (row: any) => row.cod_produto,
            sortable: true
        },
        {
            name: 'Nome do arquivo',
            selector: (row: any) => row.nome_arquivo_proc

        },
        {
            name: 'Desc do Produto',
            selector: (row: any) => row.desc_produto

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
            name: 'Codigo do produto',
            selector: (row: any) => row.cod_produto,
            sortable: true
        },
        {
            name: 'Nome do arquivo',
            selector: (row: any) => row.nome_arquivo_proc,

        },
        {
            name: 'Desc do Produto',
            selector: (row: any) => row.desc_produto,


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
        {
            name: 'Rastreio',
            selector: (row: any) => row.rastreio,
            sortable: true
        },
    ];




  

    const columnsAwaitingShipment: Array<Object> = [
        {
            name: 'Codigo do produto',
            selector: (row: any) => row.cod_produto,
            sortable: true
        },
        {
            name: 'Nome do arquivo',
            selector: (row: any) => row.nome_arquivo_proc

        },
        {
            name: 'Desc do Produto',
            selector: (row: any) => row.desc_produto

        },
        {
            name: 'Data de entrada',
            selector: (row: any) => row.dt_processamento
        },
        {
            name: 'Qtd cartões',
            selector: (row: any) => row.total_cartoes
        },
        {
            name: 'Rastreio',
            selector: (row: any) => row.rastreio
        }
    ];

    const columnsDispatched: Array<Object> = [
        {
            name: 'Codigo do produto',
            selector: (row: any) => row.cod_produto,
            sortable: true
        },
        {
            name: 'Nome do arquivo',
            selector: (row: any) => row.nome_arquivo_proc

        },
        {
            name: 'Desc do Produto',
            selector: (row: any) => row.desc_produto

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
        {
            name: 'Rastreio',
            selector: (row: any) => row.rastreio
        }
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


            <div className="chart-container">
                <canvas id="wasteChart" width="600" height="400"></canvas>
            </div>


        </div >
    )
}

export default PageHome;