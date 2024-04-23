import { useState, useEffect } from "react";
import api from "../../../connectionAPI";

const PercentageTable: React.FC = () => {
    const [totalProduced, setTotalProduced] = useState<number>(0);
    const [totalWaste, setTotalWaste] = useState<number>(0);
    const [restantes, setRestantes] = useState<number>(0);
    const [totalCartoes, setTotalCartoes] = useState<number>(0);

    useEffect(() => {
        fetchWasteProducts();
    }, []);

    const fetchWasteProducts = async () => {
        try {
            const response = await api.post("/graph");
            const data = response.data[0];
            const { qtd_produzir, qtd_rejeitos, restantes, total_cartoes } = data;

            setTotalProduced(parseInt(qtd_produzir));
            setTotalWaste(parseInt(qtd_rejeitos));
            setRestantes(parseInt(restantes));   
            setTotalCartoes(parseInt(total_cartoes));      
        } catch (error) {
            console.log(error);
        }
    };

    const total = totalCartoes + restantes;
    console.log(total)

    const percentageProduced = (totalCartoes / total) * 100;
    const percentageWaste = (totalWaste / total) * 100;
    
    const percentageRestantes = 100 - percentageProduced ;
    

   
    return (
        <div className="percentage-table">
            
            <table>
                <thead>
                    <tr>
                        <th>Referência</th>
                        <th>Porcentagem</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>QTD Cartões do Mês: {total}</td>
                        <td> 100%</td>
                    </tr>
                    <tr>
                        <td>QTD Cartões Produzidos: {totalCartoes}</td>
                        <td>{percentageProduced.toFixed(2)}%</td>
                    </tr>
                 
                    <tr>
                        <td>QTD Cartões em Produção: {restantes}</td>
                        <td>{percentageRestantes.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td>QTD de Rejeitos: {totalWaste}</td>
                        <td>{percentageWaste.toFixed(2)}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PercentageTable;
