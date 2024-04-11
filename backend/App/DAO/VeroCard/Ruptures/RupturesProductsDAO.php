<?php

namespace App\DAO\VeroCard\Ruptures;

use App\DAO\VeroCard\Connection;

class RupturesProductsDAO extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllRupturesProducts(string $reportType): array
    {
        switch ($reportType) {
            case 'dmcard':
                return $this->getAllRupturesProductsDmCard();
            case 'redeuze':
                return $this->getAllRupturesProductsRedeUze();
            default:
                // Handle unknown report type
                return [];
        }
    }

    public function searchRupturesProducts(string $reportType, $searchTerm): array
    {
        switch ($reportType) {
            case 'dmcard':
                return $this->searchRupturesProductsDmCard($searchTerm);
            case 'redeuze':
                return $this->searchRupturesProductsRedeUze($searchTerm);
            default:
                // Handle unknown report type
                return [];
        }
    }

    private function getAllRupturesProductsDmCard(): array
    {
        $rupturesProducts = $this->pdo
            ->query("SELECT * FROM view_dmcard_ruptura;")
            ->fetchAll(\PDO::FETCH_ASSOC);

        return $rupturesProducts;
    }

    private function searchRupturesProductsDmCard($searchTerm): array
    {
        $searchTerm = '%' . $searchTerm . '%';

        $query = "SELECT * FROM view_dmcard_ruptura 
                  WHERE cod_produto LIKE :searchTerm 
                  OR desc_produto LIKE :searchTerm";

        $statement = $this->pdo->prepare($query);
        $statement->bindParam(':searchTerm', $searchTerm, \PDO::PARAM_STR);
        $statement->execute();

        $results = $statement->fetchAll(\PDO::FETCH_ASSOC);

        return $results;
    }

    private function getAllRupturesProductsRedeUze(): array
    {
        $rupturesProducts = $this->pdo
            ->query("SELECT * FROM view_dmcard_redeuze_ruptura;")
            ->fetchAll(\PDO::FETCH_ASSOC);

        return $rupturesProducts;
    }

    private function searchRupturesProductsRedeUze($searchTerm): array
    {
        $searchTerm = '%' . $searchTerm . '%';

        $query = "SELECT * FROM view_dmcard_redeuze_ruptura 
                  WHERE cod_produto LIKE :searchTerm 
                  OR desc_produto LIKE :searchTerm";

        $statement = $this->pdo->prepare($query);
        $statement->bindParam(':searchTerm', $searchTerm, \PDO::PARAM_STR);
        $statement->execute();

        $results = $statement->fetchAll(\PDO::FETCH_ASSOC);

        return $results;
    }
}
