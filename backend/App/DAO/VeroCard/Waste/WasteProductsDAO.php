<?php

namespace App\DAO\VeroCard\Waste;

use App\DAO\VeroCard\Connection;

class WasteProductsDAO extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllWasteProducts(): array
    {
        $wasteProducts = $this->pdo
            ->query("SELECT * FROM view_dmcard_relatorio_rejeitos;")
            ->fetchAll(\PDO::FETCH_ASSOC);

            foreach($wasteProducts as &$product){
                $product['dt_perda'] = date('d/m/Y', strtotime($product['dt_perda']));

            }

        return $wasteProducts;
    }

    public function searchWasteProducts($searchTerm): array
    {
        $searchTerm = '%' . $searchTerm . '%';

        $query = "SELECT * FROM view_dmcard_relatorio_rejeitos 
                  WHERE cod_produto LIKE :searchTerm 
                  OR desc_produto LIKE :searchTerm";

        $statement = $this->pdo->prepare($query);
        $statement->bindParam(':searchTerm', $searchTerm, \PDO::PARAM_STR);
        $statement->execute();

        $results = $statement->fetchAll(\PDO::FETCH_ASSOC);
       

        return $results;
    }
}
