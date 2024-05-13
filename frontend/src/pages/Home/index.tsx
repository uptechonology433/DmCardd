import React, { useEffect, useState } from "react";
import api from "../../connectionAPI";
import Table from "../../components/shared/Table";
import DefaultHeader from "../../components/layout/DefaultHeader";
import Select from "../../components/shared/Select";
import Chart from "chart.js/auto";

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

            } catch (error) {
                console.error(error);
            }
        };
        HomePageRequests();
    }, [formValues]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

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







    const totalProduced = graphData.reduce((total, item) => total + item.value, 0);

    return (
        <div className="container-page-home">

            <DefaultHeader />
            <Select info={"Selecione o tipo de cartão:"} name="Type" onChange={handleChange} value={formValues.Type}>
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
                typeMessage={typeMessageAwaitingShipment}
            />

            <Table
                data={Array.isArray(dispatchedData) ? dispatchedData : []}
                column={columnsDispatched}
                titleTable="Expedidos"
                typeMessage={typeMessageDispatched}
            />

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
                    <tr>
                        <td>Cartões Processados</td>
                        <td>{graphData[0].value}</td>
                        <td>{Math.round((graphData[0].value / totalProduced) * 100)}%</td>
                    </tr>
                    <tr>
                        <td>Cartões em Produção</td>
                        <td>{graphData[1].value}</td>
                        <td>{Math.round((graphData[1].value / totalProduced) * 100)}%</td>
                    </tr>
                    <tr>
                        <td>Rejeitos</td>
                        <td>{graphData[2].value}</td>
                        <td>{Math.round((graphData[2].value / totalProduced) * 100)}%</td>
                    </tr>
                    <tr>
                        <td>Cartões Expedidos</td>
                        <td>{graphData[3].value}</td>
                        <td>{Math.round((graphData[3].value / totalProduced) * 100)}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
            </div>
        </div>
    );
};

export default PageHome;
