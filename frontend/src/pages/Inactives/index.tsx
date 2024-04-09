import React, { useEffect, useState } from "react";
import DefaultHeader from "../../components/layout/DefaultHeader";
import Input from "../../components/shared/Input";
import Table from "../../components/shared/Table";
import DownloadFacilitators from "../../components/layout/DownloadFacilitators";
import api from "../../connectionAPI";

const PageInactive: React.FC = () => {
    const [inactiveData, setInactiveData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    useEffect(() => {
        fetchInactiveProducts();
    }, []);

    const fetchInactiveProducts = async () => {
        try {
            const response = await api.post("/inactive-products", { searchTerm });
            setInactiveData(response.data);
        } catch (error) {
            console.log(error);
            // Trate o erro adequadamente, por exemplo, exibindo uma mensagem de erro para o usuário
        }
    };

    const handleSearch = () => {
        fetchInactiveProducts();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <DefaultHeader sessionTheme="Inativos" />
            <div className="container-inactives">
                <div className="inputs-info-products">
                    <Input
                        name="searchTerm"
                        info="Código ou Descrição do Produto:"
                        placeholder="Produto..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>
                <DownloadFacilitators excelClick={() => {}} printClick={() => window.print()} textButton={'Pesquisar'} onClickButton={handleSearch} />
            </div>
            <Table
                data={inactiveData}
                column={columnsInactives}
                titleTable="Inativos"
            />
        </>
    );
};

export default PageInactive;