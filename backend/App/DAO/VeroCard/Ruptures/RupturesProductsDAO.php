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


        foreach ($productsRuptures as &$product) {
            $product['dt_perda'] = date('d/m/Y', strtotime($product['dt_perda']));
        }

        return $productsRuptures;
    }

    public function getAllRuptures_DmCard_RedeUze_Search(RupturesModel $rupturesModel): array
    {
        $searchTerm = $rupturesModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_dmcard_redeuze_relatorio_rupturas 
                      WHERE cod_produto = :search
                      OR desc_produto = :search
        ");
    
        $statement->execute(['search' => $searchTerm]);
        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);
    
        foreach ($response as &$product) {
            $product['dt_perda'] = date('d/m/Y', strtotime($product['dt_perda']));
        }
    
        return $response;
    }
    

    public function getAllRupturesDmCard(): array
    {

        $productsRuptures = $this->pdo
            ->query("SELECT  * FROM view_dmcard_relatorio_rupturas")
            ->fetchAll(\PDO::FETCH_ASSOC);


        foreach ($productsRuptures as &$product) {
            $product['dt_perda'] = date('d/m/Y', strtotime($product['dt_perda']));
        }
        return $productsRuptures;
    }
    public function getAllRupturesDmCard_Search(RupturesModel $rupturesModel): array
    {
        $searchTerm = $rupturesModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_dmcard_relatorio_rupturas 
            WHERE cod_produto = :search
            OR desc_produto = :search
        ");
    
        $statement->execute(['search' =>$searchTerm]);
        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);
    
        foreach ($response as &$product) {
            $product['dt_perda'] = date('d/m/Y', strtotime($product['dt_perda']));
        }
    
        return $response;
    }
    

    public function getAllRupturesRedeUze(): array
    {

        $productsRuptures = $this->pdo
            ->query("SELECT * from view_redeuze_relatorio_rupturas;")
            ->fetchAll(\PDO::FETCH_ASSOC);



        foreach ($productsRuptures as &$product) {
            $product['dt_perda'] = date('d/m/Y', strtotime($product['dt_perda']));
        }
        return $productsRuptures;
    }
    public function getAllRupturesRedeUze_Search(RupturesModel $rupturesModel): array
    {
        $searchTerm = $rupturesModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_redeuze_relatorio_rupturas 
            WHERE cod_produto LIKE :search
            OR desc_produto LIKE :search
        ");
    
        $statement->execute(['search' => $searchTerm]);
        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);
    
        foreach ($response as &$product) {
            $product['dt_perda'] = date('d/m/Y', strtotime($product['dt_perda']));
        }
    
        return $response;
    }
    
}
