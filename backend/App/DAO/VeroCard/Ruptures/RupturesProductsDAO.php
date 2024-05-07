<?php

namespace App\DAO\VeroCard\Ruptures;

use App\DAO\VeroCard\Connection;
use App\Models\RupturesModel;

class RupturesProductsDAO extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllRuptures_DmCard_RedeUze(): array
    {
        $productsRuptures = $this->pdo
            ->query("SELECT * from view_dmcard_redeuze_relatorio_rupturas;")
            ->fetchAll(\PDO::FETCH_ASSOC);



        return $productsRuptures;
    }

    public function getAllRuptures_DmCard_RedeUze_Search(RupturesModel $rupturesModel): array
    {
        $searchTerm = $rupturesModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_dmcard_redeuze_relatorio_rupturas 
                    WHERE \"COD PROD\" LIKE :search
        OR \"PRODUTO\" LIKE :search");
    
        $statement->execute(['search' => $searchTerm]);
        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);
    
      
    
        return $response;
    }
    

    public function getAllRupturesDmCard(): array
    {

        $productsRuptures = $this->pdo
            ->query("SELECT  * FROM view_dmcard_relatorio_rupturas")
            ->fetchAll(\PDO::FETCH_ASSOC);


  
        return $productsRuptures;
    }
    public function getAllRupturesDmCard_Search(RupturesModel $rupturesModel): array
    {
        $searchTerm = $rupturesModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_dmcard_relatorio_rupturas 
            WHERE \"COD PROD\" LIKE :search
        OR \"PRODUTO\" LIKE :search
        ");
    
        $statement->execute(['search' =>$searchTerm]);
        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);
   
    
        return $response;
    }
    

    public function getAllRupturesRedeUze(): array
    {

        $productsRuptures = $this->pdo
            ->query("SELECT * from view_redeuze_relatorio_rupturas;")
            ->fetchAll(\PDO::FETCH_ASSOC);


        return $productsRuptures;
    }
    public function getAllRupturesRedeUze_Search(RupturesModel $rupturesModel): array
    {
        $searchTerm = $rupturesModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_redeuze_relatorio_rupturas 
              WHERE \"COD PROD\" LIKE :search
        OR \"PRODUTO\" LIKE :search
        ");
    
        $statement->execute(['search' => $searchTerm]);
        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);
  
    
        return $response;
    }
    
}
