<?php

namespace App\DAO\VeroCard\Waste;

use App\DAO\VeroCard\Connection;
use App\Models\WasteModel;

class WasteProductsDAO extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }
    public function getAllWaste_DmCard_RedeUze(): array
    {
        $productsWaste = $this->pdo
            ->query("SELECT * from view_dmcard_redeuze_relatorio_waste;")
            ->fetchAll(\PDO::FETCH_ASSOC);


        foreach ($productsWaste as &$product) {
            $product['dt_perda'] = date('d/m/Y', strtotime($product['dt_perda']));
        }

        return $productsWaste;
    }

    public function getAllWaste_DmCard_RedeUze_Search(WasteModel $wasteModel): array
    {
        $searchTerm = $wasteModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_dmcard_redeuze_relatorio_waste 
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
    

    public function getAllWasteDmCard(): array
    {

        $productsWaste = $this->pdo
            ->query("SELECT  * FROM view_dmcard_relatorio_waste")
            ->fetchAll(\PDO::FETCH_ASSOC);


        foreach ($productsWaste as &$product) {
            $product['dt_perda'] = date('d/m/Y', strtotime($product['dt_perda']));
        }
        return $productsWaste;
    }
    public function getAllWasteDmCard_Search(WasteModel $wasteModel): array
    {
        $searchTerm = $wasteModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_dmcard_relatorio_waste 
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
    

    public function getAllWasteRedeUze(): array
    {

        $productsWaste = $this->pdo
            ->query("SELECT * from view_redeuze_relatorio_waste;")
            ->fetchAll(\PDO::FETCH_ASSOC);



        foreach ($productsWaste as &$product) {
            $product['dt_perda'] = date('d/m/Y', strtotime($product['dt_perda']));
        }
        return $productsWaste;
    }
    public function getAllWasteRedeUze_Search(WasteModel $wasteModel): array
    {
        $searchTerm = $wasteModel->getSearch();
    
        $statement = $this->pdo->prepare("SELECT * FROM view_redeuze_relatorio_waste 
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
