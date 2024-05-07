<?php

namespace App\DAO\VeroCard\Inactive;

use App\DAO\VeroCard\Connection;
use App\Models\InactiveModel;

class InactiveProductsDAO extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllInactive_DmCard_RedeUze(): array
    {
        $productsInactive = $this->pdo
            ->query("SELECT * from view_dmcard_redeuze_relatorio_inativos;")
            ->fetchAll(\PDO::FETCH_ASSOC);


      

        return $productsInactive;
    }

    public function getAllInactive_DmCard_RedeUze_Search(InactiveModel $inactiveModel): array
    {
        $searchTerm = $inactiveModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_dmcard_redeuze_relatorio_inativos 
                      WHERE cod_produto = :search
                      OR desc_produto = :search
        ");
    
        $statement->execute(['search' => $searchTerm]);
        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);
    
    
    
        return $response;
    }
    

    public function getAllInactiveDmCard(): array
    {

        $productsInactive = $this->pdo
            ->query("SELECT  * FROM view_dmcard_relatorio_inativos")
            ->fetchAll(\PDO::FETCH_ASSOC);


      
        return $productsInactive;
    }
    public function getAllInactiveDmCard_Search(InactiveModel $inactiveModel): array
    {
        $searchTerm = $inactiveModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_dmcard_relatorio_inativos
            WHERE cod_produto = :search
            OR desc_produto = :search
        ");
    
        $statement->execute(['search' =>$searchTerm]);
        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);
    
      
    
        return $response;
    }
    

    public function getAllInactiveRedeUze(): array
    {

        $productsInactive = $this->pdo
            ->query("SELECT * from view_redeuze_relatorio_inativos;")
            ->fetchAll(\PDO::FETCH_ASSOC);



        return $productsInactive;
    }
    public function getAllInactiveRedeUze_Search(InactiveModel $inactiveModel): array
    {
        $searchTerm = $inactiveModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_redeuze_relatorio_inativos 
            WHERE cod_produto LIKE :search
            OR desc_produto LIKE :search
        ");
    
        $statement->execute(['search' => $searchTerm]);
        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);
    
    
    
        return $response;
    }
}
